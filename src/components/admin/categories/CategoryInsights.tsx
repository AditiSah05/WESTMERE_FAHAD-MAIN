import { money } from '@/lib/admin/format'
import type { Category } from '@/lib/server/categories'
import Card from '../ui/Card'

const h = 'mb-3 text-lg font-semibold tracking-[-0.02em] text-navy-deep'

export default function CategoryInsights({ rows }: { rows: Category[] }) {
  const top = [...rows].sort((a, b) => b.revenue - a.revenue || b.products - a.products).slice(0, 6)
  const maxP = Math.max(1, ...top.map((c) => c.products))
  return (
    <Card className="p-5 min-[1181px]:col-span-3">
      <h2 className={h}>Category Performance</h2>
      {!top.length ? <p className="text-sm font-medium text-muted">Add categories to see how they perform.</p> : (
        <table className="w-full text-sm"><thead><tr className="text-left text-[11px] font-bold uppercase tracking-[0.1em] text-[#718096]"><th className="pb-2">Category</th><th className="pb-2">Products</th><th className="pb-2" /><th className="pb-2 text-right">Paid sales</th></tr></thead>
          <tbody>{top.map((c) => (
            <tr key={c.id} className="border-t border-line/60 font-medium text-navy-deep"><td className="py-2.5">{c.name}</td><td className="py-2.5">{c.products}</td><td className="w-[38%] py-2.5"><div className="h-2 overflow-hidden rounded-full bg-line"><div className="h-full rounded-full bg-gold" style={{ width: `${(c.products / maxP) * 100}%` }} /></div></td><td className="py-2.5 text-right">{money(c.revenue)}</td></tr>
          ))}</tbody></table>
      )}
    </Card>
  )
}
