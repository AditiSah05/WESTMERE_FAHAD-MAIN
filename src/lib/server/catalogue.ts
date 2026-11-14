import 'server-only'
import { cache } from 'react'
import { catalogue as builtIn, type CatalogueProduct } from '@/components/ProductPage/data'
import { db } from './schema'

const list = (v: string) => v.split(',').map((x) => x.trim()).filter(Boolean)
const mailora = builtIn[0]

type Row = { id: string; name: string; description: string; categories: string; category: string; type_label: string; price: number; tech: string; audience: string; image_url: string; qr_url: string }

/**
 * Products you switched on for the public Products page in admin ("Show on website"). Falls back to the built-in
 * Mailora entry if the database is unavailable or nothing is switched on, so the page is never empty or broken.
 */
export const getListedProducts = cache(async (): Promise<CatalogueProduct[]> => {
  try {
    const { query } = await db()
    // Mailora is the one real product: created, or filled in and listed, the first time this runs on a database
    // (an empty description marks "not set up yet"; after that, admin edits are never overwritten).
    await query(
      `INSERT INTO shop_products (id, name, category, kind, price, rating, tag, listed, description, categories, tech, audience, type_label)
       VALUES ('mailora', $1, 'Software & Tools', 'software', $2, '', 'Featured', true, $3, $4, $5, $6, $7) ON CONFLICT (id) DO NOTHING`,
      [mailora.title, mailora.price, mailora.description, mailora.categories.join(', '), mailora.tech.join(', '), mailora.audience, mailora.type],
    )
    await query(`UPDATE shop_products SET listed = true, description = $1, categories = $2, tech = $3, audience = $4, type_label = $5 WHERE id = 'mailora' AND description = ''`, [mailora.description, mailora.categories.join(', '), mailora.tech.join(', '), mailora.audience, mailora.type])
    const rows = await query<Row>(`SELECT id, name, description, categories, category, type_label, price, tech, audience, image_url, qr_url FROM shop_products WHERE active AND listed ORDER BY (id = 'mailora') DESC, price`)
    if (!rows.length) return builtIn
    return rows.map((r) => ({
      id: r.id,
      title: r.name,
      description: r.description,
      categories: list(r.categories).length ? list(r.categories) : [r.category],
      type: r.type_label || r.category,
      price: r.price,
      tech: list(r.tech),
      audience: r.audience,
      image: r.image_url,
      qr: r.qr_url,
    }))
  } catch {
    return builtIn
  }
})
