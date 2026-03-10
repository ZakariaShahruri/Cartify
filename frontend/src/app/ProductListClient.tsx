'use client'

/**
 * ProductListClient
 * -----------------
 * Client component that handles:
 *  - Receiving SSR data from the server page as initialData
 *  - Client-side pagination via SWR (no full page reload)
 *  - Sort controls
 *
 * This pattern (server fetch → pass as initialFallbackData → SWR)
 * gives the best of both worlds: SSR for SEO + SPA-like UX for pagination.
 */

import { useState } from 'react'
import { useProducts } from '@/hooks/useProducts'
import { ProductGrid } from '@/components/product/ProductGrid'
import { Button } from '@/components/ui/Button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { PagedResponse, Product } from '@/types'
import { clsx } from 'clsx'

interface ProductListClientProps {
  initialData: PagedResponse<Product> | null
}

const SORT_OPTIONS = [
  { label: 'Newest',       sortBy: 'createdAt', dir: 'desc' },
  { label: 'Price: Low',   sortBy: 'price',     dir: 'asc'  },
  { label: 'Price: High',  sortBy: 'price',     dir: 'desc' },
  { label: 'Top Rated',    sortBy: 'ratingAvg', dir: 'desc' },
] as const

export function ProductListClient({ initialData }: ProductListClientProps) {
  const [page, setPage] = useState(0)
  const [sortIdx, setSortIdx] = useState(0)
  const sort = SORT_OPTIONS[sortIdx]

  const { products, pagination, isLoading, isError } = useProducts({
    page,
    size: 12,
    sortBy: sort.sortBy,
    dir: sort.dir,
  })

  // Show SSR data on the first render before SWR kicks in
  const displayProducts = products.length > 0 ? products : (initialData?.content ?? [])
  const totalPages = pagination?.totalPages ?? initialData?.totalPages ?? 1

  return (
    <div className="space-y-6">

      {/* Sort controls */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-sm text-ink-600 mr-1">Sort by:</span>
        {SORT_OPTIONS.map((opt, i) => (
          <button
            key={i}
            onClick={() => { setSortIdx(i); setPage(0) }}
            className={clsx(
              'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
              i === sortIdx
                ? 'bg-ink-900 text-white'
                : 'bg-ink-100 text-ink-700 hover:bg-ink-200',
            )}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Error state */}
      {isError && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          Failed to load products. Make sure the backend is running at{' '}
          <code className="font-mono">localhost:8080</code>.
        </div>
      )}

      {/* Product grid */}
      <ProductGrid
        products={displayProducts}
        isLoading={isLoading}
        skeletonCount={12}
      />

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-4">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
          >
            <ChevronLeft className="h-4 w-4" />
            Prev
          </Button>

          <div className="flex items-center gap-1">
            {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
              const pageNum = i
              return (
                <button
                  key={i}
                  onClick={() => setPage(pageNum)}
                  className={clsx(
                    'h-8 w-8 rounded-lg text-sm font-medium transition-colors',
                    pageNum === page
                      ? 'bg-ink-900 text-white'
                      : 'text-ink-600 hover:bg-ink-100',
                  )}
                >
                  {pageNum + 1}
                </button>
              )
            })}
          </div>

          <Button
            variant="secondary"
            size="sm"
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={page >= totalPages - 1}
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )
}
