import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ProductDetail from '@/components/ProductPage/ProductDetail'
import { catalogue } from '@/components/ProductPage/data'

type Params = { params: Promise<{ slug: string }> }

export const dynamicParams = false
export const generateStaticParams = () => catalogue.map((p) => ({ slug: p.id }))

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const product = catalogue.find((p) => p.id === slug)
  return product ? { title: `${product.title} | Westmere`, description: product.description } : {}
}

export default async function Page({ params }: Params) {
  const { slug } = await params
  if (!catalogue.some((p) => p.id === slug)) notFound()
  return <ProductDetail />
}
