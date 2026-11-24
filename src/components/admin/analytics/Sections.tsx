'use client'

import { Download } from 'lucide-react'
import { useState } from 'react'
import { downloadCsv } from '@/lib/admin/csv'
import { c } from '@/lib/admin/data/helpers'
import { money } from '@/lib/admin/format'
import type { Report } from '@/lib/server/analytics'
import { cn } from '@/lib/cn'
import Donut from '../charts/Donut'
import LineChart from '../charts/LineChart'
import Card from '../ui/Card'

const h = 'text-lg font-semibold tracking-[-0.02em] text-navy-deep'
const sub = 'mb-4 text-[13px] font-medium text-muted'
const palette = ['#1b2a4a', '#c4943d', '#10b981', '#2563eb', '#8b5cf6', '#94a3b8']
const statusColor: Record<string, string> = { Paid: '#10b981', Pending: '#c4943d', Failed: '#ef4444', Refunded: '#1b2a4a', 'Partially Refunded': '#94a3b8', Delivered: '#10b981', Processing: '#c4943d', Cancelled: '#ef4444', 'On Hold': '#8b5cf6', 'Ready for Delivery': '#2563eb' }
const none = <p className="text-sm font-medium text-muted">Not enough data yet.</p>
const pct = (n: number, total: number) => (total ? `${Math.round((n / total) * 1000) / 10}%` : '—')
const parts = (list: { label: string; value: number }[]) => list.map((p, i) => ({ ...p, color: statusColor[p.label] ?? palette[i % palette.length] }))

export function RevenueCard({ r }: { r: Report }) {
  const [metric, setMetric] = useState<'Revenue' | 'Orders'>('Revenue')
  const values = metric === 'Revenue' ? r.revenueSeries : r.ordersSeries
  return (
    <Card className="p-5">
      <h2 className={h}>Revenue Performance</h2>
      <p className={sub}>Paid revenue and order count over the selected period.</p>
      <div className="mb-3 flex gap-1.5">
        {(['Revenue', 'Orders'] as const).map((m) => <button key={m} type="button" onClick={() => setMetric(m)} className={cn('rounded-md px-3 py-1 text-[13px] font-medium', metric === m ? 'bg-navy-deep text-white' : 'text-slate hover:bg-paper')}>{m}</button>)}
      </div>
      <div className="mb-3 flex gap-8 text-sm font-medium text-slate">
        <span>Total revenue <b className="block text-xl text-navy-deep">{money(r.stats.revenue)}</b></span>
        <span>Orders <b className="block text-xl text-navy-deep">{r.stats.orders}</b></span>
      </div>
      <LineChart labels={r.labels} values={values} color="#c4943d" height={230} />
    </Card>
  )
}

export function CategoryCard({ items, total }: { items: Report['category']; total: number }) {
  return (
    <Card className="p-5">
      <h2 className={h}>Revenue by Category</h2>
      <p className={sub}>Paid revenue split across product categories.</p>
      {!items.length ? none : (
        <>
          <Donut parts={items.map((x, i) => ({ label: x.name, value: x.revenue, color: palette[i % palette.length] }))} center={money(total)} legend={false} />
          <ul className="mt-4 flex flex-col gap-2 text-sm font-medium text-navy-deep">
            {items.map((x) => <li key={x.name} className="flex justify-between gap-3"><span className="truncate">{x.name}</span><span className="text-muted">{pct(x.revenue, total)} · {money(x.revenue)}</span></li>)}
          </ul>
        </>
      )}
    </Card>
  )
}

export function ProductTable({ items }: { items: Report['products'] }) {
  const th = 'pb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate'
  return (
    <Card className="p-5">
      <h2 className={h}>Product Performance</h2>
      <p className={sub}>Orders and revenue per product in the selected period.</p>
      {!items.length ? none : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[520px] text-sm">
            <thead><tr className="text-left"><th className={th}>Product</th><th className={th}>Category</th><th className={cn(th, 'text-right')}>Orders</th><th className={cn(th, 'text-right')}>Paid</th><th className={cn(th, 'text-right')}>Revenue</th><th className={cn(th, 'text-right')}>Success</th></tr></thead>
            <tbody>{items.map((p) => (
              <tr key={p.name} className="border-t border-line/60 font-medium text-navy-deep"><td className="py-2.5">{p.name}</td><td className="py-2.5 text-muted">{p.category}</td><td className="py-2.5 text-right">{p.orders}</td><td className="py-2.5 text-right">{p.paid}</td><td className="py-2.5 text-right">{money(p.revenue)}</td><td className="py-2.5 text-right">{p.rate}</td></tr>
            ))}</tbody>
          </table>
        </div>
      )}
    </Card>
  )
}

export function CustomerCard({ r }: { r: Report }) {
  return (
    <Card className="p-5">
      <h2 className={h}>Customer Analytics</h2>
      <p className={sub}>New sign-ups over the last 6 months.</p>
      <div className="flex h-[170px] items-end gap-3 border-b border-line pb-1">
        {r.signups.map((v, i) => (
          <div key={r.signupLabels[i]} className="flex h-full flex-1 flex-col items-center justify-end gap-1">
            <span className="text-xs font-semibold text-navy-deep">{v}</span>
            <div className="w-full max-w-[34px] rounded-t-md bg-navy-deep" style={{ height: `${Math.max(3, (v / Math.max(1, ...r.signups)) * 120)}px` }} />
          </div>
        ))}
      </div>
      <div className="flex gap-3 pt-1.5">{r.signupLabels.map((l) => <span key={l} className="flex-1 text-center text-xs font-medium text-muted">{l}</span>)}</div>
      <div className="mt-3 flex justify-between text-sm font-medium text-slate"><span>Total customers <b className="text-navy-deep">{r.stats.customers}</b></span><span>Repeat rate <b className="text-navy-deep">{r.stats.repeatRate}%</b></span></div>
    </Card>
  )
}

const listRow = (l: { label: string; value: number }, total: number, color: string) => (
  <li key={l.label} className="flex items-center justify-between gap-3 text-sm font-medium text-navy-deep"><span className="flex items-center gap-2"><i className="size-2.5 rounded-full" style={{ background: color }} />{l.label}</span><span className="text-muted">{l.value} · {pct(l.value, total)}</span></li>
)

export function PaymentCard({ r }: { r: Report }) {
  const s = r.stats
  const methods = parts(r.methods)
  return (
    <Card className="p-5">
      <h2 className={h}>Payment & Financial Analytics</h2>
      <p className={sub}>How orders were paid and how many succeeded.</p>
      <div className="mb-4 grid grid-cols-3 gap-3 text-center text-sm font-medium text-slate">
        <div className="rounded-lg bg-[#10b981]/10 p-3">Paid<b className="block text-xl text-[#047857]">{s.paid}</b></div>
        <div className="rounded-lg bg-gold/15 p-3">Pending<b className="block text-xl text-[#8a6420]">{s.pending}</b></div>
        <div className="rounded-lg bg-[#ef4444]/10 p-3">Failed<b className="block text-xl text-[#b91c1c]">{s.failed}</b></div>
      </div>
      {!methods.length ? none : <><p className="mb-2 text-[13px] font-semibold text-navy-deep">Payment methods</p><Donut parts={methods} center={String(s.orders)} /></>}
    </Card>
  )
}

export function SalesCard({ r }: { r: Report }) {
  const total = r.stats.orders
  const list = parts(r.fulfil)
  return (
    <Card className="p-5">
      <h2 className={h}>Sales & Order Analytics</h2>
      <p className={sub}>Delivery status of the orders in this period.</p>
      {!list.length ? none : (
        <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
          <Donut parts={list} center={String(total)} legend={false} />
          <ul className="flex min-w-[200px] flex-1 flex-col gap-2.5">{list.map((l) => listRow(l, total, l.color))}</ul>
        </div>
      )}
    </Card>
  )
}

export function ExportCentre({ r }: { r: Report }) {
  const rows = (list: { label: string; value: number }[]) => list.map((x, i) => ({ id: String(i), ...x }))
  const reports = [
    { name: 'Product report', run: () => downloadCsv('product-report', [c('name', 'Product'), c('category', 'Category'), c('orders', 'Orders'), c('paid', 'Paid'), c('revenue', 'Revenue')], r.products.map((p, i) => ({ id: String(i), ...p }))) },
    { name: 'Revenue report', run: () => downloadCsv('revenue-report', [c('label', 'Period'), c('revenue', 'Paid revenue'), c('orders', 'Orders')], r.labels.map((label, i) => ({ id: String(i), label, revenue: r.revenueSeries[i], orders: r.ordersSeries[i] }))) },
    { name: 'Category report', run: () => downloadCsv('category-report', [c('name', 'Category'), c('revenue', 'Paid revenue')], r.category.map((x, i) => ({ id: String(i), ...x }))) },
    { name: 'Payment methods', run: () => downloadCsv('payment-methods', [c('label', 'Method'), c('value', 'Orders')], rows(r.methods)) },
    { name: 'Order status', run: () => downloadCsv('order-status', [c('label', 'Status'), c('value', 'Orders')], rows(r.fulfil)) },
  ]
  return (
    <Card className="mt-4 p-5">
      <h2 className={h}>Reports & Export Centre</h2>
      <p className={sub}>Download the figures above as CSV for the selected period.</p>
      <div className="grid grid-cols-1 gap-3 min-[601px]:grid-cols-2 min-[1181px]:grid-cols-5">
        {reports.map((x) => (
          <button key={x.name} type="button" onClick={x.run} className="flex items-center justify-between gap-2 rounded-lg border border-line bg-white px-4 py-3 text-left text-sm font-semibold text-navy-deep hover:border-gold hover:bg-paper">{x.name}<Download size={15} className="text-gold" /></button>
        ))}
      </div>
    </Card>
  )
}
