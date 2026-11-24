import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import GenericDetail from '@/components/ProductPage/GenericDetail'
import ProductDetail from '@/components/ProductPage/ProductDetail'
import { toCatalogue } from '@/components/ProductPage/data'
import { listedProducts } from '@/lib/server/shop'

type Params = { params: Promise<{ slug: string }> }

export const revalidate = 60

const find = async (slug: string) => toCatalogue(await listedProducts()).find((p) => p.id === slug)

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const product = await find((await params).slug)
  return product ? { title: `${product.title} | Westmere`, description: product.description } : {}
}

export default async function Page({ params }: Params) {
  const product = await find((await params).slug)
  if (!product) notFound()
  return product.id === 'mailora' ? <ProductDetail price={product.price} /> : <GenericDetail product={product} />
}
