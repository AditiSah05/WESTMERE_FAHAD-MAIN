import Image from 'next/image'
import Link from 'next/link'
import logo from '@/assets/westmere-logo.png'
import { cn } from '@/lib/cn'

const Bars = () => (
  <span className="mx-px inline-flex h-[9px] w-2.5 flex-col justify-between md:h-3 md:w-[13px]" aria-hidden>
    {[0, 1, 2].map((i) => (
      <span key={i} className="h-0.5 w-full rounded-[1px] bg-[#0a1128]" />
    ))}
  </span>
)

/** WESTMERE wordmark (E rendered as three bars) next to the logo mark. */
export default function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" aria-label="Westmere home" className={cn('flex items-center gap-1.5 md:gap-3.5', className)}>
      <Image
        src={logo}
        alt="Westmere logo"
        priority
        className="block h-5 w-auto object-contain md:h-7"
      />
      <span
        className="flex items-center gap-[5px] font-body text-xs font-extrabold tracking-[0.2px] text-[#0a1128] md:text-[15px] md:tracking-[1px]"
      >
        <span>W</span>
        <Bars />
        <span>S</span>
        <span>T</span>
        <span>M</span>
        <Bars />
        <span>R</span>
        <Bars />
      </span>
    </Link>
  )
}
