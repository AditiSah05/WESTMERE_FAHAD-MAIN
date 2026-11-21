'use client'

import { AlertTriangle, BadgeCheck, CheckCircle2, Clock, Download, FileText, Layers, Plus, RefreshCw, Search, XCircle } from 'lucide-react'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import { downloadCsv } from '@/lib/admin/csv'
import { c } from '@/lib/admin/data/helpers'
import { money } from '@/lib/admin/format'
import { cn } from '@/lib/cn'
import { REASONS, statusLabel } from '@/lib/refund-shared'
import type { Refund, refundsOverview } from '@/lib/server/refunds'
import Card from '../ui/Card'
import Drawer from '../ui/Drawer'
import PageHeader, { btn } from '../ui/PageHeader'
import StatCard from '../ui/StatCard'
import BulkRefundBar from './BulkRefundBar'
import { ProcessRefundForm, RefundDetail } from './RefundDrawers'
import { FinancialAnalytics, MethodOverview, ReasonsBreakdown, RefundActivity } from './RefundInsights'
import RefundTable from './RefundTable'

type Props = { o: Awaited<ReturnType<typeof refundsOverview>>; orders: { id: string; label: string; amount: number }[]; write: boolean }
const field = 'rounded-lg border border-line bg-white px-2.5 py-2 text-[13px] font-medium text-navy-deep outline-none focus:border-gold'
const DATES = { all: 'Date: Any', '7': 'Last 7 days', '30': 'Last 30 days', '90': 'Last 90 days' } as const
const AMOUNTS = { all: 'Amount: Any', low: 'Under ₹1,000', mid: '₹1,000 to ₹5,000', high: 'Over ₹5,000' } as const
const TABS: [string, string, (r: Refund) => boolean][] = [
  ['all', 'All Requests', () => true], ['pending', 'Pending Review', (r) => r.status === 'Requested'], ['review', 'Under Investigation', (r) => r.status === 'Under Investigation'], ['approved', 'Approved', (r) => r.status === 'Approved'],
  ['processing', 'Processing', (r) => r.status === 'Processing'], ['refunded', 'Successfully Refunded', (r) => r.status === 'Refunded'], ['rejected', 'Rejected', (r) => r.status === 'Rejected'], ['failed', 'Failed Refunds', (r) => r.status === 'Failed'],
]

export default function RefundsView({ o, orders, write }: Props) {
  const s = o.stats
  const [tab, setTab] = useState('all')
  const [q, setQ] = useState('')
  const [kind, setKind] = useState('All')
  const [reason, setReason] = useState('All')
  const [method, setMethod] = useState('All')
  const [date, setDate] = useState<keyof typeof DATES>('all')
  const [amount, setAmount] = useState<keyof typeof AMOUNTS>('all')
  const [per, setPer] = useState(10)
  const [page, setPage] = useState(1)
  const [sel, setSel] = useState<Set<string>>(new Set())
  const [view, setView] = useState<Refund | null>(null)
  const [add, setAdd] = useState(false)
  const methods = Array.from(new Set(o.refunds.map((r) => r.method)))

  const shown = useMemo(() => {
    const t = TABS.find((x) => x[0] === tab)![2]
    const raw = q.trim().toLowerCase()
    const rf = /^rf-(\d+)$/.exec(raw)?.[1], wm = /^#?wm-(\d+)$/.exec(raw)?.[1]
    const needle = rf || wm ? '' : raw
    return o.refunds.filter((r) => t(r) && (kind === 'All' || r.kind === kind) && (reason === 'All' || r.reasonType === reason) && (method === 'All' || r.method === method)
      && (date === 'all' || r.ts >= Date.now() - Number(date) * 864e5) && (amount === 'all' || (amount === 'low' ? r.amount < 1000 : amount === 'mid' ? r.amount >= 1000 && r.amount <= 5000 : r.amount > 5000))
      && (rf ? r.id === rf : wm ? r.orderId === wm : !needle || `${r.id} ${r.orderId} ${r.customer} ${r.email} ${r.product}`.toLowerCase().includes(needle)))
  }, [o.refunds, tab, q, kind, reason, method, date, amount])
  const pages = Math.max(1, Math.ceil(shown.length / per))
  const cur = Math.min(page, pages)
  const visible = shown.slice((cur - 1) * per, cur * per)
  const reset = <T,>(set: (v: T) => void) => (v: T) => { set(v); setPage(1) }
  const clear = () => { setQ(''); setKind('All'); setReason('All'); setMethod('All'); setDate('all'); setAmount('all'); setPage(1) }
  const toggle = (id: string) => setSel((x) => { const n = new Set(x); if (!n.delete(id)) n.add(id); return n })
  const toggleAll = () => setSel((x) => (visible.every((r) => x.has(r.id)) ? new Set([...x].filter((i) => !visible.some((r) => r.id === i))) : new Set([...x, ...visible.map((r) => r.id)])))
  const exportRows = (list: Refund[]) => downloadCsv('refund-requests', [c('rf', 'Refund ID'), c('order', 'Order'), c('customer', 'Customer'), c('email', 'Email'), c('product', 'Product'), c('kind', 'Type'), c('orderAmount', 'Original amount'), c('amount', 'Refund amount'), c('reasonType', 'Reason'), c('status', 'Status'), c('method', 'Method'), c('at', 'Requested'), c('refundRef', 'Refund reference')], list.map((r) => ({ id: r.id, rf: `RF-${r.id}`, order: `WM-${r.orderId}`, customer: r.customer, email: r.email, product: r.product, kind: r.kind, orderAmount: r.orderAmount, amount: r.amount, reasonType: r.reasonType, status: statusLabel(r.status), method: r.method, at: r.at, refundRef: r.refundRef })))
  const count = (f: (r: Refund) => boolean) => o.refunds.filter(f).length

  return (
    <>
      <PageHeader title="Refund Management" subtitle="Review refund and cancellation requests, return payments and track every step."
        actions={<>{write && <button type="button" className={btn.gold} onClick={() => setAdd(true)}><Plus size={16} />Process Refund</button>}<button type="button" className={btn.ghost} onClick={() => exportRows(shown)}><Download size={15} />Export Refund Report</button><Link href="/terms" target="_blank" className={btn.ghost}><FileText size={15} />Refund Policy</Link></>} />
      <div className="grid grid-cols-1 gap-4 min-[601px]:grid-cols-2 min-[1181px]:grid-cols-4">
        <StatCard label="Total Requests" value={String(s.total)} delta={s.totalDelta} icon={Layers} accent="blue" spark={o.perDay} note="All requests" />
        <StatCard label="Pending Review" value={String(s.pending)} icon={Clock} accent="gold" note={s.oldPending ? `${s.oldPending} waiting more than 3 days` : 'Waiting for the team'} />
        <StatCard label="Approved Refunds" value={String(s.approved)} icon={BadgeCheck} accent="green" note={`${money(s.approvedAmount)} to return`} />
        <StatCard label="Total Refunded" value={money(s.refundedAmount)} icon={CheckCircle2} accent="gold" note={`${s.refunded} successful refunds`} />
        <StatCard label="Rejected Requests" value={String(s.rejected)} icon={XCircle} accent="navy" note={s.total ? `${Math.round((s.rejected / s.total) * 1000) / 10}% of all requests` : ''} />
        <StatCard label="Processing Refunds" value={String(s.processing)} icon={RefreshCw} accent="blue" note={`${money(s.processingAmount)} being returned`} />
        <StatCard label="Failed Refunds" value={String(s.failed)} icon={AlertTriangle} accent="navy" note={`${money(s.failedAmount)} failed`} />
        <StatCard label="Under Investigation" value={String(s.review)} icon={Search} accent="gold" note="Being checked by the team" />
      </div>
      <div className="mt-4 flex flex-wrap gap-2">{TABS.map(([k, l, f]) => <button key={k} type="button" onClick={() => { setTab(k); setPage(1) }} className={cn('rounded-lg border px-3.5 py-2 text-[13px] font-semibold', tab === k ? 'border-navy-deep bg-navy-deep text-white' : 'border-line bg-white text-navy-deep hover:border-gold')}>{l} ({count(f)})</button>)}</div>
      <Card className="mt-4 overflow-hidden">
        <div className="flex flex-wrap items-center gap-2.5 border-b border-line p-4">
          <label className="relative min-w-[220px] flex-1"><Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" /><input value={q} onChange={(e) => reset(setQ)(e.target.value)} placeholder="Search by refund ID, order ID, customer or product…" className={`${field} w-full pl-9`} /></label>
          <select value={kind} onChange={(e) => reset(setKind)(e.target.value)} aria-label="Type" className={field}><option value="All">Type: All</option><option>Refund</option><option>Cancellation</option></select>
          <select value={reason} onChange={(e) => reset(setReason)(e.target.value)} aria-label="Reason" className={field}><option value="All">Reason: All</option>{REASONS.map((r) => <option key={r}>{r}</option>)}</select>
          <select value={method} onChange={(e) => reset(setMethod)(e.target.value)} aria-label="Method" className={field}><option value="All">Method: All</option>{methods.map((m) => <option key={m}>{m}</option>)}</select>
          <select value={date} onChange={(e) => reset(setDate)(e.target.value as keyof typeof DATES)} aria-label="Date" className={field}>{Object.entries(DATES).map(([k, l]) => <option key={k} value={k}>{l}</option>)}</select>
          <select value={amount} onChange={(e) => reset(setAmount)(e.target.value as keyof typeof AMOUNTS)} aria-label="Amount" className={field}>{Object.entries(AMOUNTS).map(([k, l]) => <option key={k} value={k}>{l}</option>)}</select>
          <button type="button" onClick={clear} className="text-[13px] font-semibold text-gold hover:underline">Clear Filters</button>
        </div>
        {write && sel.size > 0 && <BulkRefundBar ids={[...sel]} onDone={() => setSel(new Set())} onExport={() => exportRows(o.refunds.filter((r) => sel.has(r.id)))} />}
        <RefundTable rows={visible} selected={sel} onToggle={write ? toggle : undefined} onToggleAll={toggleAll} total={shown.length} page={cur} pages={pages} per={per} onPage={setPage} onPer={(n) => { setPer(n); setPage(1) }} onView={setView} />
      </Card>
      <div className="mt-4 grid grid-cols-1 gap-4 min-[1181px]:grid-cols-2"><FinancialAnalytics o={o} /><ReasonsBreakdown o={o} /></div>
      <div className="mt-4 grid grid-cols-1 gap-4 min-[1181px]:grid-cols-2"><RefundActivity o={o} /><MethodOverview o={o} /></div>
      <Drawer open={add} title="Process Refund" onClose={() => setAdd(false)}>{add && <ProcessRefundForm orders={orders} onDone={() => setAdd(false)} />}</Drawer>
      <Drawer open={view !== null} title={view ? `Refund RF-${view.id}` : 'Refund'} onClose={() => setView(null)}>{view && <RefundDetail key={view.id + view.status} r={o.refunds.find((x) => x.id === view.id) ?? view} write={write} onDone={() => setView(null)} />}</Drawer>
    </>
  )
}
