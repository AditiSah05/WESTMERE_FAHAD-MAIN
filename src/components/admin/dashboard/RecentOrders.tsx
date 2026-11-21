import Link from 'next/link'
import { money, shortDate } from '@/lib/admin/format'
import type { Dash } from '@/lib/server/dashboard'
import Card from '../ui/Card'
import StatusBadge from '../ui/StatusBadge'

const th = 'px-3 py-2 text-left text-[12px] font-semibold text-muted'

export default function RecentOrders({ items }: { items: Dash['recent'] }) {
  return (
    <Card className="p-5">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-semibold tracking-[-0.02em] text-navy-deep">Recent Orders</h2>
        <Link href="/admin/orders" className="text-[13px] font-semibold text-gold hover:underline">View All Orders →</Link>
      </div>
      {!items.length ? <p className="text-sm font-medium text-muted">Orders will show up here.</p> : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-sm font-medium text-navy-deep">
            <thead><tr className="border-b border-line"><th className={th}>Order ID</th><th className={th}>Customer</th><th className={th}>Product</th><th className={th}>Amount</th><th className={th}>Payment</th><th className={th}>Fulfilment</th><th className={th}>Date</th></tr></thead>
            <tbody>
              {items.map((o) => (
                <tr key={o.id} className="border-b border-line/60 last:border-0">
                  <td className="px-3 py-2.5 font-mono text-[13px]">#WM-{o.id}</td>
                  <td className="px-3 py-2.5">{o.customer}</td>
                  <td className="px-3 py-2.5">{o.product}</td>
                  <td className="px-3 py-2.5">{money(o.amount)}</td>
                  <td className="px-3 py-2.5"><StatusBadge value={o.payment} /></td>
                  <td className="px-3 py-2.5"><StatusBadge value={o.fulfilment} /></td>
                  <td className="whitespace-nowrap px-3 py-2.5 text-muted">{shortDate(o.at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  )
}
