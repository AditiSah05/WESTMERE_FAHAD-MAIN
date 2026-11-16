import { createHash, randomBytes } from 'node:crypto'
import { NextResponse, type NextRequest } from 'next/server'
import { GOOGLE_COOKIE, googleConfigured, redirectUri } from '@/lib/server/google'

/** Starts Google sign-in (authorization code flow with PKCE and a state cookie). */
export function GET(req: NextRequest) {
  if (!googleConfigured()) return NextResponse.redirect(new URL('/account/login', req.url))
  const state = randomBytes(16).toString('base64url')
  const verifier = randomBytes(32).toString('base64url')
  const url = new URL('https://accounts.google.com/o/oauth2/v2/auth')
  url.search = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID!,
    redirect_uri: redirectUri(req),
    response_type: 'code',
    scope: 'openid email profile',
    state,
    code_challenge: createHash('sha256').update(verifier).digest('base64url'),
    code_challenge_method: 'S256',
    prompt: 'select_account',
  }).toString()
  const res = NextResponse.redirect(url)
  res.cookies.set(GOOGLE_COOKIE, `${state}.${verifier}`, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', path: '/', maxAge: 600 })
  return res
}
