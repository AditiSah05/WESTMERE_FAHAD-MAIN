'use server'

import { revalidatePath } from 'next/cache'
import { assertModule } from '@/lib/server/auth'
import { audit } from '@/lib/server/session'

const s = (f: FormData, k: string, max = 120) => {
  const v = f.get(k)
  return typeof v === 'string' ? v.slice(0, max).trim() : ''
}

export async function createInvoiceAction(form: FormData) {
  const admin = await assertModule('payments', 'write')
  const client = s(form, 'client', 80)
  const amount = Number(s(form, 'amount', 12)) || 0
  const dueDate = s(form, 'dueDate', 30)

  if (!client || !amount) return { error: 'Client name and amount are required.' }

  await audit(admin.userId, 'invoice_created', `${client}: ₹${amount}`)
  revalidatePath('/admin/payments')
  return { success: true }
}

export async function addExpenseAction(form: FormData) {
  const admin = await assertModule('payments', 'write')
  const title = s(form, 'title', 80)
  const category = s(form, 'category', 40)
  const amount = Number(s(form, 'amount', 12)) || 0

  if (!title || !amount) return { error: 'Title and amount are required.' }

  await audit(admin.userId, 'expense_logged', `${title} (${category}): ₹${amount}`)
  revalidatePath('/admin/payments')
  return { success: true }
}
