import CategoriesView from '@/components/admin/categories/CategoriesView'
import { can } from '@/lib/admin/permissions'
import { requireModule } from '@/lib/server/auth'
import { listCategories, productChoices } from '@/lib/server/categories'

export const metadata = { title: 'Categories & Collections' }
export const dynamic = 'force-dynamic'

export default async function Page() {
  const admin = await requireModule('categories')
  const { rows, unassigned, collections, handPicked, growth } = await listCategories()
  return <CategoriesView rows={rows} unassigned={unassigned} collections={collections} handPicked={handPicked} growth={growth} products={await productChoices()} write={can(admin.role, 'categories', 'write')} />
}
