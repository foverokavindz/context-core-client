# Foundation layer (written once per project)

These four files are the transport layer. **If they already exist in the project, read
them and follow what is there — do not regenerate them.** This reference exists so the
pattern can be stood up in a fresh React + TypeScript + Vite app.

Install: `npm install axios`.

Paths below are the default layout. If the project already uses different names
(`api.configs.ts`, `src/lib/api/`, a path alias instead of relative imports), keep its
names and adjust the imports.

---

## 1. `src/types/api.types.ts`

The envelope every service method returns. `ApiResponse` is a `type` (the rest are
`interface`s); `ClientTypeMap` is the indirection that keeps `IApiClient` from naming
axios directly, so a fetch-based client could be dropped in later.

```ts
import type { AxiosRequestConfig } from 'axios';

export type ApiResponse<T = unknown> = {
	success: boolean;
	data: T | null;
	message: string | null;
	error: string | null;
	timestamp: string;
};

export interface ApiClientConfig {
	baseURL: string;
	timeout?: number;
	headers?: Record<string, string>;
}

export interface ClientTypeMap {
	axios: AxiosRequestConfig;
	// fetch: RequestInit;
}
```

The backend is expected to return this envelope on both success and error responses. If
it returns bare payloads instead, normalise them into this shape inside `AxiosClient` —
never in a service or a component.

---

## 2. `src/api/IApiClient.ts`

```ts
import type { ClientTypeMap, ApiResponse } from '../types/api.types';

export interface IApiClient {
	/**
	 * Perform a GET request
	 * @param url - The endpoint URL
	 * @param config - Optional request configuration
	 */
	get<T>(url: string, config?: ClientTypeMap[keyof ClientTypeMap]): Promise<ApiResponse<T>>;

	/**
	 * Perform a POST request
	 * @param url - The endpoint URL
	 * @param data - The request body data
	 * @param config - Optional request configuration
	 */
	post<T>(url: string, data?: unknown, config?: ClientTypeMap[keyof ClientTypeMap]): Promise<ApiResponse<T>>;

	/**
	 * Perform a PUT request
	 * @param url - The endpoint URL
	 * @param data - The request body data
	 * @param config - Optional request configuration
	 */
	put<T>(url: string, data?: unknown, config?: ClientTypeMap[keyof ClientTypeMap]): Promise<ApiResponse<T>>;

	/**
	 * Perform a DELETE request
	 * @param url - The endpoint URL
	 * @param config - Optional request configuration
	 */
	delete<T>(url: string, config?: ClientTypeMap[keyof ClientTypeMap]): Promise<ApiResponse<T>>;

	/**
	 * Perform a PATCH request
	 * @param url - The endpoint URL
	 * @param data - The request body data
	 * @param config - Optional request configuration
	 */
	patch<T>(url: string, data?: unknown, config?: ClientTypeMap[keyof ClientTypeMap]): Promise<ApiResponse<T>>;
}
```

---

## 3. `src/api/AxiosClient.ts`

Singleton — private constructor, `static create()` returns the **interface**, not the
class. The interceptors are intentional pass-through stubs: they are the hook point for
auth-token injection (request) and global 401 handling (response).

`handleError` is what makes the "services never throw" invariant hold. It has exactly
three branches: the server answered with an error (return its envelope), the request went
out with no answer, and the request was never sent.

```ts
import axios, { AxiosError, type AxiosInstance } from 'axios';
import type { IApiClient } from './IApiClient';
import { apiConfig } from '../configs/api.config';
import type { ApiClientConfig, ApiResponse, ClientTypeMap } from '../types/api.types';

export class AxiosClient implements IApiClient {
	private static instance: AxiosClient | null = null;
	private axiosInstance: AxiosInstance;

	private constructor(config: ApiClientConfig) {
		this.axiosInstance = axios.create({
			baseURL: config.baseURL,
			timeout: config.timeout || 30000,
			headers: {
				'Content-Type': 'application/json',
				...config.headers,
			},
		});

		this.setupInterceptors();
	}

	public static create(config: ApiClientConfig): IApiClient {
		if (this.instance) return this.instance;

		this.instance = new AxiosClient(config);
		return this.instance;
	}

	private setupInterceptors(): void {
		// Request interceptor - Set up request headers
		this.axiosInstance.interceptors.request.use(
			(config) => {
				return config;
			},
			async (error: AxiosError) => {
				return Promise.reject(error);
			}
		);

		// Response interceptor - handle errors globally
		this.axiosInstance.interceptors.response.use(
			(response) => {
				return response;
			},
			async (error: AxiosError) => {
				return Promise.reject(error);
			}
		);
	}

	// Handles API errors
	private async handleError(error: AxiosError): Promise<ApiResponse<null>> {
		if (error.response) {
			// Server responded with error
			const response = error.response.data as ApiResponse<null>;

			return response;
		} else if (error.request) {
			// Request sent but no reply
			return {
				success: false,
				data: null,
				message: 'No response from server',
				error: 'Unable to reach the server. Please check your connection.',
				timestamp: new Date().toISOString(),
			};
		} else {
			// Something else happened, Request never sent
			return {
				success: false,
				data: null,
				message: 'Request failed',
				error: error.message,
				timestamp: new Date().toISOString(),
			};
		}
	}

	public async get<T>(url: string, config?: ClientTypeMap['axios']): Promise<ApiResponse<T>> {
		try {
			const response = await this.axiosInstance.get<ApiResponse<T>>(url, config);
			return response.data;
		} catch (error) {
			return this.handleError(error as AxiosError) as Promise<ApiResponse<T>>;
		}
	}

	public async post<T>(url: string, data?: unknown, config?: ClientTypeMap['axios']): Promise<ApiResponse<T>> {
		try {
			const response = await this.axiosInstance.post<ApiResponse<T>>(url, data, config);
			return response.data;
		} catch (error) {
			return this.handleError(error as AxiosError) as Promise<ApiResponse<T>>;
		}
	}

	public async put<T>(url: string, data?: unknown, config?: ClientTypeMap['axios']): Promise<ApiResponse<T>> {
		try {
			const response = await this.axiosInstance.put<ApiResponse<T>>(url, data, config);
			return response.data;
		} catch (error) {
			return this.handleError(error as AxiosError) as Promise<ApiResponse<T>>;
		}
	}

	public async delete<T>(url: string, config?: ClientTypeMap['axios']): Promise<ApiResponse<T>> {
		try {
			const response = await this.axiosInstance.delete<ApiResponse<T>>(url, config);
			return response.data;
		} catch (error) {
			return this.handleError(error as AxiosError) as Promise<ApiResponse<T>>;
		}
	}

	public async patch<T>(url: string, data?: unknown, config?: ClientTypeMap['axios']): Promise<ApiResponse<T>> {
		try {
			const response = await this.axiosInstance.patch<ApiResponse<T>>(url, data, config);
			return response.data;
		} catch (error) {
			return this.handleError(error as AxiosError) as Promise<ApiResponse<T>>;
		}
	}
}

export const getApiClient = () => AxiosClient.create(apiConfig);
```

---

## 4. `src/configs/api.config.ts`

The **only** place `import.meta.env` is read.

```ts
export const apiConfig = {
	baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
	timeout: 60000,
	headers: {
		// optional static headers, e.g.
		// 'X-App-Version': '1.0.0',
	},
};
```

`.env` and `.env.example` (the fallback above and the values here should be the local dev
API URL for this project):

```
# API base URL (required)
VITE_API_BASE_URL=http://localhost:5000/api
```

`tsconfig.app.json` needs `"types": ["vite/client"]` for `import.meta.env` typing.

---

## Extending the foundation

- **Auth token** → add it in the request interceptor, not in services or components.
- **Global 401 / refresh** → response interceptor.
- **A second transport (fetch, mock)** → add its config type to `ClientTypeMap`, write a
  class implementing `IApiClient`, and change what `getApiClient()` returns. No service or
  component changes.
