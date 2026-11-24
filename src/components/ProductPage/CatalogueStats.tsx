'use client'

import CountUp from './CountUp'
import { statsFor, type CatalogueProduct } from './data'

/** One slim strip instead of four cards: icon, number and label per stat, split by hairlines. */
export default function CatalogueStats({ items }: { items: CatalogueProduct[] }) {
  const stats = statsFor(items)
  return (
    <dl className="mx-auto mb-9 grid max-w-[1000px] grid-cols-2 overflow-hidden rounded-xl border border-line bg-white min-[769px]:mb-12 min-[769px]:grid-cols-[repeat(var(--cols),minmax(0,1fr))]" style={{ '--cols': stats.length } as React.CSSProperties}>
      {stats.map(({ icon: Icon, label, ...count }, i) => (
        <div key={label} className={`flex items-center gap-4 px-5 py-5 min-[769px]:px-6 min-[769px]:py-6 ${i % 2 ? 'border-l border-line' : ''} ${i > 1 ? 'border-t border-line' : ''} min-[769px]:border-t-0 ${i ? 'min-[769px]:border-l min-[769px]:border-line' : 'min-[769px]:border-l-0'}`}>
          <span className="flex size-11 flex-none items-center justify-center rounded-xl bg-blue/10 text-blue"><Icon size={21} strokeWidth={1.9} /></span>
          <div className="min-w-0">
            <dd className="text-2xl font-semibold leading-none tracking-tight text-navy-deep min-[769px]:text-[1.7rem]"><CountUp {...count} /></dd>
            <dt className="mt-1.5 text-xs font-medium text-[#718096] min-[769px]:text-[13px]">{label}</dt>
          </div>
        </div>
      ))}
    </dl>
  )
}
