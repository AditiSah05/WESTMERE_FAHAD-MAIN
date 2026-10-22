import { IndianRupee, LifeBuoy, ShoppingCart, Users } from 'lucide-react'
import { money } from '@/lib/admin/format'
import type { Dash } from '@/lib/server/dashboard'
import Donut from '../charts/Donut'
import Card from '../ui/Card'
import PageHeader from '../ui/PageHeader'
import StatCard from '../ui/StatCard'
import SalesCard from './SalesCard'
import { PendingTasks, RecentActivity, TopProducts } from './SideLists'

const colors: Record<string, string> = { Paid: '#10b981', Pending: '#c4943d', Failed: '#ef4444', 'Partially Refunded': '#94a3b8', Refunded: '#1b2a4a' }

export default function Dashboard({ d }: { d: Dash }) {
  const { stats: s } = d
  return (
    <>
      <PageHeader title="Dashboard" subtitle="Live figures from the customer shop. Revenue counts verified (paid) orders only." />
      <div className="grid grid-cols-1 gap-5 min-[601px]:grid-cols-2 min-[1181px]:grid-cols-4">
        <StatCard label="Total revenue" value={money(s.revenue)} delta={s.revenueDelta} icon={IndianRupee} accent="gold" />
        <StatCard label="Orders" value={s.orders.toLocaleString('en-IN')} delta={s.ordersDelta} icon={ShoppingCart} accent="blue" />
        <StatCard label="Customers" value={s.customers.toLocaleString('en-IN')} delta={s.customersDelta} icon={Users} accent="navy" />
        <StatCard label="Needs attention" value={String(s.openRequests)} icon={LifeBuoy} accent="green" />
      </div>
      <div className="mt-5 grid grid-cols-1 gap-5 min-[1181px]:grid-cols-3">
        <div className="min-[1181px]:col-span-2"><SalesCard monthLabels={d.monthLabels} monthly={d.monthly} dayLabels={d.dayLabels} daily={d.daily} /></div>
        <Card className="p-5">
          <h2 className="mb-4 text-lg font-medium tracking-[-0.02em] text-navy-deep">Orders by payment status</h2>
          {d.status.length ? <Donut parts={d.status.map((p) => ({ ...p, color: colors[p.label] ?? '#64748b' }))} center={String(s.orders)} /> : <p className="text-sm font-medium text-muted">No orders yet.</p>}
        </Card>
        <TopProducts items={d.top} />
        <PendingTasks tasks={d.tasks} />
        <RecentActivity items={d.activity} />
      </div>
    </>
  )
}
