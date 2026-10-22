'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { assertCustomer } from '@/lib/server/customer'
import { db } from '@/lib/server/schema'
import { createOrder } from '@/lib/server/shop'

const METHODS = ['UPI', 'Card', 'Net banking']
const TYPES = ['Technical issue', 'Installation help', 'Bug report', 'Billing', 'Other']
const PRIORITIES = ['Low', 'Medium', 'High']
const str = (v: FormDataEntryValue | null, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '')

/** Test-mode checkout: price and statuses are decided on the server, never taken from the form. */
export async function buy(form: FormData) {
  const me = await assertCustomer()
  const method = str(form.get('method'), 20)
  await createOrder(me.userId, str(form.get('productId'), 40), METHODS.includes(method) ? method : 'UPI', form.get('simulate') === 'fail')
  redirect('/account/orders')
}

export async function toggleWishlist(form: FormData) {
  const me = await assertCustomer()
  const productId = str(form.get('productId'), 40)
  const { query } = await db()
  const removed = await query(`DELETE FROM shop_wishlist WHERE user_id = $1 AND product_id = $2 RETURNING product_id`, [me.userId, productId])
  if (!removed.length) await query(`INSERT INTO shop_wishlist (user_id, product_id) SELECT $1, id FROM shop_products WHERE id = $2 ON CONFLICT DO NOTHING`, [me.userId, productId])
  revalidatePath('/account', 'layout')
}

export type TicketState = { error?: string; ok?: string } | undefined

export async function createTicket(_p: TicketState, form: FormData): Promise<TicketState> {
  const me = await assertCustomer()
  const subject = str(form.get('subject'), 120)
  const message = str(form.get('message'), 4000)
  const type = str(form.get('type'), 40)
  const priority = str(form.get('priority'), 10)
  if (!subject || !message) return { error: 'Add a subject and describe the issue.' }
  if (!TYPES.includes(type) || !PRIORITIES.includes(priority)) return { error: 'Invalid selection.' }
  const { query } = await db()
  const [{ n }] = await query<{ n: string }>(`SELECT count(*) AS n FROM shop_tickets WHERE user_id = $1 AND created_at > now() - interval '1 hour'`, [me.userId])
  if (Number(n) >= 10) return { error: 'Too many tickets in the last hour. Please wait.' }
  await query(`INSERT INTO shop_tickets (user_id, subject, type, priority, message) VALUES ($1,$2,$3,$4,$5)`, [me.userId, subject, type, priority, message])
  revalidatePath('/account/support')
  return { ok: 'Ticket created. We will reply by email.' }
}
