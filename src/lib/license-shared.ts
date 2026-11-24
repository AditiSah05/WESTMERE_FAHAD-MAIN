export const LICENSE_TYPES = ['Single Device', 'Multi Device', 'Subscription'] as const
export const AVAILABILITY = ['After purchase', 'Licensed users', 'All customers'] as const
export const FORMATS = ['ZIP', 'EXE', 'PDF', 'DMG', 'Other'] as const
/** Shown status. Revoked beats Expired beats Pending (no activation yet). */
export type LicenseState = 'Active' | 'Pending' | 'Expired' | 'Revoked'

/** WM-XXXX-XXXX-XXXX from a 32-letter alphabet without look-alike characters. */
export function makeKey(bytes: Uint8Array): string {
  const a = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  const c = Array.from(bytes, (b) => a[b % a.length]).join('')
  return `WM-${c.slice(0, 4)}-${c.slice(4, 8)}-${c.slice(8, 12)}`
}
