import type { Metadata } from 'next'
import { can } from '@/lib/admin/permissions'
import { requireModule } from '@/lib/server/auth'
import { getCmsOverview } from '@/lib/server/cms'
import CmsView from '@/components/admin/cms/CmsView'

export const metadata: Metadata = {
  title: 'Website / CMS',
}

export const dynamic = 'force-dynamic'

export default async function Page() {
  const admin = await requireModule('cms')
  const overview = await getCmsOverview()
  const write = can(admin.role, 'cms', 'write')

  return <CmsView initialData={overview} canWrite={write} />
}
