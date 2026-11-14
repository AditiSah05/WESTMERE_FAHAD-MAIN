'use server'

import { revalidatePath } from 'next/cache'
import { assertModule } from '@/lib/server/auth'
import { db } from '@/lib/server/schema'
import { audit } from '@/lib/server/session'
import { NETWORKS, cleanUrl, type ComparisonRow } from '@/lib/site-defaults'

export type SiteState = { error?: string; ok?: string } | undefined

const str = (f: FormData, k: string, max: number) => { const v = f.get(k); return typeof v === 'string' ? v.trim().slice(0, max) : '' }
/** Public pages are cached for a minute; this makes an edit show up straight away. */
const refresh = () => revalidatePath('/', 'layout')

async function put(key: string, value: unknown) {
  const { query } = await db()
  await query(`INSERT INTO site_settings (key, value, updated_at) VALUES ($1, $2::jsonb, now()) ON CONFLICT (key) DO UPDATE SET value = $2::jsonb, updated_at = now()`, [key, JSON.stringify(value)])
}

export async function saveSocials(_p: SiteState, form: FormData): Promise<SiteState> {
  const me = await assertModule('cms', 'write')
  const socials: Record<string, string> = {}
  for (const n of NETWORKS) {
    const url = cleanUrl(str(form, n.key, 300))
    if (url === null) return { error: `${n.label}: enter a full https:// link, or leave it empty to hide it.` }
    socials[n.key] = url
  }
  await put('socials', socials)
  await audit(me.userId, 'site_socials_saved')
  refresh()
  return { ok: 'Saved. A network with an empty link is hidden on the site.' }
}

export async function saveBooking(_p: SiteState, form: FormData): Promise<SiteState> {
  const me = await assertModule('cms', 'write')
  const url = cleanUrl(str(form, 'bookingUrl', 300))
  if (!url) return { error: 'Enter the full https:// booking link.' }
  await put('bookingUrl', url)
  await audit(me.userId, 'site_booking_saved')
  refresh()
  return { ok: 'Saved. "Schedule a call" now opens this link.' }
}

export async function saveComparison(_p: SiteState, form: FormData): Promise<SiteState> {
  const me = await assertModule('cms', 'write')
  const rows: ComparisonRow[] = []
  for (let i = 0; i < 8; i++) {
    const other = str(form, `other${i}`, 200)
    const ours = str(form, `ours${i}`, 200)
    if (!other && !ours) continue
    if (!other || !ours) return { error: `Row ${i + 1}: fill in both columns or clear both.` }
    rows.push({ other, ours })
  }
  if (!rows.length) return { error: 'Keep at least one row.' }
  await put('comparison', rows)
  await audit(me.userId, 'site_comparison_saved', `${rows.length} rows`)
  refresh()
  return { ok: `Saved ${rows.length} row${rows.length === 1 ? '' : 's'}.` }
}

export async function addReview(_p: SiteState, form: FormData): Promise<SiteState> {
  const me = await assertModule('cms', 'write')
  const name = str(form, 'name', 80), body = str(form, 'body', 600), role = str(form, 'role', 80)
  const rating = Number(form.get('rating'))
  const photo = cleanUrl(str(form, 'photo', 300))
  if (!name || !body) return { error: 'Add the reviewer name and the review text.' }
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) return { error: 'Rating must be 1 to 5.' }
  if (photo === null) return { error: 'Photo must be a full https:// link, or empty.' }
  const source = ['Google', 'Website', 'Manual'].includes(str(form, 'source', 20)) ? str(form, 'source', 20) : 'Manual'
  const { query } = await db()
  await query(`INSERT INTO site_reviews (name, role, rating, body, photo_url, source) VALUES ($1,$2,$3,$4,$5,$6)`, [name, role, rating, body, photo, source])
  await audit(me.userId, 'site_review_added', name)
  revalidatePath('/admin/site/reviews')
  return { ok: 'Added as Pending. Approve it below to show it on the site.' }
}

export async function setSiteReview(form: FormData) {
  const me = await assertModule('cms', 'write')
  const id = Number(str(form, 'id', 12)), action = str(form, 'action', 10)
  if (!Number.isInteger(id)) throw new Error('Invalid')
  const { query } = await db()
  if (action === 'delete') await query(`DELETE FROM site_reviews WHERE id = $1`, [id])
  else if (['Approved', 'Pending', 'Rejected'].includes(action)) await query(`UPDATE site_reviews SET status = $1 WHERE id = $2`, [action, id])
  else throw new Error('Invalid')
  await audit(me.userId, 'site_review_' + action.toLowerCase(), `#${id}`)
  refresh()
  revalidatePath('/admin/site/reviews')
}
