import Reveal from '@/components/ui/Reveal'
import { cn } from '@/lib/cn'
import { heading, lead, milestones, shell } from './data'

export default function TimelineSection() {
  return (
    <section className="bg-[#fafbfe] pb-[120px] pt-[100px]">
      <div className={shell}>
        <Reveal className="mb-[50px] flex flex-col items-center text-center">
          <h2 className={cn(heading, 'mb-5')}>Our Journey</h2>
          <p className={cn(lead, 'max-w-[600px]')}>How we evolved from a small digital workshop to a full-service creative engine.</p>
        </Reveal>

        <div className="relative mx-auto mt-[60px] max-w-[1000px]">
          <div aria-hidden className="absolute inset-y-0 left-5 w-0.5 bg-[linear-gradient(to_bottom,#e2e8f0_0%,#e8eff9_20%,#c4943d_80%,#e2e8f0_100%)] min-[769px]:left-1/2 min-[769px]:-translate-x-1/2" />
          {milestones.map((m, i) => {
            const left = i % 2 === 0
            return (
              <Reveal key={m.year}>
                <div className={cn('group relative flex w-full justify-start py-5 pl-10 min-[769px]:w-1/2 min-[769px]:py-[30px] min-[769px]:pl-0', left ? 'min-[769px]:justify-end' : 'min-[769px]:ml-[50%] min-[769px]:justify-start')}>
                  <span
                    className={cn(
                      'absolute left-5 top-1/2 z-10 flex size-[22px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-blue-accent bg-white transition-colors group-hover:border-gold',
                      left ? 'min-[769px]:left-full' : 'min-[769px]:left-0',
                    )}
                  >
                    <span className="size-1.5 rounded-full bg-blue-accent transition duration-300 group-hover:scale-[1.8] group-hover:bg-gold" />
                  </span>
                  <div className={cn('w-full rounded-2xl border border-line bg-white p-[30px] shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition duration-300 hover:-translate-y-0.5 hover:border-blue-accent/25 hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)] min-[769px]:w-[90%] min-[769px]:max-w-[440px]', left ? 'min-[769px]:mr-10' : 'min-[769px]:ml-10')}>
                    <span className="mb-2 block font-display text-[1.8rem] font-bold leading-none text-gold">{m.year}</span>
                    <h3 className="mb-2.5 text-xl font-bold text-navy-deep">{m.title}</h3>
                    <p className="leading-[1.5] text-[#718096]">{m.desc}</p>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
