import type { Metadata } from 'next'
import { can } from '@/lib/admin/permissions'
import { requireModule } from '@/lib/server/auth'
import { getCouponsOverview } from '@/lib/server/coupons'
import CouponsView from '@/components/admin/coupons/CouponsView'

export const metadata: Metadata = {
  title: 'Coupons & Promotions',
}

export const dynamic = 'force-dynamic'

export default async function Page() {
  const admin = await requireModule('coupons')
  const overview = await getCouponsOverview()
  const write = can(admin.role, 'coupons', 'write')

  return <CouponsView initialData={overview} canWrite={write} />
}
