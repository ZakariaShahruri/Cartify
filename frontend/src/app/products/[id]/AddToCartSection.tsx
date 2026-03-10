'use client'

import { useState } from 'react'
import { Minus, Plus, ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useCartStore } from '@/hooks/useCart'
import type { Product } from '@/types'

export function AddToCartSection({ product }: { product: Product }) {
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)
  const addItem = useCartStore((s) => s.addItem)

  function handleAdd() {
    addItem(product, qty)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="flex items-center gap-3 flex-wrap">
      {/* Quantity selector */}
      <div className="flex items-center rounded-lg border border-ink-200 overflow-hidden">
        <button
          onClick={() => setQty((q) => Math.max(1, q - 1))}
          className="px-3 py-2.5 hover:bg-ink-100 transition-colors"
        >
          <Minus className="h-4 w-4 text-ink-600" />
        </button>
        <span className="w-10 text-center text-sm font-semibold">{qty}</span>
        <button
          onClick={() => setQty((q) => Math.min(product.stockQuantity, q + 1))}
          className="px-3 py-2.5 hover:bg-ink-100 transition-colors"
        >
          <Plus className="h-4 w-4 text-ink-600" />
        </button>
      </div>

      <Button
        size="lg"
        onClick={handleAdd}
        disabled={product.stockQuantity === 0}
        className="flex-1"
      >
        <ShoppingCart className="h-5 w-5" />
        {added ? '✓ Added to cart!' : 'Add to Cart'}
      </Button>
    </div>
  )
}
