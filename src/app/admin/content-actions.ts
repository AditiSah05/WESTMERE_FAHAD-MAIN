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
