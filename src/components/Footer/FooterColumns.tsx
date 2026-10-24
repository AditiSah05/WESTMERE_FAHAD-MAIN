import Link from 'next/link'
import Logo from '@/components/ui/Logo'
import { FacebookIcon, InstagramIcon } from '@/components/ui/SocialIcons'

const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About us' },
  { href: '/services', label: 'Our Services' },
  { href: '/product', label: 'Our Product' },
  { href: '/contact', label: 'Contact us' },
]

const title = 'mb-[30px] text-xs font-semibold uppercase tracking-[0.15em] text-slate'
const text = 'text-base font-medium text-navy-deep transition-colors hover:text-gold'

const socials = [
  { href: 'https://www.instagram.com/westmere.io/', label: 'Instagram', Icon: InstagramIcon },
  { href: 'https://www.facebook.com/profile.php?id=61590820286108', label: 'Facebook', Icon: FacebookIcon },
]

export default function FooterColumns() {
  return (
    <div className="grid grid-cols-1 gap-9 min-[601px]:grid-cols-2 min-[601px]:gap-10 min-[1101px]:grid-cols-3 min-[1101px]:gap-[100px]">
      <div className="flex flex-col gap-[30px]">
        <Logo />
        <p className="max-w-[300px] text-base font-medium leading-[1.2] text-muted">
          Crafting sovereign ideas into stellar digital spaces. Built to drive real growth.
        </p>
      </div>

      <nav className="flex flex-col" aria-label="Quick links">
        <h4 className={title}>QUICK LINKS</h4>
        <ul className="flex flex-col gap-2.5">
          {links.map((l) => (
            <li key={l.href}><Link href={l.href} className={text}>{l.label}</Link></li>
          ))}
        </ul>
      </nav>

      <div className="flex flex-col min-[601px]:max-[1100px]:col-span-2">
        <h4 className={title}>GET IN TOUCH</h4>
        <div className="mb-[30px] flex flex-col items-start gap-2.5">
          <a href="tel:+919654664191" className={text}>+91 96546 64191</a>
          <a href="mailto:hello@westmere.io" className={text}>hello@westmere.io</a>
          <p className="text-base font-medium leading-[1.2] text-navy-deep">New Delhi , India</p>
        </div>
        <h5 className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-slate">FOLLOW US ON</h5>
        <div className="flex gap-2">
          {socials.map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="flex size-7 items-center justify-center rounded-md bg-ink text-white transition hover:-translate-y-0.5 hover:shadow-[0_0_0_2px_#c4943d]"
            >
              <Icon width={14} height={14} />
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
