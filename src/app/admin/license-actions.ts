'use server'

import { randomBytes } from 'node:crypto'
import { revalidatePath } from 'next/cache'
import { AVAILABILITY, FORMATS, LICENSE_TYPES, makeKey } from '@/lib/license-shared'
import { assertModule } from '@/lib/server/auth'
import { db } from '@/lib/server/schema'
import { audit } from '@/lib/server/session'

const s = (f: FormData, k: string, max = 80) => { const v = f.get(k); return typeof v === 'string' ? v.trim().slice(0, max) : '' }
const refresh = () => { revalidatePath('/admin/licenses'); revalidatePath('/account', 'layout') }
export type LState = { error?: string } | undefined
const event = (q: Awaited<ReturnType<typeof db>>['query'], id: string | number, e: string, note = '') => q(`INSERT INTO shop_license_events (license_id, event, note) VALUES ($1,$2,$3)`, [id, e, note])

export async function generateLicense(_p: LState, form: FormData): Promise<LState> {
  const me = await assertModule('licenses', 'write')
  const userId = s(form, 'customer'), productId = s(form, 'product'), type = s(form, 'type'), max = Number(s(form, 'max', 3)), expires = s(form, 'expires', 10)
  if (!(LICENSE_TYPES as readonly string[]).includes(type) || !Number.isInteger(max) || max < 1 || max > 500) return { error: 'Choose a type and 1 to 500 activations.' }
  if (expires && (!/^\d{4}-\d{2}-\d{2}$/.test(expires) || Number.isNaN(Date.parse(expires)))) return { error: 'Enter a valid expiry date or leave it empty for a lifetime licence.' }
  const { query } = await db()
  const [ok] = await query<{ id: string }>(`SELECT u.id FROM shop_users u, shop_products p WHERE u.id::text = $1 AND p.id = $2`, [userId, productId])
  if (!ok) return { error: 'Choose a customer and a product.' }
  const [order] = await query<{ id: string }>(`SELECT id::text FROM shop_orders WHERE user_id::text = $1 AND product_id = $2 AND payment_status = 'Paid' ORDER BY id DESC LIMIT 1`, [userId, productId])
  const key = makeKey(randomBytes(12))
  const [row] = await query<{ id: string }>(`INSERT INTO shop_licenses (license_key, product_id, user_id, order_id, license_type, max_activations, expires_at) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING id::text`, [key, productId, userId, order?.id ?? null, type, max, expires || null])
  await event(query, row.id, 'Created', `${type}, ${max} activation(s)${order ? `, order #WM-${order.id}` : ''}`)
  await audit(me.userId, 'license_created', key)
  refresh()
  return undefined
}

export async function setLicenseRevoked(id: string, revoked: boolean) {
  const me = await assertModule('licenses', 'write')
  const { query } = await db()
  const [l] = await query<{ key: string }>(`UPDATE shop_licenses SET revoked = $1 WHERE id::text = $2 RETURNING license_key AS key`, [revoked === true, String(id).slice(0, 20)])
  if (!l) return
  await event(query, id, revoked ? 'Revoked' : 'Restored')
  await audit(me.userId, revoked ? 'license_revoked' : 'license_restored', l.key)
  refresh()
}

export async function extendLicense(id: string, days: number) {
  const me = await assertModule('licenses', 'write')
  if (!Number.isInteger(days) || days < 1 || days > 3650) throw new Error('Invalid')
  const { query } = await db()
  const [l] = await query<{ key: string }>(`UPDATE shop_licenses SET expires_at = GREATEST(COALESCE(expires_at, now()), now()) + $1 * interval '1 day' WHERE id::text = $2 AND expires_at IS NOT NULL RETURNING license_key AS key`, [days, String(id).slice(0, 20)])
  if (!l) return
  await event(query, id, 'Expiry extended', `+${days} days`)
  await audit(me.userId, 'license_extended', `${l.key} +${days}d`)
  refresh()
}

export async function savePackage(_p: LState, form: FormData): Promise<LState> {
  const me = await assertModule('licenses', 'write')
  const id = s(form, 'id', 20), productId = s(form, 'product'), name = s(form, 'name', 80), format = s(form, 'format'), url = s(form, 'url', 500), size = s(form, 'size', 20), availability = s(form, 'availability')
  if (name.length < 2 || !productId) return { error: 'Enter a name and choose a product.' }
  if (!(FORMATS as readonly string[]).includes(format) || !(AVAILABILITY as readonly string[]).includes(availability)) return { error: 'Choose a format and who can download it.' }
  if (!/^https:\/\/\S+$/.test(url)) return { error: 'The download link must start with https://' }
  const { query } = await db()
  if (!(await query(`SELECT 1 FROM shop_products WHERE id = $1`, [productId])).length) return { error: 'Product not found.' }
  const published = form.get('published') === 'on'
  if (id) await query(`UPDATE shop_packages SET product_id = $1, name = $2, format = $3, file_url = $4, size = $5, availability = $6, published = $7 WHERE id::text = $8`, [productId, name, format, url, size, availability, published, id])
  else await query(`INSERT INTO shop_packages (product_id, name, format, file_url, size, availability, published) VALUES ($1,$2,$3,$4,$5,$6,$7)`, [productId, name, format, url, size, availability, published])
  await audit(me.userId, id ? 'package_updated' : 'package_created', name)
  refresh()
  return undefined
}

export async function deletePackage(id: string) {
  const me = await assertModule('licenses', 'write')
  const [k] = await (await db()).query<{ name: string }>(`DELETE FROM shop_packages WHERE id::text = $1 RETURNING name`, [String(id).slice(0, 20)])
  if (k) await audit(me.userId, 'package_deleted', k.name)
  refresh()
}

export async function addVersion(_p: LState, form: FormData): Promise<LState> {
  const me = await assertModule('licenses', 'write')
  const pkg = s(form, 'package', 20), version = s(form, 'version', 20), notes = s(form, 'notes', 300), date = s(form, 'date', 10)
  if (!version || !/^\d{4}-\d{2}-\d{2}$/.test(date) || Number.isNaN(Date.parse(date))) return { error: 'Enter a version and a release date.' }
  const { query } = await db()
  const [k] = await query<{ name: string }>(`SELECT name FROM shop_packages WHERE id::text = $1`, [pkg])
  if (!k) return { error: 'Choose a package.' }
  await query(`INSERT INTO shop_package_versions (package_id, version, notes, release_date) VALUES ($1,$2,$3,$4)`, [pkg, version, notes, date])
  await audit(me.userId, 'version_added', `${k.name} ${version}`)
  refresh()
  return undefined
}

export async function deleteVersion(id: string) {
  const me = await assertModule('licenses', 'write')
  const [v] = await (await db()).query<{ version: string }>(`DELETE FROM shop_package_versions WHERE id::text = $1 RETURNING version`, [String(id).slice(0, 20)])
  if (v) await audit(me.userId, 'version_deleted', v.version)
  refresh()
}

export async function getLicenseDetail(id: string) {
  await assertModule('licenses', 'read')
  const { licenseDetail } = await import('@/lib/server/licenses')
  return licenseDetail(String(id).slice(0, 20))
}
