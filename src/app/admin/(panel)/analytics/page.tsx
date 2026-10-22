import { requireModule } from '@/lib/server/auth'
import Analytics from '@/components/admin/analytics/Analytics'

export const metadata = { title: 'Analytics & Reports' }

export default async function Page() {
  await requireModule('analytics')
  return <Analytics />
}
