'use server'

import { revalidatePath } from 'next/cache'
import { columnsFor, profileGroups } from '@/lib/account/profile-fields'
import { assertCustomer } from '@/lib/server/customer'
import { db } from '@/lib/server/schema'
import { requestable, reviewable } from '@/lib/server/shop-more'

export type FState = { error?: string; ok?: string } | undefined
const str = (v: FormDataEntryValue | null, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '')

export async function saveProfile(slug: string, _p: FState, form: FormData): Promise<FState> {
  const me = await assertCustomer()
  if (!profileGroups[slug]) return { error: 'Unknown form.' }
  const { query } = await db()
  await query(`INSERT INTO shop_profiles (user_id) VALUES ($1) ON CONFLICT DO NOTHING`, [me.userId])
  if (slug === 'profile') {
    const name = str(form.get('name'), 80)
    if (!name) return { error: 'Name is required.' }
    await query(`UPDATE shop_users SET name = $1 WHERE id = $2`, [name, me.userId])
  }
  // Column names come from our own whitelist, never from the form.
  for (const f of columnsFor(slug)) {
    const value = f.toggle ? form.get(f.name) === 'on' : str(form.get(f.name), f.multiline ? 300 : 80)
    await query(`UPDATE shop_profiles SET ${f.name} = $1 WHERE user_id = $2`, [value, me.userId])
  }
  revalidatePath('/account', 'layout')
  return { ok: 'Saved.' }
}

export async function requestOrderChange(_p: FState, form: FormData): Promise<FState> {
  const me = await assertCustomer()
  const orderId = str(form.get('orderId'), 20)
  const kind = str(form.get('kind'), 20)
  const reason = str(form.get('reason'), 1000)
  if (!reason) return { error: 'Tell us why.' }
  // Eligibility is decided on the server from the order's real status.
  const option = (await requestable(me.userId)).find((o) => o.id === orderId)
  if (!option || !option.kinds.includes(kind)) return { error: 'This order is not eligible for that request.' }
  const { query } = await db()
  await query(`INSERT INTO shop_requests (user_id, order_id, kind, reason) VALUES ($1,$2,$3,$4)`, [me.userId, orderId, kind, reason])
  revalidatePath('/account/orders')
  return { ok: `${kind} request sent. We will review it and email you.` }
}

export async function submitReview(_p: FState, form: FormData): Promise<FState> {
  const me = await assertCustomer()
  const productId = str(form.get('productId'), 40)
  const rating = Number(form.get('rating'))
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) return { error: 'Choose a rating from 1 to 5.' }
  if (!(await reviewable(me.userId)).some((p) => p.id === productId)) return { error: 'You can only review products you have received.' }
  const { query } = await db()
  await query(`INSERT INTO shop_reviews (user_id, product_id, rating, feedback) VALUES ($1,$2,$3,$4) ON CONFLICT (user_id, product_id) DO UPDATE SET rating = $3, feedback = $4, status = 'Pending'`, [me.userId, productId, rating, str(form.get('feedback'), 1000)])
  revalidatePath('/account/reviews')
  return { ok: 'Thanks. Your review is pending approval.' }
}

export async function requestDeletion(): Promise<FState> {
  const me = await assertCustomer()
  const { query } = await db()
  const [open] = await query(`SELECT 1 FROM shop_tickets WHERE user_id = $1 AND type = 'Account deletion' AND status = 'Open'`, [me.userId])
  if (!open) await query(`INSERT INTO shop_tickets (user_id, subject, type, priority, message) VALUES ($1,'Account deletion request','Account deletion','Medium','Please delete my account and data.')`, [me.userId])
  revalidatePath('/account/support')
  return { ok: 'Deletion request sent to support. We will confirm by email.' }
}
