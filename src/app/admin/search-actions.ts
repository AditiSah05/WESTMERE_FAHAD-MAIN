'use server'

import { can, type ModuleKey } from '@/lib/admin/permissions'
import { assertAdmin } from '@/lib/server/auth'
import { db } from '@/lib/server/schema'

export type Hit = { group: string; title: string; detail: string; href: string }

/** Search over what this admin may see: products, customers and orders. Pages are matched in the browser. */
export async function searchAdmin(raw: string): Promise<Hit[]> {
  const admin = await assertAdmin()
  const q = String(raw ?? '').trim().slice(0, 60)
  if (q.length < 2) return []
  const like = `%${q.replace(/[\\%_]/g, '\\$&')}%`
  const { query } = await db()
  const ok = (m: ModuleKey) => can(admin.role, m)
  const out: Hit[] = []
  if (ok('products')) {
    for (const r of await query<{ name: string; id: string; price: number }>(`SELECT name, id, price FROM shop_products WHERE name ILIKE $1 OR id ILIKE $1 ORDER BY name LIMIT 5`, [like]))
      out.push({ group: 'Products', title: r.name, detail: `₹${r.price.toLocaleString('en-IN')} · ${r.id}`, href: `/admin/shop/products?q=${encodeURIComponent(r.name)}` })
  }
  if (ok('customers')) {
    for (const r of await query<{ name: string; email: string }>(`SELECT name, email FROM shop_users WHERE name ILIKE $1 OR email ILIKE $1 ORDER BY created_at DESC LIMIT 5`, [like]))
      out.push({ group: 'Customers', title: r.name || r.email, detail: r.email, href: '/admin/shop/customers' })
  }
  if (ok('orders')) {
    const id = /^#?(?:wm-)?(\d{1,9})$/i.exec(q)?.[1]
    const rows = await query<{ id: string; email: string; product: string; amount: number }>(
      `SELECT o.id::text AS id, u.email, p.name AS product, o.amount FROM shop_orders o JOIN shop_users u ON u.id = o.user_id JOIN shop_products p ON p.id = o.product_id WHERE ($2::bigint IS NOT NULL AND o.id = $2::bigint) OR u.email ILIKE $1 OR p.name ILIKE $1 ORDER BY o.id DESC LIMIT 5`, [like, id ?? null])
    for (const r of rows) out.push({ group: 'Orders', title: `#WM-${r.id}`, detail: `${r.product} · ${r.email} · ₹${r.amount.toLocaleString('en-IN')}`, href: '/admin/shop/orders' })
  }
  return out
}
