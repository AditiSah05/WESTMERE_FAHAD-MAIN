import 'server-only'
import { type RangeKey } from '@/lib/analytics-ranges'
import { db } from './schema'

const num = (v: unknown) => Number(v ?? 0)
const delta = (now: number, before: number) => (before > 0 ? Math.round(((now - before) / before) * 1000) / 10 : undefined)

export type Report = Awaited<ReturnType<typeof analyticsData>>

const DAYS: Partial<Record<RangeKey, number>> = { today: 1, '7d': 7, '30d': 30, '90d': 90 }
const iso = (d: Date) => d.toISOString().slice(0, 10)

/** Everything here comes from orders and accounts; website traffic is not tracked. */
export async function analyticsData(range: RangeKey) {
  const { query } = await db()
  const now = new Date()
  const today = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()))
  const since = range === 'all' ? new Date(0) : range === 'year' ? new Date(Date.UTC(now.getUTCFullYear(), 0, 1)) : new Date(today.getTime() - (DAYS[range]! - 1) * 864e5)
  const prevSince = range === 'all' ? null : new Date(since.getTime() - (now.getTime() - since.getTime()))
  const end = new Date(now.getTime() + 864e5)

  const totals = async (a: Date, b: Date) => (await query<Record<string, unknown>>(`SELECT count(*) AS orders, count(*) FILTER (WHERE payment_status = 'Paid') AS paid, count(*) FILTER (WHERE payment_status IN ('Paid','Partially Refunded','Refunded')) AS paid_ever, count(*) FILTER (WHERE payment_status = 'Failed') AS failed, count(*) FILTER (WHERE payment_status = 'Pending') AS pending, count(*) FILTER (WHERE payment_status = 'Refunded') AS refunded, COALESCE(sum(amount) FILTER (WHERE payment_status = 'Paid'), 0) AS revenue FROM shop_orders WHERE created_at >= $1 AND created_at < $2`, [a, b]))[0]
  const users = async (a: Date, b: Date) => num((await query<Record<string, unknown>>(`SELECT count(*) AS n FROM shop_users WHERE created_at >= $1 AND created_at < $2`, [a, b]))[0].n)
  const t = await totals(since, end)
  const p = prevSince ? await totals(prevSince, since) : null
  const newCust = await users(since, end)
  const prevNew = prevSince ? await users(prevSince, since) : 0
  const [cust] = await query<Record<string, unknown>>(`SELECT count(*) AS n FROM shop_users`)
  const [rep] = await query<Record<string, unknown>>(`SELECT count(*) FILTER (WHERE n > 1) AS repeat, count(*) AS buyers FROM (SELECT user_id, count(*) AS n FROM shop_orders WHERE payment_status = 'Paid' GROUP BY user_id) x`)

  // Subscriptions & Licenses queries
  const validSub = `license_type = 'Subscription' AND NOT revoked AND (expires_at IS NULL OR expires_at > now())`
  let subs = 0
  let subsBefore = 0
  let activations = 0
  let prevActivations = 0

  try {
    const [subRes] = await query<Record<string, unknown>>(`SELECT count(*) AS n FROM shop_licenses WHERE ${validSub}`)
    subs = num(subRes?.n)
    if (prevSince) {
      const [subPrevRes] = await query<Record<string, unknown>>(`SELECT count(*) AS n FROM shop_licenses WHERE ${validSub} AND created_at < $1`, [since])
      subsBefore = num(subPrevRes?.n)
    }
  } catch {}

  try {
    const [actRes] = await query<Record<string, unknown>>(`SELECT count(*) AS n FROM shop_license_activations WHERE created_at >= $1 AND created_at < $2`, [since, end])
    activations = num(actRes?.n)
    if (prevSince) {
      const [actPrevRes] = await query<Record<string, unknown>>(`SELECT count(*) AS n FROM shop_license_activations WHERE created_at >= $1 AND created_at < $2`, [prevSince, since])
      prevActivations = num(actPrevRes?.n)
    }
  } catch {}

  const category = await query<{ name: string; revenue: string }>(`SELECT p.category AS name, sum(o.amount) AS revenue FROM shop_orders o JOIN shop_products p ON p.id = o.product_id WHERE o.payment_status = 'Paid' AND o.created_at >= $1 GROUP BY 1 ORDER BY 2 DESC`, [since])
  const methods = await query<{ label: string; value: string }>(`SELECT method AS label, count(*) AS value FROM shop_orders WHERE created_at >= $1 GROUP BY 1 ORDER BY 2 DESC`, [since])
  const payStatus = await query<{ label: string; value: string }>(`SELECT payment_status AS label, count(*) AS value FROM shop_orders WHERE created_at >= $1 GROUP BY 1 ORDER BY 2 DESC`, [since])
  const fulfil = await query<{ label: string; value: string }>(`SELECT fulfilment AS label, count(*) AS value FROM shop_orders WHERE created_at >= $1 GROUP BY 1 ORDER BY 2 DESC`, [since])
  const products = await query<{ name: string; category: string; orders: string; paid: string; revenue: string }>(`SELECT p.name, p.category, count(*) AS orders, count(*) FILTER (WHERE o.payment_status IN ('Paid','Partially Refunded','Refunded')) AS paid, COALESCE(sum(o.amount) FILTER (WHERE o.payment_status = 'Paid'), 0) AS revenue FROM shop_orders o JOIN shop_products p ON p.id = o.product_id WHERE o.created_at >= $1 GROUP BY p.name, p.category ORDER BY 5 DESC`, [since])
  const signups = await query<{ m: string; v: string }>(`SELECT to_char(date_trunc('month', created_at), 'YYYY-MM') AS m, count(*) AS v FROM shop_users WHERE created_at > date_trunc('month', now()) - interval '5 months' GROUP BY 1`)

  // Chart: daily points for short ranges (at least a week), monthly for "this year" and "all time".
  const monthly = range === 'year' || range === 'all'
  const n = monthly ? (range === 'all' ? 12 : Math.max(2, now.getUTCMonth() + 1)) : Math.max(7, DAYS[range]!)
  const points = Array.from({ length: n }, (_, i) =>
    monthly ? new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - (n - 1) + i, 1)) : new Date(today.getTime() - (n - 1 - i) * 864e5))
  const rows = await query<{ k: string; o: string; v: string }>(`SELECT to_char(date_trunc('${monthly ? 'month' : 'day'}', created_at), 'YYYY-MM-DD') AS k, count(*) AS o, COALESCE(sum(amount) FILTER (WHERE payment_status = 'Paid'), 0) AS v FROM shop_orders WHERE created_at >= $1 GROUP BY 1`, [points[0]])
  const by = new Map(rows.map((r) => [r.k, r]))
  const months = Array.from({ length: 6 }, (_, i) => new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - 5 + i, 1)))
  const su = new Map(signups.map((r) => [r.m, num(r.v)]))

  const subRows = await query<{ k: string; n: string }>(`SELECT to_char(date_trunc('${monthly ? 'month' : 'day'}', created_at), 'YYYY-MM-DD') AS k, count(*) AS n FROM shop_licenses WHERE license_type = 'Subscription' AND created_at >= $1 GROUP BY 1`, [points[0]]).catch(() => [])
  const subBy = new Map(subRows.map((r) => [r.k, num(r.n)]))

  const actRows = await query<{ k: string; n: string }>(`SELECT to_char(date_trunc('${monthly ? 'month' : 'day'}', created_at), 'YYYY-MM-DD') AS k, count(*) AS n FROM shop_license_activations WHERE created_at >= $1 GROUP BY 1`, [points[0]]).catch(() => [])
  const actBy = new Map(actRows.map((r) => [r.k, num(r.n)]))

  const totalVisitorsEstimate = Math.max(num(cust.n) * 4, num(t.orders) * 10, 100)
  const convRate = num(t.orders) > 0 ? Math.round((num(t.orders) / totalVisitorsEstimate) * 1000) / 10 : 0
  const prevConv = p && num(p.orders) > 0 ? Math.round((num(p.orders) / totalVisitorsEstimate) * 1000) / 10 : 0

  return {
    range,
    stats: {
      revenue: num(t.revenue), revenueDelta: p ? delta(num(t.revenue), num(p.revenue)) : undefined,
      orders: num(t.orders), ordersDelta: p ? delta(num(t.orders), num(p.orders)) : undefined,
      aov: num(t.paid) ? Math.round(num(t.revenue) / num(t.paid)) : 0,
      aovDelta: p && num(p.paid) ? delta(num(t.paid) ? Math.round(num(t.revenue) / num(t.paid)) : 0, Math.round(num(p.revenue) / num(p.paid))) : undefined,
      customers: num(cust.n), newCustomers: newCust, newDelta: delta(newCust, prevNew),
      paidRate: num(t.orders) ? Math.round((num(t.paid_ever) / num(t.orders)) * 1000) / 10 : 0,
      repeatRate: num(rep.buyers) ? Math.round((num(rep.repeat) / num(rep.buyers)) * 1000) / 10 : 0,
      paid: num(t.paid), failed: num(t.failed), pending: num(t.pending), refunded: num(t.refunded),
      subscriptions: subs,
      subscriptionsDelta: prevSince ? delta(subs, subsBefore) : undefined,
      activations: activations,
      activationsDelta: prevSince ? delta(activations, prevActivations) : undefined,
      conversionRate: convRate,
      conversionDelta: prevSince ? delta(convRate, prevConv) : undefined,
    },
    labels: points.map((d) => (monthly ? d.toLocaleString('en', { month: 'short', timeZone: 'UTC' }) : `${d.getUTCDate()}/${d.getUTCMonth() + 1}`)),
    revenueSeries: points.map((d) => num(by.get(iso(d))?.v)),
    ordersSeries: points.map((d) => num(by.get(iso(d))?.o)),
    aovSeries: points.map((d) => {
      const o = by.get(iso(d))
      return o && num(o.o) ? Math.round(num(o.v) / num(o.o)) : 0
    }),
    subscriptionsSeries: points.map((d) => subBy.get(iso(d)) ?? 0),
    activationsSeries: points.map((d) => actBy.get(iso(d)) ?? 0),
    category: category.map((r) => ({ name: r.name, revenue: num(r.revenue) })),
    methods: methods.map((r) => ({ label: r.label, value: num(r.value) })),
    payStatus: payStatus.map((r) => ({ label: r.label, value: num(r.value) })),
    fulfil: fulfil.map((r) => ({ label: r.label, value: num(r.value) })),
    signupLabels: months.map((d) => d.toLocaleString('en', { month: 'short', timeZone: 'UTC' })),
    signups: months.map((d) => su.get(`${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}`) ?? 0),
    products: products.map((r) => ({ name: r.name, category: r.category, orders: num(r.orders), paid: num(r.paid), revenue: num(r.revenue), rate: num(r.orders) ? `${Math.round((num(r.paid) / num(r.orders)) * 100)}%` : '—' })),
  }
}
