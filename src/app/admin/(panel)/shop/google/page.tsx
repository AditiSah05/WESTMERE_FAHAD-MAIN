import { ExternalLink, Star } from 'lucide-react'
import Card from '@/components/admin/ui/Card'
import PageHeader from '@/components/admin/ui/PageHeader'
import { requireModule } from '@/lib/server/auth'
import { googleReviews } from '@/lib/server/google-reviews'

export const metadata = { title: 'Google reviews' }
export const dynamic = 'force-dynamic'

const Stars = ({ n }: { n: number }) => (
  <span className="inline-flex gap-0.5" role="img" aria-label={`${n} out of 5`}>
    {[1, 2, 3, 4, 5].map((i) => <Star key={i} size={14} className={i <= Math.round(n) ? 'fill-gold text-gold' : 'text-line'} />)}
  </span>
)

export default async function Page() {
  await requireModule('reviews')
  const g = await googleReviews()

  if (g.state !== 'ok') {
    return (
      <>
        <PageHeader title="Google reviews" subtitle="Reviews from your Google Business Profile." />
        <Card className="max-w-[720px] p-6">
          {g.state === 'error' ? <p role="alert" className="text-sm font-medium text-[#b91c1c]">{g.message}</p> : (
            <>
              <h2 className="mb-3 text-lg font-medium tracking-[-0.02em] text-navy-deep">Not connected yet</h2>
              <ol className="list-decimal space-y-1.5 pl-5 text-sm font-medium text-slate">
                <li>In Google Cloud, enable <b>Places API (New)</b> and create an API key.</li>
                <li>Find the business&apos;s Place ID (Google&apos;s Place ID Finder, searching the business name).</li>
                <li>Set <code>GOOGLE_PLACES_API_KEY</code> and <code>GOOGLE_PLACE_ID</code> in the environment, then redeploy.</li>
              </ol>
            </>
          )}
        </Card>
      </>
    )
  }

  return (
    <>
      <PageHeader title="Google reviews" subtitle={`${g.name}. Google shares the 5 most relevant reviews; open Google for the full list.`} />
      <div className="mb-6 grid grid-cols-2 gap-4 max-w-[480px]">
        <Card className="px-5 py-4"><p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate">Rating</p><p className="mt-1 text-2xl font-medium tracking-[-0.03em] text-navy-deep">{g.rating.toFixed(1)}</p></Card>
        <Card className="px-5 py-4"><p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate">Reviews</p><p className="mt-1 text-2xl font-medium tracking-[-0.03em] text-navy-deep">{g.count}</p></Card>
      </div>
      {g.mapsUri && <a href={g.mapsUri} target="_blank" rel="noopener noreferrer" className="mb-5 inline-flex items-center gap-1.5 text-sm font-semibold text-blue hover:underline">All reviews on Google <ExternalLink size={14} /></a>}
      {!g.reviews.length ? <Card className="p-6 text-sm font-medium text-muted">No reviews returned yet.</Card> : (
        <div className="grid gap-4 min-[1025px]:grid-cols-2">
          {g.reviews.map((r) => (
            <Card key={r.id} className="p-5">
              <div className="mb-2 flex items-center justify-between gap-3">
                {r.link ? <a href={r.link} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-navy-deep hover:underline">{r.author}</a> : <span className="text-sm font-semibold text-navy-deep">{r.author}</span>}
                <span className="text-xs font-medium text-muted">{r.when}</span>
              </div>
              <Stars n={r.rating} />
              {r.text && <p className="mt-3 text-sm font-medium leading-relaxed text-slate">{r.text}</p>}
            </Card>
          ))}
        </div>
      )}
    </>
  )
}
