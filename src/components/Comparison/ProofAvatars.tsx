import type { PublicReview } from '@/lib/site-defaults'

const initial = (name: string) => name.trim().charAt(0).toUpperCase() || '?'

/** Overlapping faces of reviewers you approved in admin: their photo if given, otherwise their initial. */
export default function ProofAvatars({ reviews }: { reviews: PublicReview[] }) {
  const shown = reviews.slice(0, 4)
  return (
    <div className="flex items-center">
      {shown.map((r, i) => (
        <span
          key={r.id}
          title={r.name}
          className="relative flex size-[38px] flex-none items-center justify-center overflow-hidden rounded-full border-2 border-white bg-navy-deep text-sm font-bold text-white shadow-[0_2px_6px_rgba(0,0,0,0.1)]"
          style={{ marginLeft: i ? -10 : 0, zIndex: 10 - i }}
        >
          {r.photo ? (
            // eslint-disable-next-line @next/next/no-img-element -- review photos come from any https host, so they bypass next/image
            <img src={r.photo} alt={r.name} width={38} height={38} referrerPolicy="no-referrer" className="size-full object-cover" />
          ) : (
            initial(r.name)
          )}
        </span>
      ))}
    </div>
  )
}
