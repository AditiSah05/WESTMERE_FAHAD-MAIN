import 'server-only'
import { db } from './schema'

const num = (v: unknown) => Number(v ?? 0)
export type Report = Awaited<ReturnType<typeof analyticsData>>

/** Everything here comes from orders and accounts; the site has no page-view tracking, so no traffic figures. */
export async function analyticsData() {
  const { query } = await db()
  const [t] = await query<Record<string, unknown>>(`SELECT count(*) AS orders, count(*) FILTER (WHERE payment_status IN ('Paid','Partially Refunded','Refunded')) AS paid_ever, count(*) FILTER (WHERE payment_status = 'Paid') AS paid, COALESCE(sum(amount) FILTER (WHERE payment_status = 'Paid'), 0) AS revenue FROM shop_orders`)
  const [rep] = await query<Record<string, unknown>>(`SELECT count(*) FILTER (WHERE n > 1) AS repeat, count(*) AS buyers FROM (SELECT user_id, count(*) AS n FROM shop_orders WHERE payment_status = 'Paid' GROUP BY user_id) x`)
  const category = await query<{ name: string; revenue: string }>(`SELECT p.category AS name, sum(o.amount) AS revenue FROM shop_orders o JOIN shop_products p ON p.id = o.product_id WHERE o.payment_status = 'Paid' GROUP BY 1 ORDER BY 2 DESC`)
  const method = await query<{ label: string; value: string }>(`SELECT method AS label, count(*) AS value FROM shop_orders GROUP BY 1 ORDER BY 2 DESC`)
  const week = await query<{ w: string; v: string }>(`SELECT to_char(date_trunc('week', created_at), 'YYYY-MM-DD') AS w, sum(amount) AS v FROM shop_orders WHERE payment_status = 'Paid' AND created_at > date_trunc('week', now()) - interval '7 weeks' GROUP BY 1`)
  const signups = await query<{ m: string; v: string }>(`SELECT to_char(date_trunc('month', created_at), 'YYYY-MM') AS m, count(*) AS v FROM shop_users WHERE created_at > date_trunc('month', now()) - interval '5 months' GROUP BY 1`)
  const products = await query<{ name: string; orders: string; paid: string; revenue: string }>(`SELECT p.name, count(*) AS orders, count(*) FILTER (WHERE o.payment_status IN ('Paid','Partially Refunded','Refunded')) AS paid, COALESCE(sum(o.amount) FILTER (WHERE o.payment_status = 'Paid'), 0) AS revenue FROM shop_orders o JOIN shop_products p ON p.id = o.product_id GROUP BY p.name ORDER BY 4 DESC`)

  const now = new Date()
  const wk = new Map(week.map((r) => [r.w, num(r.v)]))
  const monday = (d: Date) => { const x = new Date(d); x.setHours(0, 0, 0, 0); x.setDate(x.getDate() - ((x.getDay() + 6) % 7)); return x }
  const weeks = Array.from({ length: 8 }, (_, i) => monday(new Date(now.getTime() - (7 - i) * 7 * 864e5)))
  const key = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
  const su = new Map(signups.map((r) => [r.m, num(r.v)]))
  const months = Array.from({ length: 6 }, (_, i) => new Date(now.getFullYear(), now.getMonth() - 5 + i, 1))

  return {
    stats: { orders: num(t.orders), paid: num(t.paid), revenue: num(t.revenue), paidRate: num(t.orders) ? Math.round((num(t.paid_ever) / num(t.orders)) * 1000) / 10 : 0, aov: num(t.paid) ? Math.round(num(t.revenue) / num(t.paid)) : 0, repeatRate: num(rep.buyers) ? Math.round((num(rep.repeat) / num(rep.buyers)) * 100) : 0 },
    category: category.map((r) => ({ name: r.name, revenue: num(r.revenue) })),
    methods: method.map((r) => ({ label: r.label, value: num(r.value) })),
    weekLabels: weeks.map((d) => `${d.getDate()}/${d.getMonth() + 1}`),
    weekly: weeks.map((d) => wk.get(key(d)) ?? 0),
    monthLabels: months.map((d) => d.toLocaleString('en', { month: 'short' })),
    signups: months.map((d) => su.get(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`) ?? 0),
    products: products.map((r) => ({ name: r.name, orders: num(r.orders), paid: num(r.paid), revenue: num(r.revenue), rate: num(r.orders) ? `${Math.round((num(r.paid) / num(r.orders)) * 100)}%` : '—' })),
  }
}
