import 'server-only'
import { OPEN } from '@/lib/refund-shared'
import { db } from './schema'

export type Refund = { id: string; orderId: string; customer: string; email: string; product: string; method: string; orderAmount: number; amount: number; kind: string; reasonType: string; reason: string; status: string; orderPayment: string; orderFulfilment: string; adminNote: string; refundRef: string; date: string; at: string; ts: number; updatedTs: number }
type Ev = { id: string; event: string; note: string; ts: number; requestId: string; customer: string; amount: number }
const num = (v: unknown) => Number(v ?? 0)
const delta = (n: number, b: number) => (b > 0 ? Math.round(((n - b) / b) * 1000) / 10 : undefined)

export async function listRefunds(): Promise<Refund[]> {
  const rows = await (await db()).query<Record<string, unknown>>(`SELECT r.id::text, r.order_id::text AS "orderId", COALESCE(NULLIF(u.name, ''), u.email) AS customer, u.email, p.name AS product, o.method, o.amount AS "orderAmount", COALESCE(r.refund_amount, o.amount) AS amount,
    r.kind, r.reason_type AS "reasonType", r.reason, r.status, o.payment_status AS "orderPayment", o.fulfilment AS "orderFulfilment", r.admin_note AS "adminNote", r.refund_ref AS "refundRef",
    to_char(r.created_at, 'YYYY-MM-DD') AS date, to_char(r.created_at, 'YYYY-MM-DD HH24:MI') AS at, (extract(epoch FROM r.created_at) * 1000)::bigint AS ts, (extract(epoch FROM r.updated_at) * 1000)::bigint AS "updatedTs"
    FROM shop_requests r JOIN shop_users u ON u.id = r.user_id JOIN shop_orders o ON o.id = r.order_id JOIN shop_products p ON p.id = o.product_id ORDER BY r.id DESC`)
  return rows.map((r) => ({ ...r, ts: num(r.ts), updatedTs: num(r.updatedTs) })) as unknown as Refund[]
}

export async function refundsOverview() {
  const { query } = await db()
  const all = await listRefunds()
  const now = Date.now(), D = 864e5
  const within = (r: Refund, a: number, b: number) => r.ts >= now - b * D && r.ts < now - a * D
  const sum = (l: Refund[]) => l.reduce((a, r) => a + r.amount, 0)
  const by = (s: string) => all.filter((r) => r.status === s)
  const cur = all.filter((r) => within(r, 0, 30)), prev = all.filter((r) => within(r, 30, 60))
  const days = Array.from({ length: 30 }, (_, i) => new Date(now - (29 - i) * D).toISOString().slice(0, 10))
  const perDay = new Map<string, number>()
  for (const r of cur) perDay.set(r.date, (perDay.get(r.date) ?? 0) + 1)
  const open = all.filter((r) => OPEN.includes(r.status) && (r.orderPayment === 'Paid' || r.orderPayment === 'Partially Refunded'))
  const reasons = new Map<string, number>()
  for (const r of all) reasons.set(r.reasonType, (reasons.get(r.reasonType) ?? 0) + 1)
  const months = Array.from({ length: 6 }, (_, i) => { const d = new Date(Date.UTC(new Date().getUTCFullYear(), new Date().getUTCMonth() - 5 + i, 1)); return { key: d.toISOString().slice(0, 7), label: d.toLocaleString('en', { month: 'short', timeZone: 'UTC' }) } })
  const trend = months.map((m) => sum(all.filter((r) => r.status === 'Refunded' && new Date(r.updatedTs).toISOString().slice(0, 7) === m.key)))
  const methods = Array.from(new Set(all.map((r) => r.method))).map((m) => {
    const l = all.filter((r) => r.method === m), done = l.filter((r) => r.status === 'Refunded'), fail = l.filter((r) => r.status === 'Failed')
    return { method: m, total: l.length, refunded: sum(done), processing: l.filter((r) => r.status === 'Processing').length, failed: fail.length, rate: done.length + fail.length ? Math.round((done.length / (done.length + fail.length)) * 1000) / 10 : null }
  }).sort((a, b) => b.total - a.total)
  const events = await query<Ev>(`SELECT e.id::text, e.event, e.note, (extract(epoch FROM e.created_at) * 1000)::bigint AS ts, e.request_id::text AS "requestId", COALESCE(NULLIF(u.name, ''), u.email) AS customer, COALESCE(r.refund_amount, o.amount) AS amount FROM shop_request_events e JOIN shop_requests r ON r.id = e.request_id JOIN shop_users u ON u.id = r.user_id JOIN shop_orders o ON o.id = r.order_id ORDER BY e.id DESC LIMIT 6`)
  const oldPending = by('Requested').filter((r) => now - r.ts > 3 * D).length
  return {
    refunds: all,
    stats: {
      total: all.length, totalDelta: delta(cur.length, prev.length), pending: by('Requested').length, oldPending, review: by('Under Investigation').length,
      approved: by('Approved').length, approvedAmount: sum(by('Approved')), refunded: by('Refunded').length, refundedAmount: sum(by('Refunded')),
      rejected: by('Rejected').length, processing: by('Processing').length, processingAmount: sum(by('Processing')), failed: by('Failed').length, failedAmount: sum(by('Failed')),
      liability: sum(open),
    },
    dayLabels: days.map((d) => `${Number(d.slice(8))}/${Number(d.slice(5, 7))}`), perDay: days.map((d) => perDay.get(d) ?? 0),
    reasons: Array.from(reasons, ([label, value]) => ({ label, value })).sort((a, b) => b.value - a.value),
    monthLabels: months.map((m) => m.label), trend, methods,
    activity: events.map((e) => ({ ...e, ts: num(e.ts), amount: num(e.amount) })),
  }
}

/** Paid or pending orders that do not already have a request in progress: the ones a team member can open a refund for. */
export const refundableOrders = async () => (await db()).query<{ id: string; label: string; amount: number }>(`SELECT o.id::text, '#WM-' || o.id || ' · ' || p.name || ' · ' || COALESCE(NULLIF(u.name, ''), u.email) AS label, o.amount FROM shop_orders o JOIN shop_products p ON p.id = o.product_id JOIN shop_users u ON u.id = o.user_id
  WHERE o.payment_status IN ('Paid','Pending','Partially Refunded') AND o.fulfilment <> 'Cancelled' AND NOT EXISTS (SELECT 1 FROM shop_requests r WHERE r.order_id = o.id AND r.status IN ('Requested','Under Investigation','Approved','Processing','Failed')) ORDER BY o.id DESC LIMIT 300`)

export const requestEvents = async (id: string) => (await db()).query<{ event: string; note: string; at: string }>(`SELECT event, note, to_char(created_at, 'YYYY-MM-DD HH24:MI') AS at FROM shop_request_events WHERE request_id::text = $1 ORDER BY id DESC`, [id])
