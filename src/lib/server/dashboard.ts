import 'server-only'
import { db } from './schema'

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const num = (v: unknown) => Number(v ?? 0)
/** Percentage change, or undefined when there is nothing to compare against. */
const delta = (now: number, before: number) => (before > 0 ? Math.round(((now - before) / before) * 1000) / 10 : undefined)

export type Task = { text: string; href: string }
export type Dash = Awaited<ReturnType<typeof dashboardData>>

/** Real shop figures. "Revenue" counts verified (Paid) orders only; there is no cost data, so no profit figure. */
export async function dashboardData() {
  const { query } = await db()
  const one = async (sql: string) => (await query<Record<string, unknown>>(sql))[0] ?? {}

  const t = await one(`SELECT
    COALESCE(sum(amount) FILTER (WHERE payment_status = 'Paid'), 0) AS revenue,
    COALESCE(sum(amount) FILTER (WHERE payment_status = 'Paid' AND created_at > now() - interval '30 days'), 0) AS rev30,
    COALESCE(sum(amount) FILTER (WHERE payment_status = 'Paid' AND created_at <= now() - interval '30 days' AND created_at > now() - interval '60 days'), 0) AS rev_prev,
    count(*) AS orders,
    count(*) FILTER (WHERE created_at > now() - interval '30 days') AS orders30,
    count(*) FILTER (WHERE created_at <= now() - interval '30 days' AND created_at > now() - interval '60 days') AS orders_prev
    FROM shop_orders`)
  const c = await one(`SELECT count(*) AS n, count(*) FILTER (WHERE created_at > now() - interval '30 days') AS n30, count(*) FILTER (WHERE created_at <= now() - interval '30 days' AND created_at > now() - interval '60 days') AS prev FROM shop_users`)
  const open = await one(`SELECT
    (SELECT count(*) FROM shop_requests WHERE status = 'Requested') AS requests,
    (SELECT count(*) FROM shop_tickets WHERE status IN ('Open','In progress')) AS tickets,
    (SELECT count(*) FROM shop_tickets WHERE status IN ('Open','In progress') AND priority = 'High') AS urgent,
    (SELECT count(*) FROM shop_reviews WHERE status = 'Pending') AS reviews,
    (SELECT count(*) FROM shop_orders WHERE payment_status = 'Paid' AND fulfilment IN ('Processing','Ready for Delivery')) AS to_deliver,
    (SELECT count(*) FROM shop_orders WHERE fulfilment = 'On Hold') AS on_hold`)

  const monthly = await query<{ m: string; v: string }>(`SELECT to_char(date_trunc('month', created_at), 'YYYY-MM') AS m, sum(amount) AS v FROM shop_orders WHERE payment_status = 'Paid' AND created_at > date_trunc('month', now()) - interval '11 months' GROUP BY 1`)
  const daily = await query<{ d: string; v: string }>(`SELECT to_char(created_at, 'YYYY-MM-DD') AS d, sum(amount) AS v FROM shop_orders WHERE payment_status = 'Paid' AND created_at > now() - interval '30 days' GROUP BY 1`)
  const now = new Date()
  const months = Array.from({ length: 12 }, (_, i) => new Date(now.getFullYear(), now.getMonth() - 11 + i, 1))
  const days = Array.from({ length: 30 }, (_, i) => new Date(now.getTime() - (29 - i) * 864e5))
  const mv = new Map(monthly.map((r) => [r.m, num(r.v)]))
  const dv = new Map(daily.map((r) => [r.d, num(r.v)]))

  const top = await query<{ name: string; sold: string; revenue: string }>(`SELECT p.name, count(*) AS sold, sum(o.amount) AS revenue FROM shop_orders o JOIN shop_products p ON p.id = o.product_id WHERE o.payment_status = 'Paid' GROUP BY p.name ORDER BY sum(o.amount) DESC LIMIT 5`)
  const status = await query<{ s: string; n: string }>(`SELECT payment_status AS s, count(*) AS n FROM shop_orders GROUP BY 1 ORDER BY 2 DESC`)
  const feed = await query<{ text: string; at: Date }>(`
    (SELECT 'Order #WM-' || o.id || ' ' || lower(o.payment_status) || ' by ' || u.email AS text, o.created_at AS at FROM shop_orders o JOIN shop_users u ON u.id = o.user_id)
    UNION ALL (SELECT 'New customer registered: ' || name, created_at FROM shop_users)
    UNION ALL (SELECT '' || r.kind || ' requested for order #WM-' || r.order_id, r.created_at FROM shop_requests r)
    UNION ALL (SELECT 'Ticket T-' || id || ': ' || subject, created_at FROM shop_tickets)
    ORDER BY at DESC LIMIT 8`)

  const tasks: Task[] = [
    [num(open.requests), 'refund/cancellation request', '/admin/shop/requests'],
    [num(open.urgent), 'high-priority ticket', '/admin/shop/tickets'],
    [num(open.tickets) - num(open.urgent), 'open ticket', '/admin/shop/tickets'],
    [num(open.reviews), 'review waiting for approval', '/admin/shop/reviews'],
    [num(open.to_deliver), 'paid order to deliver', '/admin/shop/orders'],
    [num(open.on_hold), 'order on hold', '/admin/shop/orders'],
  ].filter(([n]) => (n as number) > 0).map(([n, label, href]) => ({ text: `${n} ${label}${n === 1 ? '' : 's'}`, href: href as string }))

  return {
    stats: { revenue: num(t.revenue), revenueDelta: delta(num(t.rev30), num(t.rev_prev)), orders: num(t.orders), ordersDelta: delta(num(t.orders30), num(t.orders_prev)), customers: num(c.n), customersDelta: delta(num(c.n30), num(c.prev)), openRequests: num(open.requests) + num(open.tickets) },
    monthLabels: months.map((d) => MONTHS[d.getMonth()]),
    monthly: months.map((d) => mv.get(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`) ?? 0),
    dayLabels: days.map((d) => String(d.getDate())),
    daily: days.map((d) => dv.get(d.toISOString().slice(0, 10)) ?? 0),
    top: top.map((r) => ({ name: r.name, sold: num(r.sold), revenue: num(r.revenue) })),
    status: status.map((r) => ({ label: r.s, value: num(r.n) })),
    tasks,
    activity: feed.map((r) => ({ text: r.text, at: new Date(r.at).toISOString() })),
  }
}
