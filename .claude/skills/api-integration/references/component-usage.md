# Consuming a service from a component

The base pattern uses plain React state — `useState` + `useEffect` — with **no cache
layer** (no react-query, SWR, redux, or zustand) and no custom hooks directory. Do not
introduce one unless the project already has it; follow the idioms below.

> **If the project already uses a server-state library**, keep the service layer exactly
> as it is and let that library own fetching, caching, and invalidation. Sections A, C,
> and D below become the library's job; section B's success/error branching still applies.

Presentation in these examples is MUI + a toast library with a replace-by-id API
(`react-hot-toast`). Porting to another stack: **keep the control flow exactly, swap the
presentation calls.**

Examples use a `Product` entity and a `productService` singleton.

---

## A. Read (GET) — inline `error` state, no toast

```ts
const [products, setProducts] = useState<Product[]>([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState<string | null>(null);

const fetchAllProducts = async () => {
	setError(null);
	setLoading(true);
	const response = await productService.GetAllProducts();
	if (response.success && response.data) {
		setProducts(response.data);
	} else {
		console.error('Get Products Error:', response.message);
		setError(response.message);
	}
	setLoading(false);
};

useEffect(() => {
	fetchAllProducts();
}, []);
```

Fixed order inside the function: `setError(null)` → `setLoading(true)` → await →
branch on `response.success && response.data` → `setLoading(false)` as the last line
(outside the branch, so it runs on both paths).

**No `try/catch`.** The service cannot throw.

`console.error` message format is `'<Action> <Entity> Error:'` — `'Get Products Error:'`,
`'Search Products Error:'`, `'Delete Product Error:'`.

For a detail page, the state is a single nullable entity and the fetch takes the route
param:

```ts
const { id } = useParams();
const [product, setProduct] = useState<Product | null>(null);

const fetchProduct = async (productId: string) => {
	setError(null);
	setLoading(true);
	const response = await productService.GetProductById(productId);
	if (response.success && response.data) {
		setProduct(response.data);
	} else {
		console.error('Get Product Error:', response.message);
		setError(response.message);
	}
	setLoading(false);
};

useEffect(() => {
	if (id) fetchProduct(id);
}, [id]);
```

### Rendering read state

**List pages** should hand `loading` / `error` / `data` to a single generic list-renderer
component (e.g. `src/components/DataGridView.tsx`) rather than re-implementing spinner /
alert / empty UI on every page. If the project has one, reuse it; if not, write it once
and reuse it after that:

```tsx
<DataGridView
	data={products}
	loading={loading}
	error={error}
	viewMode={viewMode}
	noDataMessage="No products found"
	getKey={(product) => product.id}
	renderItem={(product) => <ProductCard product={product} onPreview={handlePreview} />}
/>
```

`DataGridView<T>` handles four states in order: loading (spinner), error (alert), empty
(illustration + `noDataMessage`), then the grid of `renderItem`.

**Detail pages** use an early-return ladder before the main JSX — loading, then error,
then not-found:

```tsx
if (loading) {
	return (
		<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
			<CircularProgress />
		</Box>
	);
}

if (error) {
	return (
		<Box sx={{ /* centered */ height: '100vh', gap: 2, p: 4 }}>
			<Alert severity="error" variant="outlined" sx={{ maxWidth: 500, width: '100%' }}>
				{error}
			</Alert>
			<Button variant="contained" startIcon={<ArrowLeft />} onClick={() => navigate('/products')} sx={{ borderRadius: 1 }}>
				Back to Products
			</Button>
		</Box>
	);
}

if (!product) {
	/* "Product not found" + back button */
}
```

---

## B. Write (POST / PUT / DELETE) — toast, no `error` state

Writes report through toasts instead of inline error state. Open a loading toast, keep its
id, and replace it with success or error.

```ts
const handleSubmit = async () => {
	setSaving(true);
	const toastId = toast.loading(isEditMode ? 'Saving changes...' : 'Creating product...');

	if (isEditMode && product) {
		const response = await productService.UpdateProduct(product.id, formData);
		if (response.success && response.data) {
			onSaved?.(response.data);
			toast.success('Product updated successfully!', { id: toastId });
			onClose();
		} else {
			toast.error(`Failed to update product ${response.message}`, { id: toastId });
			console.error('Update Product Error:', response.message);
		}
	} else {
		const response = await productService.CreateProduct(formData);
		if (response.success && response.data) {
			onSaved?.(response.data);
			toast.success('Product created successfully!', { id: toastId });
			resetForm();
			onClose();
		} else {
			toast.error(`Failed to create product ${response.message}`, { id: toastId });
			console.error('Create Product Error:', response.message);
		}
	}

	setSaving(false);
};
```

Delete, from a confirmation dialog — note it branches on `response.success` **only**,
since the payload is a `boolean`:

```ts
const handleDelete = async () => {
	if (!id) return;
	setIsDeleting(true);
	const toastId = toast.loading(`Deleting ${product?.name}...`);

	const response = await productService.DeleteProduct(id);
	if (response.success) {
		toast.success('Product deleted successfully!', { id: toastId });
		navigate('/products');
	} else {
		toast.error(response.message, { id: toastId });
		console.error('Delete Product Error:', response.message);
		setIsDeleteDialogOpen(false);
	}
	setIsDeleting(false);
};
```

Rules:

- Always pass `{ id: toastId }` so the loading toast is **replaced**, not stacked.
- Always `console.error` alongside the error toast.
- The toast host (`<Toaster />` or equivalent) is mounted **once** at the app root — do not
  add another per page.
- Reads use `error` state; writes use toasts. Do not mix the two.
- If the project has no toast library, use a local error/success state for writes and keep
  every other line of this control flow identical.

---

## C. Search + filter + debounce

The recipe for a list page with filters. Five pieces:

```ts
// 1. Module-level default — also the reset target
const DEFAULT_SEARCH_AND_FILTER: SearchProduct = {
	searchTerm: '',
	inStock: undefined,
	categoryId: undefined,
	sortBy: PRODUCT_SORT_BY['Name (A-Z)'],
};

function Products() {
	// 2. One object for all filters + a boolean gate + the raw input
	const [searchAndFilter, setSearchAndFilter] = useState<SearchProduct>(DEFAULT_SEARCH_AND_FILTER);
	const [searchAndFilterActive, setSearchAndFilterActive] = useState(false);
	const [searchInput, setSearchInput] = useState('');
	const [isFiltersDisabled, setIsFiltersDisabled] = useState(false);

	// 3. Generic setter — flips the gate on any change
	const handleFilterChange = <K extends keyof SearchProduct>(key: K, value: SearchProduct[K]) => {
		setSearchAndFilterActive(true);
		setSearchAndFilter((prev) => ({ ...prev, [key]: value }));
	};

	// The search call — flattens UI state into the wire type
	const searchProducts = async () => {
		setError(null);
		setLoading(true);
		const response = await productService.SearchProducts({
			searchTerm: searchAndFilter.searchTerm,
			inStock: searchAndFilter.inStock,
			categoryId: searchAndFilter.categoryId,
			minPrice: searchAndFilter.priceRange?.min,
			maxPrice: searchAndFilter.priceRange?.max,
			sortBy: searchAndFilter.sortBy,
		});
		if (response.success && response.data) {
			setProducts(response.data);
		} else {
			console.error('Search Products Error:', response.message);
			setError(response.message);
		}
		setLoading(false);
	};

	// 4. Effects
	useEffect(() => {
		fetchAllProducts();
	}, []);

	useEffect(() => {
		if (searchAndFilterActive) {
			searchProducts();
		}
	}, [searchAndFilter, searchAndFilterActive]);

	useEffect(() => {
		if (!loading && !error && products.length > 0) setIsFiltersDisabled(false);
		else setIsFiltersDisabled(true);
	}, [loading, error, products]);

	// 500 ms debounce: raw input feeds the filter object, which fires the search
	useEffect(() => {
		const handler = setTimeout(() => {
			if (searchInput !== searchAndFilter.searchTerm) handleFilterChange('searchTerm', searchInput);
		}, 500);
		return () => clearTimeout(handler);
	}, [searchInput]);

	// 5. Reset returns to the default and refetches everything
	const resetFilters = () => {
		setSearchInput('');
		setSearchAndFilter(DEFAULT_SEARCH_AND_FILTER);
		setSearchAndFilterActive(false);
		fetchAllProducts();
	};
}
```

Key points:

- The `searchAndFilterActive` gate is what stops the search endpoint firing on mount —
  mount uses `GetAll*`, and only user interaction switches to `Search*`.
- Never call the search API directly from an input handler. Handlers only update state;
  the effect on `searchAndFilter` owns the call.
- The UI → wire flattening happens at the call site, not in the service.
- **Pagination is not part of this pattern.** Do not invent `page` / `pageSize` /
  `pageNumber` unless the API actually supports them; if it does, add them to
  `Search<E>Request` and carry them in the same filter object.

Filter controls (a search input, a row of filter selects) are shared components driven by
`handleFilterChange` and disabled by `isFiltersDisabled`. Reuse the project's existing
ones rather than building per-page variants.

---

## D. Refetching after a mutation

There is no cache layer, so refresh is explicit. The child that performs the write calls
an `onSaved` prop; the parent decides what to do:

```tsx
// Refetch the list, respecting whether a filter is currently applied
const handleProductSaved = () => {
	setIsAddDrawerOpen(false);
	if (searchAndFilterActive) searchProducts();
	else fetchAllProducts();
};

<ProductFormDrawer open={isAddDrawerOpen} onClose={() => setIsAddDrawerOpen(false)} onSaved={handleProductSaved} />
```

```tsx
// Detail page — set local state from the response instead of refetching
<ProductFormDrawer open={isEditDrawerOpen} onClose={...} product={product} onSaved={(saved) => setProduct(saved)} />
```

---

## E. Form drawer (create + update behind one component)

One component serves both modes:

```tsx
interface ProductFormDrawerProps {
	open: boolean;
	onClose: () => void;
	product?: Product | null;      // presence switches the drawer to edit mode
	onSaved?: (savedProduct: Product) => void;
}

interface ProductFormErrors {
	name?: string;
	sku?: string;
	price?: string;
	releaseDate?: string;
}

// Module-level, typed as the Create DTO
const INITIAL_VALUES: CreateProduct = {
	name: '',
	sku: '',
	price: 0,
	categoryId: '',
	releaseDate: '',
	imageUrl: '',
};

// Pure function, field -> message
const validateForm = (data: CreateProduct): ProductFormErrors => { /* ... */ };
```

Inside the component:

- `const isEditMode = !!product;` — one `formData` typed as `Create<Entity>` serves both
  the Create and Update calls.
- Generic field setter, mirroring `handleFilterChange`:
  ```ts
  const handleChange = <K extends keyof CreateProduct>(field: K, value: CreateProduct[K]) => {
  	setFormData((prev) => ({ ...prev, [field]: value }));
  };
  ```
- `useEffect(() => setErrors(validateForm(formData)), [formData])` revalidates on change;
  a `touched` map controls when errors are shown.
- On submit: mark everything touched, re-run `validateForm`, bail if any errors, then run
  the write idiom from section B.
- Separate in-flight booleans per concern: `saving`, `imageUploading`.
- Cast form values properly (`Number(val)`, a typed enum lookup) — never `as any`.

### File upload inside a form

An upload service that returns the same `ApiResponse` envelope uses the same branch as
everything else:

```ts
const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
	const file = e.target.files?.[0];
	if (!file) return;

	setImageUploading(true);
	const response = await fileUploaderService.UploadImage(file);

	if (response.success && response.data) {
		setImagePreview(response.data.url);
		setImagePublicId(response.data.publicId);
		handleChange('imageUrl', response.data.url);
	} else {
		console.error('Image Upload Error:', response);
	}

	setImageUploading(false);
	if (fileInputRef.current) fileInputRef.current.value = '';
};
```

The form stores only the returned URL. If editing needs the provider's file id back from
an existing URL, put that parsing in a util (`src/utils/`), not in the component.
