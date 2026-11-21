import LicensesView from '@/components/admin/licenses/LicensesView'
import { can } from '@/lib/admin/permissions'
import { requireModule } from '@/lib/server/auth'
import { activityLogs, customerChoices, licenseOverview, packagesData, productChoicesAll } from '@/lib/server/licenses'

export const metadata = { title: 'Licenses & Downloads' }
export const dynamic = 'force-dynamic'

export default async function Page() {
  const admin = await requireModule('licenses')
  const [o, logs, pk, customers, products] = await Promise.all([licenseOverview(), activityLogs(), packagesData(), customerChoices(), productChoicesAll()])
  return <LicensesView o={o} logs={logs} pk={pk} customers={customers} products={products} write={can(admin.role, 'licenses', 'write')} />
}
