import ChevronBadge from '@/components/ui/ChevronBadge'
import Reveal from '@/components/ui/Reveal'
import CsatCard from './CsatCard'
import CtaCard from './CtaCard'
import GaugesCard from './GaugesCard'
import IndustriesCard from './IndustriesCard'
import ShowcaseCard from './ShowcaseCard'

export default function AboutBento() {
  return (
    <section id="about" className="relative z-10 flex flex-col items-center gap-10 px-6 py-[60px] font-sans">
      <Reveal><ChevronBadge>About us</ChevronBadge></Reveal>
      <div className="w-full max-w-[1000px] rounded-3xl border border-line/90 bg-[linear-gradient(135deg,#f5f1ed_0%,#ecf1fc_100%)] p-3.5 shadow-[0_20px_50px_rgba(0,0,0,0.04),0_4px_14px_rgba(0,0,0,0.02)] min-[601px]:p-[18px]">
        <div className="grid grid-cols-1 gap-5 min-[961px]:grid-cols-12">
          <CsatCard />
          <ShowcaseCard />
          <CtaCard />
          <GaugesCard />
          <IndustriesCard />
        </div>
      </div>
    </section>
  )
}
