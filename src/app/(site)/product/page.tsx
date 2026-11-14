import ProductPage from '@/components/ProductPage/ProductPage'
import { getListedProducts } from '@/lib/server/catalogue'
import { getApprovedReviews } from '@/lib/server/site-settings'

export const metadata = {
  title: 'Our Products | Westmere - Boilerplates & Estimates',
  description: "Accelerate your development cycle using our pre-built code assets, design structures, or customize a custom project budget estimate.",
}

export default async function Page() {
  const [items, reviews] = await Promise.all([getListedProducts(), getApprovedReviews()])
  const rating = reviews.length ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length : null
  return <ProductPage items={items} rating={rating} />
}
