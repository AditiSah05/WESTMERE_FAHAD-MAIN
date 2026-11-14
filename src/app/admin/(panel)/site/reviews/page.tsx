import { Star } from 'lucide-react'
import { setSiteReview } from '@/app/admin/site-actions'
import ReviewForm from '@/components/admin/site/ReviewForm'
import Card from '@/components/admin/ui/Card'
import PageHeader, { btn } from '@/components/admin/ui/PageHeader'
import StatusBadge from '@/components/admin/ui/StatusBadge'
import { can } from '@/lib/admin/permissions'
import { requireModule } from '@/lib/server/auth'
import { db } from '@/lib/server/schema'

export const metadata = { title: 'Site reviews' }
export const dynamic = 'force-dynamic'

type Row = { id: string; name: string; role: string; rating: number; body: string; photo_url: string; source: string; status: string }
const mini = `${btn.ghost} !px-3 !py-1.5 text-xs`

export default async function Page() {
  const admin = await requireModule('cms')
  const write = can(admin.role, 'cms', 'write')
  const rows = await (await db()).query<Row>(`SELECT id::text, name, role, rating, body, photo_url, source, status FROM site_reviews ORDER BY (status = 'Pending') DESC, created_at DESC`)
  return (
    <>
      <PageHeader title="Site reviews" subtitle="Only approved reviews appear on the website: their photos and average rating show under the comparison section." />
      {write && <ReviewForm />}
      <div className="grid max-w-[760px] gap-4">
        {!rows.length && <Card className="p-8 text-center text-sm font-medium text-muted">No reviews yet. Until you approve one, the site shows no rating at all.</Card>}
        {rows.map((r) => (
          <Card key={r.id} className="p-5">
            <div className="mb-2 flex flex-wrap items-center gap-3">
              <span className="font-semibold text-navy-deep">{r.name}</span>
              {r.role && <span className="text-sm text-muted">{r.role}</span>}
              <span className="flex items-center gap-1 text-gold">{Array.from({ length: r.rating }, (_, i) => <Star key={i} size={13} fill="currentColor" strokeWidth={0} />)}</span>
              <span className="ml-auto flex items-center gap-2"><span className="text-xs font-semibold text-muted">{r.source}</span><StatusBadge value={r.status} /></span>
            </div>
            <p className="text-sm leading-relaxed text-[#4a5568]">{r.body}</p>
            {write && (
              <form action={setSiteReview} className="mt-4 flex flex-wrap gap-2">
                <input type="hidden" name="id" value={r.id} />
                {r.status !== 'Approved' && <button name="action" value="Approved" className={mini}>Approve</button>}
                {r.status !== 'Rejected' && <button name="action" value="Rejected" className={mini}>Reject</button>}
                {r.status === 'Approved' && <button name="action" value="Pending" className={mini}>Hide</button>}
                <button name="action" value="delete" className={`${btn.danger} !px-3 !py-1.5 text-xs`}>Delete</button>
              </form>
            )}
          </Card>
        ))}
      </div>
    </>
  )
}
