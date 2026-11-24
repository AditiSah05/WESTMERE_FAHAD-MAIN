'use server'

import { revalidatePath } from 'next/cache'
import { REASONS, REQUEST_KINDS, STATUSES, nextStatuses, statusLabel } from '@/lib/refund-shared'
import { assertModule } from '@/lib/server/auth'
import { db } from '@/lib/server/schema'
import { audit } from '@/lib/server/session'

const s = (f: FormData, k: string, max = 60) => { const v = f.get(k); return typeof v === 'string' ? v.trim().slice(0, max) : '' }
const refresh = () => { for (const p of ['/admin', '/account']) revalidatePath(p, 'layout') }
export type RState = { error?: string } | undefined
type Q = <T = Record<string, unknown>>(sql: string, params?: unknown[]) => Promise<T[]>
type Opts = { amount?: number | null; ref?: string; note?: string }

/** Move one request to a new status and apply what that means for the order and its license. Returns an error message or null. */
async function transition(q: Q, id: string, status: string, o: Opts = {}): Promise<string | null> {
  const [r] = await q<{ status: string; kind: string; order_id: string; refund_amount: number | null; amount: number; payment: string; fulfilment: string }>(
    `SELECT r.status, r.kind, r.order_id::text, r.refund_amount, o.amount, o.payment_status AS payment, o.fulfilment FROM shop_requests r JOIN shop_orders o ON o.id = r.order_id WHERE r.id::text = $1`, [id])
  if (!r) return 'Request not found.'
  if (!(STATUSES as readonly string[]).includes(status) || !nextStatuses(r.status, r.payment).includes(status as never)) return `A request that is ${statusLabel(r.status)} cannot move to ${statusLabel(status)}.`
  const amount = o.amount === undefined || o.amount === null ? r.refund_amount : o.amount
  if (amount !== null && (!Number.isInteger(amount) || amount < 1 || amount > r.amount)) return `The refund amount must be between ₹1 and ₹${r.amount.toLocaleString('en-IN')}.`
  const full = amount === null || amount >= r.amount

  if (status === 'Approved' && full && r.fulfilment !== 'Cancelled') {
    await q(`UPDATE shop_orders SET fulfilment = 'Cancelled' WHERE id::text = $1`, [r.order_id])
    const revoked = await q<{ id: string }>(`UPDATE shop_licenses SET revoked = true WHERE order_id::text = $1 AND NOT revoked RETURNING id::text`, [r.order_id])
    for (const l of revoked) await q(`INSERT INTO shop_license_events (license_id, event, note) VALUES ($1,'Revoked',$2)`, [l.id, `Refund approved for order #WM-${r.order_id}`])
  }
  if (status === 'Refunded') await q(`UPDATE shop_orders SET payment_status = $1, fulfilment = CASE WHEN $2::boolean THEN 'Cancelled' ELSE fulfilment END WHERE id::text = $3`, [full ? 'Refunded' : 'Partially Refunded', full, r.order_id])
  await q(`UPDATE shop_requests SET status = $1, refund_amount = $2, refund_ref = COALESCE(NULLIF($3, ''), refund_ref), admin_note = COALESCE(NULLIF($4, ''), admin_note), updated_at = now() WHERE id::text = $5`, [status, amount, o.ref ?? '', o.note ?? '', id])
  await q(`INSERT INTO shop_request_events (request_id, event, note) VALUES ($1,$2,$3)`, [id, statusLabel(status), [amount !== null && amount !== undefined ? `₹${amount.toLocaleString('en-IN')}` : '', o.note ?? ''].filter(Boolean).join(' · ')])
  return null
}

export async function changeRefund(_p: RState, form: FormData): Promise<RState> {
  const me = await assertModule('orders', 'write')
  const id = s(form, 'id', 12), status = s(form, 'status'), ref = s(form, 'refundRef', 40), note = s(form, 'note', 300), raw = s(form, 'amount', 9)
  if (!/^\d{1,12}$/.test(id)) return { error: 'Invalid request.' }
  const amount = raw === '' ? undefined : Number(raw)
  const { tx } = await db()
  let err: string | null = null
  await tx(async (q) => { err = await transition(q as Q, id, status, { amount, ref, note }) })
  if (err) return { error: err }
  await audit(me.userId, 'refund_status', `RF-${id} → ${status}`)
  refresh()
  return undefined
}

const BULK = { review: 'Under Investigation', approve: 'Approved', reject: 'Rejected' } as const
export type RefundBulk = keyof typeof BULK

/** Each request is checked on its own; the ones that cannot make that move are counted and left alone. */
export async function bulkRefunds(ids: string[], op: RefundBulk): Promise<{ done: number; skipped: number }> {
  const me = await assertModule('orders', 'write')
  if (!(op in BULK)) throw new Error('Invalid')
  const list = Array.from(new Set(ids.filter((i) => typeof i === 'string' && /^\d{1,12}$/.test(i)))).slice(0, 100)
  const { tx } = await db()
  let done = 0
  for (const id of list) await tx(async (q) => { if (!(await transition(q as Q, id, BULK[op]))) done++ })
  await audit(me.userId, `refund_bulk_${op}`, `${done} of ${list.length}`)
  refresh()
  return { done, skipped: list.length - done }
}

/** The team opens a request for a customer who asked outside the site (for example on WhatsApp). */
export async function createRefundRequest(_p: RState, form: FormData): Promise<RState> {
  const me = await assertModule('orders', 'write')
  const orderId = s(form, 'order', 12), kind = s(form, 'kind'), reasonType = s(form, 'reasonType'), reason = s(form, 'reason', 1000), raw = s(form, 'amount', 9)
  if (!/^\d{1,12}$/.test(orderId) || !(REQUEST_KINDS as readonly string[]).includes(kind) || !(REASONS as readonly string[]).includes(reasonType)) return { error: 'Choose the order, the type and the reason.' }
  if (!reason) return { error: 'Write a short note about the request.' }
  const { query } = await db()
  const [o] = await query<{ user_id: string; amount: number; payment: string; fulfilment: string }>(`SELECT user_id::text, amount, payment_status AS payment, fulfilment FROM shop_orders WHERE id::text = $1`, [orderId])
  if (!o || o.fulfilment === 'Cancelled' || !['Paid', 'Pending', 'Partially Refunded'].includes(o.payment)) return { error: 'This order cannot have a refund request.' }
  if ((await query(`SELECT 1 FROM shop_requests WHERE order_id::text = $1 AND status IN ('Requested','Under Investigation','Approved','Processing','Failed')`, [orderId])).length) return { error: 'This order already has a request in progress.' }
  const amount = raw === '' ? null : Number(raw)
  if (amount !== null && (!Number.isInteger(amount) || amount < 1 || amount > o.amount)) return { error: `The amount must be between ₹1 and ₹${o.amount.toLocaleString('en-IN')}.` }
  const [r] = await query<{ id: string }>(`INSERT INTO shop_requests (user_id, order_id, kind, reason, reason_type, refund_amount) VALUES ($1,$2,$3,$4,$5,$6) RETURNING id::text`, [o.user_id, orderId, kind, reason, reasonType, amount !== null && amount < o.amount ? amount : null])
  await query(`INSERT INTO shop_request_events (request_id, event, note) VALUES ($1,'Request received','Opened by the team')`, [r.id])
  await audit(me.userId, 'refund_created', `RF-${r.id} for #WM-${orderId}`)
  refresh()
  return undefined
}

export async function getRefundEvents(id: string) {
  await assertModule('orders', 'read')
  const { requestEvents } = await import('@/lib/server/refunds')
  return requestEvents(String(id).slice(0, 12))
}
