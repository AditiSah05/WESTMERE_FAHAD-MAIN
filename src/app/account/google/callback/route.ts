import { randomBytes } from 'node:crypto'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { NextResponse, type NextRequest } from 'next/server'
import { createCustomerSession } from '@/lib/server/customer'
import { GOOGLE_COOKIE, googleConfigured, redirectUri } from '@/lib/server/google'
import { hashPassword } from '@/lib/server/password'
import { db } from '@/lib/server/schema'

type Claims = { iss?: string; aud?: string; exp?: number; email?: string; email_verified?: boolean; name?: string }

/** Finishes Google sign-in: swaps the code for an ID token, then signs in or creates the customer. */
export async function GET(req: NextRequest) {
  const fail = () => NextResponse.redirect(new URL('/account/login?error=google', req.url))
  if (!googleConfigured()) return fail()

  const [state, verifier] = (req.cookies.get(GOOGLE_COOKIE)?.value ?? '').split('.')
  const code = req.nextUrl.searchParams.get('code')
  if (!state || !verifier || !code || req.nextUrl.searchParams.get('state') !== state) return fail()

  const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ code, client_id: process.env.GOOGLE_CLIENT_ID!, client_secret: process.env.GOOGLE_CLIENT_SECRET!, redirect_uri: redirectUri(req), grant_type: 'authorization_code', code_verifier: verifier }),
  }).catch(() => null)
  if (!tokenRes?.ok) return fail()

  // The ID token comes straight from Google's token endpoint over TLS, so the claims are checked, not the signature.
  const { id_token } = (await tokenRes.json()) as { id_token?: string }
  let claims: Claims
  try {
    claims = JSON.parse(Buffer.from((id_token ?? '').split('.')[1] ?? '', 'base64url').toString())
  } catch {
    return fail()
  }
  const email = claims.email?.trim().toLowerCase()
  const issuerOk = claims.iss === 'https://accounts.google.com' || claims.iss === 'accounts.google.com'
  if (!email || claims.email_verified !== true || !issuerOk || claims.aud !== process.env.GOOGLE_CLIENT_ID || !claims.exp || claims.exp * 1000 < Date.now()) return fail()

  const { query } = await db()
  // New customers get a random password they never see; they can always sign in with Google.
  await query(`INSERT INTO shop_users (email, name, password_hash) VALUES ($1, $2, $3) ON CONFLICT (email) DO NOTHING`, [email, (claims.name ?? '').slice(0, 80), await hashPassword(randomBytes(32).toString('base64url'))])
  const [user] = await query<{ id: string; status: string }>(`SELECT id, status FROM shop_users WHERE email = $1`, [email])
  if (!user || user.status !== 'active') return fail()

  await createCustomerSession(user.id)
  ;(await cookies()).delete(GOOGLE_COOKIE)
  redirect('/account')
}
