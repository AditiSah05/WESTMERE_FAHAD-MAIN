'use server'

import { revalidatePath } from 'next/cache'
import { assertModule } from '@/lib/server/auth'
import { writeContent } from '@/lib/server/content'
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
