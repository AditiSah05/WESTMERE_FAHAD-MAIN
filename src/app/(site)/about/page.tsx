import AboutPage from '@/components/AboutPage/AboutPage'

export const metadata = {
  title: 'About Us | Westmere - Creative Lab & Engineering',
  description: "Learn about Westmere, a boutique creative engineering laboratory merging UX design with metric-driven software development.",
}

// Copy comes from admin; refreshed on save and at most once a minute.
export const revalidate = 60

export default function Page() {
  return <AboutPage />
}
