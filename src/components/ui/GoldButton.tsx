import Link from 'next/link'
import type { ComponentProps } from 'react'
import { cn } from '@/lib/cn'

const base =
  'inline-flex items-center justify-center whitespace-nowrap rounded-lg px-[22px] py-[10px] text-base font-medium leading-[1.2] text-white'

const variants = {
  gold: 'bg-gold shadow-[0_0_0_1px_#a87a2b,inset_0_1.4px_1px_rgba(255,255,255,0.25),0_1.4px_4px_rgba(27,42,74,0.3)] hover:bg-[#b3862f]',
  dark: 'bg-navy-deep shadow-[inset_0_1.4px_1px_rgba(255,255,255,0.08),0_0_0_1.4px_#2f4166] hover:bg-navy',
} as const

type Props = ComponentProps<typeof Link> & { variant?: keyof typeof variants }

export default function ButtonLink({ variant = 'gold', className, ...rest }: Props) {
  return <Link className={cn(base, variants[variant], className)} {...rest} />
}
