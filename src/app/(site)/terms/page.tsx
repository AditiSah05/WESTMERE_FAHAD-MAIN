import LegalPage from '@/components/Legal/LegalPage'
import { termsIntro, termsSections } from '@/components/Legal/terms'

export const metadata = {
  title: 'Terms of Service | Westmere',
  description: 'The terms that apply to using the Westmere website, your customer account and the products and services you buy.',
}

export default function Page() {
  return <LegalPage title="Terms of Service" updated="16 November 2026" intro={termsIntro} sections={termsSections} />
}
