'use client'

import { useActionState } from 'react'
import { createTicket } from '@/app/account/shop-actions'
import Card from '@/components/admin/ui/Card'
import { btn } from '@/components/admin/ui/PageHeader'
import { cn } from '@/lib/cn'

const input = 'w-full rounded-[10px] border border-line bg-[#fafbfe] px-3.5 py-2.5 text-sm font-medium text-navy-deep outline-none focus:border-blue-accent focus:bg-white'
const label = 'text-[11px] font-bold uppercase tracking-[0.1em] text-[#718096]'

export default function TicketForm() {
  const [state, action, pending] = useActionState(createTicket, undefined)
  return (
    <Card className="mb-6 p-6">
      <h2 className="mb-4 text-lg font-medium tracking-[-0.02em] text-navy-deep">Create a ticket</h2>
      <form action={action} className="grid gap-4 min-[769px]:grid-cols-2">
        <label className="flex flex-col gap-1.5 min-[769px]:col-span-2"><span className={label}>Subject</span><input name="subject" required maxLength={120} className={input} /></label>
        <label className="flex flex-col gap-1.5"><span className={label}>Type</span><select name="type" className={input}>{['Technical issue', 'Installation help', 'Bug report', 'Billing', 'Other'].map((t) => <option key={t}>{t}</option>)}</select></label>
        <label className="flex flex-col gap-1.5"><span className={label}>Priority</span><select name="priority" className={input}>{['Low', 'Medium', 'High'].map((t) => <option key={t}>{t}</option>)}</select></label>
        <label className="flex flex-col gap-1.5 min-[769px]:col-span-2"><span className={label}>Describe the issue</span><textarea name="message" required rows={4} maxLength={4000} className={input} /></label>
        {state?.error && <p role="alert" className="rounded-lg bg-[#ef4444]/10 px-3 py-2.5 text-sm font-medium text-[#b91c1c] min-[769px]:col-span-2">{state.error}</p>}
        {state?.ok && <p role="status" className="rounded-lg bg-[#10b981]/10 px-3 py-2.5 text-sm font-medium text-[#047857] min-[769px]:col-span-2">{state.ok}</p>}
        <div className="min-[769px]:col-span-2"><button type="submit" disabled={pending} className={cn(btn.gold, 'disabled:opacity-70')}>{pending ? 'Sending…' : 'Submit ticket'}</button></div>
      </form>
    </Card>
  )
}
