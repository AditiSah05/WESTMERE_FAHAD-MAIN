import { requireModule } from '@/lib/server/auth'
import { parseRange } from '@/lib/analytics-ranges'
import { analyticsData } from '@/lib/server/analytics'
import Analytics from '@/components/admin/analytics/Analytics'

export const metadata = { title: 'Analytics & Reports' }

export default async function Page({ searchParams }: { searchParams: Promise<{ range?: string }> }) {
  await requireModule('analytics')
  return <Analytics r={await analyticsData(parseRange((await searchParams).range))} />
}
