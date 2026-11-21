import { ArrowDownRight, ArrowUpRight, Download, KeyRound, PackageCheck, Truck } from 'lucide-react'
import { money } from '@/lib/admin/format'
import type { ordersOverview } from '@/lib/server/orders'
import Donut from '../charts/Donut'
import LineChart from '../charts/LineChart'
import Card from '../ui/Card'

type O = Awaited<ReturnType<typeof ordersOverview>>
const h = 'text-lg font-semibold tracking-[-0.02em] text-navy-deep'
const colors: Record<string, string> = { Completed: '#10b981', Processing: '#c4943d', Pending: '#2563eb', Cancelled: '#ef4444', Refunded: '#8b5cf6', Failed: '#64748b' }
const ago = (ts: number) => { const m = Math.max(0, Math.round((Date.now() - ts) / 60000)); return m < 1 ? 'Just now' : m < 60 ? `${m} min ago` : m < 1440 ? `${Math.round(m / 60)} hr ago` : `${Math.round(m / 1440)} d ago` }

export function RevenueTrend({ o }: { o: O }) {
  const d = o.stats.revenueDelta
  return (
    <Card className="p-5">
      <h2 className={h}>Revenue Trend</h2>
      <p className="mb-2 text-[13px] font-medium text-muted">Paid revenue, last 30 days</p>
      <p className="text-2xl font-semibold tracking-[-0.03em] text-navy-deep">{money(o.revenueSeries.reduce((a, b) => a + b, 0))}
        {d !== undefined && <span className={`ml-2 inline-flex items-center gap-0.5 text-sm font-semibold ${d >= 0 ? 'text-[#047857]' : 'text-[#b91c1c]'}`}>{d >= 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}{Math.abs(d)}%</span>}</p>
      <p className="mb-2 text-xs font-medium text-muted">vs {money(o.stats.prevRevenue)} in the previous 30 days</p>
      <LineChart labels={o.dayLabels} values={o.revenueSeries} color="#2563eb" height={190} />
    </Card>
  )
}

export function StatusBreakdown({ o }: { o: O }) {
  const parts = o.breakdown.map((b) => ({ ...b, color: colors[b.label] ?? '#94a3b8' }))
  const total = o.stats.total
  return (
    <Card className="p-5">
      <h2 className={h}>Order Status Breakdown</h2>
      {!parts.length ? <p className="mt-3 text-sm font-medium text-muted">No orders yet.</p> : (
        <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-3">
          <Donut parts={parts} center={String(total)} legend={false} />
          <ul className="flex min-w-[170px] flex-1 flex-col gap-1.5 text-sm font-medium text-navy-deep">{parts.map((p) => <li key={p.label} className="flex items-center justify-between gap-2"><span className="flex items-center gap-2"><i className="size-2.5 rounded-full" style={{ background: p.color }} />{p.label}</span><span className="text-muted">{p.value} · {Math.round((p.value / total) * 1000) / 10}%</span></li>)}</ul>
        </div>
      )}
    </Card>
  )
}

export function CategoryRevenue({ o }: { o: O }) {
  const max = Math.max(1, ...o.categories.map((c) => c.revenue))
  return (
    <Card className="p-5">
      <h2 className={h}>Revenue by Product Category</h2>
      {!o.categories.length ? <p className="mt-3 text-sm font-medium text-muted">Paid orders will show up here.</p> : (
        <ul className="mt-3 flex flex-col gap-3">{o.categories.slice(0, 6).map((c) => <li key={c.name}><div className="mb-1 flex justify-between text-sm font-medium text-navy-deep"><span>{c.name}</span><b>{money(c.revenue)}</b></div><div className="h-2 overflow-hidden rounded-full bg-line"><div className="h-full rounded-full bg-gold" style={{ width: `${(c.revenue / max) * 100}%` }} /></div></li>)}</ul>
      )}
    </Card>
  )
}

export function PaymentPerformance({ o }: { o: O }) {
  const s = o.stats
  const cell = (label: string, value: string, sub?: string) => <div className="min-w-[90px] flex-1"><p className="text-xl font-semibold text-navy-deep">{value}</p><p className="text-xs font-medium text-muted">{label}</p>{sub && <p className="text-[11px] font-medium text-muted">{sub}</p>}</div>
  return (
    <Card className="p-5">
      <h2 className={`${h} mb-3`}>Payment Performance</h2>
      <div className="flex flex-wrap gap-4">{cell('Total collected', money(s.revenue))}{cell('Successful', String(s.paidCount))}{cell('Pending', String(s.pendingCount), money(s.pendingAmount))}{cell('Partial refunds', String(s.partial))}{cell('Refunded', String(s.refundedCount), money(s.refundedAmount))}</div>
    </Card>
  )
}

export function FulfilmentOverview({ o }: { o: O }) {
  const s = o.stats
  const cell = (I: typeof Download, label: string, value: number, tint: string) => <div className="min-w-[80px] flex-1 text-center"><I size={20} className={`mx-auto ${tint}`} /><p className="mt-1 text-xl font-semibold text-navy-deep">{value}</p><p className="text-[11px] font-medium text-muted">{label}</p></div>
  return (
    <Card className="p-5">
      <h2 className={`${h} mb-3`}>Digital Fulfilment Overview</h2>
      <div className="flex flex-wrap gap-3">{cell(Download, 'Downloads generated', s.downloads, 'text-blue')}{cell(KeyRound, 'Licenses issued', s.licenses, 'text-gold')}{cell(PackageCheck, 'Orders delivered', s.delivered, 'text-[#10b981]')}{cell(Truck, 'Delivery pending', s.deliveryPending, 'text-[#c4943d]')}</div>
    </Card>
  )
}

export function OrderActivity({ o }: { o: O }) {
  return (
    <Card className="p-5">
      <h2 className={`${h} mb-3`}>Recent Order Activity</h2>
      {!o.activity.length ? <p className="text-sm font-medium text-muted">Activity appears as orders come in.</p> : (
        <ul className="flex flex-col gap-3">{o.activity.map((a, i) => <li key={i} className="flex items-start justify-between gap-3 text-sm font-medium text-navy-deep"><span>{a.text}</span><span className="flex-none text-xs text-muted">{ago(a.ts)}</span></li>)}</ul>
      )}
    </Card>
  )
}
