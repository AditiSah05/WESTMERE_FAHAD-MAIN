import type { ReactNode } from 'react'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import SmoothScroll from '@/components/SmoothScroll'

// Pages are rebuilt at most once a minute so admin edits (links, comparison, reviews) appear without a deploy.
export const revalidate = 60

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SmoothScroll />
      <Navbar />
      <main className="flex min-h-screen flex-col">{children}</main>
      <Footer />
    </>
  )
}
