import 'server-only'
import type { Row } from '@/lib/admin/types'
import { db } from './schema'

const ymd = `to_char(created_at, 'YYYY-MM-DD')`

type O = { id: string; name: string; amount: number; payment_status: string; fulfilment: string; method: string; date: string }
const orders = async (userId: string) =>
  (await db()).query<O>(`SELECT o.id::text, p.name, o.amount, o.payment_status, o.fulfilment, o.method, to_char(o.created_at, 'YYYY-MM-DD') AS date FROM shop_orders o JOIN shop_products p ON p.id = o.product_id WHERE o.user_id = $1 ORDER BY o.id DESC`, [userId])

export async function profile(userId: string): Promise<Record<string, string | boolean>> {
  const { query } = await db()
  await query(`INSERT INTO shop_profiles (user_id) VALUES ($1) ON CONFLICT DO NOTHING`, [userId])
  const [r] = await query<Record<string, string | boolean>>(`SELECT p.*, u.name, u.email FROM shop_profiles p JOIN shop_users u ON u.id = p.user_id WHERE p.user_id = $1`, [userId])
  return r
}

/** Orders that still allow a request, with the kind allowed by status. */
export async function requestable(userId: string) {
  const { query } = await db()
  const open = new Set((await query<{ order_id: string }>(`SELECT order_id::text FROM shop_requests WHERE user_id = $1 AND status = 'Requested'`, [userId])).map((r) => r.order_id))
  return (await orders(userId)).filter((o) => !open.has(o.id)).flatMap((o) => {
    if (o.payment_status === 'Paid') return [{ id: o.id, label: `#WM-${o.id} · ${o.name}`, kinds: o.fulfilment === 'Delivered' ? ['Refund'] : ['Cancellation', 'Refund'] }]
    if (o.fulfilment === 'Awaiting Payment' || o.fulfilment === 'Processing') return [{ id: o.id, label: `#WM-${o.id} · ${o.name}`, kinds: ['Cancellation'] }]
    return []
  })
}

export async function reviewable(userId: string) {
  return (await db()).query<{ id: string; name: string }>(`SELECT DISTINCT p.id, p.name FROM shop_orders o JOIN shop_products p ON p.id = o.product_id WHERE o.user_id = $1 AND o.payment_status = 'Paid' AND o.fulfilment = 'Delivered'`, [userId])
}

export async function loadMore(slug: string, userId: string): Promise<Record<string, Row[]> | null> {
  const { query } = await db()
  if (slug === 'billing') {
    const os = await orders(userId)
    const pay = (o: O): Row => ({ id: o.id, txn: `TXN-${o.id}`, order: `#WM-${o.id}`, amount: o.amount, status: o.payment_status, method: o.method, date: o.date })
    return {
      history: os.map(pay),
      invoices: os.filter((o) => o.payment_status !== 'Failed' && o.payment_status !== 'Pending').map((o) => ({ id: o.id, invoice: `INV-${o.date.slice(0, 4)}-${o.id.padStart(4, '0')}`, order: `#WM-${o.id}`, amount: o.amount, date: o.date })),
      refunds: os.filter((o) => o.payment_status.includes('Refunded')).map((o) => ({ id: o.id, order: `#WM-${o.id}`, amount: o.amount, status: o.payment_status, date: o.date })),
    }
  }
  if (slug === 'reviews') {
    return { mine: await query<Row>(`SELECT p.id, p.name AS product, r.rating || ' / 5' AS rating, r.feedback, r.status FROM shop_reviews r JOIN shop_products p ON p.id = r.product_id WHERE r.user_id = $1`, [userId]) }
  }
  if (slug === 'notifications') {
    const items: (Row & { at: string })[] = []
    for (const o of await orders(userId)) {
      items.push({ id: `o${o.id}`, type: 'Order', message: `Order #WM-${o.id} (${o.name}): ${o.payment_status}, ${o.fulfilment}.`, date: o.date, at: o.date })
      if (o.payment_status === 'Paid' && o.fulfilment === 'Delivered') items.push({ id: `d${o.id}`, type: 'Download', message: `${o.name} is ready in Downloads.`, date: o.date, at: o.date })
      if (o.payment_status === 'Failed') items.push({ id: `f${o.id}`, type: 'Payment', message: `Payment for #WM-${o.id} failed.`, date: o.date, at: o.date })
    }
    for (const t of await query<{ id: string; subject: string; status: string; date: string }>(`SELECT id::text, subject, status, ${ymd} AS date FROM shop_tickets WHERE user_id = $1`, [userId])) items.push({ id: `t${t.id}`, type: 'Support', message: `Ticket "${t.subject}" is ${t.status.toLowerCase()}.`, date: t.date, at: t.date })
    for (const r of await query<{ id: string; kind: string; status: string; order_id: string; date: string }>(`SELECT id::text, kind, status, order_id::text, ${ymd} AS date FROM shop_requests WHERE user_id = $1`, [userId])) items.push({ id: `r${r.id}`, type: 'Order', message: `${r.kind} request for #WM-${r.order_id}: ${r.status.toLowerCase()}.`, date: r.date, at: r.date })
    return { all: items.sort((a, b) => b.at.localeCompare(a.at)).map(({ at: _at, ...r }) => r) }
  }
  return null
}

export async function requestRows(userId: string): Promise<Row[]> {
  return (await db()).query<Row>(`SELECT r.id::text AS id, '#WM-' || r.order_id AS "orderId", p.name AS product, r.kind AS type, r.status, to_char(r.created_at, 'YYYY-MM-DD') AS date FROM shop_requests r JOIN shop_orders o ON o.id = r.order_id JOIN shop_products p ON p.id = o.product_id WHERE r.user_id = $1 ORDER BY r.id DESC`, [userId])
}
