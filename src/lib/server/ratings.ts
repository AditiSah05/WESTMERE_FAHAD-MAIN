import 'server-only'
import { createHash } from 'node:crypto'
import { db } from './schema'

const PER_VISITOR_PER_DAY = 3
const SITE_WIDE_PER_DAY = 1000

/** Visitors are counted by a salted hash of their IP, so no address is stored. Without a trusted IP only the site-wide cap applies. */
const hashIp = (ip: string) => createHash('sha256').update(ip + (process.env.AUTH_ENCRYPTION_KEY ?? 'westmere')).digest('hex').slice(0, 32)

export async function addRating(score: number, ip: string | null): Promise<string | null> {
  const { query } = await db()
  const [{ n }] = await query<{ n: string }>(`SELECT count(*) AS n FROM site_ratings WHERE created_at > now() - interval '1 day'`)
  if (Number(n) >= SITE_WIDE_PER_DAY) return 'Ratings are paused for today. Please try again tomorrow.'
  const h = ip ? hashIp(ip) : null
  if (h) {
    const [{ c }] = await query<{ c: string }>(`SELECT count(*) AS c FROM site_ratings WHERE ip_hash = $1 AND created_at > now() - interval '1 day'`, [h])
    if (Number(c) >= PER_VISITOR_PER_DAY) return 'You have already rated us today. Thank you!'
  }
  await query(`INSERT INTO site_ratings (score, ip_hash) VALUES ($1, $2)`, [score, h])
  return null
}

export type RatingSummary = { count: number; average: number; counts: number[]; recent: { score: number; at: string }[] }

export async function ratingSummary(): Promise<RatingSummary> {
  const { query } = await db()
  const dist = await query<{ score: number; n: string }>(`SELECT score, count(*) AS n FROM site_ratings GROUP BY score`)
  const counts = [1, 2, 3, 4, 5].map((s) => Number(dist.find((d) => d.score === s)?.n ?? 0))
  const count = counts.reduce((a, b) => a + b, 0)
  const average = count ? counts.reduce((sum, n, i) => sum + n * (i + 1), 0) / count : 0
  const recent = await query<{ score: number; at: string }>(`SELECT score, to_char(created_at, 'YYYY-MM-DD HH24:MI') AS at FROM site_ratings ORDER BY id DESC LIMIT 30`)
  return { count, average, counts, recent }
}
