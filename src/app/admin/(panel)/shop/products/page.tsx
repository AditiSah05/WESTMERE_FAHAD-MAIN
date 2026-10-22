import { saveProduct } from '@/app/admin/shop-actions'
import ShopTable from '@/components/admin/shop/ShopTable'
import Card from '@/components/admin/ui/Card'
import PageHeader, { btn } from '@/components/admin/ui/PageHeader'
import { can } from '@/lib/admin/permissions'
import { requireModule } from '@/lib/server/auth'
import { adminLists } from '@/lib/server/shop-admin'

export const metadata = { title: 'Products' }
export const dynamic = 'force-dynamic'

const input = 'rounded-lg border border-line bg-white px-2.5 py-1.5 text-sm font-medium text-navy-deep'
const CATEGORIES = ['Websites', 'Applications', 'Software & Tools', 'Custom development']
const KINDS = [['website', 'Ready-made website'], ['software', 'Software / app'], ['service', 'Custom project']]
type Row = Record<string, string | number | null>

function Fields({ r }: { r?: Row }) {
  return (
    <>
      {r && <input type="hidden" name="id" value={String(r.id)} />}
      <input name="name" required maxLength={80} defaultValue={String(r?.name ?? '')} placeholder="Name" className={`${input} w-48`} />
      <select name="category" defaultValue={String(r?.category ?? CATEGORIES[0])} className={input}>{CATEGORIES.map((c) => <option key={c}>{c}</option>)}</select>
      <select name="kind" defaultValue={String(r?.kind ?? 'website')} className={input}>{KINDS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select>
      <input name="price" type="number" min={0} max={1000000} step={1} required defaultValue={String(r?.price ?? '')} placeholder="₹ price" className={`${input} w-28`} />
      <input name="tag" maxLength={20} defaultValue={String(r?.tag ?? '')} placeholder="Tag" className={`${input} w-28`} />
      <select name="status" defaultValue={String(r?.status ?? 'Published')} className={input}><option>Published</option><option>Hidden</option></select>
      <button type="submit" className={`${btn.gold} !px-3 !py-1.5 text-xs`}>{r ? 'Save' : 'Add product'}</button>
    </>
  )
}

export default async function Page() {
  const admin = await requireModule('products')
  const write = can(admin.role, 'products', 'write')
  const rows = (await adminLists.products()) as Row[]
  return (
    <>
      <PageHeader title="Products" subtitle="The catalogue customers see in the shop. Hidden products cannot be bought; existing orders are unaffected." />
      {write && <Card className="mb-5 p-5"><h2 className="mb-3 text-sm font-semibold text-navy-deep">Add a product</h2><form action={saveProduct} className="flex flex-wrap items-center gap-2"><Fields /></form></Card>}
      <ShopTable
        empty="No products yet."
        rows={rows}
        cols={[{ key: 'name', header: 'Product' }, { key: 'category', header: 'Category' }, { key: 'kind', header: 'Type' }, { key: 'price', header: 'Price', money: true }, { key: 'tag', header: 'Tag' }, { key: 'status', header: 'Status', badge: true }]}
        actions={write ? (r) => <details><summary className="cursor-pointer text-xs font-semibold text-blue">Edit</summary><form action={saveProduct} className="mt-2 flex flex-wrap items-center gap-2"><Fields r={r} /></form></details> : undefined}
      />
    </>
  )
}
