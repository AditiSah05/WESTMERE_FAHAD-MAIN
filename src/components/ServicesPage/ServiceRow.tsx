import { Check } from 'lucide-react'
import Reveal from '@/components/ui/Reveal'
import { cn } from '@/lib/cn'
import type { Service } from './data'
import { mockups } from './mockups'

export default function ServiceRow({ service, flip }: { service: Service; flip: boolean }) {
  const Visual = mockups[service.id]
  return (
    <Reveal className={cn('flex flex-col items-center gap-10 min-[1025px]:gap-20', flip ? 'min-[769px]:flex-row-reverse' : 'min-[769px]:flex-row')}>
      <div className="flex flex-[1.1] flex-col items-start">
        <span className="mb-3 text-[10.5px] font-extrabold uppercase tracking-[1.5px] text-gold">{service.badge}</span>
        <h2 className="mb-3.5 text-[1.8rem] font-bold text-navy-deep min-[769px]:text-[2.2rem]">{service.title}</h2>
        <h3 className="mb-5 text-xl font-semibold leading-[1.4] text-[#4a5568]">{service.headline}</h3>
        <p className="mb-[25px] text-[1.05rem] leading-[1.6] text-[#718096]">{service.desc}</p>
        <div className="mb-[25px] flex flex-wrap gap-2">
          {service.techs.map((t) => (
            <span key={t} className="rounded border border-blue-accent/10 bg-sky px-3 py-1.5 text-[12.5px] font-bold text-blue-accent">{t}</span>
          ))}
        </div>
        <div className="mb-5 mt-[5px] h-px w-full bg-line" />
        <ul className="flex flex-col gap-3">
          {service.features.map((f) => (
            <li key={f} className="flex items-start gap-2.5 leading-[1.4] text-[#4a5568]">
              <Check size={14} strokeWidth={3} className="mt-1 flex-none text-[#10b981]" />
              {f}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-[0.9] items-center justify-center"><Visual /></div>
    </Reveal>
  )
}
