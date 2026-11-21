import { money } from '@/lib/admin/format'
import type { refundsOverview } from '@/lib/server/refunds'
import Donut from '../charts/Donut'
import LineChart from '../charts/LineChart'
import Card from '../ui/Card'

type O = Awaited<ReturnType<typeof refundsOverview>>
const h = 'text-lg font-semibold tracking-[-0.02em] text-navy-deep'
const palette = ['#1b2a4a', '#2563eb', '#c4943d', '#8b5cf6', '#f97316', '#10b981', '#ef4444', '#94a3b8']
const ago = (ts: number) => { const m = Math.max(0, Math.round((Date.now() - ts) / 60000)); return m < 1 ? 'Just now' : m < 60 ? `${m} min ago` : m < 1440 ? `${Math.round(m / 60)} hr ago` : `${Math.round(m / 1440)} d ago` }

export function FinancialAnalytics({ o }: { o: O }) {
  const s = o.stats
  const row = (label: string, value: string) => <li className="flex items-center justify-between gap-4 border-b border-line/60 py-2.5 text-sm font-medium text-navy-deep last:border-0"><span className="text-slate">{label}</span><b>{value}</b></li>
  return (
    <Card className="p-5">
      <h2 className={h}>Refund Financial Analytics</h2>
      <div className="mt-3 grid grid-cols-1 gap-5 min-[701px]:grid-cols-2">
        <ul>{row('Total refunded', money(s.refundedAmount))}{row('Approved, not yet refunded', money(s.approvedAmount))}{row('Pending liability', money(s.liability))}{row('Failed refunds', money(s.failedAmount))}</ul>
        <div><p className="mb-1 text-[13px] font-semibold text-navy-deep">Monthly refunded amount</p><LineChart labels={o.monthLabels} values={o.trend} color="#c4943d" height={150} /></div>
      </div>
    </Card>
  )
}

export function ReasonsBreakdown({ o }: { o: O }) {
  const parts = o.reasons.map((r, i) => ({ ...r, color: palette[i % palette.length] }))
  return (
    <Card className="p-5">
      <h2 className={h}>Refund Reasons Breakdown</h2>
      {!parts.length ? <p className="mt-3 text-sm font-medium text-muted">No requests yet.</p> : (
        <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-3">
          <Donut parts={parts} center={String(o.stats.total)} legend={false} />
          <ul className="flex min-w-[200px] flex-1 flex-col gap-1.5 text-sm font-medium text-navy-deep">{parts.map((p) => <li key={p.label} className="flex items-center justify-between gap-2"><span className="flex items-center gap-2"><i className="size-2.5 rounded-full" style={{ background: p.color }} />{p.label}</span><span className="text-muted">{p.value} · {Math.round((p.value / o.stats.total) * 1000) / 10}%</span></li>)}</ul>
        </div>
      )}
    </Card>
  )
}

export function RefundActivity({ o }: { o: O }) {
  return (
    <Card className="p-5">
      <h2 className={`${h} mb-3`}>Recent Refund Activity</h2>
      {!o.activity.length ? <p className="text-sm font-medium text-muted">Activity appears as requests are received and updated.</p> : (
        <ul className="flex flex-col gap-3">{o.activity.map((a) => <li key={a.id} className="flex items-start justify-between gap-3 text-sm font-medium text-navy-deep"><span>{a.event}: RF-{a.requestId} (₹{a.amount.toLocaleString('en-IN')}) – {a.customer}</span><span className="flex-none text-xs text-muted">{ago(a.ts)}</span></li>)}</ul>
      )}
    </Card>
  )
}

export function MethodOverview({ o }: { o: O }) {
  const th = 'pb-2 text-left text-[11px] font-bold uppercase tracking-[0.1em] text-[#718096]'
  return (
    <Card className="p-5">
      <h2 className={`${h} mb-3`}>Payment Method Processing Overview</h2>
      {!o.methods.length ? <p className="text-sm font-medium text-muted">No requests yet.</p> : (
        <div className="overflow-x-auto"><table className="w-full min-w-[460px] text-sm">
          <thead><tr><th className={th}>Method</th><th className={th}>Requests</th><th className={th}>Refunded</th><th className={th}>Processing</th><th className={th}>Failed</th><th className={th}>Success rate</th></tr></thead>
          <tbody>{o.methods.map((m) => <tr key={m.method} className="border-t border-line/60 font-medium text-navy-deep"><td className="py-2.5 font-semibold">{m.method}</td><td className="py-2.5">{m.total}</td><td className="py-2.5">{money(m.refunded)}</td><td className="py-2.5">{m.processing}</td><td className="py-2.5 text-[#b91c1c]">{m.failed}</td><td className="py-2.5">{m.rate === null ? '—' : <span className="flex items-center gap-2">{m.rate}%<span className="h-1.5 w-20 overflow-hidden rounded-full bg-line"><span className="block h-full rounded-full bg-[#10b981]" style={{ width: `${m.rate}%` }} /></span></span>}</td></tr>)}</tbody>
        </table></div>
      )}
    </Card>
  )
}
