import { IndianRupee, LayoutGrid, Package, Star, Zap, type LucideIcon } from 'lucide-react'

export type CatalogueProduct = {
  id: string
  title: string
  description: string
  categories: string[]
  type: string
  price: number
  tech: string[]
  audience: string
  image: string
  qr: string
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
    image: '',
    qr: '',
  },
]

export type Stat = { icon: LucideIcon; value: number; label: string; prefix?: string; suffix?: string; decimals?: number }

/** Every number is computed from what is actually listed (and from approved reviews), never typed in by hand. */
export const statsFor = (items: CatalogueProduct[], rating: number | null): Stat[] => [
  { icon: Package, value: items.length, label: items.length === 1 ? 'Product' : 'Products' },
  { icon: IndianRupee, value: items.length ? Math.min(...items.map((p) => p.price)) : 0, label: 'Starting from', prefix: '₹' },
  rating !== null
    ? { icon: Star, value: rating, label: 'Average rating', decimals: 1 }
    : { icon: LayoutGrid, value: new Set(items.flatMap((p) => p.categories)).size, label: 'Categories' },
  { icon: Zap, value: 0, label: 'Delivery', suffix: 'Instant' },
]
