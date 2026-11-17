import type { ReactNode } from 'react'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import SmoothScroll from '@/components/SmoothScroll'
import { ImagesProvider } from '@/components/ui/ImagesProvider'
import { getSocials } from '@/lib/server/content'
import { getImages } from '@/lib/server/media'

export default async function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SmoothScroll />
      <Navbar socials={await getSocials()} />
      <ImagesProvider images={await getImages()}>
        <main className="flex min-h-screen flex-col">{children}</main>
      </ImagesProvider>
      <Footer />
    </>
  )
}
