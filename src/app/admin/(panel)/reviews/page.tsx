import type { Metadata } from 'next'
import { can } from '@/lib/admin/permissions'
import { requireModule } from '@/lib/server/auth'
import { getReviewsOverview } from '@/lib/server/reviews'
import ReviewsView from '@/components/admin/reviews/ReviewsView'

export const metadata: Metadata = {
  title: 'Reviews & Ratings',
}

export const dynamic = 'force-dynamic'

export default async function Page() {
  const admin = await requireModule('reviews')
  const overview = await getReviewsOverview()
  const write = can(admin.role, 'reviews', 'write')

  return <ReviewsView initialData={overview} canWrite={write} />
}
