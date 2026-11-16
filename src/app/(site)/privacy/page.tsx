import LegalPage from '@/components/Legal/LegalPage'
import { privacyIntro, privacySections } from '@/components/Legal/privacy'

export const metadata = {
  title: 'Privacy Policy | Westmere',
  description: 'What personal information Westmere collects, how we use it, who we share it with and the choices you have.',
}

export default function Page() {
  return <LegalPage title="Privacy Policy" updated="16 November 2026" intro={privacyIntro} sections={privacySections} />
}
