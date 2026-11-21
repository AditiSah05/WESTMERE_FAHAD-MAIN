export type Seo = { id: string; seoTitle: string; seoDescription: string }
export const SEO_LABELS = ['Complete', 'Needs improvement', 'Missing meta description', 'Duplicate title'] as const
export type SeoStatus = (typeof SEO_LABELS)[number]

/** Same rules shown to the admin: a title of 15-60 characters, a description of 50-160, and no two categories sharing a title. */
export function seoStatus(c: Seo, all: Seo[]): SeoStatus {
  const t = c.seoTitle.trim(), d = c.seoDescription.trim()
  if (!d) return 'Missing meta description'
  if (t && all.some((o) => o.id !== c.id && o.seoTitle.trim().toLowerCase() === t.toLowerCase())) return 'Duplicate title'
  return t.length >= 15 && t.length <= 60 && d.length >= 50 && d.length <= 160 ? 'Complete' : 'Needs improvement'
}

export function seoHealth(all: Seo[]) {
  const counts = Object.fromEntries(SEO_LABELS.map((l) => [l, 0])) as Record<SeoStatus, number>
  for (const c of all) counts[seoStatus(c, all)]++
  return { counts, score: all.length ? Math.round((counts.Complete / all.length) * 100) : 0 }
}
