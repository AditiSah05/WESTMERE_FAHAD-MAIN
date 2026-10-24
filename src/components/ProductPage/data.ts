import { IndianRupee, Package, Star, Zap, type LucideIcon } from 'lucide-react'

export type CatalogueProduct = {
  id: string
  title: string
  description: string
  categories: string[]
  type: string
  price: number
  tech: string[]
  audience: string
}

/** Westmere currently sells one product. Add entries here and the stats, filters and grid follow. */
export const catalogue: CatalogueProduct[] = [
  {
    id: 'mailora',
    title: 'Mailora Chrome Extension',
    description: 'Upload your recipient list and a message template once, and Mailora sends personalised emails for you, right from your own Gmail.',
    categories: ['Software & Tools', 'Chrome Extension'],
    type: 'Chrome Extension',
    price: 499,
    tech: ['Chrome', 'Gmail', 'CSV'],
    audience: 'Cold outreach',
  },
]

export type Stat = { icon: LucideIcon; value: number; label: string; prefix?: string; suffix?: string; decimals?: number }

/** Numbers come from the catalogue itself, so they can never claim more than we sell. */
export const statsFor = (items: CatalogueProduct[]): Stat[] => [
  { icon: Package, value: items.length, label: items.length === 1 ? 'Product' : 'Products' },
  { icon: IndianRupee, value: Math.min(...items.map((p) => p.price)), label: 'Starting from', prefix: '₹' },
  { icon: Star, value: 4.9, label: 'Average rating', decimals: 1 },
  { icon: Zap, value: 0, label: 'Delivery', suffix: 'Instant' },
]
