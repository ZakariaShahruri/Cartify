import type { Product } from '@/types'
import { ProductCard } from './ProductCard'
import { Skeleton } from '@/components/ui'
import { clsx } from 'clsx'

interface ProductGridProps {
  products: Product[]
  isLoading?: boolean
  skeletonCount?: number
  className?: string
}

export function ProductGrid({
  products,
  isLoading,
  skeletonCount = 12,
  className,
}: ProductGridProps) {
  return (
    <div
      className={clsx(
        'grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4',
        className,
      )}
    >
      {isLoading
        ? Array.from({ length: skeletonCount }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))
        : products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
    </div>
  )
}

function ProductCardSkeleton() {
  return (
    <div className="rounded-xl border border-ink-200 overflow-hidden bg-white">
      <Skeleton className="aspect-square w-full" />
      <div className="p-4 flex flex-col gap-2">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-24 mt-1" />
        <div className="flex items-center justify-between mt-2">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-8 w-16 rounded-lg" />
        </div>
      </div>
    </div>
  )
}
