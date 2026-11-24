import type { Metadata } from 'next'
import ShopCustomersView from '@/components/admin/shop/customers/ShopCustomersView'
import { can } from '@/lib/admin/permissions'
import { requireModule } from '@/lib/server/auth'
import { getShopCustomersOverview } from '@/lib/server/shop-customers'

export const metadata: Metadata = {
  title: 'Shop Customers',
}

export const dynamic = 'force-dynamic'

export default async function Page() {
  const admin = await requireModule('customers')
  const overview = await getShopCustomersOverview()
  const write = can(admin.role, 'customers', 'write')

  return <ShopCustomersView data={overview} write={write} />
}
