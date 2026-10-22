import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

export default function Card({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('rounded-[10px] border border-line/60 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.03)]', className)}>
      {children}
    </div>
  )
}
