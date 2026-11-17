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
  const [searching, setSearching] = useState(false)
  const categories = useMemo(() => ['All', ...new Set(items.flatMap((p) => p.categories))], [items])
  const shown = useMemo(() => {
    const q = query.trim().toLowerCase()
    return items.filter((p) => (category === 'All' || p.categories.includes(category)) && (!q || p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)))
  }, [items, category, query])

  return (
    <section>
      <div className="mx-auto mb-7 flex w-fit max-w-full items-center gap-1.5 overflow-x-auto rounded-full border border-line bg-white p-1.5 min-[769px]:mb-9">
        <button type="button" aria-label="Search products" aria-expanded={searching} onClick={() => setSearching((s) => !s)} className="flex size-9 flex-none items-center justify-center rounded-full bg-paper text-blue transition hover:bg-navy-deep hover:text-white">
          <Search size={16} />
        </button>
        {searching && (
          <input autoFocus value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search products" aria-label="Search products" className="h-9 w-[160px] flex-none rounded-full bg-paper px-4 text-[13px] font-medium text-navy-deep outline-none placeholder:text-[#8591a5] focus:ring-2 focus:ring-blue-accent/30" />
        )}
        <div className="flex gap-1" role="tablist" aria-label="Product categories">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              role="tab"
              aria-selected={c === category}
              onClick={() => setCategory(c)}
              className={cn('flex h-9 flex-none items-center gap-1.5 whitespace-nowrap rounded-full px-4 text-[13px] font-semibold transition', c === category ? 'bg-[linear-gradient(135deg,#1b2a4a_0%,#2f4166_60%,#c4943d_100%)] text-white ' : 'text-slate hover:text-navy-deep')}
            >
              {c}
              {c === category && <span className="size-1.5 rounded-full bg-white/80" />}
            </button>
          ))}
        </div>
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
