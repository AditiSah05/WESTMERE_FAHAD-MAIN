import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import GenericProductDetail from '@/components/ProductPage/GenericProductDetail'
import ProductDetail from '@/components/ProductPage/ProductDetail'
import { getListedProducts } from '@/lib/server/catalogue'

type Params = { params: Promise<{ slug: string }> }

// Products are added in admin, so any listed slug is valid; unknown ones 404.
export const dynamicParams = true
export const generateStaticParams = async () => (await getListedProducts()).map((p) => ({ slug: p.id }))

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const product = (await getListedProducts()).find((p) => p.id === slug)
  return product ? { title: `${product.title} | Westmere`, description: product.description } : {}
}

export default async function Page({ params }: Params) {
  const { slug } = await params
  const product = (await getListedProducts()).find((p) => p.id === slug)
  if (!product) notFound()
  return product.id === 'mailora' ? <ProductDetail /> : <GenericProductDetail product={product} />
}
