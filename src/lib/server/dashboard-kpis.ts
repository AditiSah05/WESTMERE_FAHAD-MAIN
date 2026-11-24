import 'server-only'
import type { RangeKey } from '@/lib/analytics-ranges'
import { db } from './schema'

const num = (v: unknown) => Number(v ?? 0)
const DAYS: Partial<Record<RangeKey, number>> = { today: 1, '7d': 7, '30d': 30, '90d': 90 }
const pct = (now: number, before: number) => (before > 0 ? Math.round(((now - before) / before) * 1000) / 10 : undefined)

type Kpi = { value: number; prev: number | null; delta?: number; spark: number[] }

/**
 * The eight headline cards for a chosen period, each compared with the period of the same length just before it.
 * Totals (customers, subscriptions, products) are counted as they stand now versus as they stood when the period began.
 */
export async function dashboardKpis(range: RangeKey) {
  const { query } = await db()
  const one = async (sql: string, p: unknown[] = []) => (await query<Record<string, unknown>>(sql, p))[0] ?? {}
  const now = new Date()
  const today = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()))
  const since = range === 'all' ? new Date(0) : range === 'year' ? new Date(Date.UTC(now.getUTCFullYear(), 0, 1)) : new Date(today.getTime() - (DAYS[range]! - 1) * 864e5)
  const prevSince = range === 'all' ? null : new Date(since.getTime() - (now.getTime() - since.getTime()))
  const end = new Date(now.getTime() + 864e5)

  const orders = (a: Date, b: Date) => one(`SELECT COALESCE(sum(amount) FILTER (WHERE payment_status = 'Paid'), 0) AS rev, count(*) AS orders, count(*) FILTER (WHERE payment_status = 'Paid') AS paid FROM shop_orders WHERE created_at >= $1 AND created_at < $2`, [a, b])
  const cohort = (a: Date, b: Date) => one(`SELECT count(*) AS n, count(*) FILTER (WHERE EXISTS (SELECT 1 FROM shop_orders o WHERE o.user_id = u.id AND o.payment_status = 'Paid')) AS conv FROM shop_users u WHERE u.created_at >= $1 AND u.created_at < $2`, [a, b])
  const acts = async (a: Date, b: Date) => num((await one(`SELECT count(*) AS n FROM shop_license_activations WHERE created_at >= $1 AND created_at < $2`, [a, b])).n)
  const cur = await orders(since, end), prv = prevSince ? await orders(prevSince, since) : null
  const cCur = await cohort(since, end), cPrv = prevSince ? await cohort(prevSince, since) : null

  const customers = num((await one(`SELECT count(*) AS n FROM shop_users`)).n)
  const customersBefore = num((await one(`SELECT count(*) AS n FROM shop_users WHERE created_at < $1`, [since])).n)
  const validSub = `license_type = 'Subscription' AND NOT revoked AND (expires_at IS NULL OR expires_at > now())`
  const subs = num((await one(`SELECT count(*) AS n FROM shop_licenses WHERE ${validSub}`)).n)
  const subsBefore = num((await one(`SELECT count(*) AS n FROM shop_licenses WHERE ${validSub} AND created_at < $1`, [since])).n)
  const products = num((await one(`SELECT count(*) AS n FROM shop_products WHERE active`)).n)
  const productsBefore = num((await one(`SELECT count(*) AS n FROM shop_products WHERE active AND created_at < $1`, [since])).n)
  const cats = (await query<{ category: string }>(`SELECT category FROM shop_products WHERE active GROUP BY category ORDER BY count(*) DESC, category LIMIT 3`)).map((r) => r.category)

  // Trend lines: one point per day (at least a week), or per month for "this year" and "all time".
  const monthly = range === 'year' || range === 'all'
  const n = monthly ? (range === 'all' ? 12 : Math.max(2, now.getUTCMonth() + 1)) : Math.max(7, DAYS[range]!)
  const points = Array.from({ length: n }, (_, i) => (monthly ? new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - (n - 1) + i, 1)) : new Date(today.getTime() - (n - 1 - i) * 864e5)))
  const unit = monthly ? 'month' : 'day'
  const key = (d: Date) => d.toISOString().slice(0, 10)
  const bucket = async (sql: string) => new Map((await query<{ k: string; a: string; b: string; c: string }>(sql, [points[0]])).map((r) => [r.k, r]))
  const ordB = await bucket(`SELECT to_char(date_trunc('${unit}', created_at), 'YYYY-MM-DD') AS k, COALESCE(sum(amount) FILTER (WHERE payment_status = 'Paid'), 0) AS a, count(*) AS b, count(*) FILTER (WHERE payment_status = 'Paid') AS c FROM shop_orders WHERE created_at >= $1 GROUP BY 1`)
  const usrB = await bucket(`SELECT to_char(date_trunc('${unit}', u.created_at), 'YYYY-MM-DD') AS k, count(*) AS a, count(*) FILTER (WHERE EXISTS (SELECT 1 FROM shop_orders o WHERE o.user_id = u.id AND o.payment_status = 'Paid')) AS b FROM shop_users u WHERE u.created_at >= $1 GROUP BY 1`)
  const subB = await bucket(`SELECT to_char(date_trunc('${unit}', created_at), 'YYYY-MM-DD') AS k, count(*) AS a, 0 AS b FROM shop_licenses WHERE license_type = 'Subscription' AND created_at >= $1 GROUP BY 1`)
  const prdB = await bucket(`SELECT to_char(date_trunc('${unit}', created_at), 'YYYY-MM-DD') AS k, count(*) AS a, 0 AS b FROM shop_products WHERE created_at >= $1 GROUP BY 1`)
  const actB = await bucket(`SELECT to_char(date_trunc('${unit}', created_at), 'YYYY-MM-DD') AS k, count(*) AS a, 0 AS b FROM shop_license_activations WHERE created_at >= $1 GROUP BY 1`)
  const series = (m: Map<string, { a: string; b: string; c: string }>, f: (a: number, b: number) => number) => points.map((d) => f(num(m.get(key(d))?.a), num(m.get(key(d))?.b)))

  const aov = (o: Record<string, unknown>) => (num(o.paid) ? Math.round(num(o.rev) / num(o.paid)) : 0)
  const rate = (c: Record<string, unknown>) => (num(c.n) ? Math.round((num(c.conv) / num(c.n)) * 10000) / 100 : 0)
  const mk = (value: number, prev: number | null, spark: number[]): Kpi => ({ value, prev, delta: prev === null ? undefined : pct(value, prev), spark })
  const activations = await acts(since, end)

  return {
    range,
    revenue: mk(num(cur.rev), prv ? num(prv.rev) : null, series(ordB, (a) => a)),
    orders: mk(num(cur.orders), prv ? num(prv.orders) : null, series(ordB, (_, b) => b)),
    customers: mk(customers, prevSince ? customersBefore : null, series(usrB, (a) => a)),
    subscriptions: mk(subs, prevSince ? subsBefore : null, series(subB, (a) => a)),
    products: { ...mk(products, prevSince ? productsBefore : null, series(prdB, (a) => a)), categories: cats },
    activations: mk(activations, prevSince ? await acts(prevSince, since) : null, series(actB, (a) => a)),
    aov: mk(aov(cur), prv ? aov(prv) : null, points.map((d) => { const o = ordB.get(key(d)); return o && num(o.c) ? Math.round(num(o.a) / num(o.c)) : 0 })),
    conversion: { value: rate(cCur), prev: cPrv ? rate(cPrv) : null, deltaPp: cPrv ? Math.round((rate(cCur) - rate(cPrv)) * 100) / 100 : undefined, spark: series(usrB, (a, b) => (a ? Math.round((b / a) * 100) : 0)) },
  }
}
export type Kpis = Awaited<ReturnType<typeof dashboardKpis>>
