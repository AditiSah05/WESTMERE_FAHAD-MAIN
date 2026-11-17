import { socialList } from '@/components/ui/socials'
import { getSocials } from '@/lib/server/content'
import { siteConfig } from '@/lib/site'
import { cn } from '@/lib/cn'
import BentoCard, { bentoText, bentoTitle } from './BentoCard'

export default async function CtaCard({ title, button, note }: { title: string; button: string; note: string }) {
  const socials = socialList(await getSocials())
  return (
    <BentoCard plain delay={0.3} className="flex flex-col items-center justify-between px-6 py-7 text-center min-[961px]:col-span-6">
      <h3 className={bentoTitle}>{title}</h3>
      <div className="mb-10 mt-7 flex flex-col items-center gap-3">
        <a
          href={siteConfig.bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg bg-navy px-8 py-2.5 text-base font-medium text-white shadow-[0_4px_18px_rgba(27,42,74,0.22),inset_0_1px_0_rgba(255,255,255,0.15)] transition-colors hover:bg-navy-deep"
        >
          {button}
        </a>
        <p className={cn(bentoText)}>{note}</p>
      </div>
      {socials.length > 0 && (
        <div className="flex flex-col items-center gap-2.5">
          <span className="text-xs font-semibold tracking-[0.15em] text-slate">CONNECT US ON</span>
          <div className="flex items-center gap-2">
            {socials.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex size-7 items-center justify-center rounded-md bg-navy-deep text-white transition hover:-translate-y-0.5 hover:bg-blue"
              >
                <Icon width={14} height={14} />
              </a>
            ))}
          </div>
        </div>
      )}
    </BentoCard>
  )
}
