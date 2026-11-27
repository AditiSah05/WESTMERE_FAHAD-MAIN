import { NextResponse, type NextRequest } from 'next/server'
import { ADMIN_LOGIN, adminLoginSlug } from '@/lib/admin/loginPath'

const ADMIN = ['__Host-wm_admin', 'wm_admin']
const CUSTOMER = ['__Host-wm_customer', 'wm_customer']

/**
 * Runs before every admin and account request:
 *  - optimistic redirect when there is no session cookie (the real check is the database lookup in the
 *    admin layout and in every server action, never this file alone)
 *  - per-request CSP nonce, no-store caching and clickjacking protection for admin pages
 */
export function proxy(request: NextRequest) {
  let { pathname } = request.nextUrl
  let rewriteTo: string | null = null

  if (adminLoginSlug) {
    const secret = `/${adminLoginSlug}`
    if (pathname === secret || pathname.startsWith(`${secret}/`)) {
      // The secret sign-in address serves the normal login screens.
      pathname = `/admin/login${pathname.slice(secret.length)}`
      rewriteTo = pathname + request.nextUrl.search
    } else if (pathname === '/admin/login' || pathname.startsWith('/admin/login/')) {
      // The default address is switched off: answer as if the page does not exist.
      return NextResponse.rewrite(new URL('/__not-found', request.url), { status: 404 })
    }
  }

  const area = pathname.startsWith('/account') ? 'account' : pathname.startsWith('/admin') ? 'admin' : null
  if (!area) return NextResponse.next()

  const hasCookie = (area === 'account' ? CUSTOMER : ADMIN).some((c) => request.cookies.has(c))
  const open = area === 'account'
    ? pathname === '/account/login' || pathname === '/account/signup' || pathname.startsWith('/account/google')
    : pathname === '/admin/login' || pathname.startsWith('/admin/login/') || pathname.startsWith('/admin/invite/')
  if (!open && !hasCookie) {
    // With a secret sign-in path, never reveal it: signed-out visitors to /admin get a plain 404.
    if (area === 'admin' && adminLoginSlug) return NextResponse.rewrite(new URL('/__not-found', request.url), { status: 404 })
    const login = new URL(area === 'admin' ? ADMIN_LOGIN : '/account/login', request.url)
    // Buying from the website: come back to checkout after sign-in (the login page validates this value).
    if (pathname === '/account/checkout') login.searchParams.set('next', pathname + request.nextUrl.search)
    return NextResponse.redirect(login)
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
  const init = { request: { headers } }
  const response = rewriteTo ? NextResponse.rewrite(new URL(rewriteTo, request.url), init) : NextResponse.next(init)
  response.headers.set('Content-Security-Policy', csp)
  response.headers.set('Cache-Control', 'no-store')
  response.headers.set('X-Frame-Options', 'DENY')
  return response
}

// The secret sign-in path comes from an env var and matchers must be constants, so run on every page route
// (static files and API routes excluded; admin and account always listed so dotted paths still pass through) and return early for anything that is not admin or account.
export const config = { matcher: ['/admin/:path*', '/account/:path*', '/((?!_next/|api/|media/|.*\\..*).*)'] }
