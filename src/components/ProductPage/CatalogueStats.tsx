'use client'

import { motion } from 'framer-motion'
import CountUp from './CountUp'
import { statsFor, type CatalogueProduct } from './data'

/** Glass stat cards: lift on hover, icon tile fills in, soft glow in the corner. */
export default function CatalogueStats({ items }: { items: CatalogueProduct[] }) {
  const stats = statsFor(items)
  return (
    <div style={{ '--cols': stats.length } as React.CSSProperties} className="mb-10 grid grid-cols-2 gap-3 min-[769px]:gap-5 min-[769px]:[grid-template-columns:repeat(var(--cols),minmax(0,1fr))] min-[769px]:mb-20">
      {stats.map(({ icon: Icon, label, ...count }, i) => (
        <motion.div
          key={label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
          className="group relative flex h-full cursor-default flex-col items-start justify-between gap-3 overflow-hidden rounded-2xl border border-line bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/50 min-[769px]:min-h-[200px] min-[769px]:p-7"
        >
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
