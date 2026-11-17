import { getAbout } from '@/lib/server/content'
import AboutHero from './AboutHero'
import HashScroll from './HashScroll'
import ProcessSection from './ProcessSection'
import StorySection from './StorySection'
import TimelineSection from './TimelineSection'
import ValuesSection from './ValuesSection'

export default async function AboutPage() {
  const about = await getAbout()
  return (
    <div className="overflow-x-hidden bg-paper font-sans text-[#4a5568]">
      <HashScroll />
      <AboutHero heading={about.hero.heading} intro={about.hero.intro} />
      <StorySection story={about.story} stats={about.stats} />
      <ValuesSection values={about.values} />
      <ProcessSection steps={about.process} />
      <TimelineSection milestones={about.milestones} />
    </div>
  )
}
