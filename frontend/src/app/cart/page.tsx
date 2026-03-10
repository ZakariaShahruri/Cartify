'use client'

import { useCartStore } from '@/hooks/useCart'
import { Button } from '@/components/ui/Button'
import Image from 'next/image'
import Link from 'next/link'
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react'

export default function CartPage() {
  const { items, updateQuantity, removeItem, totalPrice, totalItems } = useCartStore()

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
        <ShoppingBag className="h-16 w-16 text-ink-300" />
        <h2 className="text-2xl font-bold text-ink-800">Your cart is empty</h2>
        <p className="text-ink-500">Add some products to get started.</p>
        <Link href="/">
          <Button>Browse Products</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-ink-900 mb-8">
        Shopping Cart <span className="text-ink-400 font-normal text-xl">({totalItems()} items)</span>
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          {items.map(({ product, quantity }) => (
            <div
              key={product.id}
              className="flex gap-4 rounded-xl border border-ink-200 bg-white p-4"
            >
              {/* Thumbnail */}
              <Link href={`/products/${product.id}`} className="shrink-0">
                <div className="relative h-20 w-20 rounded-lg overflow-hidden bg-ink-100">
                  {product.imageUrl && (
                    <Image src={product.imageUrl} alt={product.name} fill className="object-cover" />
                  )}
                </div>
              </Link>

              {/* Details */}
              <div className="flex flex-col flex-1 gap-1 min-w-0">
                <Link href={`/products/${product.id}`}>
                  <p className="font-semibold text-ink-800 hover:text-brand-600 transition-colors line-clamp-2">
                    {product.name}
                  </p>
                </Link>
                <p className="text-sm text-ink-500">{product.categoryName}</p>
                <p className="font-bold text-ink-900">${product.price.toFixed(2)}</p>
              </div>

              {/* Controls */}
              <div className="flex flex-col items-end gap-2 shrink-0">
                <button
                  onClick={() => removeItem(product.id)}
                  className="text-ink-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>

                <div className="flex items-center rounded-lg border border-ink-200 overflow-hidden">
                  <button
                    onClick={() => updateQuantity(product.id, quantity - 1)}
                    className="px-2 py-1.5 hover:bg-ink-100 transition-colors"
                  >
                    <Minus className="h-3 w-3" />
                  </button>
                  <span className="w-8 text-center text-sm font-semibold">{quantity}</span>
                  <button
                    onClick={() => updateQuantity(product.id, quantity + 1)}
                    className="px-2 py-1.5 hover:bg-ink-100 transition-colors"
                  >
                    <Plus className="h-3 w-3" />
                  </button>
                </div>

                <p className="text-sm font-semibold text-ink-700">
                  ${(product.price * quantity).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 rounded-xl border border-ink-200 bg-white p-6 flex flex-col gap-4">
            <h2 className="font-bold text-lg text-ink-900">Order Summary</h2>

            <div className="flex flex-col gap-2 text-sm">
              <div className="flex justify-between text-ink-600">
                <span>Subtotal ({totalItems()} items)</span>
                <span>${totalPrice().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-ink-600">
                <span>Shipping</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="border-t border-ink-200 pt-2 flex justify-between font-bold text-ink-900 text-base">
                <span>Total</span>
                <span>${totalPrice().toFixed(2)}</span>
              </div>
            </div>

            <Link href="/checkout">
              <Button fullWidth size="lg">
                Proceed to Checkout
              </Button>
            </Link>

            <Link href="/" className="text-center text-sm text-brand-600 hover:underline">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
