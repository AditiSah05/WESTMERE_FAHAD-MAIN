import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import DetailsView from '@/components/account/Details'
import ModuleView from '@/components/admin/ModuleView'
import { bySlug, sections } from '@/lib/account/sections'
import { requireCustomer } from '@/lib/server/customer'

type Params = { params: Promise<{ section: string }> }

export const dynamicParams = false
export const generateStaticParams = () => sections.filter((s) => s.slug).map((s) => ({ section: s.slug }))

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  return { title: bySlug((await params).section)?.label ?? 'My account' }
}

export default async function Page({ params }: Params) {
  const s = bySlug((await params).section)
  if (!s?.slug) notFound()
  const c = await requireCustomer()
  if (s.details) return <DetailsView d={s.details} name={c.name} email={c.email} />
  // Demo data for now: shown per section, not yet stored per customer.
  return <ModuleView module={`account-${s.slug}`} {...s.table!} canWrite={false} local />
}
