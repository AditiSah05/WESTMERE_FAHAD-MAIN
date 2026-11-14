import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { OrderRequestForm, ReviewForm } from '@/components/account/ActionForms'
import ProfileEditor from '@/components/account/ProfileEditor'
import { profileGroups } from '@/lib/account/profile-fields'
import ProductGrid from '@/components/account/ProductGrid'
import TicketForm from '@/components/account/TicketForm'
import ModuleView from '@/components/admin/ModuleView'
import { bySlug, sections } from '@/lib/account/sections'
import { requireCustomer } from '@/lib/server/customer'
import { loadSection, products, wishlistIds } from '@/lib/server/shop'
import { loadMore, profile, requestRows, requestable, reviewable } from '@/lib/server/shop-more'

type Params = { params: Promise<{ section: string }>; searchParams?: Promise<{ need?: string }> }

export const dynamicParams = false
export const generateStaticParams = () => sections.filter((s) => s.slug).map((s) => ({ section: s.slug }))

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  return { title: bySlug((await params).section)?.label ?? 'My account' }
}

export default async function Page({ params, searchParams }: Params) {
  const s = bySlug((await params).section)
  if (!s?.slug) notFound()
  const c = await requireCustomer()
  if (s.details) return <ProfileEditor slug={s.slug} {...profileGroups[s.slug]} values={await profile(c.userId)} note={(await searchParams)?.need === 'phone' ? 'Add your mobile number to place an order. We send order confirmations to it.' : undefined} />
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
      {s.slug === 'my-products' && <ReviewForm products={await reviewable(c.userId)} />}
      <ModuleView key={tabs.map((t) => t.rows.map((r) => r.id).join()).join('|')} module={`account-${s.slug}`} {...config} tabs={tabs} canWrite={false} local />
    </>
  )
}
