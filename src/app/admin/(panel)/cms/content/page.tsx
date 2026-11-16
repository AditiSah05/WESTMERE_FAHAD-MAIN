import ComparisonEditor from '@/components/admin/content/ComparisonEditor'
import StoryEditor from '@/components/admin/content/StoryEditor'
import PageHeader from '@/components/admin/ui/PageHeader'
import { can } from '@/lib/admin/permissions'
import { requireModule } from '@/lib/server/auth'
import { getComparison, getStory } from '@/lib/server/content'

export const metadata = { title: 'Website content' }
export const dynamic = 'force-dynamic'

export default async function Page() {
  const admin = await requireModule('cms')
  const canWrite = can(admin.role, 'cms', 'write')
  return (
    <>
      <PageHeader title="Website content" subtitle="Edit text that appears on the public site. Changes go live as soon as you save." />
      <ComparisonEditor initial={await getComparison()} canWrite={canWrite} />
      <StoryEditor initial={await getStory()} canWrite={canWrite} />
    </>
  )
}
