'use client'

import { useEffect, useState } from 'react'
import { changeRefund, createRefundRequest, getRefundEvents } from '@/app/admin/refund-actions'
import { REASONS, REQUEST_KINDS, nextStatuses, statusLabel, statusTone } from '@/lib/refund-shared'
import type { Refund } from '@/lib/server/refunds'
import { btn } from '../ui/PageHeader'
import StatusBadge from '../ui/StatusBadge'
import { useServerForm } from '../ui/useServerForm'

const input = 'w-full rounded-lg border border-line bg-white px-3 py-2 text-sm font-medium text-navy-deep outline-none focus:border-gold'
const lab = 'flex flex-col gap-1 text-[11px] font-bold uppercase tracking-[0.1em] text-[#718096]'
const alert = (m?: string) => m && <p role="alert" className="rounded-lg bg-[#ef4444]/10 px-3 py-2 text-sm font-medium text-[#b91c1c]">{m}</p>

export function ProcessRefundForm({ orders, onDone }: { orders: { id: string; label: string; amount: number }[]; onDone: () => void }) {
  const { onSubmit, pending, error } = useServerForm(createRefundRequest, onDone)
  const [amount, setAmount] = useState('')
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <p className="rounded-lg bg-sky p-3 text-xs font-medium text-slate">Use this when a customer asks for a refund or cancellation outside the site, for example on WhatsApp. It starts as Pending Review.</p>
      <label className={lab}>Order<select name="order" required defaultValue="" onChange={(e) => setAmount(String(orders.find((o) => o.id === e.target.value)?.amount ?? ''))} className={input}><option value="" disabled>Choose an order</option>{orders.map((o) => <option key={o.id} value={o.id}>{o.label}</option>)}</select></label>
      <div className="grid grid-cols-2 gap-3">
        <label className={lab}>Type<select name="kind" defaultValue="Refund" className={input}>{REQUEST_KINDS.map((k) => <option key={k}>{k}</option>)}</select></label>
        <label className={lab}>Refund amount (₹)<input name="amount" type="number" min={1} value={amount} onChange={(e) => setAmount(e.target.value)} className={input} /></label>
      </div>
      <label className={lab}>Reason<select name="reasonType" defaultValue="Other" className={input}>{REASONS.map((r) => <option key={r}>{r}</option>)}</select></label>
      <label className={lab}>Note<textarea name="reason" required rows={3} maxLength={1000} className={input} /></label>
      {alert(error)}
      <button type="submit" disabled={pending} className={`${btn.gold} justify-center disabled:opacity-70`}>{pending ? 'Saving…' : 'Open refund request'}</button>
    </form>
  )
}

export function RefundDetail({ r, write, onDone }: { r: Refund; write: boolean; onDone: () => void }) {
  const { onSubmit, pending, error } = useServerForm(changeRefund, onDone)
  const [events, setEvents] = useState<{ event: string; note: string; at: string }[] | null>(null)
  useEffect(() => { getRefundEvents(r.id).then(setEvents).catch(() => setEvents([])) }, [r.id, r.status])
  const next = nextStatuses(r.status, r.orderPayment)
  const row = (a: string, b: React.ReactNode) => <div className="flex justify-between gap-4 border-b border-line/60 py-2 text-sm font-medium"><span className="text-muted">{a}</span><span className="text-right text-navy-deep">{b}</span></div>
  return (
    <div className="flex flex-col gap-5">
      <div>{row('Status', <StatusBadge value={statusLabel(r.status)} tone={statusTone(r.status)} />)}{row('Order', `#WM-${r.orderId} · ${r.product}`)}{row('Customer', `${r.customer} (${r.email})`)}{row('Type', r.kind)}{row('Original amount', `₹${r.orderAmount.toLocaleString('en-IN')}`)}{row('Refund amount', `₹${r.amount.toLocaleString('en-IN')}`)}{row('Order payment', r.orderPayment)}{row('Method', r.method)}{row('Reason', r.reasonType)}{r.refundRef && row('Refund reference', r.refundRef)}</div>
      <div><h3 className="mb-1 text-sm font-semibold text-navy-deep">Customer&apos;s note</h3><p className="rounded-lg bg-paper p-3 text-sm font-medium text-slate">{r.reason}</p>{r.adminNote && <p className="mt-2 text-xs font-medium text-muted">Team note: {r.adminNote}</p>}</div>
      {write && next.length > 0 && (
        <form onSubmit={onSubmit} className="flex flex-col gap-3 rounded-lg border border-line p-3">
          <input type="hidden" name="id" value={r.id} />
          <label className={lab}>Move to<select name="status" defaultValue={next[0]} className={input}>{next.map((s) => <option key={s} value={s}>{statusLabel(s)}</option>)}</select></label>
          <div className="grid grid-cols-2 gap-3">
            <label className={lab}>Refund amount (₹)<input name="amount" type="number" min={1} max={r.orderAmount} defaultValue={r.amount} className={input} /></label>
            <label className={lab}>Refund reference<input name="refundRef" maxLength={40} defaultValue={r.refundRef} placeholder="UPI / bank ref" className={input} /></label>
          </div>
          <label className={lab}>Note<textarea name="note" rows={2} maxLength={300} className={input} /></label>
          <p className="text-xs font-medium text-muted">Approving a full refund cancels the order and revokes its license. Marking it Refunded records that the money went back; return it by UPI or bank transfer first.</p>
          {alert(error)}
          <button type="submit" disabled={pending} className={`${btn.gold} justify-center disabled:opacity-70`}>{pending ? 'Saving…' : 'Update request'}</button>
        </form>
      )}
      <div><h3 className="mb-1 text-sm font-semibold text-navy-deep">History</h3>{!events ? <p className="text-sm text-muted">Loading…</p> : !events.length ? <p className="text-sm font-medium text-muted">No events yet.</p> : <ul className="text-sm font-medium text-navy-deep">{events.map((e) => <li key={e.at + e.event} className="flex justify-between gap-3 border-b border-line/60 py-1.5"><span>{e.event}{e.note && <span className="text-muted"> · {e.note}</span>}</span><span className="flex-none text-muted">{e.at}</span></li>)}</ul>}</div>
    </div>
  )
}
