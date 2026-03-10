/**
 * Homepage — /
 *
 * Server Component: fetches the first page of products at build/request time
 * for SSR (SEO-friendly), then hydrates the client for pagination.
 *
 * This is the KEY integration point between Next.js and Spring Boot.
 */

import { api } from '@/lib/api'
import { ProductGrid } from '@/components/product/ProductGrid'
import { ProductListClient } from './ProductListClient'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'

export default async function HomePage() {
  // Server-side fetch — happens at request time (SSR)
  // The data is ready before the page is sent to the browser.
  const initialData = await api.products.list({ page: 0, size: 12 }).catch(() => null)

  return (
    <div className="space-y-12">

      {/* Hero */}
      <section className="rounded-2xl bg-gradient-to-br from-ink-900 to-ink-700 p-8 md:p-12 text-white overflow-hidden relative">
        <div className="relative z-10 max-w-xl">
          <p className="text-brand-400 font-semibold text-sm uppercase tracking-widest mb-2">
            New arrivals
          </p>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Shop Everything<br />You Love
          </h1>
          <p className="text-white/70 mb-6 text-lg">
            Discover thousands of products with fast delivery and great prices.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-400
                       text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Shop Now
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        {/* Decorative blob */}
        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-brand-500/20 blur-3xl" />
        <div className="absolute -right-8 -bottom-8 h-48 w-48 rounded-full bg-brand-400/10 blur-2xl" />
      </section>

      {/* Product listing (client-side pagination after first load) */}
      <section>
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="text-2xl font-bold text-ink-900">All Products</h2>
          {initialData && (
            <span className="text-sm text-ink-600">
              {initialData.totalElements.toLocaleString()} products
            </span>
          )}
        </div>

        {/*
          ProductListClient takes the SSR data as initialData.
          SWR will use it immediately without a loading flash,
          then manage client-side pagination & revalidation from here.
        */}
        <ProductListClient initialData={initialData} />
      </section>
    </div>
  )
}
