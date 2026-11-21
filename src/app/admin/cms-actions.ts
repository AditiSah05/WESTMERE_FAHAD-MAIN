'use server'

import { revalidatePath } from 'next/cache'
import { assertModule } from '@/lib/server/auth'
import { audit } from '@/lib/server/session'

const s = (f: FormData, k: string, max = 120) => {
  const v = f.get(k)
  return typeof v === 'string' ? v.slice(0, max).trim() : ''
}

export async function publishChangesAction() {
  const admin = await assertModule('cms', 'write')
  await audit(admin.userId, 'cms_published', 'All pending CMS changes published to production')
  revalidatePath('/admin/cms')
  return { success: true }
}

export async function createPageAction(form: FormData) {
  const admin = await assertModule('cms', 'write')
  const title = s(form, 'title', 80)
  const slug = s(form, 'slug', 60)
  const pageType = s(form, 'pageType', 30) || 'Standard'

  if (!title || !slug) {
    return { error: 'Page title and URL slug are required.' }
  }

  await audit(admin.userId, 'page_created', `${title} (${slug}) - ${pageType}`)
  revalidatePath('/admin/cms')
  return { success: true }
}

export async function createBlogPostAction(form: FormData) {
  const admin = await assertModule('cms', 'write')
  const title = s(form, 'title', 100)
  const category = s(form, 'category', 40)
  const excerpt = s(form, 'excerpt', 200)

  if (!title) {
    return { error: 'Blog article title is required.' }
  }

  await audit(admin.userId, 'blog_post_created', `${title} [${category}]`)
  revalidatePath('/admin/cms')
  return { success: true }
}
