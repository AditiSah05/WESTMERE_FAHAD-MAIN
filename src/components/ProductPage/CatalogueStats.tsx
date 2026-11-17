'use client'

import CountUp from './CountUp'
import { statsFor, type CatalogueProduct } from './data'

/** One slim strip instead of four cards: icon, number and label per stat, split by hairlines. */
export default function CatalogueStats({ items }: { items: CatalogueProduct[] }) {
  const stats = statsFor(items)
  return (
    <dl className="mx-auto mb-8 grid max-w-[860px] grid-cols-2 overflow-hidden rounded-xl border border-line bg-white min-[769px]:mb-10 min-[769px]:grid-cols-[repeat(var(--cols),minmax(0,1fr))]" style={{ '--cols': stats.length } as React.CSSProperties}>
      {stats.map(({ icon: Icon, label, ...count }, i) => (
        <div key={label} className={`flex items-center gap-3 px-4 py-3.5 ${i % 2 ? 'border-l border-line' : ''} ${i > 1 ? 'border-t border-line' : ''} min-[769px]:border-t-0 ${i ? 'min-[769px]:border-l min-[769px]:border-line' : 'min-[769px]:border-l-0'}`}>
          <span className="flex size-9 flex-none items-center justify-center rounded-lg bg-blue/10 text-blue"><Icon size={17} strokeWidth={1.9} /></span>
          <div className="min-w-0">
            <dd className="text-lg font-semibold leading-none tracking-tight text-navy-deep"><CountUp {...count} /></dd>
            <dt className="mt-1 text-[11px] font-medium text-[#718096]">{label}</dt>
          </div>
        </div>
      ))}
    </dl>
  )
}
