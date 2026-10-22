import 'server-only'
import { createHash } from 'node:crypto'
import type { Row } from '@/lib/admin/types'
import { db } from './schema'

export type Product = { id: string; name: string; category: string; kind: 'website' | 'software' | 'service'; price: number; rating: string; tag: string }

const seed: Product[] = [
  { id: 'agency-starter', name: 'Agency Starter Website', category: 'Websites', kind: 'website', price: 1999, rating: '4.8', tag: 'Bestseller' },
  { id: 'mailora', name: 'Mailora Chrome Extension', category: 'Software & Tools', kind: 'software', price: 499, rating: '4.9', tag: 'Featured' },
  { id: 'seo-dashboard', name: 'SEO Dashboard App', category: 'Applications', kind: 'software', price: 1999, rating: '4.6', tag: 'New' },
  { id: 'storefront-kit', name: 'E-commerce Storefront Kit', category: 'Websites', kind: 'website', price: 2000, rating: '4.7', tag: 'Featured' },
  { id: 'automation-pack', name: 'Workflow Automation Pack', category: 'Software & Tools', kind: 'software', price: 1499, rating: '4.5', tag: '' },
  { id: 'custom-build', name: 'Custom Website Build', category: 'Custom development', kind: 'service', price: 25000, rating: '', tag: 'Project' },
]

let seeded = false
async function ready() {
  const d = await db()
  if (!seeded) {
    for (const p of seed) await d.query(`INSERT INTO shop_products (id, name, category, kind, price, rating, tag) VALUES ($1,$2,$3,$4,$5,$6,$7) ON CONFLICT (id) DO NOTHING`, [p.id, p.name, p.category, p.kind, p.price, p.rating, p.tag])
    seeded = true
  }
  return d
}

export async function products(): Promise<Product[]> {
  const { query } = await ready()
  return query<Product>(`SELECT id, name, category, kind, price, rating, tag FROM shop_products ORDER BY price`)
}

export const wishlistIds = async (userId: string) => (await (await ready()).query<{ product_id: string }>(`SELECT product_id FROM shop_wishlist WHERE user_id = $1`, [userId])).map((r) => r.product_id)

export const PAYMENT = ['Pending', 'Paid', 'Failed', 'Partially Refunded', 'Refunded']

/** Server decides price and statuses. Test mode: no gateway, `fail` simulates a declined payment. */
export async function createOrder(userId: string, productId: string, method: string, fail: boolean) {
  const { query } = await ready()
  const [p] = await query<Product>(`SELECT * FROM shop_products WHERE id = $1`, [productId])
  if (!p) throw new Error('Unknown product')
  const payment = fail ? 'Failed' : 'Paid'
  // Protected access only after a verified payment; custom projects need scoping first.
  const fulfilment = fail ? 'Awaiting Payment' : p.kind === 'service' ? 'Processing' : 'Delivered'
  const [o] = await query<{ id: string }>(`INSERT INTO shop_orders (user_id, product_id, amount, payment_status, fulfilment, method) VALUES ($1,$2,$3,$4,$5,$6) RETURNING id`, [userId, productId, p.price, payment, fulfilment, method])
  return o.id
}

type O = { id: string; name: string; kind: string; category: string; amount: number; payment_status: string; fulfilment: string; method: string; date: string }

const orderRows = (userId: string) =>
  ready().then(({ query }) => query<O>(`SELECT o.id::text, p.name, p.kind, p.category, o.amount, o.payment_status, o.fulfilment, o.method, to_char(o.created_at, 'YYYY-MM-DD') AS date FROM shop_orders o JOIN shop_products p ON p.id = o.product_id WHERE o.user_id = $1 ORDER BY o.id DESC`, [userId]))

/** Only paid AND delivered orders unlock product access. */
const owned = (os: O[]) => os.filter((o) => o.payment_status === 'Paid' && o.fulfilment === 'Delivered' && o.kind !== 'service')
const key = (o: O) => 'WM-' + createHash('sha256').update(`licence:${o.id}`).digest('hex').slice(0, 12).toUpperCase().replace(/(.{4})(?=.)/g, '$1-')

export async function counts(userId: string) {
  const os = await orderRows(userId)
  return { orders: os.length, owned: owned(os).length, pending: os.filter((o) => o.fulfilment !== 'Delivered' && o.fulfilment !== 'Cancelled' && o.payment_status !== 'Failed').length }
}

/** Real rows per tab for the sections backed by the database. null = section still shows demo data. */
export async function loadSection(slug: string, userId: string): Promise<Record<string, Row[]> | null> {
  const { query } = await ready()
  const os = slug === 'orders' || slug === 'my-products' || slug === 'downloads' || slug === 'licenses' ? await orderRows(userId) : []
  const order = (o: O): Row => ({ id: o.id, orderId: `#WM-${o.id}`, product: o.name, amount: o.amount, paymentStatus: o.payment_status, fulfilment: o.fulfilment, method: o.method, date: o.date })
  switch (slug) {
    case 'orders':
      return {
        all: os.map(order), pending: os.map(order), delivered: os.map(order),
        refunds: os.filter((o) => o.payment_status.includes('Refunded')).map((o) => ({ id: o.id, orderId: `#WM-${o.id}`, product: o.name, type: o.payment_status, status: o.fulfilment, date: o.date })),
      }
    case 'my-products':
      return { owned: owned(os).map((o) => ({ id: o.id, name: o.name, type: o.kind === 'website' ? 'Website' : 'Software', version: '1.0.0', access: 'Active', update: 'Up to date' })) }
    case 'downloads':
      return { files: owned(os).map((o) => ({ id: o.id, file: `${o.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-1.0.0.zip`, product: o.name, version: '1.0.0', size: '—', status: 'Ready' })) }
    case 'licenses':
      return { keys: owned(os).map((o) => ({ id: o.id, key: key(o), product: o.name, type: 'Single user', status: 'Active', seats: '0 / 1', expires: '—' })) }
    case 'wishlist':
      return { saved: (await query<{ id: string; name: string; price: number }>(`SELECT p.id, p.name, p.price FROM shop_wishlist w JOIN shop_products p ON p.id = w.product_id WHERE w.user_id = $1`, [userId])).map((r) => ({ ...r, availability: 'Available' })) }
    case 'support':
      return { tickets: (await query<{ id: string; subject: string; type: string; priority: string; status: string; updated: string }>(`SELECT 'T-' || id AS id, subject, type, priority, status, to_char(created_at, 'YYYY-MM-DD') AS updated FROM shop_tickets WHERE user_id = $1 ORDER BY id DESC`, [userId])) }
    default:
      return null
  }
}
