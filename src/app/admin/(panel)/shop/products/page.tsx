import ProductsView from '@/components/admin/shop/ProductsView'
import type { Product } from '@/components/admin/shop/ProductForm'
import { can } from '@/lib/admin/permissions'
import { requireModule } from '@/lib/server/auth'
import { adminLists } from '@/lib/server/shop-admin'

export const metadata = { title: 'Products' }
export const dynamic = 'force-dynamic'

export default async function Page({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const admin = await requireModule('products')
  const rows = (await adminLists.products()) as unknown as Product[]
  return <ProductsView rows={rows} write={can(admin.role, 'products', 'write')} initialQ={((await searchParams).q ?? '').slice(0, 60)} />
}
