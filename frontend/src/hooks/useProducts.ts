/**
 * useProducts — SWR-powered hook for fetching the product catalogue.
 *
 * Features:
 *  - Automatic revalidation on focus / reconnect
 *  - Deduplication of concurrent requests
 *  - Typed response via PagedResponse<Product>
 */

import useSWR from 'swr'
import { api, type ProductListParams } from '@/lib/api'
import type { PagedResponse, Product } from '@/types'

export function useProducts(params: ProductListParams = {}) {
  // Build a stable cache key from the params
  const key = [
    'products',
    params.page   ?? 0,
    params.size   ?? 12,
    params.sortBy ?? 'createdAt',
    params.dir    ?? 'desc',
  ] as const

  const { data, error, isLoading, mutate } = useSWR<PagedResponse<Product>>(
    key,
    () => api.products.list(params),
    {
      keepPreviousData: true,   // smooth pagination — no flash to empty state
      revalidateOnFocus: false, // product data doesn't change that often
    },
  )

  return {
    products: data?.content ?? [],
    pagination: data
      ? {
          page:          data.page,
          totalPages:    data.totalPages,
          totalElements: data.totalElements,
          isLast:        data.last,
        }
      : null,
    isLoading,
    isError: !!error,
    error,
    mutate,
  }
}

export function useProduct(id: string | null) {
  const { data, error, isLoading } = useSWR<Product>(
    id ? ['product', id] : null,
    () => api.products.get(id!),
  )

  return { product: data, isLoading, isError: !!error }
}

export function useFeaturedProducts(size = 8) {
  const { data, error, isLoading } = useSWR<PagedResponse<Product>>(
    ['products', 'featured', size],
    () => api.products.featured(0, size),
    { revalidateOnFocus: false },
  )

  return { products: data?.content ?? [], isLoading, isError: !!error }
}
