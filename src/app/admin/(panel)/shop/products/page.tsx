import { saveProduct } from '@/app/admin/shop-actions'
import ShopTable from '@/components/admin/shop/ShopTable'
import Card from '@/components/admin/ui/Card'
import PageHeader, { btn } from '@/components/admin/ui/PageHeader'
import { can } from '@/lib/admin/permissions'
import { requireModule } from '@/lib/server/auth'
import { adminLists } from '@/lib/server/shop-admin'

export const metadata = { title: 'Products' }
export const dynamic = 'force-dynamic'

const input = 'w-full rounded-lg border border-line bg-white px-3 py-2 text-sm font-medium text-navy-deep outline-none focus:border-blue-accent'
const label = 'text-[11px] font-bold uppercase tracking-[0.1em] text-[#718096]'
const CATEGORIES = ['Websites', 'Applications', 'Software & Tools', 'Custom development']
const KINDS = [['website', 'Ready-made website'], ['software', 'Software / app'], ['service', 'Custom project']]
type Row = Record<string, string | number | null>

const Field = ({ text, wide, children }: { text: string; wide?: boolean; children: React.ReactNode }) => (
  <label className={`flex flex-col gap-1.5 ${wide ? 'min-[769px]:col-span-2' : ''}`}>
    <span className={label}>{text}</span>{children}
  </label>
)

function ProductFields({ r }: { r?: Row }) {
  const v = (k: string) => String(r?.[k] ?? '')
  return (
    <>
      {r && <input type="hidden" name="id" value={v('id')} />}
      <Field text="Name"><input name="name" required maxLength={80} defaultValue={v('name')} className={input} /></Field>
      <Field text="Price (₹)"><input name="price" type="number" min={0} max={1000000} step={1} required defaultValue={v('price')} className={input} /></Field>
      <Field text="Shop category"><select name="category" defaultValue={v('category') || CATEGORIES[0]} className={input}>{CATEGORIES.map((c) => <option key={c}>{c}</option>)}</select></Field>
      <Field text="Type"><select name="kind" defaultValue={v('kind') || 'website'} className={input}>{KINDS.map(([val, l]) => <option key={val} value={val}>{l}</option>)}</select></Field>
      <Field text="In the customer shop"><select name="status" defaultValue={v('status') || 'Published'} className={input}><option>Published</option><option>Hidden</option></select></Field>
      <Field text="Shop tag (optional)"><input name="tag" maxLength={20} defaultValue={v('tag')} className={input} /></Field>
      <p className="border-t border-line pt-3 text-sm font-semibold text-navy-deep min-[769px]:col-span-2">Public Products page</p>
      <Field text="Show on the website"><select name="listed" defaultValue={v('listed') === 'yes' ? 'yes' : 'no'} className={input}><option value="yes">Yes, show on the Products page</option><option value="no">No, keep it off the website</option></select></Field>
      <Field text="Label on the card (e.g. Chrome Extension)"><input name="typeLabel" maxLength={40} defaultValue={v('typeLabel')} className={input} /></Field>
      <Field text="Short description" wide><textarea name="description" rows={2} maxLength={400} defaultValue={v('description')} className={input} /></Field>
      <Field text="Filter categories (comma separated)"><input name="categories" maxLength={200} defaultValue={v('categories')} className={input} /></Field>
      <Field text="Technologies (comma separated)"><input name="tech" maxLength={200} defaultValue={v('tech')} className={input} /></Field>
      <Field text="Who it is for"><input name="audience" maxLength={40} defaultValue={v('audience')} className={input} /></Field>
      <Field text="Cover image link (optional)"><input name="imageUrl" placeholder="https://" maxLength={300} defaultValue={v('imageUrl')} className={input} /></Field>
      <Field text="QR code image link (optional)"><input name="qrUrl" placeholder="https://" maxLength={300} defaultValue={v('qrUrl')} className={input} /></Field>
      <div className="min-[769px]:col-span-2"><button type="submit" className={btn.gold}>{r ? 'Save product' : 'Add product'}</button></div>
    </>
  )
}

export default async function Page() {
  const admin = await requireModule('products')
  const write = can(admin.role, 'products', 'write')
  const rows = (await adminLists.products()) as Row[]
  return (
    <>
      <PageHeader title="Products" subtitle='What you sell. "In the customer shop" controls buying; "Show on the website" controls the public Products page. Existing orders are never affected.' />
      {write && (
        <Card className="mb-5 p-5">
          <h2 className="mb-4 text-sm font-semibold text-navy-deep">Add a product</h2>
          <form action={saveProduct} className="grid gap-4 min-[769px]:grid-cols-2"><ProductFields /></form>
        </Card>
      )}
      <ShopTable
        empty="No products yet."
        rows={rows}
        cols={[{ key: 'name', header: 'Product' }, { key: 'category', header: 'Category' }, { key: 'price', header: 'Price', money: true }, { key: 'tag', header: 'Tag' }, { key: 'listed', header: 'On website' }, { key: 'status', header: 'Shop', badge: true }]}
        actions={write ? (r) => <details><summary className="cursor-pointer text-xs font-semibold text-blue">Edit</summary><form action={saveProduct} className="mt-3 grid min-w-[520px] gap-3 min-[769px]:grid-cols-2"><ProductFields r={r} /></form></details> : undefined}
      />
    </>
  )
}
