'use client'

import { ArrowUpRight } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import ProductCover from './ProductCover'
import type { CatalogueProduct } from './data'

type Props = { product: CatalogueProduct; index: number; onCategory: (c: string) => void }

const chip = 'cursor-pointer rounded-lg border border-white/20 bg-white/90 px-2.5 py-1.5 text-[9px] font-black uppercase tracking-widest text-blue shadow-sm backdrop-blur-md transition-colors hover:bg-navy-deep hover:text-white min-[769px]:text-[10px]'
const btn = 'flex h-12 w-full items-center justify-center min-[769px]:w-auto min-[769px]:flex-1 gap-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300'

export default function ProductCard({ product: p, index, onCategory }: Props) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/60 bg-white/40 shadow-[0_8px_32px_rgba(27,42,74,0.05)] backdrop-blur-md transition-all duration-500 hover:border-white/80 hover:bg-white/65 hover:shadow-[0_20px_50px_rgba(27,42,74,0.12)] min-[769px]:rounded-3xl"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <ProductCover />
        <div className="absolute inset-0 flex items-end bg-gradient-to-t from-navy-deep/80 via-transparent to-transparent p-6 opacity-0 transition-opacity duration-500 group-hover:opacity-100 min-[769px]:p-8">
          <Link href={`/product/${p.id}`} className="flex h-12 items-center gap-2 rounded-full bg-white px-6 text-sm font-bold text-navy-deep shadow-2xl transition hover:bg-white/90 min-[769px]:h-14 min-[769px]:px-8">
            See how it works <ArrowUpRight size={16} />
          </Link>
        </div>
        <div className="absolute left-4 top-14 z-10 flex flex-wrap gap-2 min-[769px]:left-6 min-[769px]:top-16">
          {p.categories.map((c) => <button key={c} type="button" onClick={() => onCategory(c)} className={chip}>{c}</button>)}
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-between p-6 min-[769px]:p-10">
        <div>
          <div className="mb-3 flex items-center justify-between gap-3 min-[769px]:mb-4">
            <h2 className="text-2xl font-black tracking-tight text-navy-deep min-[769px]:text-3xl">{p.title}</h2>
            <span className="whitespace-nowrap text-[9px] font-bold uppercase tracking-widest text-[#65708a] min-[769px]:text-[10px]">{p.type}</span>
          </div>
          <p className="mb-6 line-clamp-2 text-sm font-medium leading-relaxed text-[#65708a] min-[769px]:text-base">{p.description}</p>
        </div>

        <div className="mb-6 flex flex-col gap-3 min-[769px]:flex-row">
          <Link href={`/product/${p.id}`} className={`${btn} border border-navy/20 text-navy-deep hover:bg-navy/5`}>Learn more</Link>
          <Link href="/contact" className={`${btn} bg-navy-deep text-white hover:bg-gold`}>Get Mailora · ₹{p.price.toLocaleString('en-IN')} <ArrowUpRight size={14} /></Link>
        </div>

        <div className="mt-auto flex items-center justify-between border-t border-mist pt-4 min-[769px]:pt-6">
          <div className="flex gap-3 min-[769px]:gap-4">
            {p.tech.map((t) => <span key={t} className="text-[9px] font-bold uppercase tracking-widest text-blue/60 min-[769px]:text-[10px]">{t}</span>)}
          </div>
          <span className="text-[9px] font-black uppercase tracking-widest text-blue min-[769px]:text-[10px]">{p.audience}</span>
        </div>
      </div>
    </motion.article>
  )
}
