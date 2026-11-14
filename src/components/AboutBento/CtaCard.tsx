import SocialLinks from '@/components/ui/SocialLinks'
import type { NetworkKey } from '@/lib/site-defaults'
import { cn } from '@/lib/cn'
import BentoCard, { bentoText, bentoTitle } from './BentoCard'

export default function CtaCard({ socials, bookingUrl }: { socials: Record<NetworkKey, string>; bookingUrl: string }) {
  return (
    <BentoCard plain delay={0.3} className="flex flex-col items-center justify-between px-6 py-7 text-center min-[961px]:col-span-6">
      <h3 className={bentoTitle}>Discuss your project</h3>
      <div className="mb-10 mt-7 flex flex-col items-center gap-3">
        <a
          href={bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg bg-navy px-8 py-2.5 text-base font-medium text-white shadow-[0_4px_18px_rgba(27,42,74,0.22),inset_0_1px_0_rgba(255,255,255,0.15)] transition-colors hover:bg-navy-deep"
        >
          Schedule a call - 15 mins free
        </a>
        <p className={cn(bentoText)}>No pressure, just a thoughtful chat.</p>
      </div>
      {Object.values(socials).some(Boolean) && (
        <div className="flex flex-col items-center gap-2.5">
          <span className="text-xs font-semibold tracking-[0.15em] text-slate">CONNECT US ON</span>
          <SocialLinks socials={socials} className="flex items-center gap-2" iconClass="flex size-7 items-center justify-center rounded-md bg-navy-deep text-white transition hover:-translate-y-0.5 hover:bg-blue" />
        </div>
      )}
    </BentoCard>
  )
}
