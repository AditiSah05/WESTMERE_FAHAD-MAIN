import { NextResponse } from 'next/server'
import { trustedIp } from '@/lib/server/ip'
import { db } from '@/lib/server/schema'
import { isLocked, recordAttempt } from '@/lib/server/throttle'

const CORS = { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type' }
const reply = (body: Record<string, unknown>, status = 200) => NextResponse.json(body, { status, headers: { ...CORS, 'Cache-Control': 'no-store' } })

export const OPTIONS = () => new NextResponse(null, { status: 204, headers: CORS })

/** Products call this with { key, device } to activate a licence. Same device again is fine; extra devices are limited. */
export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as { key?: unknown; device?: unknown } | null
  const key = typeof body?.key === 'string' ? body.key.trim().toUpperCase().slice(0, 40) : ''
  const device = typeof body?.device === 'string' ? body.device.trim().slice(0, 80) : ''
  if (!key || !device) return reply({ ok: false, error: 'Send a licence key and a device name.' }, 400)

  const ip = trustedIp(req.headers)
  const who = `lic:${ip ?? 'unknown'}`
  if (await isLocked(who, ip)) return reply({ ok: false, error: 'Too many attempts. Try again in 15 minutes.' }, 429)
  const { query } = await db()
  const [l] = await query<{ id: string; max: number; revoked: boolean; expired: boolean; product: string; expires: string | null }>(
    `SELECT l.id::text, l.max_activations AS max, l.revoked, (l.expires_at IS NOT NULL AND l.expires_at < now()) AS expired, p.name AS product, to_char(l.expires_at, 'YYYY-MM-DD') AS expires FROM shop_licenses l JOIN shop_products p ON p.id = l.product_id WHERE l.license_key = $1`, [key])
  if (!l) { await recordAttempt(who, ip, false); return reply({ ok: false, error: 'Invalid licence key.' }, 404) }
  await recordAttempt(who, ip, true)
  if (l.revoked) return reply({ ok: false, error: 'This licence has been revoked.' }, 403)
  if (l.expired) return reply({ ok: false, error: 'This licence has expired.' }, 403)

  const [have] = await query<{ n: number }>(`SELECT count(*)::int AS n FROM shop_license_activations WHERE license_id = $1`, [l.id])
  const known = (await query(`SELECT 1 FROM shop_license_activations WHERE license_id = $1 AND device = $2`, [l.id, device])).length > 0
  if (!known) {
    if (have.n >= l.max) return reply({ ok: false, error: 'Activation limit reached for this licence.' }, 409)
    const added = await query(`INSERT INTO shop_license_activations (license_id, device, ip) VALUES ($1,$2,$3) ON CONFLICT DO NOTHING RETURNING id`, [l.id, device, ip ?? ''])
    if (added.length) await query(`INSERT INTO shop_license_events (license_id, event, note) VALUES ($1,'Activated',$2)`, [l.id, device])
  }
  return reply({ ok: true, product: l.product, expires: l.expires, activations: { used: known ? have.n : Math.min(have.n + 1, l.max), max: l.max } })
}
