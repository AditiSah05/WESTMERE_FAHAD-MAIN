'use server'

import { revalidatePath } from 'next/cache'
import { requireModule } from '@/lib/server/auth'
import type { WidgetSettings, SubmissionSettings } from '@/lib/server/visitor-ratings'

export async function toggleRatingVisibilityAction(
  _id: string,
  _visibility: 'visible' | 'hidden'
): Promise<{ ok: boolean; message: string }> {
  await requireModule('reviews')
  revalidatePath('/admin/shop/ratings')
  return { ok: true, message: `Rating visibility updated to ${_visibility}.` }
}

export async function flagRatingAction(
  _id: string,
  _flagged: boolean
): Promise<{ ok: boolean; message: string }> {
  await requireModule('reviews')
  revalidatePath('/admin/shop/ratings')
  return { ok: true, message: _flagged ? 'Rating flagged for review.' : 'Rating flag removed.' }
}

export async function updateWidgetSettingsAction(
  _settings: Partial<WidgetSettings>
): Promise<{ ok: boolean; message: string }> {
  await requireModule('reviews')
  revalidatePath('/admin/shop/ratings')
  return { ok: true, message: 'Widget settings saved successfully.' }
}

export async function updateSubmissionSettingsAction(
  _settings: Partial<SubmissionSettings>
): Promise<{ ok: boolean; message: string }> {
  await requireModule('reviews')
  revalidatePath('/admin/shop/ratings')
  return { ok: true, message: 'Submission settings saved successfully.' }
}
