'use server'

import { revalidatePath } from 'next/cache'
import { assertModule } from '@/lib/server/auth'
import { hashPassword } from '@/lib/server/password'
import { db } from '@/lib/server/schema'
import { audit } from '@/lib/server/session'

const s = (f: FormData, k: string, max = 120) => {
  const v = f.get(k)
  return typeof v === 'string' ? v.slice(0, max).trim() : ''
}

export async function createCustomer(form: FormData) {
  const admin = await assertModule('customers', 'write')
  const email = s(form, 'email', 100).toLowerCase()
  const name = s(form, 'name', 80)
  const phone = s(form, 'phone', 25)
  const company = s(form, 'company', 80)
  const country = s(form, 'country', 50) || 'India'
  const status = s(form, 'status', 20) || 'active'
  const subscription = s(form, 'subscription', 60)
  const password = s(form, 'password', 60) || 'Westmere@123'

  if (!email || !email.includes('@')) {
    return { error: 'A valid email address is required.' }
  }

  const { query, tx } = await db()
  const existing = await query(`SELECT id FROM shop_users WHERE email = $1`, [email])
  if (existing.length > 0) {
    return { error: 'A customer with this email already exists.' }
  }

  const hashed = await hashPassword(password)
  const randomCustId = `CUST-${Math.floor(12800 + Math.random() * 200)}`

  await tx(async (q) => {
    const [user] = await q<{ id: string }>(
      `INSERT INTO shop_users (email, name, password_hash, status, cust_id, subscription_tier, email_verified)
       VALUES ($1, $2, $3, $4, $5, $6, true) RETURNING id`,
      [email, name, hashed, status, randomCustId, subscription]
    )
    await q(
      `INSERT INTO shop_profiles (user_id, phone, company, country)
       VALUES ($1, $2, $3, $4) ON CONFLICT (user_id) DO UPDATE SET phone = $2, company = $3, country = $4`,
      [user.id, phone, company, country]
    )
  })

  await audit(admin.userId, 'customer_created', `${name || email} (${email})`)
  revalidatePath('/admin/shop/customers')
  revalidatePath('/admin/customers')
  return { success: true }
}

export async function updateCustomer(form: FormData) {
  const admin = await assertModule('customers', 'write')
  const id = s(form, 'id', 64)
  const name = s(form, 'name', 80)
  const phone = s(form, 'phone', 25)
  const company = s(form, 'company', 80)
  const country = s(form, 'country', 50) || 'India'
  const status = s(form, 'status', 20)
  const subscription = s(form, 'subscription', 60)
  const notes = s(form, 'notes', 500)

  if (!id) return { error: 'Customer ID is required.' }

  const { tx } = await db()
  await tx(async (q) => {
    await q(
      `UPDATE shop_users SET name = $1, status = COALESCE(NULLIF($2, ''), status), 
       subscription_tier = $3, internal_notes = $4 WHERE id = $5`,
      [name, status, subscription, notes, id]
    )
    await q(
      `INSERT INTO shop_profiles (user_id, phone, company, country)
       VALUES ($1, $2, $3, $4) ON CONFLICT (user_id) DO UPDATE SET phone = $2, company = $3, country = $4`,
      [id, phone, company, country]
    )
  })

  await audit(admin.userId, 'customer_updated', `ID: ${id}`)
  revalidatePath('/admin/shop/customers')
  revalidatePath('/admin/customers')
  return { success: true }
}

export async function setCustomerStatus(id: string, status: string) {
  const admin = await assertModule('customers', 'write')
  const { query } = await db()
  await query(`UPDATE shop_users SET status = $1 WHERE id = $2`, [status, id])
  await audit(admin.userId, 'customer_status_change', `${id}: ${status}`)
  revalidatePath('/admin/shop/customers')
  return { success: true }
}

export async function blockCustomer(id: string) {
  const admin = await assertModule('customers', 'write')
  const { query } = await db()
  await query(`UPDATE shop_users SET status = 'blocked' WHERE id = $1`, [id])
  await audit(admin.userId, 'customer_blocked', id)
  revalidatePath('/admin/shop/customers')
  return { success: true }
}

export async function deleteCustomer(id: string) {
  const admin = await assertModule('customers', 'write')
  const { query } = await db()
  await query(`DELETE FROM shop_users WHERE id = $1`, [id])
  await audit(admin.userId, 'customer_deleted', id)
  revalidatePath('/admin/shop/customers')
  return { success: true }
}

export async function bulkCustomerAction(ids: string[], action: string, data?: string) {
  const admin = await assertModule('customers', 'write')
  if (!ids.length) return { count: 0 }
  const { query } = await db()

  if (action === 'block') {
    await query(`UPDATE shop_users SET status = 'blocked' WHERE id = ANY($1::uuid[])`, [ids])
  } else if (action === 'activate') {
    await query(`UPDATE shop_users SET status = 'active' WHERE id = ANY($1::uuid[])`, [ids])
  } else if (action === 'delete') {
    await query(`DELETE FROM shop_users WHERE id = ANY($1::uuid[])`, [ids])
  } else if (action === 'tag' && data) {
    await query(`UPDATE shop_users SET tags = $1 WHERE id = ANY($2::uuid[])`, [data, ids])
  }

  await audit(admin.userId, `customer_bulk_${action}`, `${ids.length} customers`)
  revalidatePath('/admin/shop/customers')
  return { count: ids.length }
}

export async function sendCustomerEmailAction(id: string, subject: string, message: string) {
  const admin = await assertModule('customers', 'write')
  if (!subject.trim() || !message.trim()) {
    return { error: 'Subject and message are required.' }
  }
  await audit(admin.userId, 'customer_email_sent', `To customer ${id}: ${subject}`)
  return { success: true }
}

export async function addCustomerNoteAction(id: string, note: string) {
  const admin = await assertModule('customers', 'write')
  const { query } = await db()
  await query(
    `UPDATE shop_users SET internal_notes = CASE 
       WHEN internal_notes = '' THEN $1 
       ELSE internal_notes || E'\n' || $1 
     END WHERE id = $2`,
    [note, id]
  )
  await audit(admin.userId, 'customer_note_added', `Note on customer ${id}`)
  revalidatePath('/admin/shop/customers')
  return { success: true }
}
