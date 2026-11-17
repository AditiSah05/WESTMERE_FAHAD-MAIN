import ImagesEditor from '@/components/admin/content/ImagesEditor'
import AboutEditor from '@/components/admin/content/AboutEditor'
import ComparisonEditor from '@/components/admin/content/ComparisonEditor'
import SocialsEditor from '@/components/admin/content/SocialsEditor'
import StoryEditor from '@/components/admin/content/StoryEditor'
import PageHeader from '@/components/admin/ui/PageHeader'
import { can } from '@/lib/admin/permissions'
import { requireModule } from '@/lib/server/auth'
import { getAbout, getComparison, getSocials, getStory } from '@/lib/server/content'
import { getImages } from '@/lib/server/media'

export const metadata = { title: 'Website content' }
export const dynamic = 'force-dynamic'

export default async function Page() {
  const admin = await requireModule('cms')
  const canWrite = can(admin.role, 'cms', 'write')
  return (
    <>
      <PageHeader title="Website content" subtitle="Edit text that appears on the public site. Changes go live as soon as you save." />
      <SocialsEditor initial={await getSocials()} canWrite={canWrite} />
      <ComparisonEditor initial={await getComparison()} canWrite={canWrite} />
      <ImagesEditor urls={await getImages()} canWrite={canWrite} />
      <AboutEditor initial={await getAbout()} canWrite={canWrite} />
      <StoryEditor initial={await getStory()} canWrite={canWrite} />
    </>
  )
}
