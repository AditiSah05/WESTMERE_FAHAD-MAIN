'use server'

import { revalidatePath } from 'next/cache'
import { assertModule } from '@/lib/server/auth'
import { audit } from '@/lib/server/session'

const s = (f: FormData, k: string, max = 120) => {
  const v = f.get(k)
  return typeof v === 'string' ? v.slice(0, max).trim() : ''
}

export async function createLeadAction(form: FormData) {
  const admin = await assertModule('customers', 'write')
  const name = s(form, 'name', 80)
  const email = s(form, 'email', 100).toLowerCase()
  const company = s(form, 'company', 80)
  const service = s(form, 'service', 100)
  const value = Number(s(form, 'value', 12)) || 0

  if (!name || !email) return { error: 'Name and email are required.' }

  await audit(admin.userId, 'crm_lead_created', `${name} (${company || email})`)
  revalidatePath('/admin/customers')
  return { success: true }
}

export async function createContactAction(form: FormData) {
  const admin = await assertModule('customers', 'write')
  const name = s(form, 'name', 80)
  const email = s(form, 'email', 100).toLowerCase()
  const phone = s(form, 'phone', 25)
  const company = s(form, 'company', 80)

  if (!name || !email) return { error: 'Name and email are required.' }

  await audit(admin.userId, 'crm_contact_created', `${name} (${company})`)
  revalidatePath('/admin/customers')
  return { success: true }
}

export async function createDealAction(form: FormData) {
  const admin = await assertModule('customers', 'write')
  const title = s(form, 'title', 100)
  const company = s(form, 'company', 80)
  const amount = Number(s(form, 'amount', 12)) || 0
  const stage = s(form, 'stage', 40) || 'new_lead'

  if (!title) return { error: 'Deal title is required.' }

  await audit(admin.userId, 'crm_deal_created', `${title} (₹${amount})`)
  revalidatePath('/admin/customers')
  return { success: true }
}

export async function updateLeadStatusAction(id: string, status: string) {
  const admin = await assertModule('customers', 'write')
  await audit(admin.userId, 'crm_lead_status', `${id}: ${status}`)
  revalidatePath('/admin/customers')
  return { success: true }
}
