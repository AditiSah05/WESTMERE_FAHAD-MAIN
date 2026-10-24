'use client'

import { motion } from 'framer-motion'
import CountUp from './CountUp'
import { statsFor, type CatalogueProduct } from './data'

/** Glass stat cards: lift on hover, icon tile fills in, soft glow in the corner. */
export default function CatalogueStats({ items }: { items: CatalogueProduct[] }) {
  return (
    <div className="mb-10 grid grid-cols-2 gap-3 min-[769px]:grid-cols-4 min-[769px]:gap-6 min-[769px]:mb-20">
      {statsFor(items).map(({ icon: Icon, label, ...count }, i) => (
        <motion.div
          key={label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
          className="group relative flex h-full cursor-default flex-col items-start justify-between gap-3 overflow-hidden rounded-[1.5rem] border border-white/60 bg-white/70 p-5 shadow-md shadow-navy/5 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(27,42,74,0.12)] min-[769px]:min-h-[220px] min-[769px]:rounded-[2rem] min-[769px]:p-8"
        >
          <span aria-hidden className="absolute -right-12 -top-12 size-24 rounded-full bg-gold/10 blur-2xl transition-colors duration-500 group-hover:bg-gold/20" />
          <span className="flex shrink-0 items-center justify-center rounded-2xl bg-blue/10 p-3 text-blue transition-all duration-500 group-hover:scale-110 group-hover:bg-navy-deep group-hover:text-white">
            <Icon className="size-6 min-[769px]:size-7" />
          </span>
          <div>
            <p className="mb-2 text-4xl font-extrabold leading-none tracking-tight text-navy-deep min-[769px]:mb-3 min-[769px]:text-5xl"><CountUp {...count} /></p>
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#65708a] opacity-80 min-[769px]:text-xs min-[769px]:tracking-[0.18em]">{label}</p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
