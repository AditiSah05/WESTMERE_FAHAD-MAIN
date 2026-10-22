'use server'

import { revalidatePath } from 'next/cache'
import { assertModule } from '@/lib/server/auth'
import { db } from '@/lib/server/schema'
import { audit } from '@/lib/server/session'

const PAYMENT = ['Pending', 'Paid', 'Failed', 'Partially Refunded', 'Refunded']
const FULFILMENT = ['Awaiting Payment', 'Processing', 'Ready for Delivery', 'Delivered', 'On Hold', 'Cancelled']
const TICKET = ['Open', 'In progress', 'Resolved', 'Closed']
const REVIEW = ['Pending', 'Published', 'Rejected']
const s = (f: FormData, k: string, max = 60) => { const v = f.get(k); return typeof v === 'string' ? v.slice(0, max) : '' }
const done = () => revalidatePath('/admin/shop', 'layout')

export async function setOrderStatus(form: FormData) {
  const me = await assertModule('orders', 'write')
  const id = Number(s(form, 'id', 12)), payment = s(form, 'payment'), fulfilment = s(form, 'fulfilment')
  if (!Number.isInteger(id) || !PAYMENT.includes(payment) || !FULFILMENT.includes(fulfilment)) throw new Error('Invalid')
  // Protected access is granted only after a verified payment.
  if (fulfilment === 'Delivered' && payment !== 'Paid' && payment !== 'Partially Refunded') throw new Error('Cannot deliver an unpaid order')
  await (await db()).query(`UPDATE shop_orders SET payment_status = $1, fulfilment = $2 WHERE id = $3`, [payment, fulfilment, id])
  await audit(me.userId, 'order_status', `#WM-${id}: ${payment} / ${fulfilment}`)
  done()
}

/** Approving only updates our records; moving the money back is done in the payment gateway. */
export async function decideRequest(form: FormData) {
  const me = await assertModule('orders', 'write')
  const id = Number(s(form, 'id', 12)), approve = s(form, 'decision') === 'approve'
  const { tx } = await db()
  await tx(async (q) => {
    const [r] = await q<{ order_id: string; kind: string }>(`UPDATE shop_requests SET status = $1 WHERE id = $2 AND status = 'Requested' RETURNING order_id, kind`, [approve ? 'Approved' : 'Rejected', id])
    if (r && approve) await q(`UPDATE shop_orders SET fulfilment = 'Cancelled', payment_status = CASE WHEN payment_status = 'Paid' THEN 'Refunded' ELSE payment_status END WHERE id = $1`, [r.order_id])
  })
  await audit(me.userId, approve ? 'request_approved' : 'request_rejected', `request ${id}`)
  done()
}

export async function setTicketStatus(form: FormData) {
  const me = await assertModule('support', 'write')
  const id = Number(s(form, 'id', 12)), status = s(form, 'status')
  if (!Number.isInteger(id) || !TICKET.includes(status)) throw new Error('Invalid')
  await (await db()).query(`UPDATE shop_tickets SET status = $1 WHERE id = $2`, [status, id])
  await audit(me.userId, 'ticket_status', `T-${id}: ${status}`)
  done()
}

export async function setReviewStatus(form: FormData) {
  const me = await assertModule('reviews', 'write')
  const [userId, productId] = s(form, 'id', 100).split(':'), status = s(form, 'status')
  if (!userId || !productId || !REVIEW.includes(status)) throw new Error('Invalid')
  await (await db()).query(`UPDATE shop_reviews SET status = $1 WHERE user_id = $2 AND product_id = $3`, [status, userId, productId])
  await audit(me.userId, 'review_status', `${productId}: ${status}`)
  done()
}
