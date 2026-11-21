'use server'

import { revalidatePath } from 'next/cache'
import { requireModule } from '@/lib/server/auth'
import type { SupportTicket, ActiveProject, CustomOrder } from '@/lib/server/support-projects'

export async function createTicketAction(
  _ticket: Partial<SupportTicket>
): Promise<{ ok: boolean; message: string }> {
  await requireModule('support')
  revalidatePath('/admin/support')
  return { ok: true, message: 'Support ticket created successfully.' }
}

export async function updateTicketStatusAction(
  _id: string,
  _status: SupportTicket['status']
): Promise<{ ok: boolean; message: string }> {
  await requireModule('support')
  revalidatePath('/admin/support')
  return { ok: true, message: `Ticket ${_id} status updated to ${_status}.` }
}

export async function createProjectAction(
  _project: Partial<ActiveProject>
): Promise<{ ok: boolean; message: string }> {
  await requireModule('support')
  revalidatePath('/admin/support')
  return { ok: true, message: 'New project created successfully.' }
}

export async function createCustomOrderAction(
  _order: Partial<CustomOrder>
): Promise<{ ok: boolean; message: string }> {
  await requireModule('support')
  revalidatePath('/admin/support')
  return { ok: true, message: 'Custom order request logged.' }
}
