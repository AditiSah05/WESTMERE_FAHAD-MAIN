import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { OrderRequestForm, ReviewForm } from '@/components/account/ActionForms'
import DownloadsPanel from '@/components/account/DownloadsPanel'
import ProfileEditor from '@/components/account/ProfileEditor'
import { profileGroups } from '@/lib/account/profile-fields'
import ProductGrid from '@/components/account/ProductGrid'
import TicketForm from '@/components/account/TicketForm'
import ModuleView from '@/components/admin/ModuleView'
import { bySlug, sections } from '@/lib/account/sections'
import { requireCustomer } from '@/lib/server/customer'
import { customerDownloads } from '@/lib/server/licenses'
import { loadSection, products, wishlistIds } from '@/lib/server/shop'
import { loadMore, profile, requestRows, requestable, reviewable } from '@/lib/server/shop-more'

type Params = { params: Promise<{ section: string }> }

export const dynamicParams = false
export const generateStaticParams = () => sections.filter((s) => s.slug).map((s) => ({ section: s.slug }))

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  return { title: bySlug((await params).section)?.label ?? 'My account' }
}

/** Review form for received, not-yet-reviewed products (hides itself once none are left). */
async function ReviewsOpen({ userId }: { userId: string }) {
  return <ReviewForm products={await reviewable(userId)} />
}

export default async function Page({ params }: Params) {
  const s = bySlug((await params).section)
  if (!s?.slug) notFound()
  const c = await requireCustomer()
  if (s.details) return <ProfileEditor slug={s.slug} {...profileGroups[s.slug]} values={await profile(c.userId)} />
  if (s.slug === 'downloads') return <DownloadsPanel d={await customerDownloads(c.userId)} />
  if (s.slug === 'products') return <ProductGrid items={await products()} saved={await wishlistIds(c.userId)} />

  // Sections with a loader show this customer's own rows; the rest still show demo data.
  const real = (await loadSection(s.slug, c.userId)) ?? (await loadMore(s.slug, c.userId))
  if (real && s.slug === 'orders') real.refunds = await requestRows(c.userId)
  const config = s.table!
  const tabs = real ? config.tabs.filter((t) => t.key in real).map((t) => ({ ...t, rows: real[t.key] as typeof t.rows })) : config.tabs
  return (
    <>
      {s.slug === 'support' && <TicketForm />}
      {s.slug === 'orders' && <OrderRequestForm options={await requestable(c.userId)} />}
      {s.slug === 'my-products' && <ReviewsOpen userId={c.userId} />}
      <ModuleView key={tabs.map((t) => t.rows.map((r) => r.id).join()).join('|')} module={`account-${s.slug}`} {...config} tabs={tabs} canWrite={false} local />
      {s.slug === 'billing' && <div className="mt-10"><ProfileEditor slug="company" {...profileGroups.company} values={await profile(c.userId)} embedded /></div>}
    </>
  )
}
