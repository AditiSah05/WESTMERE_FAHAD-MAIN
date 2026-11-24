'use client'

import ChevronBadge from '@/components/ui/ChevronBadge'
import GradientText from '@/components/ui/GradientText'
import ProcessCopy from './ProcessCopy'
import ProcessRing from './ProcessRing'
import { steps } from './data'
import { useStepScroll } from './useStepScroll'

export default function Process() {
  const { ref, step, goTo } = useStepScroll(steps.length)

  return (
    <section
      ref={ref}
      id="process"
      className="relative h-[380vh] font-sans [--ring:760px] min-[810px]:h-[420vh] min-[810px]:[--ring:900px] min-[1200px]:[--ring:1200px]"
    >
      <div className="sticky top-0 flex h-svh flex-col items-center overflow-hidden pt-[clamp(96px,14vh,150px)]">
        <div className="relative z-[2] flex flex-col items-center gap-4 px-5 text-center">
          <ChevronBadge>Process</ChevronBadge>
          <h2 className="text-balance text-[clamp(32px,4.4vw,52px)] font-medium leading-[1.2] tracking-[-0.03em] text-navy-deep">
            A collaborative <GradientText>approach</GradientText>
          </h2>
        </div>
        <div className="relative mt-[clamp(24px,6vh,60px)] min-h-0 w-full max-w-[1200px] flex-1">
          <ProcessRing step={step} onSelect={goTo} />
          <ProcessCopy step={step} onSelect={goTo} />
          <div aria-hidden className="pointer-events-none absolute -bottom-20 -left-[10%] z-[1] h-[222px] w-[120%] bg-paper blur-[35px]" />
        </div>
      </div>
    </section>
  )
}
