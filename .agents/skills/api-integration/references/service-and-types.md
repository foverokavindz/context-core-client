# Services and types (per entity)

Two files per entity. Write the types first, then the service.

`<Entity>` is the resource you are adding (`Product`, `Order`, `User`, …). The worked
examples use `Product`; substitute freely.

---

## `src/types/<entity>.types.ts`

File name is lowercase (camelCase if multiword): `product.types.ts`, `order.types.ts`,
`imageUpload.types.ts`.

### Template

```ts
import type { <Entity>SortOrderType } from './common.types';
import type { RelatedEntity } from './related.types';

// The entity as the API returns it
export interface <Entity> {
	id: string;
	name: string;
	// ...
	related: RelatedEntity[] | [] | null;
}

// Lightweight projection used when this entity is nested inside another
export interface <Entity>Summary {
	id: string;
	name: string;
	imageUrl?: string;
}

// POST body — required fields (or `| null` where a form starts empty)
export interface Create<Entity> {
	name: string;
	// ...
}

// PUT body — every field optional (partial update)
export interface Update<Entity> {
	name?: string;
	// ...
}

// GET /search query params — the wire shape
export interface Search<Entity>Request {
	searchTerm?: string;
	sortBy?: <Entity>SortOrderType;
	// ...
}
```

### Rules

- Entity type is a bare noun: `Product`, `OrderLine`. No `Dto`, `Model`, or `Response`
  suffix.
- `Create<E>` / `Update<E>` take **no suffix**; only search types get `Request`.
- `Update<E>` makes every field optional.
- Type-only imports must use `import type` (required when `verbatimModuleSyntax: true`).
- Circular imports between two `*.types.ts` files are fine — they are type-only and erased
  at compile time, so a parent and child entity may reference each other.

### `src/types/common.types.ts` — shared values and UI state

Enum-ish values live here, as an `as const` object plus a derived union type. Object keys
are the **human labels**, values are the **wire values**.

```ts
export const PRODUCT_SORT_BY = {
	'Name (A-Z)': 'name_asc',
	'Name (Z-A)': 'name_desc',
	'Price (High - Low)': 'price_desc',
	'Price (Low - High)': 'price_asc',
} as const;

export type ProductSortOrderType = (typeof PRODUCT_SORT_BY)[keyof typeof PRODUCT_SORT_BY];

export const ORDER_STATUS = {
	Draft: 0,
	Submitted: 1,
	Shipped: 2,
	Cancelled: 3,
} as const;

export type OrderStatusType = (typeof ORDER_STATUS)[keyof typeof ORDER_STATUS];

// Label lookup + select options derived from the same source of truth
export const ORDER_STATUS_LABELS: Record<number, string> = {
	0: 'Draft',
	1: 'Submitted',
	2: 'Shipped',
	3: 'Cancelled',
};

export const ORDER_STATUS_OPTIONS = Object.entries(ORDER_STATUS).map(([label, value]) => ({
	label,
	value,
}));
```

**UI filter state also lives here**, named `Search<Entity>` (no `Request` suffix), and is
deliberately separate from the wire type:

```ts
// UI state — shape convenient for the filter controls
export interface SearchProduct {
	searchTerm?: string;
	inStock?: boolean;
	priceRange?: { max: number; min: number };
	sortBy?: ProductSortOrderType;
}
```

The page flattens it into `SearchProductRequest` (`minPrice` / `maxPrice`) at the call
site. Keep the two separate even when they are structurally identical — it keeps a UI
control change from becoming an API change.

---

## `src/services/<Entity>.service.ts`

File name uses the PascalCase entity: `Product.service.ts`, `Order.service.ts`.

### Template

```ts
import type { IApiClient } from '../api/IApiClient';
import { getApiClient } from '../api/AxiosClient';
import type { ApiResponse } from '../types/api.types';
import type { <Entity>, Create<Entity>, Update<Entity>, Search<Entity>Request } from '../types/<entity>.types';

export class <Entity>Service {
	private api: IApiClient;

	constructor(api: IApiClient) {
		this.api = api;
	}

	public async GetAll<Entity>s(): Promise<ApiResponse<<Entity>[]>> {
		return await this.api.get<<Entity>[]>(`/<Entity>`);
	}

	public async Get<Entity>ById(id: string): Promise<ApiResponse<<Entity>>> {
		return await this.api.get<<Entity>>(`/<Entity>/${id}`);
	}

	public async Search<Entity>s(params: Search<Entity>Request): Promise<ApiResponse<<Entity>[]>> {
		return await this.api.get<<Entity>[]>(`/<Entity>/search`, { params });
	}

	public async Create<Entity>(dto: Create<Entity>): Promise<ApiResponse<<Entity>>> {
		return await this.api.post<<Entity>>(`/<Entity>`, dto);
	}

	public async Update<Entity>(id: string, dto: Update<Entity>): Promise<ApiResponse<<Entity>>> {
		return await this.api.put<<Entity>>(`/<Entity>/${id}`, dto);
	}

	public async Delete<Entity>(id: string): Promise<ApiResponse<boolean>> {
		return await this.api.delete<boolean>(`/<Entity>/${id}`);
	}
}

export const <entity>Service = new <Entity>Service(getApiClient());
```

### Worked example — `src/services/Product.service.ts`

```ts
import type { IApiClient } from '../api/IApiClient';
import { getApiClient } from '../api/AxiosClient';
import type { ApiResponse } from '../types/api.types';
import type { Product, SearchProductRequest, CreateProduct, UpdateProduct } from '../types/product.types';

export class ProductService {
	private api: IApiClient;

	constructor(api: IApiClient) {
		this.api = api;
	}

	public async GetAllProducts(): Promise<ApiResponse<Product[]>> {
		return await this.api.get<Product[]>(`/Product`);
	}

	public async GetProductById(id: string): Promise<ApiResponse<Product>> {
		return await this.api.get<Product>(`/Product/${id}`);
	}

	public async GetProductsByCategoryId(categoryId: string): Promise<ApiResponse<Product[]>> {
		return await this.api.get<Product[]>(`/Product/category/${categoryId}`);
	}

	public async SearchProducts(params: SearchProductRequest): Promise<ApiResponse<Product[]>> {
		return await this.api.get<Product[]>(`/Product/search`, { params });
	}

	public async CreateProduct(dto: CreateProduct): Promise<ApiResponse<Product>> {
		return await this.api.post<Product>(`/Product`, dto);
	}

	public async UpdateProduct(id: string, dto: UpdateProduct): Promise<ApiResponse<Product>> {
		return await this.api.put<Product>(`/Product/${id}`, dto);
	}

	public async DeleteProduct(id: string): Promise<ApiResponse<boolean>> {
		return await this.api.delete<boolean>(`/Product/${id}`);
	}
}

export const productService = new ProductService(getApiClient());
```

### Rules

- **Method bodies are one line.** No `try/catch`, no logging, no reshaping the response.
  The client already normalised errors; the component decides what to show.
- Method names are **PascalCase** and verb-first: `GetAll*`, `Get*ById`, `Get*By<Field>`,
  `Search*`, `Create*`, `Update*`, `Delete*`, `Assign*To*`.
- Explicit return type on every method: `Promise<ApiResponse<T>>`. `T` is the entity, an
  entity array, or `boolean` for deletes.
- A single-entity create returns `ApiResponse<Entity>`, never `ApiResponse<Entity[]>`.
- URLs are **backtick template literals even when fully static** — `` `/Product` ``, not
  `'/Product'`. Segment casing follows the backend's routes; use kebab-case for
  multi-word sub-actions (`/Order/assign-items`) and lowercase for simple ones
  (`/search`, `/category/${categoryId}`).
- Query params go through the axios config object — `{ params }` — never a hand-built
  query string.
- There are **no endpoint-constant files**. Paths live inline in the service, and nowhere
  else.
- Always end the file with the camelCase singleton export. Components import that; they
  never call `new <Entity>Service(...)`.

### Exception — calling something that is not the app's API

A service method that talks to a third-party endpoint directly (a signed
direct-to-storage file upload, for example) cannot rely on `AxiosClient.handleError`.
When a method leaves `IApiClient`, it must **hand-build the `ApiResponse` envelope on
every path** so callers still get the uniform shape, and it needs its own `try/catch`:

```ts
public async UploadImage(file: File): Promise<ApiResponse<ImageUploadResponse>> {
	try {
		// 1. Get an upload signature from our own API — normal, safe call
		const signResponse = await this.api.get<UploadSignature>(`/Image/sign`);
		if (!signResponse.success || !signResponse.data) {
			return {
				success: false,
				data: null,
				message: 'Failed to get upload signature',
				error: 'Failed to get upload signature',
				timestamp: new Date().toISOString(),
			};
		}

		const { signature, timestamp, apiKey, folder, uploadUrl } = signResponse.data;

		// 2. POST straight to the third-party host — outside IApiClient, so it can throw
		const formData = new FormData();
		formData.append('file', file);
		formData.append('signature', signature);
		formData.append('timestamp', timestamp.toString());
		formData.append('api_key', apiKey);
		formData.append('folder', folder);

		const uploadResponse = await fetch(uploadUrl, { method: 'POST', body: formData });
		const data = await uploadResponse.json();

		if (data.error) {
			return { success: false, data: null, message: data.error.message, error: data.error.message, timestamp: new Date().toISOString() };
		}

		// 3. Map the provider's payload onto our own response type
		return {
			success: true,
			data: { url: data.secure_url, publicId: data.public_id },
			message: 'Image uploaded successfully',
			error: null,
			timestamp: new Date().toISOString(),
		};
	} catch (error) {
		return {
			success: false,
			data: null,
			message: 'Image upload failed',
			error: error instanceof Error ? error.message : 'Unknown error',
			timestamp: new Date().toISOString(),
		};
	}
}
```

The third-party field names (`secure_url`, `api_key`, …) are whatever that provider
returns — the point is that they are mapped to the app's own type here and never leak past
the service. **This is the only reason a service method may contain `try/catch`.**
