import type { Metadata } from 'next'
import { can } from '@/lib/admin/permissions'
import { requireModule } from '@/lib/server/auth'
import { getPaymentsOverview } from '@/lib/server/payments'
import { PaymentsView } from '@/components/admin/payments/PaymentsView'

export const metadata: Metadata = {
  title: 'Payments & Finance',
}

export const dynamic = 'force-dynamic'

export default async function Page() {
  const admin = await requireModule('payments')
  const overview = await getPaymentsOverview()
  const write = can(admin.role, 'payments', 'write')

  return <PaymentsView initialData={overview} canWrite={write} />
}
