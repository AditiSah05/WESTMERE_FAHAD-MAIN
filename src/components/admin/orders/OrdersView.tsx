'use client'

import { BadgeCheck, CheckCircle2, Clock, Download, IndianRupee, PackageOpen, Plus, RotateCcw, Search, ShoppingCart, XCircle } from 'lucide-react'
import { useMemo, useState } from 'react'
import { downloadCsv } from '@/lib/admin/csv'
import { c } from '@/lib/admin/data/helpers'
import { money } from '@/lib/admin/format'
import { cn } from '@/lib/cn'
import { FULFILMENT, METHODS, PAYMENT } from '@/lib/order-shared'
import type { Order, ordersOverview } from '@/lib/server/orders'
import Card from '../ui/Card'
import Drawer from '../ui/Drawer'
import PageHeader, { btn } from '../ui/PageHeader'
import StatCard from '../ui/StatCard'
import BulkOrderBar from './BulkOrderBar'
import { FulfilmentOverview, OrderActivity, PaymentPerformance, RevenueTrend, CategoryRevenue, StatusBreakdown } from './OrderInsights'
import { ManualOrderForm, OrderDetail } from './OrderDrawers'
import OrderTable from './OrderTable'

type Props = { o: Awaited<ReturnType<typeof ordersOverview>>; customers: { id: string; name: string; email: string }[]; products: { id: string; name: string; price: number }[]; write: boolean; initialQ?: string }
const field = 'rounded-lg border border-line bg-white px-2.5 py-2 text-[13px] font-medium text-navy-deep outline-none focus:border-gold'
const DATES = { all: 'Date: Any', '7': 'Last 7 days', '30': 'Last 30 days', '90': 'Last 90 days', year: 'This year' } as const
const AMOUNTS = { all: 'Amount: Any', low: 'Under ₹1,000', mid: '₹1,000 to ₹5,000', high: 'Over ₹5,000' } as const
const SORTS = { new: 'Newest first', old: 'Oldest first', high: 'Amount: high to low', low: 'Amount: low to high' } as const
const TABS: [string, string, (o: Order) => boolean][] = [
  ['all', 'All Orders', () => true], ['pending', 'Pending', (o) => o.payment === 'Pending'], ['paid', 'Paid', (o) => o.payment === 'Paid'], ['processing', 'Processing', (o) => o.status === 'Processing'],
  ['ready', 'Ready for Delivery', (o) => o.fulfilment === 'Ready for Delivery'], ['delivered', 'Delivered', (o) => o.fulfilment === 'Delivered'], ['cancelled', 'Cancelled', (o) => o.fulfilment === 'Cancelled'],
  ['refunded', 'Refunded', (o) => o.payment.includes('Refunded')], ['failed', 'Failed Payments', (o) => o.payment === 'Failed'], ['manual', 'Manual Orders', (o) => o.manual],
]

export default function OrdersView({ o, customers, products, write, initialQ = '' }: Props) {
  const s = o.stats
  const [tab, setTab] = useState('all')
  const [q, setQ] = useState(initialQ)
  const [pay, setPay] = useState('All')
  const [ful, setFul] = useState('All')
  const [type, setType] = useState('All')
  const [method, setMethod] = useState('All')
  const [date, setDate] = useState<keyof typeof DATES>('all')
  const [amount, setAmount] = useState<keyof typeof AMOUNTS>('all')
  const [sort, setSort] = useState<keyof typeof SORTS>('new')
  const [per, setPer] = useState(10)
  const [page, setPage] = useState(1)
  const [sel, setSel] = useState<Set<string>>(new Set())
  const [view, setView] = useState<Order | null>(null)
  const [add, setAdd] = useState(false)
  const types = Array.from(new Set(o.orders.map((x) => x.type)))
  const yearStart = new Date(new Date().getFullYear(), 0, 1).getTime()

  const shown = useMemo(() => {
    const t = TABS.find((x) => x[0] === tab)![2]
    const raw = q.trim().toLowerCase()
    const wm = /^#?wm-(\d+)$/.exec(raw)?.[1]
    const needle = wm ? '' : raw
    const list = o.orders.filter((x) => t(x) && (pay === 'All' || x.payment === pay) && (ful === 'All' || x.fulfilment === ful) && (type === 'All' || x.type === type) && (method === 'All' || x.method === method)
      && (date === 'all' || x.ts >= (date === 'year' ? yearStart : Date.now() - Number(date) * 864e5))
      && (amount === 'all' || (amount === 'low' ? x.amount < 1000 : amount === 'mid' ? x.amount >= 1000 && x.amount <= 5000 : x.amount > 5000))
      && (wm ? x.id === wm : !needle || `${x.id} ${x.customer} ${x.email} ${x.product} ${x.paymentRef}`.toLowerCase().includes(needle)))
    return list.sort(sort === 'new' ? (a, b) => b.ts - a.ts : sort === 'old' ? (a, b) => a.ts - b.ts : sort === 'high' ? (a, b) => b.amount - a.amount : (a, b) => a.amount - b.amount)
  }, [o.orders, tab, q, pay, ful, type, method, date, amount, sort, yearStart])
  const pages = Math.max(1, Math.ceil(shown.length / per))
  const cur = Math.min(page, pages)
  const visible = shown.slice((cur - 1) * per, cur * per)
  const reset = <T,>(set: (v: T) => void) => (v: T) => { set(v); setPage(1) }
  const clear = () => { setQ(''); setPay('All'); setFul('All'); setType('All'); setMethod('All'); setDate('all'); setAmount('all'); setSort('new'); setPage(1) }
  const toggle = (id: string) => setSel((x) => { const n = new Set(x); if (!n.delete(id)) n.add(id); return n })
  const toggleAll = () => setSel((x) => (visible.every((r) => x.has(r.id)) ? new Set([...x].filter((i) => !visible.some((r) => r.id === i))) : new Set([...x, ...visible.map((r) => r.id)])))
  const exportRows = (list: Order[]) => downloadCsv('orders', [c('ref', 'Order'), c('customer', 'Customer'), c('email', 'Email'), c('product', 'Product'), c('type', 'Type'), c('amount', 'Amount'), c('payment', 'Payment'), c('fulfilment', 'Fulfilment'), c('method', 'Method'), c('at', 'Placed'), c('paymentRef', 'Payment reference')], list.map((x) => ({ id: x.id, ref: `WM-${x.id}`, customer: x.customer, email: x.email, product: x.product, type: x.type, amount: x.amount, payment: x.payment, fulfilment: x.fulfilment, method: x.method, at: x.at, paymentRef: x.paymentRef })))
  const tabCount = (f: (x: Order) => boolean) => o.orders.filter(f).length

  return (
    <>
      <PageHeader title="Orders" subtitle="Customer purchases, payments and deliveries in one place. Payment and delivery are tracked separately."
        actions={<>{write && <button type="button" className={btn.gold} onClick={() => setAdd(true)}><Plus size={16} />Create Manual Order</button>}<button type="button" className={btn.ghost} onClick={() => exportRows(shown)}><Download size={15} />Export Orders</button></>} />
      <div className="grid grid-cols-1 gap-4 min-[601px]:grid-cols-2 min-[1181px]:grid-cols-4">
        <StatCard label="Total Orders" value={s.total.toLocaleString('en-IN')} delta={s.totalDelta} icon={ShoppingCart} accent="blue" spark={o.ordersSeries} note="All orders" />
        <StatCard label="Total Revenue" value={money(s.revenue)} delta={s.revenueDelta} icon={IndianRupee} accent="gold" spark={o.revenueSeries} note="Paid orders only" />
        <StatCard label="Pending Payments" value={money(s.pendingAmount)} icon={Clock} accent="gold" note={`${s.pendingCount} orders awaiting payment`} />
        <StatCard label="Processing Orders" value={String(s.processing)} icon={PackageOpen} accent="blue" note="Paid, waiting for delivery" />
        <StatCard label="Completed Orders" value={String(s.completed)} icon={CheckCircle2} accent="green" note={s.total ? `${Math.round((s.completed / s.total) * 1000) / 10}% of all orders` : ''} />
        <StatCard label="Refund Requests" value={String(s.refundRequests)} icon={RotateCcw} accent="navy" note={`${money(s.refundAmount)} pending refund requests`} />
        <StatCard label="Failed Payments" value={String(s.failedCount)} icon={XCircle} accent="navy" note={`${money(s.failedAmount)} failed attempts`} />
        <StatCard label="Average Order Value" value={money(s.aov)} delta={s.aovDelta} icon={BadgeCheck} accent="green" note="Paid orders only" />
      </div>
      <div className="mt-4 flex flex-wrap gap-2">{TABS.map(([k, l, f]) => <button key={k} type="button" onClick={() => { setTab(k); setPage(1) }} className={cn('rounded-lg border px-3.5 py-2 text-[13px] font-semibold', tab === k ? 'border-navy-deep bg-navy-deep text-white' : 'border-line bg-white text-navy-deep hover:border-gold')}>{l} ({tabCount(f)})</button>)}</div>
      <Card className="mt-4 overflow-hidden">
        <div className="flex flex-wrap items-center gap-2.5 border-b border-line p-4">
          <label className="relative min-w-[220px] flex-1"><Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" /><input value={q} onChange={(e) => reset(setQ)(e.target.value)} placeholder="Search by order ID, customer, email or product…" className={`${field} w-full pl-9`} /></label>
          <select value={pay} onChange={(e) => reset(setPay)(e.target.value)} aria-label="Payment status" className={field}><option value="All">Payment: All</option>{PAYMENT.map((p) => <option key={p}>{p}</option>)}</select>
          <select value={ful} onChange={(e) => reset(setFul)(e.target.value)} aria-label="Fulfilment status" className={field}><option value="All">Fulfilment: All</option>{FULFILMENT.map((p) => <option key={p}>{p}</option>)}</select>
          <select value={type} onChange={(e) => reset(setType)(e.target.value)} aria-label="Order type" className={field}><option value="All">Order type: All</option>{types.map((p) => <option key={p}>{p}</option>)}</select>
          <select value={method} onChange={(e) => reset(setMethod)(e.target.value)} aria-label="Payment method" className={field}><option value="All">Method: All</option>{METHODS.map((p) => <option key={p}>{p}</option>)}</select>
          <select value={date} onChange={(e) => reset(setDate)(e.target.value as keyof typeof DATES)} aria-label="Date" className={field}>{Object.entries(DATES).map(([k, l]) => <option key={k} value={k}>{l}</option>)}</select>
          <select value={amount} onChange={(e) => reset(setAmount)(e.target.value as keyof typeof AMOUNTS)} aria-label="Amount" className={field}>{Object.entries(AMOUNTS).map(([k, l]) => <option key={k} value={k}>{l}</option>)}</select>
          <select value={sort} onChange={(e) => reset(setSort)(e.target.value as keyof typeof SORTS)} aria-label="Sort" className={field}>{Object.entries(SORTS).map(([k, l]) => <option key={k} value={k}>Sort: {l}</option>)}</select>
          <button type="button" onClick={clear} className="text-[13px] font-semibold text-gold hover:underline">Clear All</button>
        </div>
        {write && sel.size > 0 && <BulkOrderBar ids={[...sel]} onDone={() => setSel(new Set())} onExport={() => exportRows(o.orders.filter((x) => sel.has(x.id)))} />}
        <OrderTable rows={visible} selected={sel} onToggle={write ? toggle : undefined} onToggleAll={toggleAll} total={shown.length} page={cur} pages={pages} per={per} onPage={setPage} onPer={(n) => { setPer(n); setPage(1) }} onView={setView} />
      </Card>
      <div className="mt-4 grid grid-cols-1 gap-4 min-[1181px]:grid-cols-3"><RevenueTrend o={o} /><StatusBreakdown o={o} /><CategoryRevenue o={o} /></div>
      <div className="mt-4 grid grid-cols-1 gap-4 min-[1181px]:grid-cols-3"><PaymentPerformance o={o} /><FulfilmentOverview o={o} /><OrderActivity o={o} /></div>
      <Drawer open={add} title="Create Manual Order" onClose={() => setAdd(false)}>{add && <ManualOrderForm customers={customers} products={products} onDone={() => setAdd(false)} />}</Drawer>
      <Drawer open={view !== null} title={view ? `Order #WM-${view.id}` : 'Order'} onClose={() => setView(null)}>{view && <OrderDetail key={view.id + view.payment + view.fulfilment} o={o.orders.find((x) => x.id === view.id) ?? view} write={write} onDone={() => setView(null)} />}</Drawer>
    </>
  )
}
