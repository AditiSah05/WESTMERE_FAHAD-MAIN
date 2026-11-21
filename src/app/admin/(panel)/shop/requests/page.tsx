import RefundsView from '@/components/admin/refunds/RefundsView'
import { can } from '@/lib/admin/permissions'
import { requireModule } from '@/lib/server/auth'
import { refundableOrders, refundsOverview } from '@/lib/server/refunds'

export const metadata = { title: 'Refund requests' }
export const dynamic = 'force-dynamic'

export default async function Page() {
  const admin = await requireModule('orders')
  const [o, orders] = await Promise.all([refundsOverview(), refundableOrders()])
  return <RefundsView o={o} orders={orders} write={can(admin.role, 'orders', 'write')} />
}
