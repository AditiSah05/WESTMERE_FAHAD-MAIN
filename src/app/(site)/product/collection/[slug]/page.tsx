import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ListingPage from '@/components/ProductPage/ListingPage'
import { toCatalogue } from '@/components/ProductPage/data'
import { publicCollection } from '@/lib/server/categories'
import { listedProducts } from '@/lib/server/shop'

type Params = { params: Promise<{ slug: string }> }
export const revalidate = 60

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const c = await publicCollection((await params).slug)
  return c ? { title: `${c.name} | Westmere`, description: c.description || undefined } : {}
}

export default async function Page({ params }: Params) {
  const c = await publicCollection((await params).slug)
  if (!c) notFound()
  const listed = await listedProducts()
  const items = toCatalogue(c.ids.map((id) => listed.find((p) => p.id === id)).filter((p): p is NonNullable<typeof p> => !!p))
  return <ListingPage kicker="Collection" title={c.name} description={c.description} items={items} />
}
