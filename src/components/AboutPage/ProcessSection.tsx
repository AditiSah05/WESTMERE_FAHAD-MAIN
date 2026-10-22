import ChevronBadge from '@/components/ui/ChevronBadge'
import Reveal from '@/components/ui/Reveal'
import { cn } from '@/lib/cn'
import { heading, lead, processSteps, shell } from './data'

export default function ProcessSection() {
  return (
    <section id="process" className="border-b border-line py-[100px]">
      <div className={shell}>
        <Reveal className="mb-[50px] flex flex-col items-center text-center">
          <ChevronBadge className="mb-5">Methodology</ChevronBadge>
          <h2 className={cn(heading, 'mb-5')}>Our Process</h2>
          <p className={cn(lead, 'max-w-[600px]')}>A connected flow of execution designed for efficiency, clarity, and speed.</p>
        </Reveal>

        <div className="relative mt-5 py-10 max-[768px]:p-0">
          <div
            aria-hidden
            className="absolute z-[1] hidden bg-gradient-to-r from-sky via-line to-sky max-[768px]:inset-y-[25px] max-[768px]:left-[27px] max-[768px]:right-auto max-[768px]:block max-[768px]:h-auto max-[768px]:w-0.5 max-[768px]:bg-gradient-to-b min-[1025px]:left-[5%] min-[1025px]:right-[5%] min-[1025px]:top-[67px] min-[1025px]:block min-[1025px]:h-0.5"
          />
          <div className="relative z-[2] flex flex-col items-start gap-[35px] min-[769px]:flex-row min-[769px]:flex-wrap min-[769px]:justify-center min-[769px]:gap-x-5 min-[769px]:gap-y-10 min-[1025px]:flex-nowrap min-[1025px]:justify-between min-[1025px]:gap-5">
            {processSteps.map((s) => (
              <Reveal key={s.step} className="w-full min-[769px]:w-[calc(33.333%-20px)] min-[1025px]:w-auto min-[1025px]:flex-1">
                <div className="group flex items-start gap-5 text-left min-[769px]:flex-col min-[769px]:items-center min-[769px]:text-center">
                  <div className="z-[3] flex flex-none items-center justify-center bg-paper py-1.5 min-[769px]:px-2.5 min-[769px]:py-0">
                    <span className="flex size-[54px] items-center justify-center rounded-full border-2 border-line bg-white text-sm font-bold text-navy-deep transition duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.08] group-hover:border-gold group-hover:bg-gold group-hover:text-white group-hover:shadow-[0_0_0_6px_rgba(196,148,61,0.06)]">
                      {s.step}
                    </span>
                  </div>
                  <div className="flex max-w-full flex-col gap-2 pt-3.5 min-[769px]:max-w-[150px] min-[769px]:pt-0">
                    <h3 className="text-[1.15rem] font-bold text-navy">{s.title}</h3>
                    <p className="text-[0.9rem] leading-[1.45] text-[#718096]">{s.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
