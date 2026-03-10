'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCart, Heart } from 'lucide-react'
import type { Product } from '@/types'
import { useCartStore } from '@/hooks/useCart'
import { StarRating, Badge } from '@/components/ui'
import { Button } from '@/components/ui/Button'
import { useState } from 'react'
import { clsx } from 'clsx'

interface ProductCardProps {
  product: Product
  className?: string
}

export function ProductCard({ product, className }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem)
  const [added, setAdded] = useState(false)

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault()
    addItem(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  const inStock = product.stockQuantity > 0

  return (
    <Link
      href={`/products/${product.id}`}
      className={clsx(
        'group flex flex-col rounded-xl border border-ink-200 bg-white',
        'hover:shadow-md hover:-translate-y-0.5 transition-all duration-200',
        'overflow-hidden animate-fade-up',
        className,
      )}
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-ink-100">
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center text-ink-300">
            <ShoppingCart className="h-12 w-12" />
          </div>
        )}

        {/* Badges overlay */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.isFeatured && <Badge variant="warning">Featured</Badge>}
          {!inStock && <Badge variant="danger">Out of stock</Badge>}
        </div>

        {/* Wishlist */}
        <button
          onClick={(e) => e.preventDefault()}
          className="absolute top-2 right-2 p-1.5 rounded-full bg-white/80 backdrop-blur-sm
                     text-ink-400 hover:text-red-500 opacity-0 group-hover:opacity-100
                     transition-all duration-150"
        >
          <Heart className="h-4 w-4" />
        </button>
      </div>

      {/* Info */}
      <div className="flex flex-col flex-1 p-4 gap-2">
        {product.categoryName && (
          <span className="text-xs font-medium text-brand-600 uppercase tracking-wide">
            {product.categoryName}
          </span>
        )}

        <h3 className="text-sm font-semibold text-ink-800 line-clamp-2 group-hover:text-brand-600 transition-colors">
          {product.name}
        </h3>

        <StarRating value={product.ratingAvg} count={product.ratingCount} />

        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="text-lg font-bold text-ink-900">
            ${product.price.toFixed(2)}
          </span>

          <Button
            size="sm"
            variant={added ? 'secondary' : 'primary'}
            onClick={handleAddToCart}
            disabled={!inStock}
            className="shrink-0"
          >
            <ShoppingCart className="h-3.5 w-3.5" />
            {added ? 'Added!' : 'Add'}
          </Button>
        </div>
      </div>
    </Link>
  )
}
