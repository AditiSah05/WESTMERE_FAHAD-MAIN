import Card from '@/components/admin/ui/Card'
import PageHeader from '@/components/admin/ui/PageHeader'
import { requireModule } from '@/lib/server/auth'
import { getHomeAbout } from '@/lib/server/content'
import { ratingSummary } from '@/lib/server/ratings'

export const metadata = { title: 'Visitor ratings' }
export const dynamic = 'force-dynamic'

export default async function Page() {
  await requireModule('reviews')
  const [r, home] = await Promise.all([ratingSummary(), getHomeAbout()])
  const labels = home.csat.labels
  const max = Math.max(1, ...r.counts)
  return (
    <>
      <PageHeader title="Visitor ratings" subtitle="Ratings left with the faces on the home page. One rating per visitor per day." />
      <div className="mb-6 grid max-w-[480px] grid-cols-2 gap-4">
        <Card className="px-5 py-4"><p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate">Average</p><p className="mt-1 text-2xl font-medium tracking-[-0.03em] text-navy-deep">{r.count ? `${r.average.toFixed(1)} / 5` : '-'}</p></Card>
        <Card className="px-5 py-4"><p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate">Ratings</p><p className="mt-1 text-2xl font-medium tracking-[-0.03em] text-navy-deep">{r.count}</p></Card>
      </div>
      <div className="grid max-w-[900px] gap-5 min-[769px]:grid-cols-2">
        <Card className="p-6">
          <h2 className="mb-4 text-lg font-medium tracking-[-0.02em] text-navy-deep">How people rated</h2>
          {[4, 3, 2, 1, 0].map((i) => (
            <div key={i} className="mb-2.5 flex items-center gap-3 text-sm font-medium text-slate">
              <span className="w-24 flex-none">{i + 1} · {labels[i] ?? ''}</span>
              <span className="h-2.5 flex-1 overflow-hidden rounded-full bg-mist"><span className="block h-full rounded-full bg-blue" style={{ width: `${(r.counts[i] / max) * 100}%` }} /></span>
              <span className="w-8 flex-none text-right text-navy-deep">{r.counts[i]}</span>
            </div>
          ))}
        </Card>
        <Card className="p-6">
          <h2 className="mb-4 text-lg font-medium tracking-[-0.02em] text-navy-deep">Latest</h2>
          {r.recent.length ? (
            <ul className="max-h-[260px] divide-y divide-line/70 overflow-y-auto text-sm font-medium">
              {r.recent.map((x, i) => <li key={i} className="flex justify-between py-2"><span className="text-navy-deep">{x.score} / 5 · {labels[x.score - 1] ?? ''}</span><span className="text-muted">{x.at}</span></li>)}
            </ul>
          ) : <p className="text-sm font-medium text-muted">No ratings yet.</p>}
        </Card>
      </div>
    </>
  )
}
