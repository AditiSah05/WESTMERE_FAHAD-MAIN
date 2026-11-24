'use client'

import { useActionState } from 'react'
import { resetImage, uploadImage } from '@/app/admin/content-actions'
import { btn } from '@/components/admin/ui/PageHeader'
import type { ImageSlot } from '@/lib/media-slots'
import { Msg } from './form'

/** One replaceable picture: current preview, a file picker and a way back to the original. */
export default function ImageSlotCard({ slot, current, custom, canWrite }: { slot: ImageSlot; current: string; custom: boolean; canWrite: boolean }) {
  const [state, upload, uploading] = useActionState(uploadImage.bind(null, slot.slot), undefined)
  const [back, reset, resetting] = useActionState(resetImage.bind(null, slot.slot), undefined)
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-line/70 bg-[#fafbfe] p-4">
      {/* eslint-disable-next-line @next/next/no-img-element -- admin preview of whatever is currently live */}
      <img src={current} alt={slot.label} className="aspect-[4/3] w-full rounded-lg border border-line object-cover" />
      <div>
        <p className="text-sm font-semibold text-navy-deep">{slot.label}</p>
        <p className="text-xs font-medium text-muted">{slot.where}{custom ? ' · custom picture' : ' · original picture'}</p>
      </div>
      {canWrite && (
        <>
          <form action={upload} className="flex flex-col gap-2">
            <input name="file" type="file" accept="image/jpeg,image/png,image/webp" required aria-label={`New picture for ${slot.label}`} className="block w-full text-xs font-medium text-slate file:mr-3 file:rounded-md file:border-0 file:bg-navy-deep file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-white" />
            <button type="submit" disabled={uploading} className={`${btn.gold} !py-1.5 text-xs disabled:opacity-70`}>{uploading ? 'Uploading…' : 'Upload'}</button>
          </form>
          {custom && <form action={reset}><button type="submit" disabled={resetting} className={`${btn.ghost} !py-1.5 text-xs`}>Use the original</button></form>}
          <Msg s={state ?? back} />
        </>
      )}
    </div>
  )
}
