import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

/** Site accent: blue -> navy -> gold gradient clipped to the text. */
export default function GradientText({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'bg-[linear-gradient(135deg,#2563eb_0%,#1b2a4a_35%,#c4943d_70%)] bg-clip-text text-transparent',
        className,
      )}
    >
      {children}
    </span>
  )
}
