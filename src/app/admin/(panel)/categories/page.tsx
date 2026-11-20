import CategoriesView from '@/components/admin/categories/CategoriesView'
import { can } from '@/lib/admin/permissions'
import { requireModule } from '@/lib/server/auth'
import { listCategories } from '@/lib/server/categories'

export const metadata = { title: 'Categories & Collections' }
export const dynamic = 'force-dynamic'

export default async function Page() {
  const admin = await requireModule('categories')
  const { rows, unassigned, collections } = await listCategories()
  return <CategoriesView rows={rows} unassigned={unassigned} collections={collections} write={can(admin.role, 'categories', 'write')} />
}
