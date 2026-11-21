import type { Metadata } from 'next'
import CrmView from '@/components/admin/crm/CrmView'
import { can } from '@/lib/admin/permissions'
import { requireModule } from '@/lib/server/auth'
import { getCrmOverview } from '@/lib/server/crm'

export const metadata: Metadata = {
  title: 'Customers / CRM',
}

export const dynamic = 'force-dynamic'

export default async function Page() {
  const admin = await requireModule('customers')
  const overview = await getCrmOverview()
  const write = can(admin.role, 'customers', 'write')

  return <CrmView data={overview} write={write} />
}
