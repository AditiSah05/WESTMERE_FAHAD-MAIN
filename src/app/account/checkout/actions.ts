'use server'

import { phoneOk } from '@/lib/account/phone'
import { assertCustomer } from '@/lib/server/customer'
import { db } from '@/lib/server/schema'

export type DetailsState = { error?: string; ok?: boolean } | undefined
const str = (v: FormDataEntryValue | null, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '')

/** Step 2 of buying: save the buyer's details to their profile, then the payment step opens. */
export async function saveBuyerDetails(_p: DetailsState, form: FormData): Promise<DetailsState> {
  const me = await assertCustomer()
  const name = str(form.get('name'), 80)
  const phone = str(form.get('phone'), 20)
  if (!name) return { error: 'Name is required.' }
  if (!phoneOk(phone)) return { error: 'Enter a valid mobile number, for example +91 98765 43210.' }
  const { query } = await db()
  await query(`UPDATE shop_users SET name = $1 WHERE id = $2`, [name, me.userId])
  await query(
    `INSERT INTO shop_profiles (user_id, phone, company) VALUES ($1, $2, $3) ON CONFLICT (user_id) DO UPDATE SET phone = $2, company = $3`,
    [me.userId, phone, str(form.get('company'), 80)],
  )
  return { ok: true }
}
