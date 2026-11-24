import type { ReactNode } from 'react'

type Props = { title: string; subtitle?: string; actions?: ReactNode }

export default function PageHeader({ title, subtitle, actions }: Props) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="text-[28px] font-medium leading-[1.2] tracking-[-0.03em] text-navy-deep">{title}</h1>
        {subtitle && <p className="mt-1 text-[15px] font-medium text-muted">{subtitle}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2.5">{actions}</div>}
    </div>
  )
}

export const btn = {
  gold: 'inline-flex items-center gap-2 rounded-lg bg-gold px-4 py-2.5 text-sm font-medium text-white shadow-[0_0_0_1px_#a87a2b,inset_0_1.4px_1px_rgba(255,255,255,0.25)] hover:bg-[#b3862f]',
  ghost: 'inline-flex items-center gap-2 rounded-lg border border-line bg-white px-4 py-2.5 text-sm font-medium text-navy-deep hover:border-navy/30 hover:bg-paper',
  navy: 'inline-flex items-center gap-2 rounded-lg bg-navy-deep px-4 py-2.5 text-sm font-medium text-white hover:bg-navy',
  danger: 'inline-flex items-center gap-2 rounded-lg border border-[#ef4444]/30 bg-white px-4 py-2.5 text-sm font-medium text-[#b91c1c] hover:bg-[#ef4444]/5',
}
