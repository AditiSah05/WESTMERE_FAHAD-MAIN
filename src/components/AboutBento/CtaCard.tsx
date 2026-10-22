import { FacebookIcon, InstagramIcon, LinkedinIcon, XIcon } from '@/components/ui/SocialIcons'
import { cn } from '@/lib/cn'
import BentoCard, { bentoText, bentoTitle } from './BentoCard'

const socials = [
  { href: 'https://facebook.com', label: 'Facebook', Icon: FacebookIcon },
  { href: 'https://instagram.com', label: 'Instagram', Icon: InstagramIcon },
  { href: 'https://linkedin.com', label: 'LinkedIn', Icon: LinkedinIcon },
  { href: 'https://x.com', label: 'X', Icon: XIcon },
]

export default function CtaCard() {
  return (
    <BentoCard plain delay={0.3} className="flex flex-col items-center justify-between px-6 py-7 text-center min-[961px]:col-span-6">
      <h3 className={bentoTitle}>Discuss your project</h3>
      <div className="mb-10 mt-7 flex flex-col items-center gap-3">
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
    </BentoCard>
  )
}
