import { money } from '@/lib/admin/format'
import Card from '../ui/Card'
import StatusBadge from '../ui/StatusBadge'
import Thumb from './Thumb'
import type { Product } from './ProductForm'

const h = 'mb-3 text-lg font-semibold tracking-[-0.02em] text-navy-deep'

export default function ProductInsights({ rows }: { rows: Product[] }) {
  const recent = [...rows].sort((a, b) => b.added.localeCompare(a.added)).slice(0, 5)
  const subs = rows.filter((p) => p.pricing === 'Subscription')
  const best = [...rows].filter((p) => p.sold > 0).sort((a, b) => b.revenue - a.revenue).slice(0, 5)
  const gaps = rows.map((p) => ({ p, missing: [!p.description && 'description', !p.image && 'cover image', p.status === 'Hidden' && 'hidden'].filter(Boolean) as string[] })).filter((x) => x.missing.length)
  return (
    <div className="mt-4 grid grid-cols-1 gap-4 min-[1025px]:grid-cols-2">
      <Card className="p-5">
        <h2 className={h}>Best Selling Products</h2>
        {!best.length ? <p className="text-sm font-medium text-muted">Paid orders will show up here.</p> : (
          <ul className="flex flex-col divide-y divide-line/60">
            {best.map((p) => <li key={p.id} className="flex items-center gap-3 py-2.5 text-sm font-medium text-navy-deep"><Thumb p={p} /><span className="flex-1 truncate">{p.name}</span><span className="text-muted">{p.sold} sold</span><b className="w-24 text-right">{money(p.revenue)}</b></li>)}
          </ul>
        )}
      </Card>
      <Card className="p-5">
        <h2 className={h}>Needs Attention</h2>
        {!gaps.length ? <p className="text-sm font-medium text-[#047857]">Every product has a description and a cover image.</p> : (
          <ul className="flex flex-col divide-y divide-line/60">
            {gaps.map(({ p, missing }) => <li key={p.id} className="flex items-center gap-3 py-2.5 text-sm font-medium text-navy-deep"><Thumb p={p} /><span className="flex-1 truncate">{p.name}</span><span className="text-xs text-muted">{missing.join(', ')}</span></li>)}
          </ul>
        )}
      </Card>
      <Card className="p-5">
        <h2 className={h}>Most Recently Added</h2>
        <ul className="flex flex-col divide-y divide-line/60">
          {recent.map((p) => <li key={p.id} className="flex items-center gap-3 py-2.5 text-sm font-medium text-navy-deep"><Thumb p={p} /><span className="flex-1 truncate">{p.name}</span><span className="text-muted">{p.added}</span><StatusBadge value={p.status} /></li>)}
        </ul>
      </Card>
      <Card className="p-5">
        <h2 className={h}>Subscription Products</h2>
        {!subs.length ? <p className="text-sm font-medium text-muted">Products with the Subscription pricing model appear here. Recurring billing is not tracked yet, so this shows price and paid orders only.</p> : (
          <ul className="flex flex-col divide-y divide-line/60">
            {subs.map((p) => <li key={p.id} className="flex items-center gap-3 py-2.5 text-sm font-medium text-navy-deep"><Thumb p={p} /><span className="flex-1 truncate">{p.name}</span><span className="text-muted">{money(p.price)}</span><span className="w-20 text-right text-muted">{p.sold} paid</span></li>)}
          </ul>
        )}
      </Card>
    </div>
  )
}
