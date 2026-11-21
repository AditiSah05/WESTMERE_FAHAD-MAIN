'use server'

import { revalidatePath } from 'next/cache'
import { FULFILMENT, METHODS, PAYMENT } from '@/lib/order-shared'
import { assertModule } from '@/lib/server/auth'
import { issueLicenseForOrder } from '@/lib/server/licenses'
import { db } from '@/lib/server/schema'
import { audit } from '@/lib/server/session'

const s = (f: FormData, k: string, max = 60) => { const v = f.get(k); return typeof v === 'string' ? v.trim().slice(0, max) : '' }
const refresh = () => { for (const p of ['/admin', '/account']) revalidatePath(p, 'layout') }
export type OState = { error?: string } | undefined
const paidLike = (p: string) => p === 'Paid' || p === 'Partially Refunded'

/** Record an order taken outside the site (for example a UPI payment confirmed on WhatsApp). */
export async function createManualOrder(_p: OState, form: FormData): Promise<OState> {
  const me = await assertModule('orders', 'write')
  const userId = s(form, 'customer'), productId = s(form, 'product'), payment = s(form, 'payment'), fulfilment = s(form, 'fulfilment'), method = s(form, 'method')
  const amount = Number(s(form, 'amount', 9)), ref = s(form, 'paymentRef', 40), note = s(form, 'note', 200)
  if (!(PAYMENT as readonly string[]).includes(payment) || !(FULFILMENT as readonly string[]).includes(fulfilment) || !(METHODS as readonly string[]).includes(method)) return { error: 'Choose the payment, delivery and method.' }
  if (!Number.isInteger(amount) || amount < 0 || amount > 10_000_000) return { error: 'Enter the amount as a whole number of rupees.' }
  if (fulfilment === 'Delivered' && !paidLike(payment)) return { error: 'An unpaid order cannot be marked Delivered.' }
  const { query } = await db()
  if (!(await query(`SELECT 1 FROM shop_users u, shop_products p WHERE u.id::text = $1 AND p.id = $2`, [userId, productId])).length) return { error: 'Choose a customer and a product.' }
  const [o] = await query<{ id: string }>(`INSERT INTO shop_orders (user_id, product_id, amount, payment_status, fulfilment, method, manual, note, payment_ref) VALUES ($1,$2,$3,$4,$5,$6,true,$7,$8) RETURNING id::text`, [userId, productId, amount, payment, fulfilment, method, note, ref])
  await audit(me.userId, 'order_created', `#WM-${o.id} ₹${amount} ${payment}/${fulfilment}`)
  const key = await issueLicenseForOrder(Number(o.id))
  if (key) await audit(me.userId, 'license_auto_created', `${key} for order #WM-${o.id}`)
  refresh()
  return undefined
}

export async function updateOrder(_p: OState, form: FormData): Promise<OState> {
  const me = await assertModule('orders', 'write')
  const id = s(form, 'id', 12), payment = s(form, 'payment'), fulfilment = s(form, 'fulfilment'), ref = s(form, 'paymentRef', 40), note = s(form, 'note', 200)
  if (!/^\d{1,12}$/.test(id) || !(PAYMENT as readonly string[]).includes(payment) || !(FULFILMENT as readonly string[]).includes(fulfilment)) return { error: 'Invalid status.' }
  // Protected access is granted only after a verified payment.
  if (fulfilment === 'Delivered' && !paidLike(payment)) return { error: 'An unpaid order cannot be marked Delivered.' }
  const { query } = await db()
  if (!(await query(`UPDATE shop_orders SET payment_status = $1, fulfilment = $2, payment_ref = $3, note = $4 WHERE id::text = $5 RETURNING id`, [payment, fulfilment, ref, note, id])).length) return { error: 'Order not found.' }
  await audit(me.userId, 'order_status', `#WM-${id}: ${payment} / ${fulfilment}`)
  const key = await issueLicenseForOrder(Number(id))
  if (key) await audit(me.userId, 'license_auto_created', `${key} for order #WM-${id}`)
  refresh()
  return undefined
}

const OPS = { paid: 'mark paid', processing: 'mark processing', delivered: 'mark delivered', cancel: 'cancel' } as const
export type OrderBulk = keyof typeof OPS

/** Same change on many orders. Each order is checked on its own; the ones that do not qualify are counted, not changed. */
export async function bulkOrders(ids: string[], op: OrderBulk): Promise<{ done: number; skipped: number }> {
  const me = await assertModule('orders', 'write')
  if (!(op in OPS)) throw new Error('Invalid')
  const list = Array.from(new Set(ids.filter((i) => typeof i === 'string' && /^\d{1,12}$/.test(i)))).slice(0, 200)
  const { query } = await db()
  const sql: Record<OrderBulk, string> = {
    paid: `UPDATE shop_orders SET payment_status = 'Paid', fulfilment = CASE WHEN fulfilment = 'Awaiting Payment' THEN 'Processing' ELSE fulfilment END WHERE id::text = $1 AND payment_status = 'Pending' RETURNING id`,
    processing: `UPDATE shop_orders SET fulfilment = 'Processing' WHERE id::text = $1 AND payment_status IN ('Paid','Partially Refunded') AND fulfilment IN ('Awaiting Payment','Ready for Delivery','On Hold') RETURNING id`,
    delivered: `UPDATE shop_orders SET fulfilment = 'Delivered' WHERE id::text = $1 AND payment_status IN ('Paid','Partially Refunded') AND fulfilment NOT IN ('Delivered','Cancelled') RETURNING id`,
    cancel: `UPDATE shop_orders SET fulfilment = 'Cancelled' WHERE id::text = $1 AND payment_status IN ('Pending','Failed') AND fulfilment <> 'Cancelled' RETURNING id`,
  }
  let done = 0
  for (const id of list) {
    if ((await query(sql[op], [id])).length) { done++; if (op === 'delivered') await issueLicenseForOrder(Number(id)) }
  }
  await audit(me.userId, `order_bulk_${op}`, `${done} of ${list.length}`)
  refresh()
  return { done, skipped: list.length - done }
}
