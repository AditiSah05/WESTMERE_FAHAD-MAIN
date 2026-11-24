'use server'

import { revalidatePath } from 'next/cache'
import { assertModule } from '@/lib/server/auth'
import { audit } from '@/lib/server/session'

const s = (f: FormData, k: string, max = 120) => {
  const v = f.get(k)
  return typeof v === 'string' ? v.slice(0, max).trim() : ''
}

export async function moderateReviewAction(reviewId: string, newStatus: string) {
  const admin = await assertModule('reviews', 'write')
  await audit(admin.userId, 'review_moderated', `Review ${reviewId} marked as ${newStatus}`)
  revalidatePath('/admin/reviews')
  return { success: true }
}

export async function replyReviewAction(form: FormData) {
  const admin = await assertModule('reviews', 'write')
  const reviewId = s(form, 'reviewId', 40)
  const replyText = s(form, 'reply', 500)

  if (!reviewId || !replyText) {
    return { error: 'Review ID and reply text are required.' }
  }

  await audit(admin.userId, 'review_replied', `Reply to ${reviewId}: ${replyText.slice(0, 50)}...`)
  revalidatePath('/admin/reviews')
  return { success: true }
}
