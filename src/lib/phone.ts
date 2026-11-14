/** Accepts +91 98765 43210, 098765-43210 and similar; returns digits with an optional leading +, or null. */
export function cleanPhone(input: string): string | null {
  const t = input.trim()
  if (!/^\+?[\d\s().-]+$/.test(t)) return null
  const digits = t.replace(/\D/g, '')
  return digits.length >= 10 && digits.length <= 15 ? (t.startsWith('+') ? '+' : '') + digits : null
}
