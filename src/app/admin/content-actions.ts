'use server'

import { revalidatePath } from 'next/cache'
import type { About } from '@/lib/about-content'
import type { HomeAbout } from '@/lib/home-about-content'
import { assertModule } from '@/lib/server/auth'
import { writeContent } from '@/lib/server/content'
import { clearImage, writeImage } from '@/lib/server/media'
import { audit } from '@/lib/server/session'

export type ContentState = { error?: string; ok?: string } | undefined

const clean = (v: FormDataEntryValue, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '')
const published = () => { revalidatePath('/'); revalidatePath('/story'); revalidatePath('/admin/cms/content') }

export async function saveComparison(_p: ContentState, form: FormData): Promise<ContentState> {
  const me = await assertModule('cms', 'write')
  const other = form.getAll('other'), our = form.getAll('our')
  const rows = other
    .map((o, i) => ({ otherText: clean(o, 160), ourText: clean(our[i] ?? '', 160) }))
    .filter((r) => r.otherText || r.ourText)
  if (!rows.length) return { error: 'Add at least one row.' }
  if (rows.length > 10) return { error: 'Use 10 rows or fewer.' }
  if (rows.some((r) => !r.otherText || !r.ourText)) return { error: 'Fill in both sides of every row, or remove the row.' }
  await writeContent('comparison', rows)
  await audit(me.userId, 'content_comparison', `${rows.length} rows`)
  published()
  return { ok: 'Saved. The home page is updated.' }
}

const HOSTS: Record<'instagram' | 'facebook', string[]> = { instagram: ['instagram.com'], facebook: ['facebook.com', 'fb.com'] }

/** Empty means "hide this icon". Otherwise it must be an https link on that network's own domain. */
function socialUrl(raw: string, network: 'instagram' | 'facebook'): string | null {
  if (!raw) return ''
  try {
    const u = new URL(raw)
    const host = u.hostname.replace(/^www\./, '')
    return u.protocol === 'https:' && HOSTS[network].some((h) => host === h || host.endsWith(`.${h}`)) ? u.toString() : null
  } catch {
    return null
  }
}

export async function saveSocials(_p: ContentState, form: FormData): Promise<ContentState> {
  const me = await assertModule('cms', 'write')
  const instagram = socialUrl(clean(form.get('instagram') ?? '', 300), 'instagram')
  const facebook = socialUrl(clean(form.get('facebook') ?? '', 300), 'facebook')
  if (instagram === null) return { error: 'Instagram must be an https link on instagram.com, or empty to hide the icon.' }
  if (facebook === null) return { error: 'Facebook must be an https link on facebook.com, or empty to hide the icon.' }
  await writeContent('socials', { instagram, facebook })
  await audit(me.userId, 'content_socials', `instagram:${instagram ? 'on' : 'off'} facebook:${facebook ? 'on' : 'off'}`)
  revalidatePath('/', 'layout')
  return { ok: 'Saved. The icons are updated across the site.' }
}

export async function saveStory(_p: ContentState, form: FormData): Promise<ContentState> {
  const me = await assertModule('cms', 'write')
  const title = clean(form.get('title') ?? '', 80)
  const paragraphs = clean(form.get('body') ?? '', 6000).split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean)
  if (!title || !paragraphs.length) return { error: 'Add a title and at least one paragraph.' }
  await writeContent('story', { title, paragraphs })
  await audit(me.userId, 'content_story', title)
  published()
  return { ok: 'Saved. The story page is updated.' }
}

type Spec = { key: string; max: number }

/** Zip repeated form fields (name_key) into rows; empty rows are dropped, half-filled rows are an error. */
function rows(form: FormData, prefix: string, specs: Spec[]): Record<string, string>[] | string {
  const cols = specs.map((s) => form.getAll(`${prefix}_${s.key}`))
  const out: Record<string, string>[] = []
  for (let i = 0; i < cols[0].length; i++) {
    const row = Object.fromEntries(specs.map((s, c) => [s.key, clean(cols[c][i] ?? '', s.max)]))
    const filled = Object.values(row).filter(Boolean).length
    if (filled === 0) continue
    if (filled < specs.length) return 'Fill in every field of a row, or remove the row.'
    out.push(row)
  }
  return out
}

const LISTS = [
  { prefix: 'stat', label: 'Numbers', min: 1, max: 6, specs: [{ key: 'value', max: 12 }, { key: 'label', max: 40 }] },
  { prefix: 'value', label: 'Values', min: 1, max: 6, specs: [{ key: 'title', max: 40 }, { key: 'desc', max: 220 }] },
  { prefix: 'step', label: 'Process steps', min: 2, max: 8, specs: [{ key: 'title', max: 30 }, { key: 'desc', max: 100 }] },
  { prefix: 'ms', label: 'Journey', min: 1, max: 8, specs: [{ key: 'year', max: 10 }, { key: 'title', max: 50 }, { key: 'desc', max: 240 }] },
] as const

export async function saveAbout(_p: ContentState, form: FormData): Promise<ContentState> {
  const me = await assertModule('cms', 'write')
  const heading = clean(form.get('heroHeading') ?? '', 120), intro = clean(form.get('heroIntro') ?? '', 400)
  const storyTitle = clean(form.get('storyTitle') ?? '', 80)
  const paragraphs = clean(form.get('storyBody') ?? '', 2000).split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean)
  if (!heading || !intro || !storyTitle || !paragraphs.length) return { error: 'Fill in the heading, intro, story title and story text.' }
  if (paragraphs.length > 4) return { error: 'Use 4 story paragraphs or fewer.' }

  const parsed: Record<string, Record<string, string>[]> = {}
  for (const l of LISTS) {
    const r = rows(form, l.prefix, [...l.specs])
    if (typeof r === 'string') return { error: `${l.label}: ${r}` }
    if (r.length < l.min || r.length > l.max) return { error: `${l.label}: use between ${l.min} and ${l.max} rows.` }
    parsed[l.prefix] = r
  }
  await writeContent('about', {
    hero: { heading, intro },
    story: { title: storyTitle, paragraphs },
    stats: parsed.stat as About['stats'],
    values: parsed.value as About['values'],
    process: parsed.step as About['process'],
    milestones: parsed.ms as About['milestones'],
  })
  await audit(me.userId, 'content_about', 'About page updated')
  revalidatePath('/about')
  revalidatePath('/admin/cms/content')
  return { ok: 'Saved. The About page is updated.' }
}

const imagesPublished = () => { revalidatePath('/', 'layout'); revalidatePath('/admin/cms/content') }

export async function uploadImage(slot: string, _p: ContentState, form: FormData): Promise<ContentState> {
  const me = await assertModule('cms', 'write')
  const file = form.get('file')
  if (!(file instanceof File)) return { error: 'Choose a picture first.' }
  const problem = await writeImage(slot, file)
  if (problem) return { error: problem }
  await audit(me.userId, 'image_uploaded', slot)
  imagesPublished()
  return { ok: 'Saved. The new picture is live.' }
}

export async function resetImage(slot: string): Promise<ContentState> {
  const me = await assertModule('cms', 'write')
  await clearImage(slot)
  await audit(me.userId, 'image_reset', slot)
  imagesPublished()
  return { ok: 'Back to the original picture.' }
}

export async function saveHomeAbout(_p: ContentState, form: FormData): Promise<ContentState> {
  const me = await assertModule('cms', 'write')
  const text = (k: string, max: number) => clean(form.get(k) ?? '', max)
  const one = { csatTitle: text('csatTitle', 30), csatDesc: text('csatDesc', 80), gaugeTitle: text('gaugeTitle', 60), gaugeSub: text('gaugeSub', 100), indTitle: text('indTitle', 50), ctaTitle: text('ctaTitle', 50), ctaButton: text('ctaButton', 50), ctaNote: text('ctaNote', 80) }
  if (Object.values(one).some((v) => !v)) return { error: 'Fill in every heading, description and button text.' }

  const slides = rows(form, 'slide', [{ key: 'title', max: 40 }, { key: 'description', max: 100 }])
  const labels = rows(form, 'csatlabel', [{ key: 'name', max: 14 }])
  const gauges = rows(form, 'gauge', [{ key: 'label', max: 20 }, { key: 'value', max: 3 }])
  const inds = rows(form, 'ind', [{ key: 'name', max: 40 }])
  for (const [name, r] of [['Slides', slides], ['Satisfaction labels', labels], ['Gauges', gauges], ['Industries', inds]] as const) if (typeof r === 'string') return { error: `${name}: ${r}` }
  const [s, l, g, i] = [slides, labels, gauges, inds] as Record<string, string>[][]
  if (s.length !== 3 || l.length !== 5 || g.length !== 3) return { error: 'Slides (3), satisfaction labels (5) and gauges (3) keep a fixed number of rows.' }
  if (i.length < 3 || i.length > 12) return { error: 'Industries: use between 3 and 12 rows.' }
  const values = g.map((x) => Number(x.value))
  if (values.some((v) => !Number.isInteger(v) || v < 0 || v > 100)) return { error: 'Gauge values must be whole numbers from 0 to 100.' }

  await writeContent('homeAbout', {
    slides: s.map((x) => ({ title: x.title, description: x.description })),
    csat: { title: one.csatTitle, description: one.csatDesc, labels: l.map((x) => x.name) },
    gauges: { title: one.gaugeTitle, subtitle: one.gaugeSub, items: g.map((x, n) => ({ label: x.label, value: values[n] })) },
    industries: { title: one.indTitle, items: i.map((x) => x.name) },
    cta: { title: one.ctaTitle, button: one.ctaButton, note: one.ctaNote },
  })
  await audit(me.userId, 'content_home_about', 'Home About block updated')
  revalidatePath('/')
  revalidatePath('/admin/cms/content')
  return { ok: 'Saved. The home page About block is updated.' }
}
