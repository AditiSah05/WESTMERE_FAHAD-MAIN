import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import ChevronBadge from '@/components/ui/ChevronBadge'
import StorySection from './StorySection'
import TimelineSection from './TimelineSection'

/** "Read our story": the origin text and journey from the About page, on a page of their own. */
export default function StoryPage() {
  return (
    <div className="overflow-x-hidden bg-paper font-sans text-[#4a5568]">
      <section className="px-5 pb-12 pt-[clamp(110px,16vh,150px)] text-center">
        <Link href="/about" className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-slate transition hover:text-navy-deep"><ArrowLeft size={16} />About us</Link>
        <div className="flex flex-col items-center gap-5">
          <ChevronBadge>Our story</ChevronBadge>
          <h1 className="text-[clamp(40px,5.5vw,64px)] font-medium leading-[1.1] tracking-[-0.03em] text-navy-deep">How Westmere began</h1>
        </div>
      </section>
      <StorySection withStats={false} />
      <TimelineSection />
    </div>
  )
}
