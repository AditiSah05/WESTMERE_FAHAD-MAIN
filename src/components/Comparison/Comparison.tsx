import Link from 'next/link'
import { Star } from 'lucide-react'
import ChevronBadge from '@/components/ui/ChevronBadge'
import ComparisonTable from './ComparisonTable'
import ProofAvatars from './ProofAvatars'
import Reveal from '@/components/ui/Reveal'

export default function Comparison() {
  return (
    <section className="relative z-10 flex justify-center py-[60px] font-sans">
      <div className="flex w-full max-w-[700px] flex-col items-center gap-11 px-5 min-[641px]:gap-[60px] min-[641px]:px-[30px]">
        <Reveal><ChevronBadge>Comparison</ChevronBadge></Reveal>
        <ComparisonTable />
        <Reveal className="flex w-full flex-wrap items-center gap-5">
          <Link
            href="/about"
            className="rounded-lg bg-gold px-[22px] py-2.5 text-base font-medium leading-[1.2] text-white shadow-[0_0_0_1px_#a87a2b,inset_0_1.4px_1px_rgba(255,255,255,0.25),0_1.4px_4px_rgba(27,42,74,0.3)]"
          >
            Read our story
          </Link>
          <ProofAvatars />
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1 text-gold">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} size={15} fill="currentColor" strokeWidth={0} />
              ))}
              <span className="ml-1.5 text-[15px] font-semibold text-navy-deep">4.9/5</span>
            </div>
            <p className="text-sm font-medium text-slate">Trusted by 50+ visionary brands</p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
