import type { ReactNode } from 'react'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import SmoothScroll from '@/components/SmoothScroll'

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
