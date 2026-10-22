import { NextResponse, type NextRequest } from 'next/server'

const ADMIN = ['__Host-wm_admin', 'wm_admin']
const CUSTOMER = ['__Host-wm_customer', 'wm_customer']

/**
 * Runs before every admin and account request:
 *  - optimistic redirect when there is no session cookie (the real check is the database lookup in the
 *    admin layout and in every server action, never this file alone)
 *  - per-request CSP nonce, no-store caching and clickjacking protection for admin pages
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const area = pathname.startsWith('/account') ? 'account' : 'admin'
  const hasCookie = (area === 'account' ? CUSTOMER : ADMIN).some((c) => request.cookies.has(c))
  const open = area === 'account'
    ? pathname === '/account/login' || pathname === '/account/signup'
    : pathname === '/admin/login' || pathname.startsWith('/admin/login/') || pathname.startsWith('/admin/invite/')
  if (!open && !hasCookie) {
    return NextResponse.redirect(new URL(`/${area}/login`, request.url))
  }

  const nonce = Buffer.from(crypto.randomUUID()).toString('base64')
  const dev = process.env.NODE_ENV === 'development'
  const csp = [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'${dev ? " 'unsafe-eval'" : ''}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob:",
    "font-src 'self' data:",
    "connect-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    ...(dev ? [] : ['upgrade-insecure-requests']),
  ].join('; ')

  const headers = new Headers(request.headers)
  headers.set('x-nonce', nonce)
  headers.set('Content-Security-Policy', csp)
  const response = NextResponse.next({ request: { headers } })
  response.headers.set('Content-Security-Policy', csp)
  response.headers.set('Cache-Control', 'no-store')
  response.headers.set('X-Frame-Options', 'DENY')
  return response
}

export const config = { matcher: ['/admin/:path*', '/account/:path*'] }
