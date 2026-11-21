'use client'

import { useState } from 'react'
import { createManualOrder, updateOrder } from '@/app/admin/order-actions'
import { FULFILMENT, METHODS, PAYMENT } from '@/lib/order-shared'
import type { Order } from '@/lib/server/orders'
import { btn } from '../ui/PageHeader'
import StatusBadge from '../ui/StatusBadge'
import { useServerForm } from '../ui/useServerForm'

const input = 'w-full rounded-lg border border-line bg-white px-3 py-2 text-sm font-medium text-navy-deep outline-none focus:border-gold'
const lab = 'flex flex-col gap-1 text-[11px] font-bold uppercase tracking-[0.1em] text-[#718096]'
const alert = (m?: string) => m && <p role="alert" className="rounded-lg bg-[#ef4444]/10 px-3 py-2 text-sm font-medium text-[#b91c1c]">{m}</p>

export function ManualOrderForm({ customers, products, onDone }: { customers: { id: string; name: string; email: string }[]; products: { id: string; name: string; price: number }[]; onDone: () => void }) {
  const { onSubmit, pending, error } = useServerForm(createManualOrder, onDone)
  const [amount, setAmount] = useState('')
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <p className="rounded-lg bg-sky p-3 text-xs font-medium text-slate">Use this for an order paid outside the site, for example a UPI payment confirmed on WhatsApp.</p>
      <label className={lab}>Customer<select name="customer" required defaultValue="" className={input}><option value="" disabled>Choose a customer</option>{customers.map((c) => <option key={c.id} value={c.id}>{c.name} ({c.email})</option>)}</select></label>
      <label className={lab}>Product<select name="product" required defaultValue="" onChange={(e) => setAmount(String(products.find((p) => p.id === e.target.value)?.price ?? ''))} className={input}><option value="" disabled>Choose a product</option>{products.map((p) => <option key={p.id} value={p.id}>{p.name} (₹{p.price.toLocaleString('en-IN')})</option>)}</select></label>
      <div className="grid grid-cols-2 gap-3">
        <label className={lab}>Amount (₹)<input name="amount" type="number" min={0} required value={amount} onChange={(e) => setAmount(e.target.value)} className={input} /></label>
        <label className={lab}>Payment method<select name="method" defaultValue="UPI" className={input}>{METHODS.map((m) => <option key={m}>{m}</option>)}</select></label>
        <label className={lab}>Payment status<select name="payment" defaultValue="Paid" className={input}>{PAYMENT.map((p) => <option key={p}>{p}</option>)}</select></label>
        <label className={lab}>Fulfilment<select name="fulfilment" defaultValue="Processing" className={input}>{FULFILMENT.map((f) => <option key={f}>{f}</option>)}</select></label>
      </div>
      <label className={lab}>Payment reference (UPI transaction ID)<input name="paymentRef" maxLength={40} className={input} /></label>
      <label className={lab}>Note<textarea name="note" rows={2} maxLength={200} className={input} /></label>
      {alert(error)}
      <button type="submit" disabled={pending} className={`${btn.gold} justify-center disabled:opacity-70`}>{pending ? 'Saving…' : 'Create order'}</button>
    </form>
  )
}

export function OrderDetail({ o, write, onDone }: { o: Order; write: boolean; onDone: () => void }) {
  const { onSubmit, pending, error } = useServerForm(updateOrder, onDone)
  const row = (a: string, b: React.ReactNode) => <div className="flex justify-between gap-4 border-b border-line/60 py-2 text-sm font-medium"><span className="text-muted">{a}</span><span className="text-right text-navy-deep">{b}</span></div>
  return (
    <div className="flex flex-col gap-5">
      <div>{row('Order', `#WM-${o.id}${o.manual ? ' (manual)' : ''}`)}{row('Customer', `${o.customer} (${o.email})`)}{row('Product', `${o.product} · ${o.type}`)}{row('Amount', `₹${o.amount.toLocaleString('en-IN')}`)}{row('Method', o.method)}{row('Placed', o.at)}{row('Overall', <StatusBadge value={o.status} />)}{row('License', o.license ? <code className="font-mono text-xs">{o.license}</code> : 'None issued')}{o.requests > 0 && row('Refund / cancel requests', String(o.requests))}</div>
      {write ? (
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <input type="hidden" name="id" value={o.id} />
          <div className="grid grid-cols-2 gap-3">
            <label className={lab}>Payment status<select name="payment" defaultValue={o.payment} className={input}>{PAYMENT.map((p) => <option key={p}>{p}</option>)}</select></label>
            <label className={lab}>Fulfilment<select name="fulfilment" defaultValue={o.fulfilment} className={input}>{FULFILMENT.map((f) => <option key={f}>{f}</option>)}</select></label>
          </div>
          <label className={lab}>Payment reference<input name="paymentRef" maxLength={40} defaultValue={o.paymentRef} className={input} /></label>
          <label className={lab}>Note<textarea name="note" rows={2} maxLength={200} defaultValue={o.note} className={input} /></label>
          {alert(error)}
          <button type="submit" disabled={pending} className={`${btn.gold} justify-center disabled:opacity-70`}>{pending ? 'Saving…' : 'Save changes'}</button>
        </form>
      ) : <div>{row('Payment', <StatusBadge value={o.payment} />)}{row('Fulfilment', o.fulfilment)}{o.paymentRef && row('Payment reference', o.paymentRef)}{o.note && row('Note', o.note)}</div>}
    </div>
  )
}
