import { requireModule } from '@/lib/server/auth'
import { analyticsData } from '@/lib/server/analytics'
import Analytics from '@/components/admin/analytics/Analytics'

export const metadata = { title: 'Analytics & Reports' }

export default async function Page() {
  await requireModule('analytics')
  return <Analytics r={await analyticsData()} />
}
