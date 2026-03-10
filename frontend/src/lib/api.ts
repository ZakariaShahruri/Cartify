/**
 * Cartify API Client
 * ------------------
 * A thin, typed wrapper around fetch() that communicates with
 * the Spring Boot backend at NEXT_PUBLIC_API_URL.
 *
 * All methods throw on non-2xx responses with an ApiError
 * containing the status code and message from the backend.
 */

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080'

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

async function request<T>(
  path: string,
  init: RequestInit = {},
  token?: string,
): Promise<T> {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(init.headers ?? {}),
  }

  const res = await fetch(`${BASE_URL}${path}`, { ...init, headers })

  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new ApiError(res.status, body?.detail ?? res.statusText)
  }

  // 204 No Content
  if (res.status === 204) return undefined as unknown as T

  return res.json() as Promise<T>
}

// ── Product API ──────────────────────────────────────────────────────────────

import type { PagedResponse, Product } from '@/types'

export interface ProductListParams {
  page?: number
  size?: number
  sortBy?: string
  dir?: 'asc' | 'desc'
}

/**
 * Fetch a paginated list of products.
 *
 * @example
 * const data = await api.products.list({ page: 0, size: 12, sortBy: 'price', dir: 'asc' })
 */
export const api = {
  products: {
    list(params: ProductListParams = {}): Promise<PagedResponse<Product>> {
      const qs = new URLSearchParams({
        page:   String(params.page   ?? 0),
        size:   String(params.size   ?? 12),
        sortBy: params.sortBy        ?? 'createdAt',
        dir:    params.dir           ?? 'desc',
      })
      return request<PagedResponse<Product>>(`/api/products?${qs}`)
    },

    get(id: string): Promise<Product> {
      return request<Product>(`/api/products/${id}`)
    },

    featured(page = 0, size = 8): Promise<PagedResponse<Product>> {
      return request<PagedResponse<Product>>(
        `/api/products/featured?page=${page}&size=${size}`,
      )
    },

    byCategory(slug: string, page = 0, size = 12): Promise<PagedResponse<Product>> {
      return request<PagedResponse<Product>>(
        `/api/products/category/${slug}?page=${page}&size=${size}`,
      )
    },

    search(q: string, page = 0, size = 12): Promise<PagedResponse<Product>> {
      return request<PagedResponse<Product>>(
        `/api/products/search?q=${encodeURIComponent(q)}&page=${page}&size=${size}`,
      )
    },
  },

  auth: {
    register(body: { email: string; password: string; fullName: string }) {
      return request('/api/auth/register', { method: 'POST', body: JSON.stringify(body) })
    },

    login(body: { email: string; password: string }) {
      return request('/api/auth/login', { method: 'POST', body: JSON.stringify(body) })
    },
  },

  orders: {
    list(token: string) {
      return request('/api/orders', {}, token)
    },

    place(body: unknown, token: string) {
      return request('/api/orders', { method: 'POST', body: JSON.stringify(body) }, token)
    },
  },
}
