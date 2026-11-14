import 'server-only'
import { cache } from 'react'
import { defaultSettings, type ComparisonRow, type NetworkKey, type PublicReview, type SiteSettings } from '@/lib/site-defaults'
import { db } from './schema'

const isRow = (r: unknown): r is ComparisonRow => !!r && typeof (r as ComparisonRow).other === 'string' && typeof (r as ComparisonRow).ours === 'string'

/**
 * Saved settings merged over the defaults. Never throws: if the database is down (or empty, or during a build
 * without one) the public pages simply use the built-in content.
 */
export const getSiteSettings = cache(async (): Promise<SiteSettings> => {
  try {
    const { query } = await db()
    const rows = await query<{ key: string; value: unknown }>(`SELECT key, value FROM site_settings`)
    const saved = Object.fromEntries(rows.map((r) => [r.key, r.value]))
    const socials = { ...defaultSettings.socials, ...((saved.socials as Partial<Record<NetworkKey, string>>) ?? {}) }
    const rowsOk = Array.isArray(saved.comparison) && saved.comparison.length > 0 && saved.comparison.every(isRow)
    return {
      socials,
      bookingUrl: typeof saved.bookingUrl === 'string' && saved.bookingUrl ? saved.bookingUrl : defaultSettings.bookingUrl,
      comparison: rowsOk ? (saved.comparison as ComparisonRow[]) : defaultSettings.comparison,
    }
  } catch {
    return defaultSettings
  }
})

/** Reviews you have approved in admin, newest first. Empty when there are none (or the database is unavailable). */
export const getApprovedReviews = cache(async (): Promise<PublicReview[]> => {
  try {
    const { query } = await db()
    const rows = await query<{ id: string; name: string; role: string; rating: number; body: string; photo_url: string }>(
      `SELECT id::text, name, role, rating, body, photo_url FROM site_reviews WHERE status = 'Approved' ORDER BY created_at DESC LIMIT 24`,
    )
    return rows.map((r) => ({ id: Number(r.id), name: r.name, role: r.role, rating: r.rating, body: r.body, photo: r.photo_url }))
  } catch {
    return []
  }
})
