import ProductPage from '@/components/ProductPage/ProductPage'
import { toCatalogue } from '@/components/ProductPage/data'
import { listedProducts } from '@/lib/server/shop'

export const metadata = {
  title: 'Our Products | Westmere - Boilerplates & Estimates',
  description: "Accelerate your development cycle using our pre-built code assets, design structures, or customize a custom project budget estimate.",
}

// Products and prices come from admin; refreshed on save and at most once a minute.
export const revalidate = 60

export default async function Page() {
  return <ProductPage items={toCatalogue(await listedProducts())} />
}
