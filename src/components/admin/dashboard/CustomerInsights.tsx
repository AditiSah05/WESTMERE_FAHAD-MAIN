import { Crown, Repeat, UserPlus } from 'lucide-react'
import { money } from '@/lib/admin/format'
import type { Dash } from '@/lib/server/dashboard'
import Card from '../ui/Card'

const row = 'flex items-center gap-3 border-b border-line/60 py-3 last:border-0'

export default function CustomerInsights({ s }: { s: Dash['stats'] }) {
  return (
    <Card className="p-5">
      <h2 className="mb-1 text-lg font-semibold tracking-[-0.02em] text-navy-deep">Customer Insights</h2>
      <div className={row}><UserPlus size={18} className="text-blue" /><span className="flex-1 text-sm font-medium text-slate">New customers (30 days)</span><b className="text-lg text-navy-deep">{s.newCustomers}</b></div>
      <div className={row}><Repeat size={18} className="text-[#10b981]" /><span className="flex-1 text-sm font-medium text-slate">Returning customers</span><b className="text-lg text-navy-deep">{s.returning}</b></div>
      <div className={row}><Crown size={18} className="text-gold" /><span className="flex-1 text-sm font-medium text-slate">Top spending customer</span>{s.bestCustomer ? <span className="text-right text-sm font-semibold text-navy-deep">{s.bestCustomer.name}<br /><span className="text-muted">{money(s.bestCustomer.spent)}</span></span> : <span className="text-sm font-medium text-muted">No paid orders yet</span>}</div>
    </Card>
  )
}
