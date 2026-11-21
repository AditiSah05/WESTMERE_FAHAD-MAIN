'use server'

import { revalidatePath } from 'next/cache'
import { assertModule } from '@/lib/server/auth'
import { db } from '@/lib/server/schema'
import { audit } from '@/lib/server/session'

const s = (f: FormData, k: string, max = 60) => { const v = f.get(k); return typeof v === 'string' ? v.trim().slice(0, max) : '' }
const refresh = () => { for (const p of ['/admin', '/account', '/product']) revalidatePath(p, 'layout') }
export type ColState = { error?: string } | undefined

/** Create or edit a hand-picked collection. Visitors see active collections at /product/collection/<id>. */
export async function saveCollection(_p: ColState, form: FormData): Promise<ColState> {
  const me = await assertModule('categories', 'write')
  const id = s(form, 'id'), name = s(form, 'name', 40), description = s(form, 'description', 200)
  const active = form.get('active') === 'on', featured = form.get('featured') === 'on'
  const picked = Array.from(new Set(form.getAll('product').filter((v): v is string => typeof v === 'string' && v.length <= 60))).slice(0, 100)
  if (name.length < 2) return { error: 'Enter a name (at least 2 letters).' }
  const { query } = await db()
  if ((await query(`SELECT 1 FROM shop_collections WHERE lower(name) = lower($1) AND id <> $2`, [name, id || ''])).length) return { error: 'A collection with that name already exists.' }
  const valid = picked.length ? (await query<{ id: string }>(`SELECT id FROM shop_products WHERE id = ANY($1::text[])`, [picked])).map((r) => r.id) : []
  const slug = id || name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 40) || 'collection'
  if (id) {
    if (!(await query(`UPDATE shop_collections SET name = $1, description = $2, active = $3, featured = $4, updated_at = now() WHERE id = $5 RETURNING id`, [name, description, active, featured, id])).length) return { error: 'Collection not found.' }
  } else {
    if ((await query(`SELECT 1 FROM shop_collections WHERE id = $1`, [slug])).length) return { error: 'A collection with a similar name already exists.' }
    await query(`INSERT INTO shop_collections (id, name, description, active, featured) VALUES ($1,$2,$3,$4,$5)`, [slug, name, description, active, featured])
  }
  await query(`DELETE FROM shop_collection_products WHERE collection_id = $1`, [slug])
  for (const [i, pid] of picked.filter((p) => valid.includes(p)).entries()) await query(`INSERT INTO shop_collection_products (collection_id, product_id, position) VALUES ($1,$2,$3)`, [slug, pid, i])
  await audit(me.userId, id ? 'collection_updated' : 'collection_created', name)
  refresh()
  return undefined
}

export async function deleteCollection(id: string): Promise<void> {
  const me = await assertModule('categories', 'write')
  const [c] = await (await db()).query<{ name: string }>(`DELETE FROM shop_collections WHERE id = $1 RETURNING name`, [String(id).slice(0, 60)])
  if (c) await audit(me.userId, 'collection_deleted', c.name)
  refresh()
}
