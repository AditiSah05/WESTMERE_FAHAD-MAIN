'use client'

import { Download, IndianRupee, Percent, Repeat, ShoppingBag } from 'lucide-react'
import { downloadCsv } from '@/lib/admin/csv'
import { c } from '@/lib/admin/data/helpers'
import { money } from '@/lib/admin/format'
import type { Report } from '@/lib/server/analytics'
import BarChart from '../charts/BarChart'
import Donut from '../charts/Donut'
import LineChart from '../charts/LineChart'
import Card from '../ui/Card'
import PageHeader, { btn } from '../ui/PageHeader'
import StatCard from '../ui/StatCard'

const h = 'mb-4 text-lg font-medium tracking-[-0.02em] text-navy-deep'
const palette = ['#2563eb', '#1b2a4a', '#c4943d', '#94a3b8', '#10b981']
const none = <p className="text-sm font-medium text-muted">Not enough data yet.</p>

export default function Analytics({ r }: { r: Report }) {
  const exportReport = () =>
    downloadCsv('product-performance', [c('name', 'Product'), c('orders', 'Orders'), c('paid', 'Paid'), c('revenue', 'Revenue'), c('rate', 'Payment success')], r.products.map((p, i) => ({ id: String(i), ...p })))

  return (
    <>
      <PageHeader title="Analytics & Reports" subtitle="Sales, payments and customers from real orders. Website traffic is not tracked." actions={<button type="button" className={btn.ghost} onClick={exportReport}><Download size={15} />Export report</button>} />
      <div className="grid grid-cols-1 gap-5 min-[601px]:grid-cols-2 min-[1181px]:grid-cols-4">
        <StatCard label="Paid revenue" value={money(r.stats.revenue)} icon={IndianRupee} accent="gold" />
        <StatCard label="Payment success" value={`${r.stats.paidRate}%`} icon={Percent} accent="blue" />
        <StatCard label="Avg. order value" value={money(r.stats.aov)} icon={ShoppingBag} accent="navy" />
        <StatCard label="Repeat customers" value={`${r.stats.repeatRate}%`} icon={Repeat} accent="green" />
      </div>
      <div className="mt-5 grid grid-cols-1 gap-5 min-[1181px]:grid-cols-2">
        <Card className="p-5"><h2 className={h}>Weekly paid revenue</h2><LineChart labels={r.weekLabels} values={r.weekly} color="#c4943d" height={220} /></Card>
        <Card className="p-5"><h2 className={h}>Payment methods</h2>{r.methods.length ? <Donut parts={r.methods.map((m, i) => ({ ...m, color: palette[i % palette.length] }))} center={String(r.stats.orders)} /> : none}</Card>
        <Card className="p-5"><h2 className={h}>Category performance</h2>{r.category.length ? <BarChart labels={r.category.map((x) => x.name.split(' ')[0])} series={[{ name: 'Revenue', color: '#c4943d', values: r.category.map((x) => x.revenue) }]} height={220} /> : none}</Card>
        <Card className="p-5"><h2 className={h}>New customers per month</h2><LineChart labels={r.monthLabels} values={r.signups} height={200} /></Card>
        <Card className="p-5 min-[1181px]:col-span-2">
          <h2 className={h}>Product performance</h2>
          {!r.products.length ? none : (
            <table className="w-full text-sm"><thead><tr className="text-left text-[11px] uppercase tracking-[0.12em] text-slate"><th className="pb-2">Product</th><th className="pb-2 text-right">Orders</th><th className="pb-2 text-right">Paid</th><th className="pb-2 text-right">Revenue</th><th className="pb-2 text-right">Payment success</th></tr></thead>
              <tbody>{r.products.map((p) => (<tr key={p.name} className="border-t border-line/60 font-medium text-navy-deep"><td className="py-2.5">{p.name}</td><td className="py-2.5 text-right">{p.orders}</td><td className="py-2.5 text-right">{p.paid}</td><td className="py-2.5 text-right">{money(p.revenue)}</td><td className="py-2.5 text-right">{p.rate}</td></tr>))}</tbody>
            </table>
          )}
        </Card>
      </div>
    </>
  )
}
