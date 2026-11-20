import { Award, CalendarPlus, Repeat, Star } from 'lucide-react'
import { money } from '@/lib/admin/format'
import type { Category } from '@/lib/server/categories'
import Card from '../ui/Card'

const h = 'mb-3 text-lg font-semibold tracking-[-0.02em] text-navy-deep'
const icons = [Award, CalendarPlus, Star, Repeat]

export default function CategoryInsights({ rows, collections }: { rows: Category[]; collections: { name: string; note: string; count: number }[] }) {
  const top = [...rows].sort((a, b) => b.revenue - a.revenue || b.products - a.products).slice(0, 6)
  const maxP = Math.max(1, ...top.map((c) => c.products))
  return (
    <div className="mt-4 grid grid-cols-1 gap-4 min-[1181px]:grid-cols-5">
      <Card className="p-5 min-[1181px]:col-span-2">
        <h2 className={h}>Smart Collections</h2>
        <p className="-mt-2 mb-3 text-[13px] font-medium text-muted">Filled automatically from live product data.</p>
        <div className="grid grid-cols-2 gap-3">
          {collections.map((c, i) => { const I = icons[i % icons.length]; return (
            <div key={c.name} className="rounded-xl bg-[linear-gradient(135deg,#f6efe0,#e8eff9)] p-4 text-center"><I size={22} className="mx-auto text-gold" /><p className="mt-2 text-sm font-semibold text-navy-deep">{c.name}</p><p className="text-xs font-medium text-muted">{c.count} Product{c.count === 1 ? '' : 's'}</p><p className="mt-1 text-[11px] font-medium text-muted">{c.note}</p></div>
          ) })}
        </div>
      </Card>
      <Card className="p-5 min-[1181px]:col-span-3">
        <h2 className={h}>Category Performance</h2>
        {!top.length ? <p className="text-sm font-medium text-muted">Add categories to see how they perform.</p> : (
          <table className="w-full text-sm"><thead><tr className="text-left text-[11px] font-bold uppercase tracking-[0.1em] text-[#718096]"><th className="pb-2">Category</th><th className="pb-2">Products</th><th className="pb-2" /><th className="pb-2 text-right">Paid sales</th></tr></thead>
            <tbody>{top.map((c) => (
              <tr key={c.id} className="border-t border-line/60 font-medium text-navy-deep"><td className="py-2.5">{c.name}</td><td className="py-2.5">{c.products}</td><td className="w-[38%] py-2.5"><div className="h-2 overflow-hidden rounded-full bg-line"><div className="h-full rounded-full bg-gold" style={{ width: `${(c.products / maxP) * 100}%` }} /></div></td><td className="py-2.5 text-right">{money(c.revenue)}</td></tr>
            ))}</tbody></table>
        )}
      </Card>
    </div>
  )
}
