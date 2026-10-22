import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Card from '@/components/admin/ui/Card'
import PageHeader from '@/components/admin/ui/PageHeader'
import { sections } from '@/lib/account/sections'
import { requireCustomer } from '@/lib/server/customer'
import { counts } from '@/lib/server/shop'

export const metadata = { title: 'My account' }

export default async function Page() {
  const c = await requireCustomer()
  const n = await counts(c.userId)
  const stats = [['Total orders', n.orders], ['Active products', n.owned], ['Pending deliveries', n.pending], ['Active licences', n.owned]]
  return (
    <>
      <PageHeader title={`Welcome, ${c.name.split(' ')[0] || 'there'}`} subtitle="Orders, downloads and licences in one place." />
      <div className="mb-6 grid grid-cols-2 gap-4 min-[1025px]:grid-cols-4">
        {stats.map(([k, v]) => (<Card key={k} className="px-5 py-4"><p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate">{k}</p><p className="mt-1 text-2xl font-medium tracking-[-0.03em] text-navy-deep">{String(v)}</p></Card>))}
      </div>
      <div className="grid gap-4 min-[601px]:grid-cols-2 min-[1025px]:grid-cols-3">
        {sections.filter((s) => s.slug).map(({ slug, label, icon: Icon }) => (
          <Link key={slug} href={`/account/${slug}`} className="group flex items-center justify-between rounded-[14px] border border-line bg-white px-5 py-4 text-sm font-semibold text-navy-deep transition hover:border-gold/50 hover:shadow-[0_8px_20px_rgba(27,42,74,0.06)]">
            <span className="flex items-center gap-3"><Icon size={18} className="text-gold" />{label}</span><ArrowRight size={15} className="text-muted transition group-hover:translate-x-0.5" />
          </Link>
        ))}
      </div>
    </>
  )
}
