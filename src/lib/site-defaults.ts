/** Editable site content and its built-in defaults. Shared by the admin editor and the public pages (no server-only code here). */
export const NETWORKS = [
  { key: 'instagram', label: 'Instagram' },
  { key: 'facebook', label: 'Facebook' },
  { key: 'linkedin', label: 'LinkedIn' },
  { key: 'threads', label: 'Threads' },
  { key: 'x', label: 'X' },
] as const
export type NetworkKey = (typeof NETWORKS)[number]['key']

export type ComparisonRow = { other: string; ours: string }
export type SiteSettings = { socials: Record<NetworkKey, string>; bookingUrl: string; comparison: ComparisonRow[] }

export const defaultSettings: SiteSettings = {
  // Only Instagram is live for now. A network with an empty link is hidden everywhere on the site.
  socials: { instagram: 'https://www.instagram.com/westmere.io/', facebook: '', linkedin: '', threads: '', x: '' },
  bookingUrl: 'https://cal.com',
  comparison: [
    { other: 'Vanity metrics likes, impressions, no revenue focus', ours: 'Every campaign tracked to ROAS, CPR, and actual revenue' },
    { other: 'One-size content same post format for every brand', ours: 'Platform-specific content Reels, UGC, static based on what works' },
    { other: 'Influencer collabs with no result tracking', ours: 'Influencer campaigns measured by reach, saves, and link clicks' },
    { other: 'Monthly reports with no clear next steps', ours: 'Weekly updates with numbers + what we are doing next week' },
    { other: 'Extra charges for revisions and edits', ours: 'Revisions included no surprise invoices' },
  ],
}

export type PublicReview = { id: number; name: string; role: string; rating: number; body: string; photo: string }

/** Accepts empty (= hidden) or an https:// URL; returns the cleaned value or null when invalid. */
export function cleanUrl(input: string): string | null {
  const t = input.trim()
  if (!t) return ''
  if (t.length > 300) return null
  try {
    const u = new URL(t)
    return u.protocol === 'https:' ? u.toString() : null
  } catch {
    return null
  }
}
