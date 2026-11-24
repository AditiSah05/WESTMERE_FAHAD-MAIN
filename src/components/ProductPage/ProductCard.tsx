'use client'

import { ArrowUpRight } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import GenericCover from './GenericCover'
import PayButton from './PayButton'
import ProductCover from './ProductCover'
import type { CatalogueProduct } from './data'

type Props = { product: CatalogueProduct; index: number; onCategory: (c: string) => void }

const chip = 'cursor-pointer rounded-md bg-blue/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-blue transition-colors hover:bg-navy-deep hover:text-white'
const btn = 'flex h-12 w-full items-center justify-center min-[769px]:w-auto min-[769px]:flex-1 gap-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300'

export default function ProductCard({ product: p, index, onCategory }: Props) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-white transition-all duration-300 hover:border-gold/50 hover:shadow-[0_16px_40px_rgba(27,42,74,0.09)] min-[769px]:rounded-3xl"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        {p.id === 'mailora' ? <ProductCover /> : <GenericCover title={p.title} image={p.image} />}
      </div>

      <div className="flex flex-1 flex-col justify-between p-6 min-[769px]:p-10">
        <div>
          <div className="mb-3 flex flex-wrap gap-2">
            {p.categories.map((c) => <button key={c} type="button" onClick={() => onCategory(c)} className={chip}>{c}</button>)}
          </div>
          <div className="mb-3 flex items-center justify-between gap-3 min-[769px]:mb-4">
            <h2 className="text-2xl font-black tracking-tight text-navy-deep min-[769px]:text-3xl">{p.title}</h2>
            <span className="whitespace-nowrap text-[9px] font-bold uppercase tracking-widest text-[#65708a] min-[769px]:text-[10px]">{p.type}</span>
          </div>
          <p className="mb-6 line-clamp-3 min-h-[3.5rem] text-sm font-medium leading-relaxed text-[#65708a] min-[769px]:text-base">{p.description}</p>
        </div>

        <div className="mb-6 flex flex-col gap-3 min-[769px]:flex-row">
          <Link href={`/product/${p.id}`} className={`${btn} border border-navy/20 text-navy-deep hover:bg-navy/5`}>Learn more</Link>
          <PayButton name={p.title} amount={p.price} className={`${btn} bg-navy-deep text-white hover:bg-gold`}>Get {p.title.replace(/ Chrome Extension$/, '')} · ₹{p.price.toLocaleString('en-IN')} <ArrowUpRight size={14} /></PayButton>
        </div>

        <div className="mt-auto flex items-center justify-between border-t border-mist pt-4 min-[769px]:pt-6">
          <div className="flex gap-3 min-[769px]:gap-4">
            {p.tech.map((t) => <span key={t} className="text-[9px] font-bold uppercase tracking-widest text-blue/60 min-[769px]:text-[10px]">{t}</span>)}
          </div>
        </div>
      </div>
    </motion.article>
  )
}
