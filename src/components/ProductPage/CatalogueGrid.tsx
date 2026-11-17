'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { cn } from '@/lib/cn'
import ProductCard from './ProductCard'
import type { CatalogueProduct } from './data'

export default function CatalogueGrid({ items }: { items: CatalogueProduct[] }) {
  const [category, setCategory] = useState('All')
  const [query, setQuery] = useState('')
  const categories = useMemo(() => ['All', ...new Set(items.flatMap((p) => p.categories))], [items])
  const shown = useMemo(() => {
    const q = query.trim().toLowerCase()
    return items.filter((p) => (category === 'All' || p.categories.includes(category)) && (!q || p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)))
  }, [items, category, query])

  return (
    <section>
      <div className="mb-7 flex flex-col gap-3 border-b border-line min-[769px]:mb-9 min-[769px]:flex-row min-[769px]:items-center min-[769px]:justify-between">
        <div className="-mb-px flex gap-6 overflow-x-auto" role="tablist" aria-label="Product categories">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              role="tab"
              aria-selected={c === category}
              onClick={() => setCategory(c)}
              className={cn('flex-none whitespace-nowrap border-b-2 pb-3 pt-1 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue/40', c === category ? 'border-navy-deep text-navy-deep' : 'border-transparent text-[#718096] hover:text-navy-deep')}
            >
              {c}
            </button>
          ))}
        </div>
        <label className="relative mb-3 block min-[769px]:w-[240px]">
          <span className="sr-only">Search products</span>
          <Search size={15} aria-hidden className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#8591a5]" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search products" className="h-9 w-full rounded-lg border border-line bg-white pl-9 pr-3 text-[13px] font-medium text-navy-deep outline-none transition placeholder:text-[#8591a5] focus:border-blue-accent focus:ring-2 focus:ring-blue-accent/15" />
        </label>
      </div>

      <AnimatePresence mode="popLayout">
        {shown.length ? (
          <motion.div layout className={cn('grid grid-cols-1 gap-6 min-[769px]:gap-8', shown.length > 1 && 'min-[1025px]:grid-cols-2', shown.length === 1 && 'mx-auto max-w-[760px]')}>
            {shown.map((p, i) => <ProductCard key={p.id} product={p} index={i} onCategory={setCategory} />)}
          </motion.div>
        ) : (
          <motion.p key="none" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mx-auto max-w-lg rounded-2xl border border-line bg-white px-6 py-16 text-center text-base font-semibold text-[#65708a]">
            No products match that search.
          </motion.p>
        )}
      </AnimatePresence>
    </section>
  )
}
