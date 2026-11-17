import type { ReactNode } from 'react'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import SmoothScroll from '@/components/SmoothScroll'
import { getSocials } from '@/lib/server/content'

export default async function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SmoothScroll />
      <Navbar socials={await getSocials()} />
      <main className="flex min-h-screen flex-col">{children}</main>
      <Footer />
    </>
  )
}
