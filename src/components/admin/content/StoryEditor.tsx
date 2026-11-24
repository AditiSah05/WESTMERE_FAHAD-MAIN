'use client'

import { useActionState } from 'react'
import { saveStory } from '@/app/admin/content-actions'
import Card from '@/components/admin/ui/Card'
import { btn } from '@/components/admin/ui/PageHeader'
import type { Story } from '@/lib/server/content'
import { Msg, field } from './form'

/** The text behind "Read our story". Leave a blank line between paragraphs. */
export default function StoryEditor({ initial, canWrite }: { initial: Story; canWrite: boolean }) {
  const [state, action, pending] = useActionState(saveStory, undefined)
  return (
    <Card className="max-w-[900px] p-6">
      <h2 className="mb-1 text-lg font-medium tracking-[-0.02em] text-navy-deep">Our story page</h2>
      <p className="mb-5 text-sm font-medium text-muted">Shown at /story. Leave a blank line between paragraphs.</p>
      <form action={action} className="grid gap-4">
        <label className="flex flex-col gap-1.5"><span className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#718096]">Title</span><input name="title" defaultValue={initial.title} maxLength={80} readOnly={!canWrite} className={field} /></label>
        <label className="flex flex-col gap-1.5"><span className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#718096]">Story</span><textarea name="body" defaultValue={initial.paragraphs.join('\n\n')} rows={10} maxLength={6000} readOnly={!canWrite} className={`${field} leading-relaxed`} /></label>
        <Msg s={state} />
        {canWrite && <div><button type="submit" disabled={pending} className={`${btn.gold} disabled:opacity-70`}>{pending ? 'Saving…' : 'Save changes'}</button></div>}
      </form>
    </Card>
  )
}
