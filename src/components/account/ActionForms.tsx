'use client'

import { useActionState, useState } from 'react'
import { requestOrderChange, submitReview } from '@/app/account/more-actions'
import Card from '@/components/admin/ui/Card'
import { btn } from '@/components/admin/ui/PageHeader'

const input = 'w-full rounded-[10px] border border-line bg-[#fafbfe] px-3.5 py-2.5 text-sm font-medium text-navy-deep outline-none focus:border-blue-accent focus:bg-white'
const label = 'text-[11px] font-bold uppercase tracking-[0.1em] text-[#718096]'

const Msg = ({ s }: { s?: { error?: string; ok?: string } }) => (
  <>
    {s?.error && <p role="alert" className="rounded-lg bg-[#ef4444]/10 px-3 py-2.5 text-sm font-medium text-[#b91c1c]">{s.error}</p>}
    {s?.ok && <p role="status" className="rounded-lg bg-[#10b981]/10 px-3 py-2.5 text-sm font-medium text-[#047857]">{s.ok}</p>}
  </>
)

export function OrderRequestForm({ options }: { options: { id: string; label: string; kinds: string[] }[] }) {
  const [state, action, pending] = useActionState(requestOrderChange, undefined)
  const [id, setId] = useState(options[0]?.id ?? '')
  if (!options.length) return null
  const kinds = options.find((o) => o.id === id)?.kinds ?? []
  return (
    <Card className="mb-6 p-6">
      <h2 className="mb-4 text-lg font-medium tracking-[-0.02em] text-navy-deep">Request cancellation or refund</h2>
      <form action={action} className="grid gap-4 min-[769px]:grid-cols-2">
        <label className="flex flex-col gap-1.5"><span className={label}>Order</span><select name="orderId" value={id} onChange={(e) => setId(e.target.value)} className={input}>{options.map((o) => <option key={o.id} value={o.id}>{o.label}</option>)}</select></label>
        <label className="flex flex-col gap-1.5"><span className={label}>Request</span><select name="kind" key={id} className={input}>{kinds.map((k) => <option key={k}>{k}</option>)}</select></label>
        <label className="flex flex-col gap-1.5 min-[769px]:col-span-2"><span className={label}>Reason</span><textarea name="reason" required rows={3} maxLength={1000} className={input} /></label>
        <div className="flex flex-col gap-3 min-[769px]:col-span-2"><Msg s={state} /><div><button type="submit" disabled={pending} className={`${btn.ghost} disabled:opacity-70`}>{pending ? 'Sending…' : 'Send request'}</button></div></div>
      </form>
    </Card>
  )
}

export function ReviewForm({ products }: { products: { id: string; name: string }[] }) {
  const [state, action, pending] = useActionState(submitReview, undefined)
  return (
    <Card className="mb-6 p-6">
      <h2 className="mb-4 text-lg font-medium tracking-[-0.02em] text-navy-deep">Write a review</h2>
      {!products.length ? <p className="text-sm font-medium text-muted">Reviews open once you have received a product.</p> : (
        <form action={action} className="grid gap-4 min-[769px]:grid-cols-2">
          <label className="flex flex-col gap-1.5"><span className={label}>Product</span><select name="productId" className={input}>{products.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}</select></label>
          <label className="flex flex-col gap-1.5"><span className={label}>Rating</span><select name="rating" defaultValue="5" className={input}>{[5, 4, 3, 2, 1].map((n) => <option key={n} value={n}>{n} / 5</option>)}</select></label>
          <label className="flex flex-col gap-1.5 min-[769px]:col-span-2"><span className={label}>Feedback</span><textarea name="feedback" rows={3} maxLength={1000} className={input} /></label>
          <div className="flex flex-col gap-3 min-[769px]:col-span-2"><Msg s={state} /><div><button type="submit" disabled={pending} className={`${btn.gold} disabled:opacity-70`}>{pending ? 'Sending…' : 'Submit review'}</button></div></div>
        </form>
      )}
    </Card>
  )
}
