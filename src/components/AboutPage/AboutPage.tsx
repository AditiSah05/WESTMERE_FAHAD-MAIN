import AboutHero from './AboutHero'
import HashScroll from './HashScroll'
import ProcessSection from './ProcessSection'
import StorySection from './StorySection'
import TimelineSection from './TimelineSection'
import ValuesSection from './ValuesSection'

export default function AboutPage() {
  return (
    <div className="overflow-x-hidden bg-paper font-sans text-[#4a5568]">
      <HashScroll />
      <AboutHero />
      <StorySection />
      <ValuesSection />
      <ProcessSection />
      <TimelineSection />
    </div>
  )
}
