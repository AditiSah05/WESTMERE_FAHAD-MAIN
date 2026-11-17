import Card from '@/components/admin/ui/Card'
import { imageSlots } from '@/lib/media-slots'
import ImageSlotCard from './ImageSlotCard'

/** Server component: shows each slot's live picture. `urls` comes from getImages(). */
export default function ImagesEditor({ urls, canWrite }: { urls: Record<string, string>; canWrite: boolean }) {
  return (
    <Card className="mb-6 max-w-[900px] p-6">
      <h2 className="mb-1 text-lg font-medium tracking-[-0.02em] text-navy-deep">Site pictures</h2>
      <p className="mb-5 text-sm font-medium text-muted">Replace the photos on the home page and the Services page. JPEG, PNG or WebP, up to 3 MB. Landscape pictures (4:3 or 16:9) fit best. Product pictures are set in Products.</p>
      <div className="grid gap-4 min-[769px]:grid-cols-2 min-[1025px]:grid-cols-3">
        {imageSlots.map((s) => <ImageSlotCard key={s.slot} slot={s} current={urls[s.slot]} custom={urls[s.slot] !== s.fallback} canWrite={canWrite} />)}
      </div>
    </Card>
  )
}
