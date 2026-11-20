import 'server-only'
import { db } from './schema'

export type Category = { id: string; name: string; description: string; parent: string | null; active: boolean; featured: boolean; sort: number; updated: string; products: number; children: number; revenue: number }

/** Active categories only: these are the ones that can be picked for a product. */
export const categoryNames = async () => (await (await db()).query<{ name: string }>(`SELECT name FROM shop_categories WHERE active ORDER BY sort_order, name`)).map((r) => r.name)
export const categoryExists = async (name: string) => (await (await db()).query(`SELECT 1 FROM shop_categories WHERE name = $1`, [name])).length > 0

export async function listCategories() {
  const { query } = await db()
  const rows = await query<Category>(`SELECT c.id, c.name, c.description, c.parent, c.active, c.featured, c.sort_order AS sort, to_char(c.updated_at, 'YYYY-MM-DD') AS updated,
    (SELECT count(*) FROM shop_products p WHERE p.category = c.name)::int AS products,
    (SELECT count(*) FROM shop_categories k WHERE k.parent = c.id)::int AS children,
    COALESCE((SELECT sum(o.amount) FROM shop_orders o JOIN shop_products p ON p.id = o.product_id WHERE p.category = c.name AND o.payment_status = 'Paid'), 0)::int AS revenue
    FROM shop_categories c ORDER BY c.sort_order, c.name`)
  const [u] = await query<{ n: number }>(`SELECT count(*)::int AS n FROM shop_products WHERE category NOT IN (SELECT name FROM shop_categories)`)
  // Smart collections are computed from live product data, so they never go stale.
  const [col] = await query<Record<string, number>>(`SELECT
    (SELECT count(DISTINCT o.product_id) FROM shop_orders o WHERE o.payment_status = 'Paid')::int AS best,
    (SELECT count(*) FROM shop_products WHERE created_at > now() - interval '30 days')::int AS fresh,
    (SELECT count(*) FROM shop_products WHERE featured)::int AS featured,
    (SELECT count(*) FROM shop_products WHERE pricing = 'Subscription')::int AS subs`)
  return { rows, unassigned: u.n, collections: [{ name: 'Best Sellers', note: 'Products with paid orders', count: col.best }, { name: 'New Arrivals', note: 'Added in the last 30 days', count: col.fresh }, { name: 'Featured', note: 'Marked as featured', count: col.featured }, { name: 'Subscriptions', note: 'Subscription pricing model', count: col.subs }] }
}
