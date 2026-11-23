import { parseRange } from '@/lib/analytics-ranges'
import { requireModule } from '@/lib/server/auth'
import { dashboardData } from '@/lib/server/dashboard'
import { dashboardKpis } from '@/lib/server/dashboard-kpis'
import Dashboard from '@/components/admin/dashboard/Dashboard'

export const metadata = { title: 'Dashboard' }

export default async function Page({ searchParams }: { searchParams: Promise<{ range?: string }> }) {
  await requireModule('dashboard')
  const range = parseRange((await searchParams).range)
  const [d, k] = await Promise.all([dashboardData(), dashboardKpis(range)])
  return <Dashboard d={d} k={k} />
}
