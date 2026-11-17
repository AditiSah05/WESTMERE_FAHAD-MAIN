'use client'

import { useActionState } from 'react'
import { saveSocials } from '@/app/admin/content-actions'
import Card from '@/components/admin/ui/Card'
import { btn } from '@/components/admin/ui/PageHeader'
import type { Socials } from '@/lib/server/content'
import { Msg, field } from './form'

/** Links behind the social icons in the header menu, home page card and footer. */
export default function SocialsEditor({ initial, canWrite }: { initial: Socials; canWrite: boolean }) {
  const [state, action, pending] = useActionState(saveSocials, undefined)
  return (
    <Card className="mb-6 max-w-[900px] p-6">
      <h2 className="mb-1 text-lg font-medium tracking-[-0.02em] text-navy-deep">Social links</h2>
      <p className="mb-5 text-sm font-medium text-muted">Leave a field empty to hide that icon everywhere on the site.</p>
      <form action={action} className="grid gap-4">
        <label className="flex flex-col gap-1.5"><span className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#718096]">Instagram link</span><input name="instagram" type="url" defaultValue={initial.instagram} placeholder="https://www.instagram.com/yourpage/" maxLength={300} readOnly={!canWrite} className={field} /></label>
        <label className="flex flex-col gap-1.5"><span className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#718096]">Facebook link</span><input name="facebook" type="url" defaultValue={initial.facebook} placeholder="https://www.facebook.com/yourpage" maxLength={300} readOnly={!canWrite} className={field} /></label>
        <Msg s={state} />
        {canWrite && <div><button type="submit" disabled={pending} className={`${btn.gold} disabled:opacity-70`}>{pending ? 'Saving…' : 'Save changes'}</button></div>}
      </form>
    </Card>
  )
}
