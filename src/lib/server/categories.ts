import 'server-only'
import { db } from './schema'

export type Category = { id: string; name: string; description: string; parent: string | null; active: boolean; featured: boolean; sort: number; updated: string; seoTitle: string; seoDescription: string; products: number; children: number; revenue: number }
export type Collection = { id: string; name: string; description: string; active: boolean; featured: boolean; updated: string; productIds: string[] }

/** Active categories only: these are the ones that can be picked for a product. */
export const categoryNames = async () => (await (await db()).query<{ name: string }>(`SELECT name FROM shop_categories WHERE active ORDER BY sort_order, name`)).map((r) => r.name)
export const categoryExists = async (name: string) => (await (await db()).query(`SELECT 1 FROM shop_categories WHERE name = $1`, [name])).length > 0

export async function listCategories() {
  const { query } = await db()
  const rows = await query<Category>(`SELECT c.id, c.name, c.description, c.parent, c.active, c.featured, c.sort_order AS sort, to_char(c.updated_at, 'YYYY-MM-DD') AS updated, c.seo_title AS "seoTitle", c.seo_description AS "seoDescription",
    (SELECT count(*) FROM shop_products p WHERE p.category = c.name)::int AS products,
    (SELECT count(*) FROM shop_categories k WHERE k.parent = c.id)::int AS children,
    COALESCE((SELECT sum(o.amount) FROM shop_orders o JOIN shop_products p ON p.id = o.product_id WHERE p.category = c.name AND o.payment_status = 'Paid'), 0)::int AS revenue
    FROM shop_categories c ORDER BY c.sort_order, c.name`)
  const [g] = await query<Record<string, number>>(`SELECT
    count(*) FILTER (WHERE created_at > now() - interval '30 days')::int AS new30, count(*) FILTER (WHERE created_at <= now() - interval '30 days' AND created_at > now() - interval '60 days')::int AS prev30,
    count(*) FILTER (WHERE parent IS NOT NULL AND created_at > now() - interval '30 days')::int AS sub30, count(*) FILTER (WHERE parent IS NOT NULL AND created_at <= now() - interval '30 days' AND created_at > now() - interval '60 days')::int AS subprev30
    FROM shop_categories`)
  const collections = await listCollections()
  const [u] = await query<{ n: number }>(`SELECT count(*)::int AS n FROM shop_products WHERE category NOT IN (SELECT name FROM shop_categories)`)
  // Smart collections are computed from live product data, so they never go stale.
  const [col] = await query<Record<string, number>>(`SELECT
    (SELECT count(DISTINCT o.product_id) FROM shop_orders o WHERE o.payment_status = 'Paid')::int AS best,
    (SELECT count(*) FROM shop_products WHERE created_at > now() - interval '30 days')::int AS fresh,
    (SELECT count(*) FROM shop_products WHERE featured)::int AS featured,
    (SELECT count(*) FROM shop_products WHERE pricing = 'Subscription')::int AS subs`)
  return { rows, unassigned: u.n, growth: g, handPicked: collections, collections: [{ name: 'Best Sellers', note: 'Products with paid orders', count: col.best }, { name: 'New Arrivals', note: 'Added in the last 30 days', count: col.fresh }, { name: 'Featured', note: 'Marked as featured', count: col.featured }, { name: 'Subscriptions', note: 'Subscription pricing model', count: col.subs }] }
}

export async function listCollections(): Promise<Collection[]> {
  const { query } = await db()
  const rows = await query<Omit<Collection, 'productIds'>>(`SELECT id, name, description, active, featured, to_char(updated_at, 'YYYY-MM-DD') AS updated FROM shop_collections ORDER BY featured DESC, name`)
  const links = await query<{ collection_id: string; product_id: string }>(`SELECT collection_id, product_id FROM shop_collection_products ORDER BY position`)
  return rows.map((r) => ({ ...r, productIds: links.filter((l) => l.collection_id === r.id).map((l) => l.product_id) }))
}

/** Public pages: only active categories and collections are visible. A category page includes its subcategories. */
export async function publicCategory(slug: string) {
  const { query } = await db()
  const [c] = await query<{ id: string; name: string; description: string; seoTitle: string; seoDescription: string }>(`SELECT id, name, description, seo_title AS "seoTitle", seo_description AS "seoDescription" FROM shop_categories WHERE id = $1 AND active`, [slug])
  if (!c) return null
  const kids = await query<{ name: string }>(`SELECT name FROM shop_categories WHERE parent = $1 AND active`, [c.id])
  return { ...c, names: [c.name, ...kids.map((k) => k.name)] }
}

export async function publicCollection(slug: string) {
  const { query } = await db()
  const [c] = await query<{ id: string; name: string; description: string }>(`SELECT id, name, description FROM shop_collections WHERE id = $1 AND active`, [slug])
  if (!c) return null
  const ids = (await query<{ product_id: string }>(`SELECT product_id FROM shop_collection_products WHERE collection_id = $1 ORDER BY position`, [c.id])).map((r) => r.product_id)
  return { ...c, ids }
}

export const publicListingPaths = async () => {
  const { query } = await db()
  const cats = await query<{ id: string }>(`SELECT id FROM shop_categories WHERE active`)
  const cols = await query<{ id: string }>(`SELECT id FROM shop_collections WHERE active`)
  return [...cats.map((c) => `/product/category/${c.id}`), ...cols.map((c) => `/product/collection/${c.id}`)]
}

export const productChoices = async () => (await db()).query<{ id: string; name: string }>(`SELECT id, name FROM shop_products ORDER BY name`)
