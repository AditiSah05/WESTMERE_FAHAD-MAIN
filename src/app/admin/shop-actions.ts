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

const CATEGORIES = ['Websites', 'Applications', 'Software & Tools', 'Custom development']
const KINDS = ['website', 'software', 'service']
const PRICING = ['One-time', 'Subscription', 'Custom pricing']

/** Create or update a catalogue product. Price changes apply to new orders only; old orders keep what was paid. */
export async function saveProduct(form: FormData) {
  const me = await assertModule('products', 'write')
  const name = s(form, 'name', 80).trim(), category = s(form, 'category'), kind = s(form, 'kind'), tag = s(form, 'tag', 20).trim()
  const price = Number(s(form, 'price', 9)), active = s(form, 'status') !== 'Hidden'
  const description = s(form, 'description', 300).trim(), tech = s(form, 'tech', 80).trim(), image = s(form, 'image', 400).trim(), listed = form.get('listed') === 'on', featured = form.get('featured') === 'on', pricing = s(form, 'pricing')
  if (image && !/^https:\/\/\S+$/.test(image)) throw new Error('Image must be an https link')
  if (!name || !CATEGORIES.includes(category) || !KINDS.includes(kind) || !PRICING.includes(pricing) || !Number.isInteger(price) || price < 0 || price > 1_000_000) throw new Error('Invalid')
  const { query } = await db()
  const id = s(form, 'id', 60)
  if (id) {
    await query(`UPDATE shop_products SET name = $1, category = $2, kind = $3, price = $4, tag = $5, active = $6, description = $7, tech = $8, image = $9, listed = $10, pricing = $11, featured = $12 WHERE id = $13`, [name, category, kind, price, tag, active, description, tech, image, listed, pricing, featured, id])
  } else {
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 40) || 'product'
    await query(`INSERT INTO shop_products (id, name, category, kind, price, tag, active, description, tech, image, listed, pricing, featured) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13) ON CONFLICT (id) DO NOTHING`, [`${slug}-${Date.now().toString(36)}`, name, category, kind, price, tag, active, description, tech, image, listed, pricing, featured])
  }
  await audit(me.userId, id ? 'product_updated' : 'product_created', name)
  revalidatePath('/admin/shop', 'layout')
  revalidatePath('/account', 'layout')
  revalidatePath('/product', 'layout')
}

export type BulkResult = { done: number; skipped: string[] }
const BULK = { publish: 'active = true', unpublish: 'active = false', feature: 'featured = true', unfeature: 'featured = false', show: 'listed = true', hide: 'listed = false' } as const

/** Bulk change on selected products. Delete only removes products nobody has ordered; the rest are reported back. */
export async function bulkProducts(ids: string[], op: keyof typeof BULK | 'delete'): Promise<BulkResult> {
  const me = await assertModule('products', 'write')
  const list = Array.from(new Set(ids.filter((i) => typeof i === 'string' && i.length <= 60))).slice(0, 200)
  if (!list.length) return { done: 0, skipped: [] }
  const { query } = await db()
  let done = 0
  const skipped: string[] = []
  if (op === 'delete') {
    for (const id of list) {
      const [used] = await query<{ n: string }>(`SELECT (SELECT count(*) FROM shop_orders WHERE product_id = $1) + (SELECT count(*) FROM shop_licenses WHERE product_id = $1) AS n`, [id])
      if (Number(used.n) > 0) { skipped.push(id); continue }
      await query(`DELETE FROM shop_wishlist WHERE product_id = $1`, [id])
      await query(`DELETE FROM shop_reviews WHERE product_id = $1`, [id])
      done += (await query(`DELETE FROM shop_products WHERE id = $1 RETURNING id`, [id])).length
    }
  } else {
    if (!(op in BULK)) throw new Error('Invalid')
    done = (await query(`UPDATE shop_products SET ${BULK[op]} WHERE id = ANY($1::text[]) RETURNING id`, [list])).length
  }
  await audit(me.userId, `product_bulk_${op}`, `${done} product(s)`)
  revalidatePath('/admin/shop', 'layout'); revalidatePath('/account', 'layout'); revalidatePath('/product', 'layout')
  return { done, skipped }
}

export type ImportRow = { name: string; category: string; type: string; price: string; pricing: string; description: string; tech: string; status: string }
const TYPE_TO_KIND: Record<string, string> = { 'ready-made website': 'website', website: 'website', 'software / app': 'software', software: 'software', app: 'software', 'custom project': 'service', service: 'service' }

/** Add products from a CSV the admin uploaded. Rows are validated like the form; bad rows are reported, not silently dropped. */
export async function importProducts(rows: ImportRow[]): Promise<{ added: number; errors: string[] }> {
  const me = await assertModule('products', 'write')
  const { query } = await db()
  const errors: string[] = []
  let added = 0
  for (const [i, r] of rows.slice(0, 200).entries()) {
    const name = String(r.name ?? '').trim().slice(0, 80), price = Number(String(r.price ?? '').replace(/[₹,\s]/g, ''))
    const category = CATEGORIES.find((c) => c.toLowerCase() === String(r.category ?? '').trim().toLowerCase())
    const kind = TYPE_TO_KIND[String(r.type ?? '').trim().toLowerCase()] ?? 'website'
    const pricing = PRICING.find((p) => p.toLowerCase() === String(r.pricing ?? '').trim().toLowerCase()) ?? 'One-time'
    if (!name || !category || !Number.isInteger(price) || price < 0 || price > 1_000_000) { errors.push(`Row ${i + 2}: needs a name, one of ${CATEGORIES.join(' / ')} and a whole-number price`); continue }
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 40) || 'product'
    const hidden = String(r.status ?? '').trim().toLowerCase() === 'hidden'
    await query(`INSERT INTO shop_products (id, name, category, kind, price, active, description, tech, listed, pricing) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,true,$9)`, [`${slug}-${Date.now().toString(36)}${i}`, name, category, kind, price, !hidden, String(r.description ?? '').slice(0, 300), String(r.tech ?? '').slice(0, 80), pricing])
    added++
  }
  await audit(me.userId, 'product_import', `${added} product(s)`)
  revalidatePath('/admin/shop', 'layout'); revalidatePath('/account', 'layout'); revalidatePath('/product', 'layout')
  return { added, errors }
}
