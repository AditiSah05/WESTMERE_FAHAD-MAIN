'use server'

import { revalidatePath } from 'next/cache'
import { assertModule } from '@/lib/server/auth'
import { db } from '@/lib/server/schema'
import { audit } from '@/lib/server/session'
import { cleanUrl } from '@/lib/site-defaults'

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

const CATEGORIES = ['Websites', 'Applications', 'Software & Tools', 'Custom development']
const KINDS = ['website', 'software', 'service']

/** Create or update a catalogue product. Price changes apply to new orders only; old orders keep what was paid. */
export async function saveProduct(form: FormData) {
  const me = await assertModule('products', 'write')
  const name = s(form, 'name', 80).trim(), category = s(form, 'category'), kind = s(form, 'kind'), tag = s(form, 'tag', 20).trim()
  const price = Number(s(form, 'price', 9)), active = s(form, 'status') !== 'Hidden'
  if (!name || !CATEGORIES.includes(category) || !KINDS.includes(kind) || !Number.isInteger(price) || price < 0 || price > 1_000_000) throw new Error('Invalid')
  // Website listing fields.
  const listed = s(form, 'listed') === 'yes'
  const description = s(form, 'description', 400).trim(), audience = s(form, 'audience', 40).trim(), typeLabel = s(form, 'typeLabel', 40).trim()
  const csv = (k: string) => s(form, k, 200).split(',').map((x) => x.trim()).filter(Boolean).slice(0, 8).join(', ')
  const image = cleanUrl(s(form, 'imageUrl', 300)), qr = cleanUrl(s(form, 'qrUrl', 300))
  if (image === null || qr === null) throw new Error('Image and QR links must be https:// links')
  const { query } = await db()
  const id = s(form, 'id', 60)
  const extra = [listed, description, csv('categories'), csv('tech'), audience, typeLabel, image, qr]
  if (id) {
    await query(`UPDATE shop_products SET name = $1, category = $2, kind = $3, price = $4, tag = $5, active = $6, listed = $7, description = $8, categories = $9, tech = $10, audience = $11, type_label = $12, image_url = $13, qr_url = $14 WHERE id = $15`, [name, category, kind, price, tag, active, ...extra, id])
  } else {
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 40) || 'product'
    await query(`INSERT INTO shop_products (id, name, category, kind, price, tag, active, listed, description, categories, tech, audience, type_label, image_url, qr_url) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15) ON CONFLICT (id) DO NOTHING`, [`${slug}-${Date.now().toString(36)}`, name, category, kind, price, tag, active, ...extra])
  }
  await audit(me.userId, id ? 'product_updated' : 'product_created', name)
  revalidatePath('/admin/shop', 'layout')
  revalidatePath('/account', 'layout')
  revalidatePath('/', 'layout')
}
