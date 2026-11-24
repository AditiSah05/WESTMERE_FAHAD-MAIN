import 'server-only'
import { overall, typeOf, type Overall } from '@/lib/order-shared'
import { db } from './schema'

export type Order = { id: string; userId: string; customer: string; email: string; productId: string; product: string; category: string; type: string; amount: number; payment: string; fulfilment: string; method: string; date: string; at: string; ts: number; manual: boolean; note: string; paymentRef: string; license: string | null; requests: number; status: Overall }
const num = (v: unknown) => Number(v ?? 0)
const delta = (now: number, before: number) => (before > 0 ? Math.round(((now - before) / before) * 1000) / 10 : undefined)

export async function listOrders(): Promise<Order[]> {
  const rows = await (await db()).query<Record<string, unknown>>(`SELECT o.id::text, o.user_id::text AS "userId", COALESCE(NULLIF(u.name, ''), u.email) AS customer, u.email, o.product_id AS "productId", p.name AS product, p.category, p.kind, p.pricing, o.amount,
    o.payment_status AS payment, o.fulfilment, o.method, to_char(o.created_at, 'YYYY-MM-DD') AS date, to_char(o.created_at, 'YYYY-MM-DD HH24:MI') AS at, (extract(epoch FROM o.created_at) * 1000)::bigint AS ts, o.manual, o.note, o.payment_ref AS "paymentRef",
    (SELECT license_key FROM shop_licenses l WHERE l.order_id = o.id LIMIT 1) AS license, (SELECT count(*) FROM shop_requests r WHERE r.order_id = o.id)::int AS requests
    FROM shop_orders o JOIN shop_users u ON u.id = o.user_id JOIN shop_products p ON p.id = o.product_id ORDER BY o.id DESC`)
  return rows.map((r) => ({ ...r, ts: num(r.ts), type: typeOf(String(r.kind), String(r.pricing)), status: overall(String(r.payment), String(r.fulfilment)) })) as unknown as Order[]
}

export async function ordersOverview() {
  const { query } = await db()
  const all = await listOrders()
  const now = Date.now(), D = 864e5
  const inRange = (o: Order, a: number, b: number) => o.ts >= now - b * D && o.ts < now - a * D
  const paid = (l: Order[]) => l.filter((o) => o.payment === 'Paid')
  const sum = (l: Order[]) => l.reduce((a, o) => a + o.amount, 0)
  const cur = all.filter((o) => inRange(o, 0, 30)), prev = all.filter((o) => inRange(o, 30, 60))
  const [rq] = await query<{ n: number; amount: number }>(`SELECT count(*)::int AS n, COALESCE(sum(o.amount), 0)::int AS amount FROM shop_requests r JOIN shop_orders o ON o.id = r.order_id WHERE r.status IN ('Requested','Under Investigation')`)
  const [f] = await query<{ downloads: number; licenses: number }>(`SELECT (SELECT count(*) FROM shop_downloads WHERE status = 'Success')::int AS downloads, (SELECT count(*) FROM shop_licenses)::int AS licenses`)
  const requests = await query<{ id: string; orderId: string; customer: string; amount: number; ts: number }>(`SELECT r.id::text, r.order_id::text AS "orderId", COALESCE(NULLIF(u.name, ''), u.email) AS customer, o.amount, (extract(epoch FROM r.created_at) * 1000)::bigint AS ts FROM shop_requests r JOIN shop_orders o ON o.id = r.order_id JOIN shop_users u ON u.id = r.user_id ORDER BY r.id DESC LIMIT 5`)

  const days = Array.from({ length: 30 }, (_, i) => new Date(now - (29 - i) * D).toISOString().slice(0, 10))
  const rev = new Map<string, number>(), cnt = new Map<string, number>()
  for (const o of cur) { cnt.set(o.date, (cnt.get(o.date) ?? 0) + 1); if (o.payment === 'Paid') rev.set(o.date, (rev.get(o.date) ?? 0) + o.amount) }
  const byStatus = new Map<string, number>(), byCat = new Map<string, number>()
  for (const o of all) { byStatus.set(o.status, (byStatus.get(o.status) ?? 0) + 1); if (o.payment === 'Paid') byCat.set(o.category, (byCat.get(o.category) ?? 0) + o.amount) }
  const pend = all.filter((o) => o.payment === 'Pending'), fail = all.filter((o) => o.payment === 'Failed'), refunded = all.filter((o) => o.payment === 'Refunded')
  const activity = [
    ...all.slice(0, 6).map((o) => ({ ts: o.ts, text: `${o.payment === 'Paid' ? 'Payment received' : 'New order'}: #WM-${o.id} (₹${o.amount.toLocaleString('en-IN')}) – ${o.customer}` })),
    ...requests.map((r) => ({ ts: num(r.ts), text: `Refund request: #WM-${r.orderId} (₹${r.amount.toLocaleString('en-IN')}) – ${r.customer}` })),
  ].sort((a, b) => b.ts - a.ts).slice(0, 6)

  return {
    orders: all,
    stats: {
      total: all.length, totalDelta: delta(cur.length, prev.length), revenue: sum(paid(all)), revenueDelta: delta(sum(paid(cur)), sum(paid(prev))), prevRevenue: sum(paid(prev)),
      pendingCount: pend.length, pendingAmount: sum(pend), processing: all.filter((o) => o.status === 'Processing').length, completed: all.filter((o) => o.status === 'Completed').length,
      refundRequests: rq.n, refundAmount: rq.amount, failedCount: fail.length, failedAmount: sum(fail), aov: paid(all).length ? Math.round(sum(paid(all)) / paid(all).length) : 0,
      aovDelta: delta(paid(cur).length ? sum(paid(cur)) / paid(cur).length : 0, paid(prev).length ? sum(paid(prev)) / paid(prev).length : 0),
      paidCount: paid(all).length, partial: all.filter((o) => o.payment === 'Partially Refunded').length, refundedCount: refunded.length, refundedAmount: sum(refunded),
      downloads: f.downloads, licenses: f.licenses, deliveryPending: all.filter((o) => (o.payment === 'Paid' || o.payment === 'Partially Refunded') && !['Delivered', 'Cancelled'].includes(o.fulfilment)).length, delivered: all.filter((o) => o.fulfilment === 'Delivered').length,
    },
    dayLabels: days.map((d) => `${Number(d.slice(8))}/${Number(d.slice(5, 7))}`), revenueSeries: days.map((d) => rev.get(d) ?? 0), ordersSeries: days.map((d) => cnt.get(d) ?? 0),
    breakdown: Array.from(byStatus, ([label, value]) => ({ label, value })).sort((a, b) => b.value - a.value),
    categories: Array.from(byCat, ([name, revenue]) => ({ name, revenue })).sort((a, b) => b.revenue - a.revenue),
    activity,
  }
}

export const productPrices = async () => (await db()).query<{ id: string; name: string; price: number }>(`SELECT id, name, price FROM shop_products WHERE active ORDER BY name`)
