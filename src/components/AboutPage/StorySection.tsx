import Reveal from '@/components/ui/Reveal'
import { cn } from '@/lib/cn'
import { heading, lead, shell, stats } from './data'

export default function StorySection() {
  return (
    <section className="border-b border-line bg-[#f1f5fb] py-[100px]">
      <div className={shell}>
        <div className="grid grid-cols-1 items-center gap-[50px] min-[769px]:grid-cols-2 min-[769px]:gap-10 min-[1025px]:gap-20">
          <Reveal className="flex flex-col justify-center">
            <h2 className={cn(heading, 'mb-5')}>Our Origin &amp; Mission</h2>
            <p className={cn(lead, 'mb-6')}>
              Westmere was founded on a simple premise: the gap between design agencies and development shops was too wide. Design agencies delivered mockups that couldn&apos;t scale, while development shops built functional apps that felt dry and uninspiring.
            </p>
            <p className={lead}>
              We brought both worlds under one roof. Today, we craft bespoke digital experiences that feel premium, perform at lightspeed, and convert users seamlessly. We don&apos;t just build websites; we design products and write code that drives revenue.
            </p>
          </Reveal>
          <Reveal className="grid grid-cols-2 gap-5">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col gap-2 rounded-[10px] bg-white px-[25px] py-[35px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition-transform duration-300 hover:-translate-y-[5px]">
                <span className={cn('text-5xl font-medium leading-none tracking-[-0.03em]', s.color)}>{s.value}</span>
                <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[#718096]">{s.label}</span>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
