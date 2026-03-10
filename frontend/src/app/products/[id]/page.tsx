/**
 * Product Detail Page — /products/[id]
 * Server Component: fetch product server-side for SEO metadata
 */

import { api } from '@/lib/api'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Image from 'next/image'
import { AddToCartSection } from './AddToCartSection'
import { StarRating, Badge } from '@/components/ui'
import { ShieldCheck, Truck, RefreshCw } from 'lucide-react'

interface Props {
  params: { id: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await api.products.get(params.id).catch(() => null)
  if (!product) return { title: 'Product Not Found — Cartify' }
  return {
    title: `${product.name} — Cartify`,
    description: product.description ?? undefined,
  }
}

export default async function ProductDetailPage({ params }: Props) {
  const product = await api.products.get(params.id).catch(() => null)
  if (!product) notFound()

  const inStock = product.stockQuantity > 0

  return (
    <div className="max-w-5xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* Image */}
        <div className="relative aspect-square rounded-2xl overflow-hidden bg-ink-100">
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center text-ink-300 text-5xl">📦</div>
          )}
        </div>

        {/* Details */}
        <div className="flex flex-col gap-4">
          {product.categoryName && (
            <span className="text-sm font-semibold text-brand-600 uppercase tracking-wide">
              {product.categoryName}
            </span>
          )}

          <h1 className="text-3xl font-bold text-ink-900">{product.name}</h1>

          <StarRating value={product.ratingAvg} count={product.ratingCount} size={18} />

          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-ink-900">
              ${product.price.toFixed(2)}
            </span>
            {inStock
              ? <Badge variant="success">In Stock ({product.stockQuantity})</Badge>
              : <Badge variant="danger">Out of Stock</Badge>
            }
          </div>

          {product.description && (
            <p className="text-ink-600 leading-relaxed">{product.description}</p>
          )}

          {/* Add to cart (client component) */}
          <AddToCartSection product={product} />

          {/* Trust badges */}
          <div className="border-t border-ink-100 pt-4 grid grid-cols-3 gap-3 mt-2">
            {[
              { icon: Truck,       label: 'Free Shipping', sub: 'Orders over $50' },
              { icon: ShieldCheck, label: 'Secure Payment', sub: '256-bit SSL' },
              { icon: RefreshCw,   label: 'Easy Returns',  sub: '30-day policy' },
            ].map(({ icon: Icon, label, sub }) => (
              <div key={label} className="flex flex-col items-center text-center gap-1 p-3 rounded-xl bg-ink-50">
                <Icon className="h-5 w-5 text-brand-500" />
                <span className="text-xs font-semibold text-ink-800">{label}</span>
                <span className="text-[10px] text-ink-500">{sub}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
