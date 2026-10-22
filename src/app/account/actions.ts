'use server'

import { redirect } from 'next/navigation'
import { createCustomerSession, destroyCustomerSession } from '@/lib/server/customer'
import { fakeVerify, hashPassword, passwordProblem, verifyPassword } from '@/lib/server/password'
import { db } from '@/lib/server/schema'
import { clientInfo } from '@/lib/server/session'
import { isLocked, recordAttempt } from '@/lib/server/throttle'

export type AuthState = { error?: string } | undefined

const text = (v: FormDataEntryValue | null, max: number) => (typeof v === 'string' && v.length <= max ? v : '')
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
// Separate throttle namespace so customer failures never lock an admin with the same address.
const key = (email: string) => `c:${email}`

export async function customerLogin(_p: AuthState, form: FormData): Promise<AuthState> {
  const email = text(form.get('email'), 254).trim().toLowerCase()
  const password = text(form.get('password'), 256)
  const generic = { error: 'Invalid email or password.' }
  if (!email || !password) return generic

  const { ip } = await clientInfo()
  if (await isLocked(key(email), ip)) {
    await fakeVerify(password)
    return { error: 'Too many failed attempts. Try again in 15 minutes.' }
  }
  const { query } = await db()
  const [user] = await query<{ id: string; password_hash: string }>(`SELECT id, password_hash FROM shop_users WHERE email = $1 AND status = 'active'`, [email])
  const valid = user ? await verifyPassword(password, user.password_hash) : (await fakeVerify(password), false)
  await recordAttempt(key(email), ip, valid)
  if (!valid || !user) return generic

  await createCustomerSession(user.id)
  redirect('/account')
}

export async function customerSignup(_p: AuthState, form: FormData): Promise<AuthState> {
  const name = text(form.get('name'), 80).trim()
  const email = text(form.get('email'), 254).trim().toLowerCase()
  const password = text(form.get('password'), 256)
  if (!name || !EMAIL.test(email)) return { error: 'Enter your name and a valid email.' }
  const problem = passwordProblem(password, email)
  if (problem) return { error: problem }

  // Signup attempts count against the same throttle so it cannot be used to mass-create accounts.
  const { ip } = await clientInfo()
  if (await isLocked(key(email), ip)) return { error: 'Too many attempts. Try again later.' }
  await recordAttempt(key(email), ip, false)

  const { query } = await db()
  const [created] = await query<{ id: string }>(`INSERT INTO shop_users (email, name, password_hash) VALUES ($1, $2, $3) ON CONFLICT (email) DO NOTHING RETURNING id`, [email, name, await hashPassword(password)])
  // Same message either way would be ideal; an existing address is only revealed to the person typing it.
  if (!created) return { error: 'An account with this email already exists. Try signing in.' }
  await createCustomerSession(created.id)
  redirect('/account')
}

export async function customerLogout() {
  await destroyCustomerSession()
  redirect('/account/login')
}
