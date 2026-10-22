import 'server-only'

/**
 * Client IP for rate limiting and audit. X-Forwarded-For is client-controllable unless the platform overwrites it,
 * so we only read headers we trust:
 *   TRUSTED_IP_HEADER  explicit header set by your proxy/CDN (e.g. cf-connecting-ip, x-real-ip)
 *   on Vercel          x-vercel-forwarded-for (set by the platform, cannot be spoofed by clients)
 * Returns null when nothing trustworthy is available; callers must then not rate limit by IP.
 */
export function trustedIp(h: Headers): string | null {
  const name = process.env.TRUSTED_IP_HEADER?.toLowerCase() || (process.env.VERCEL ? 'x-vercel-forwarded-for' : '')
  if (!name) return null
  const raw = h.get(name)?.split(',')[0]?.trim() ?? ''
  return /^[0-9a-fA-F:.]{3,45}$/.test(raw) ? raw : null
}
