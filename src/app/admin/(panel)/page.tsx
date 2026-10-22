import { requireModule } from '@/lib/server/auth'
import Dashboard from '@/components/admin/dashboard/Dashboard'

export const metadata = { title: 'Dashboard' }

export default async function Page() {
  await requireModule('dashboard')
  return <Dashboard />
}
