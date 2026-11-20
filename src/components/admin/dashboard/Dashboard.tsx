import { CheckCircle2, Clock, IndianRupee, LifeBuoy, Package, ShoppingCart, Tag, Users } from 'lucide-react'
import { money } from '@/lib/admin/format'
import type { Dash } from '@/lib/server/dashboard'
import Donut from '../charts/Donut'
import Card from '../ui/Card'
import PageHeader from '../ui/PageHeader'
import StatCard from '../ui/StatCard'
import CustomerInsights from './CustomerInsights'
import RecentOrders from './RecentOrders'
import SalesCard from './SalesCard'
import { PendingTasks, RecentActivity, TopProducts } from './SideLists'

const colors: Record<string, string> = { Paid: '#10b981', Pending: '#c4943d', Failed: '#ef4444', 'Partially Refunded': '#94a3b8', Refunded: '#1b2a4a' }

export default function Dashboard({ d }: { d: Dash }) {
  const { stats: s } = d
  return (
    <>
      <PageHeader title="Dashboard" subtitle="Live figures from the customer shop. Revenue counts verified (paid) orders only." />
      <div className="grid grid-cols-1 gap-4 min-[601px]:grid-cols-2 min-[1181px]:grid-cols-4">
        <StatCard label="Total Revenue" value={money(s.revenue)} delta={s.revenueDelta} icon={IndianRupee} accent="gold" spark={d.daily} />
        <StatCard label="Total Orders" value={s.orders.toLocaleString('en-IN')} delta={s.ordersDelta} icon={ShoppingCart} accent="blue" spark={d.dailyOrders} />
        <StatCard label="Total Customers" value={s.customers.toLocaleString('en-IN')} delta={s.customersDelta} icon={Users} accent="navy" spark={d.dailyCustomers} />
        <StatCard label="Avg. Order Value" value={money(s.avgOrder)} icon={Tag} accent="green" note="Paid orders only" />
        <StatCard label="Products Listed" value={String(s.products)} icon={Package} accent="blue" note="Live in the shop" />
        <StatCard label="Paid Orders" value={String(s.paid)} icon={CheckCircle2} accent="green" note="Payment verified" />
        <StatCard label="Awaiting Payment" value={String(s.pending)} icon={Clock} accent="gold" note="Pending orders" />
        <StatCard label="Open Tickets" value={String(s.tickets)} icon={LifeBuoy} accent="navy" note="Support requests" />
      </div>
      <div className="mt-4 grid grid-cols-1 gap-4 min-[1181px]:grid-cols-3">
        <div className="min-[1181px]:col-span-2"><SalesCard monthLabels={d.monthLabels} monthly={d.monthly} monthlyOrders={d.monthlyOrders} dayLabels={d.dayLabels} daily={d.daily} dailyOrders={d.dailyOrders} /></div>
        <Card className="p-5">
          <h2 className="mb-4 text-lg font-semibold tracking-[-0.02em] text-navy-deep">Orders by Payment Status</h2>
          {d.status.length ? <Donut parts={d.status.map((p) => ({ ...p, color: colors[p.label] ?? '#64748b' }))} center={String(s.orders)} /> : <p className="text-sm font-medium text-muted">No orders yet.</p>}
        </Card>
      </div>
      <div className="mt-4 grid grid-cols-1 gap-4 min-[1181px]:grid-cols-3">
        <div className="min-[1181px]:col-span-2"><RecentOrders items={d.recent} /></div>
        <PendingTasks tasks={d.tasks} />
      </div>
      <div className="mt-4 grid grid-cols-1 gap-4 min-[1181px]:grid-cols-3">
        <TopProducts items={d.top} />
        <CustomerInsights s={s} />
        <RecentActivity items={d.activity} />
      </div>
    </>
  )
}
