'use server'

import { revalidatePath } from 'next/cache'
import { assertModule } from '@/lib/server/auth'
import { db } from '@/lib/server/schema'
import { audit } from '@/lib/server/session'

const s = (f: FormData, k: string, max = 60) => { const v = f.get(k); return typeof v === 'string' ? v.trim().slice(0, max) : '' }
const refresh = () => { for (const p of ['/admin', '/account', '/product']) revalidatePath(p, 'layout') }
export type CatState = { error?: string } | undefined

/** Create or edit a category. Renaming also moves its products, so none are left without a category. */
export async function saveCategory(_p: CatState, form: FormData): Promise<CatState> {
  const me = await assertModule('categories', 'write')
  const id = s(form, 'id'), name = s(form, 'name', 40), description = s(form, 'description', 200), parent = s(form, 'parent') || null
  const sort = Number(s(form, 'sort', 3)), active = form.get('active') === 'on', featured = form.get('featured') === 'on'
  if (name.length < 2) return { error: 'Enter a name (at least 2 letters).' }
  if (!Number.isInteger(sort) || sort < 0 || sort > 999) return { error: 'Display order must be a whole number from 0 to 999.' }
  const { query } = await db()
  if (parent) {
    const [p] = await query<{ parent: string | null }>(`SELECT parent FROM shop_categories WHERE id = $1`, [parent])
    if (!p || p.parent || parent === id) return { error: 'Pick a main category as the parent.' }
  }
  const clash = await query(`SELECT 1 FROM shop_categories WHERE lower(name) = lower($1) AND id <> $2`, [name, id || ''])
  if (clash.length) return { error: 'A category with that name already exists.' }
  if (id) {
    const [old] = await query<{ name: string }>(`SELECT name FROM shop_categories WHERE id = $1`, [id])
    if (!old) return { error: 'Category not found.' }
    if (parent && (await query(`SELECT 1 FROM shop_categories WHERE parent = $1`, [id])).length) return { error: 'This category has subcategories, so it cannot become a subcategory.' }
    await query(`UPDATE shop_categories SET name = $1, description = $2, parent = $3, sort_order = $4, active = $5, featured = $6, updated_at = now() WHERE id = $7`, [name, description, parent, sort, active, featured, id])
    if (old.name !== name) await query(`UPDATE shop_products SET category = $1 WHERE category = $2`, [name, old.name])
  } else {
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 40) || 'category'
    if ((await query(`SELECT 1 FROM shop_categories WHERE id = $1`, [slug])).length) return { error: 'A category with a similar name already exists.' }
    await query(`INSERT INTO shop_categories (id, name, description, parent, sort_order, active, featured) VALUES ($1,$2,$3,$4,$5,$6,$7)`, [slug, name, description, parent, sort, active, featured])
  }
  await audit(me.userId, id ? 'category_updated' : 'category_created', name)
  refresh()
  return undefined
}

/** Delete only when nothing depends on it. */
export async function deleteCategory(id: string): Promise<{ error?: string }> {
  const me = await assertModule('categories', 'write')
  const { query } = await db()
  const [c] = await query<{ name: string }>(`SELECT name FROM shop_categories WHERE id = $1`, [String(id).slice(0, 60)])
  if (!c) return { error: 'Category not found.' }
  if ((await query(`SELECT 1 FROM shop_products WHERE category = $1`, [c.name])).length) return { error: 'This category still has products. Move them first, or turn the category off instead.' }
  if ((await query(`SELECT 1 FROM shop_categories WHERE parent = $1`, [id])).length) return { error: 'This category has subcategories. Delete or move them first.' }
  await query(`DELETE FROM shop_categories WHERE id = $1`, [id])
  await audit(me.userId, 'category_deleted', c.name)
  refresh()
  return {}
}

export async function setCategoryFlag(id: string, flag: 'active' | 'featured', value: boolean) {
  const me = await assertModule('categories', 'write')
  if (flag !== 'active' && flag !== 'featured') throw new Error('Invalid')
  await (await db()).query(`UPDATE shop_categories SET ${flag} = $1, updated_at = now() WHERE id = $2`, [value === true, String(id).slice(0, 60)])
  await audit(me.userId, `category_${flag}`, `${id}=${value}`)
  refresh()
}
