---
name: api-integration
description: Add, change, or consume a REST API endpoint in this React and TypeScript project using the IApiClient, AxiosClient, service, type, and component layers. Use when creating service methods, request or response types, or wiring an endpoint into a component. Preserves the ApiResponse envelope and the never-throw invariant.
---

# API Integration Pattern

A layered pattern for defining and consuming REST endpoints in a React + TypeScript app.
Follow it exactly — the value of the pattern is that every endpoint looks the same.

Throughout, `<Entity>` is the resource you are working on (`Product`, `Order`, `User`, …).
Substitute it everywhere; the examples use `Product`.

## Architecture

```
component  →  <entity>Service (singleton)  →  IApiClient  →  AxiosClient (singleton)  →  axios
                        ↑
              types from src/types/<entity>.types.ts
```

| Layer | Location | Written |
|---|---|---|
| Envelope + client types | `src/types/api.types.ts` | once per project |
| Transport contract | `src/api/IApiClient.ts` | once per project |
| Transport impl | `src/api/AxiosClient.ts` | once per project |
| Base URL / timeout / headers | `src/configs/api.config.ts` + `.env` | once per project |
| Endpoint methods | `src/services/<Entity>.service.ts` | per entity |
| Request/response types | `src/types/<entity>.types.ts` | per entity |
| Consumption | `src/pages/*.tsx`, `src/components/*.tsx` | per screen |

**Adopt the host project's actual paths.** If `src/api/`, the api config, or
`src/types/api.types.ts` already exist, **read them and follow what is there** — including
their file naming (`api.config.ts` vs `api.configs.ts`) — rather than regenerating them
from `references/foundation.md`.

### Two invariants — never break these

1. **Services never throw.** `AxiosClient.handleError` converts every failure (HTTP error,
   network failure, request never sent) into an `ApiResponse` with `success: false`.
   Components therefore **never wrap a service call in `try/catch`** — they branch on
   `response.success`.
2. **Components import the singleton instance**, never the class:
   `import { productService } from '../services/Product.service';`

## Checklist — adding a new endpoint

1. **Foundation exists?** If there is no `IApiClient` / `AxiosClient` yet, stand it up
   first from `references/foundation.md`.
2. **Types first** → `src/types/<entity>.types.ts` (create the file if absent). Add the
   entity interface, then `Create<Entity>` / `Update<Entity>` / `Search<Entity>Request`
   as the endpoint needs.
3. **Shared values** → enum-ish constants and UI filter-state types go in
   `src/types/common.types.ts`, not the entity file.
4. **Service method** → `src/services/<Entity>.service.ts`. If the file is new, create the
   class *and* the singleton export at the bottom.
5. **Consume it** in the page/component using the read or write idiom from
   `references/component-usage.md`.
6. **Verify** → run the project's typecheck/build script (commonly `npm run build`,
   `tsc -b && vite build`), then its formatter if one is configured.

## Naming conventions

These are load-bearing. Match them.

| Thing | Convention | Example |
|---|---|---|
| Service file | `<Entity>.service.ts` (PascalCase entity) | `Product.service.ts` |
| Types file | `<entity>.types.ts` (lowercase, camelCase if multiword) | `product.types.ts`, `imageUpload.types.ts` |
| Config file | `<name>.config.ts` | `api.config.ts` |
| Service class | `<Entity>Service` | `ProductService` |
| Service singleton | `<entity>Service` (camelCase) | `productService` |
| **Service methods** | **PascalCase**, verb-first | `GetAllProducts`, `GetProductById`, `CreateProduct`, `UpdateProduct`, `DeleteProduct`, `SearchProducts` |
| Entity type | bare noun — no `Dto`/`Model`/`Response` suffix | `Product`, `OrderLine` |
| Nested projection | `<Entity>Summary` | `ProductSummary` |
| Request DTOs | `Create<E>`, `Update<E>`, `Search<E>Request` | `CreateProduct`, `SearchProductRequest` |
| Enum-ish values | `SCREAMING_SNAKE` object `as const` + derived `<Name>Type` union | `ORDER_STATUS` → `OrderStatusType` |
| URL paths | backtick template literal **always**, kebab-case multi-word sub-actions | `` `/Product` ``, `` `/Product/${id}` ``, `` `/Order/assign-items` ``, `` `/Product/category/${categoryId}` `` |

**PascalCase service methods are deliberate.** They are the one place this pattern departs
from usual TypeScript convention, and consistency is the point. Do not "correct" them to
camelCase, and do not mix the two within a project.

**URL casing follows the backend's routes** — the examples use PascalCase controller
segments (an ASP.NET convention); if the API exposes `/products` or `/api/v1/products`,
use that instead. What is fixed is the backtick literal and the kebab-case sub-actions.

## Type rules

- `Create<E>` — fields required, or explicitly `| null` where the form starts empty.
- `Update<E>` — **every field optional**; the API does partial updates.
- Delete endpoints return `ApiResponse<boolean>`.
- `Search<E>Request` (in `<entity>.types.ts`) is the **wire shape**. `Search<E>`
  (in `common.types.ts`) is the **UI filter state**. Keep them separate even when they
  look identical — the page flattens UI → wire at the call site, e.g. a
  `priceRange: { min, max }` control becomes `minPrice` / `maxPrice` query params.
- Use `import type { ... }` for all type-only imports. This is mandatory if the project
  sets `verbatimModuleSyntax: true`, and good practice regardless.
- If `noUnusedParameters` is on, name unused params `_`.

## Adapting to the host project

The pattern is the layering, the envelope, and the naming. Everything below it is the host
project's call — check what already exists before writing:

| Concern | How to decide |
|---|---|
| Formatting (tabs/spaces, quotes, print width) | Follow the project's Prettier / EditorConfig / lint config. The code in this skill is illustrative, not a style mandate. |
| Imports | Use path aliases if `tsconfig`/`vite.config` define them; otherwise relative imports. |
| UI library | `references/component-usage.md` shows MUI. Keep the control flow, swap the presentation calls. |
| Toasts | Examples use `react-hot-toast`. Any toast library with a "replace by id" API works the same way; if there is none, use inline state for writes too. |
| Server state | The pattern assumes plain `useState` + `useEffect` with no cache layer. If the project already uses react-query/SWR, keep the service layer and let the query library own fetching/caching instead of copying the `useEffect` idioms. |
| Pagination | Not part of the base pattern. Add `page`/`pageSize` to `Search<E>Request` only if the API actually supports it — do not invent paging the backend does not have. |

## Where to look next

| Task | Read |
|---|---|
| Standing the API layer up in a project that has no `src/api/` yet | `references/foundation.md` |
| Adding a service method or its request/response types | `references/service-and-types.md` |
| Fetching, mutating, searching, or filtering from a component | `references/component-usage.md` |
