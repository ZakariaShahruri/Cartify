'use client'

import Link from 'next/link'
import { ShoppingCart, Search, User, Menu, Zap } from 'lucide-react'
import { useCartStore } from '@/hooks/useCart'
import { clsx } from 'clsx'
import { useState } from 'react'

export function Navbar() {
  const totalItems = useCartStore((s) => s.totalItems())
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-ink-900 text-white shadow-lg">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center gap-4">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <Zap className="h-6 w-6 text-brand-400 fill-brand-400" />
            <span className="text-xl font-bold tracking-tight">Cartify</span>
          </Link>

          {/* Search bar */}
          <div className="flex-1 max-w-2xl mx-4 hidden sm:block">
            <div className="flex rounded-lg overflow-hidden ring-2 ring-transparent focus-within:ring-brand-400 transition-all">
              <input
                type="search"
                placeholder="Search products..."
                className="flex-1 bg-white/10 px-4 py-2 text-sm placeholder-white/50 outline-none"
              />
              <button className="bg-brand-500 hover:bg-brand-400 px-4 transition-colors">
                <Search className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Right actions */}
          <nav className="flex items-center gap-1 ml-auto">
            {/* Search icon (mobile) */}
            <button
              className="sm:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
              onClick={() => setSearchOpen(!searchOpen)}
            >
              <Search className="h-5 w-5" />
            </button>

            {/* Account */}
            <Link
              href="/account"
              className="flex items-center gap-1.5 px-3 py-2 hover:bg-white/10 rounded-lg transition-colors text-sm"
            >
              <User className="h-5 w-5" />
              <span className="hidden md:block">Account</span>
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative flex items-center gap-1.5 px-3 py-2 hover:bg-white/10 rounded-lg transition-colors text-sm"
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="hidden md:block">Cart</span>
              {totalItems > 0 && (
                <span
                  className={clsx(
                    'absolute -top-0.5 -right-0.5 flex h-5 w-5 items-center justify-center',
                    'rounded-full bg-brand-500 text-[10px] font-bold',
                  )}
                >
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </Link>
          </nav>
        </div>

        {/* Mobile search */}
        {searchOpen && (
          <div className="pb-3 sm:hidden">
            <div className="flex rounded-lg overflow-hidden ring-1 ring-white/20">
              <input
                type="search"
                placeholder="Search products..."
                className="flex-1 bg-white/10 px-4 py-2 text-sm placeholder-white/50 outline-none"
                autoFocus
              />
              <button className="bg-brand-500 px-4">
                <Search className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Category strip */}
      <div className="bg-ink-800 border-t border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="flex gap-1 overflow-x-auto py-1.5 text-sm scrollbar-none">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/products?category=${cat.slug}`}
                className="shrink-0 rounded px-3 py-1 hover:bg-white/10 transition-colors whitespace-nowrap text-white/80 hover:text-white"
              >
                {cat.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}

const CATEGORIES = [
  { name: 'Electronics', slug: 'electronics' },
  { name: 'Books',       slug: 'books' },
  { name: 'Clothing',    slug: 'clothing' },
  { name: 'Home & Garden', slug: 'home-garden' },
  { name: 'Sports',      slug: 'sports' },
]
