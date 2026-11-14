import { BookingForm, ComparisonForm, SocialsForm } from '@/components/admin/site/SiteForms'
import PageHeader from '@/components/admin/ui/PageHeader'
import { requireModule } from '@/lib/server/auth'
import { can } from '@/lib/admin/permissions'
import { getSiteSettings } from '@/lib/server/site-settings'

export const metadata = { title: 'Site content' }
export const dynamic = 'force-dynamic'

export default async function Page() {
  const admin = await requireModule('cms')
  const settings = await getSiteSettings()
  const write = can(admin.role, 'cms', 'write')
  return (
    <>
      <PageHeader title="Site content" subtitle="Text and links on the public website that you can change without a developer." />
      {!write && <p className="mb-5 rounded-lg bg-gold/15 px-4 py-3 text-sm font-medium text-[#8a6420]">Your role can view this page but not change it.</p>}
      <fieldset disabled={!write} className="grid gap-6">
        <SocialsForm values={settings.socials} />
        <BookingForm value={settings.bookingUrl} />
        <ComparisonForm rows={settings.comparison} />
      </fieldset>
    </>
  )
}
