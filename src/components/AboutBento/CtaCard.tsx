import { cn } from '@/lib/cn'
import BentoCard, { bentoText, bentoTitle } from './BentoCard'

export default function CtaCard() {
  return (
    <BentoCard plain delay={0.3} className="flex flex-col items-center justify-between px-6 py-7 text-center min-[961px]:col-span-6">
      <h3 className={bentoTitle}>Discuss your project</h3>
      <div className="my-7 flex flex-col items-center gap-3">
        <a
          href="https://cal.com"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg bg-navy px-8 py-2.5 text-base font-medium text-white shadow-[0_4px_18px_rgba(27,42,74,0.22),inset_0_1px_0_rgba(255,255,255,0.15)] transition-colors hover:bg-navy-deep"
        >
          Schedule a call - 15 mins free
        </a>
        <p className={cn(bentoText)}>No pressure, just a thoughtful chat.</p>
      </div>
    </BentoCard>
  )
}
