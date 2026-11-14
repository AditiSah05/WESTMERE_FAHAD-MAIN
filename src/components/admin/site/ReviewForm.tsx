'use client'

import { useActionState } from 'react'
import { addReview } from '@/app/admin/site-actions'
import { cn } from '@/lib/cn'
import Card from '../ui/Card'
import { btn } from '../ui/PageHeader'
import { Msg } from './SiteForms'

const input = 'w-full rounded-[10px] border border-line bg-[#fafbfe] px-3.5 py-2.5 text-sm font-medium text-navy-deep outline-none focus:border-blue-accent focus:bg-white'
const label = 'text-[11px] font-bold uppercase tracking-[0.1em] text-[#718096]'

export default function ReviewForm() {
  const [state, action, pending] = useActionState(addReview, undefined)
  return (
    <Card className="mb-6 max-w-[760px] p-6">
      <h2 className="mb-1 text-lg font-medium tracking-[-0.02em] text-navy-deep">Add a review</h2>
      <p className="mb-5 text-sm font-medium text-muted">Copy a real review (for example from Google) with the client&apos;s permission. It stays hidden until you approve it.</p>
      <form action={action} className="grid gap-4 min-[769px]:grid-cols-2">
        <label className="flex flex-col gap-1.5"><span className={label}>Name</span><input name="name" required maxLength={80} className={input} /></label>
        <label className="flex flex-col gap-1.5"><span className={label}>Role or company (optional)</span><input name="role" maxLength={80} className={input} /></label>
        <label className="flex flex-col gap-1.5"><span className={label}>Rating</span><select name="rating" defaultValue="5" className={input}>{[5, 4, 3, 2, 1].map((n) => <option key={n} value={n}>{n} / 5</option>)}</select></label>
        <label className="flex flex-col gap-1.5"><span className={label}>Source</span><select name="source" className={input}><option>Google</option><option>Website</option><option>Manual</option></select></label>
        <label className="flex flex-col gap-1.5 min-[769px]:col-span-2"><span className={label}>Photo link (optional)</span><input name="photo" placeholder="https://" inputMode="url" maxLength={300} className={input} /></label>
        <label className="flex flex-col gap-1.5 min-[769px]:col-span-2"><span className={label}>Review</span><textarea name="body" required rows={3} maxLength={600} className={input} /></label>
        <div className="grid gap-3 min-[769px]:col-span-2"><Msg s={state} /><div><button type="submit" disabled={pending} className={cn(btn.gold, 'disabled:opacity-70')}>{pending ? 'Adding…' : 'Add review'}</button></div></div>
      </form>
    </Card>
  )
}
