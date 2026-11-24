import { notFound, redirect } from 'next/navigation'
import { setReviewStatus, setTicketStatus } from '@/app/admin/shop-actions'
import PageHeader, { btn } from '@/components/admin/ui/PageHeader'
import ShopTable, { type Col } from '@/components/admin/shop/ShopTable'
import { can, shopModule } from '@/lib/admin/permissions'
import { requireModule } from '@/lib/server/auth'
import { adminLists } from '@/lib/server/shop-admin'

export const dynamic = 'force-dynamic'

const sel = 'rounded-lg border border-line bg-white px-2 py-1.5 text-xs font-medium text-navy-deep'
const mini = `${btn.ghost} !px-3 !py-1.5 text-xs`
const hidden = (n: string, v: string | number | null) => <input type="hidden" name={n} value={String(v)} />
const opts = (list: string[]) => list.map((o) => <option key={o}>{o}</option>)

const screens: Record<string, { title: string; subtitle: string; cols: Col[] }> = {
  tickets: { title: 'Customer tickets', subtitle: 'Support requests from customers.', cols: [{ key: 'ref', header: 'Ticket' }, { key: 'customer', header: 'Customer' }, { key: 'subject', header: 'Subject' }, { key: 'message', header: 'Message', wide: true }, { key: 'priority', header: 'Priority', badge: true }, { key: 'status', header: 'Status', badge: true }, { key: 'date', header: 'Date' }] },
  reviews: { title: 'Review queue', subtitle: 'Approve or reject customer reviews.', cols: [{ key: 'product', header: 'Product' }, { key: 'customer', header: 'Customer' }, { key: 'rating', header: 'Rating' }, { key: 'feedback', header: 'Feedback', wide: true }, { key: 'status', header: 'Status', badge: true }] },
  customers: { title: 'Shop customers', subtitle: 'Registered customer accounts.', cols: [{ key: 'name', header: 'Name' }, { key: 'email', header: 'Email' }, { key: 'phone', header: 'Phone' }, { key: 'status', header: 'Status', badge: true }, { key: 'joined', header: 'Joined' }, { key: 'orders', header: 'Orders' }, { key: 'spent', header: 'Paid', money: true }] },
}

export default async function Page({ params }: { params: Promise<{ kind: string }> }) {
  const { kind } = await params
  if (kind === 'orders') redirect('/admin/orders')
  if (kind === 'customers') redirect('/admin/shop/customers')
  const screen = screens[kind]
  const module = shopModule[kind]
  if (!screen || !module) notFound()
  const admin = await requireModule(module)
  const write = can(admin.role, module, 'write')
  const rows = await adminLists[kind as keyof typeof adminLists]()

  const actions = !write ? undefined : {
    tickets: (r: Record<string, string | number | null>) => (
      <form action={setTicketStatus} className="flex items-center gap-1.5">{hidden('id', r.id)}<select name="status" defaultValue={String(r.status)} className={sel}>{opts(['Open', 'In progress', 'Resolved', 'Closed'])}</select><button type="submit" className={mini}>Save</button></form>),
    reviews: (r: Record<string, string | number | null>) => (
      <form action={setReviewStatus} className="flex items-center gap-1.5">{hidden('id', r.id)}<select name="status" defaultValue={String(r.status)} className={sel}>{opts(['Pending', 'Published', 'Rejected'])}</select><button type="submit" className={mini}>Save</button></form>),
    customers: undefined,
  }[kind]

  return (
    <>
      <PageHeader title={screen.title} subtitle={screen.subtitle} />
      <ShopTable cols={screen.cols} rows={rows as never} actions={actions} empty="Nothing here yet." />
    </>
  )
}
