import type { Metadata } from 'next'
import { can } from '@/lib/admin/permissions'
import { requireModule } from '@/lib/server/auth'
import { getSubscriptionsOverview } from '@/lib/server/subscriptions'
import SubscriptionsView from '@/components/admin/subscriptions/SubscriptionsView'

export const metadata: Metadata = {
  title: 'Subscriptions Management',
}

export const dynamic = 'force-dynamic'

export default async function Page() {
  const admin = await requireModule('subscriptions')
  const overview = await getSubscriptionsOverview()
  const write = can(admin.role, 'subscriptions', 'write')

  return <SubscriptionsView initialData={overview} canWrite={write} />
}
