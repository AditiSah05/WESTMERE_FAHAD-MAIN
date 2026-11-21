import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ListingPage from '@/components/ProductPage/ListingPage'
import { toCatalogue } from '@/components/ProductPage/data'
import { publicCategory } from '@/lib/server/categories'
import { listedProducts } from '@/lib/server/shop'

type Params = { params: Promise<{ slug: string }> }
export const revalidate = 60

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const c = await publicCategory((await params).slug)
  return c ? { title: c.seoTitle || `${c.name} | Westmere`, description: c.seoDescription || c.description || undefined } : {}
}

export default async function Page({ params }: Params) {
  const c = await publicCategory((await params).slug)
  if (!c) notFound()
  const items = toCatalogue((await listedProducts()).filter((p) => c.names.includes(p.category)))
  return <ListingPage kicker="Category" title={c.name} description={c.description} items={items} />
}
