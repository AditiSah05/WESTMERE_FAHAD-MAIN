import { Filter, IndianRupee, KeyRound, Layers, Package, ShoppingCart, Tag, Users } from 'lucide-react'
import { money } from '@/lib/admin/format'
import type { Kpis } from '@/lib/server/dashboard-kpis'
import type { Dash } from '@/lib/server/dashboard'
import Donut from '../charts/Donut'
import Card from '../ui/Card'
import PageHeader from '../ui/PageHeader'
import RangeSelect from './RangeSelect'
import StatCard from '../ui/StatCard'
import CustomerInsights from './CustomerInsights'
import RecentOrders from './RecentOrders'
import SalesCard from './SalesCard'
import { PendingTasks, RecentActivity, TopProducts } from './SideLists'

const colors: Record<string, string> = { Paid: '#10b981', Pending: '#c4943d', Failed: '#ef4444', 'Partially Refunded': '#94a3b8', Refunded: '#1b2a4a' }

const nf = (n: number) => n.toLocaleString('en-IN')
const none = (k: { prev: number | null }) => (k.prev === null ? 'All time' : 'Nothing to compare with last period')

export default function Dashboard({ d, k }: { d: Dash; k: Kpis }) {
  const { stats: s } = d
  const vs = (prev: number | null, fmt: (n: number) => string = nf) => (prev === null ? undefined : `vs ${fmt(prev)} last period`)
  return (
    <>
      <PageHeader title="Dashboard" subtitle="Welcome back! Here's your digital business performance." actions={<RangeSelect value={k.range} />} />
      <div className="grid grid-cols-1 gap-4 min-[601px]:grid-cols-2 min-[1181px]:grid-cols-4">
        <StatCard label="Total Revenue" value={money(k.revenue.value)} delta={k.revenue.delta} vs={vs(k.revenue.prev, money)} note={none(k.revenue)} icon={IndianRupee} accent="gold" spark={k.revenue.spark} />
        <StatCard label="Total Orders" value={nf(k.orders.value)} delta={k.orders.delta} vs={vs(k.orders.prev)} note={none(k.orders)} icon={ShoppingCart} accent="blue" spark={k.orders.spark} />
        <StatCard label="Total Customers" value={nf(k.customers.value)} delta={k.customers.delta} vs={vs(k.customers.prev)} note={none(k.customers)} icon={Users} accent="navy" spark={k.customers.spark} />
        <StatCard label="Active Subscriptions" value={nf(k.subscriptions.value)} delta={k.subscriptions.delta} vs={vs(k.subscriptions.prev)} note={none(k.subscriptions)} sub="Subscription licenses in force" icon={Layers} accent="gold" spark={k.subscriptions.spark} />
        <StatCard label="Digital Products" value={nf(k.products.value)} delta={k.products.delta} vs={vs(k.products.prev)} note={none(k.products)} sub={k.products.categories.join(', ') || 'No products yet'} icon={Package} accent="blue" spark={k.products.spark} />
        <StatCard label="License Activations" value={nf(k.activations.value)} delta={k.activations.delta} vs={vs(k.activations.prev)} note={none(k.activations)} sub="Product licenses activated" icon={KeyRound} accent="gold" spark={k.activations.spark} />
        <StatCard label="Avg. Order Value" value={money(k.aov.value)} delta={k.aov.delta} vs={vs(k.aov.prev, money)} note={none(k.aov)} icon={Tag} accent="green" spark={k.aov.spark} />
        <StatCard label="Conversion Rate" value={`${k.conversion.value}%`} delta={k.conversion.deltaPp} unit=" pp" vs={k.conversion.prev === null ? undefined : `vs ${k.conversion.prev}% last period`} note={none(k.conversion)} sub="Sign-ups who became paying customers" icon={Filter} accent="navy" spark={k.conversion.spark} />
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
