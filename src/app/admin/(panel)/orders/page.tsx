import OrdersView from '@/components/admin/orders/OrdersView'
import { can } from '@/lib/admin/permissions'
import { requireModule } from '@/lib/server/auth'
import { customerChoices } from '@/lib/server/licenses'
import { ordersOverview, productPrices } from '@/lib/server/orders'

export const metadata = { title: 'Orders' }
export const dynamic = 'force-dynamic'

export default async function Page({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const admin = await requireModule('orders')
  const [o, customers, products] = await Promise.all([ordersOverview(), customerChoices(), productPrices()])
  return <OrdersView o={o} customers={customers} products={products} write={can(admin.role, 'orders', 'write')} initialQ={((await searchParams).q ?? '').slice(0, 60)} />
}
