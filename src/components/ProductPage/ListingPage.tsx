'use client'

import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import ProductCard from './ProductCard'
import type { CatalogueProduct } from './data'

/** A category or collection page: same cards as the Products page, no filters. */
export default function ListingPage({ kicker, title, description, items }: { kicker: string; title: string; description: string; items: CatalogueProduct[] }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-paper pb-[60px] pt-[100px] text-[#4a5568] min-[769px]:pb-[90px] min-[769px]:pt-[124px]">
      <div className="mx-auto w-full max-w-[1200px] px-5 min-[769px]:px-8">
        <Link href="/product" className="mb-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[#718096] hover:text-navy-deep"><ArrowLeft size={15} />All products</Link>
        <motion.div className="mb-9 text-center min-[769px]:mb-12" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-blue">{kicker}</p>
          <h1 className="font-display text-[2.2rem] font-bold leading-[1.1] tracking-[-0.5px] text-navy-deep min-[769px]:text-[3.4rem]">{title}</h1>
          {description && <p className="mx-auto mt-4 max-w-[600px] text-base leading-[1.6] text-[#718096] min-[769px]:text-[1.1rem]">{description}</p>}
        </motion.div>
        {items.length ? (
          <div className={items.length === 1 ? 'mx-auto grid max-w-[760px] grid-cols-1 gap-6' : 'grid grid-cols-1 gap-6 min-[769px]:gap-8 min-[1025px]:grid-cols-2'}>
            {items.map((p, i) => <ProductCard key={p.id} product={p} index={i} onCategory={() => {}} />)}
          </div>
        ) : (
          <p className="mx-auto max-w-lg rounded-2xl border border-line bg-white px-6 py-14 text-center text-base font-semibold text-[#65708a]">Products are coming soon.</p>
        )}
      </div>
    </div>
  )
}
