'use server'

import { cookies, headers } from 'next/headers'
import { trustedIp } from '@/lib/server/ip'
import { addRating } from '@/lib/server/ratings'

export type RatingState = { ok?: string; error?: string }

const COOKIE = 'wm_csat'

/** One public rating from the home page card. A cookie stops casual repeat votes; the rest is limited in addRating. */
export async function submitRating(score: number): Promise<RatingState> {
  if (!Number.isInteger(score) || score < 1 || score > 5) return { error: 'Choose one of the five faces.' }
  const jar = await cookies()
  if (jar.get(COOKIE)) return { ok: 'You have already rated us. Thank you!' }
  const problem = await addRating(score, trustedIp(await headers()))
  if (problem) return { error: problem }
  jar.set(COOKIE, '1', { httpOnly: true, sameSite: 'lax', path: '/', maxAge: 7 * 24 * 60 * 60, secure: process.env.NODE_ENV === 'production' })
  return { ok: 'Thanks for rating us!' }
}
