import { IndianRupee, Package, Star, Zap, type LucideIcon } from 'lucide-react'
import type { ListedProduct } from '@/lib/server/shop'

export type CatalogueProduct = {
  id: string
  title: string
  description: string
  categories: string[]
  type: string
  price: number
  tech: string[]
  image: string
  rating: number | null
}

const KIND_LABEL = { website: 'Ready-made website', software: 'Software / app', service: 'Custom project' } as const

/** Admin-managed rows -> what the public cards render. */
export const toCatalogue = (rows: ListedProduct[]): CatalogueProduct[] =>
  rows.map((r) => ({
    id: r.id,
    title: r.name,
    description: r.description,
    categories: [r.category],
    type: KIND_LABEL[r.kind],
    price: r.price,
    tech: r.tech,
    image: r.image,
    rating: r.rating ? Number(r.rating) : null,
  }))

export type Stat = { icon: LucideIcon; value: number; label: string; prefix?: string; suffix?: string; decimals?: number }

/** Numbers come from the catalogue itself, so they can never claim more than we sell. */
export const statsFor = (items: CatalogueProduct[]): Stat[] => {
  const rated = items.filter((p) => p.rating)
  return [
    { icon: Package, value: items.length, label: items.length === 1 ? 'Product' : 'Products' },
    { icon: IndianRupee, value: Math.min(...items.map((p) => p.price)), label: 'Starting from', prefix: '₹' },
    ...(rated.length ? [{ icon: Star, value: Math.round((rated.reduce((n, p) => n + (p.rating ?? 0), 0) / rated.length) * 10) / 10, label: 'Average rating', decimals: 1 }] : []),
    { icon: Zap, value: 0, label: 'Delivery', suffix: 'Instant' },
  ]
}
