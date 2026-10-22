'use client'

import { motion } from 'framer-motion'
import ChevronBadge from '@/components/ui/ChevronBadge'
import ButtonLink from '@/components/ui/GoldButton'
import GradientText from '@/components/ui/GradientText'
import AboutRings from './AboutRings'

const col = 'grid grid-rows-[4fr_1fr]'
const navy = 'bg-navy'
const gold = 'bg-gold'

export default function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-paper px-5 pb-20 pt-[clamp(110px,16vh,150px)]">
      <AboutRings />
      <div className="relative z-[5] mx-auto flex max-w-[1000px] flex-col items-center gap-4 text-center">
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <ChevronBadge>About us</ChevronBadge>
        </motion.div>

        <motion.h1
          className="mb-10 text-[clamp(44px,6vw,70px)] font-medium leading-[1.1] tracking-[-0.03em] text-navy-deep"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          Who{' '}
          <GradientText className="bg-[linear-gradient(135deg,#2563eb_0%,#1b2a4a_45%,#c4943d_100%)]">we are</GradientText>
        </motion.h1>

        <motion.div
          className="grid w-full grid-cols-1 gap-6 rounded-[20px] border border-[#dce5f3] bg-sky p-[22px] text-left shadow-[0_14px_30px_rgba(27,42,74,0.08)] min-[821px]:grid-cols-2"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex min-h-[320px] flex-col justify-between gap-[30px] rounded-lg bg-white p-6 min-[821px]:min-h-[458px]">
            <h2 className="text-[clamp(26px,3vw,36px)] font-medium leading-[1.2] tracking-[-0.03em] text-navy-deep">
              A team built on clarity, craft and commitment
            </h2>
            <div className="flex flex-col items-start gap-[30px]">
              <p className="text-base font-medium leading-[1.4] text-slate">
                We are a creative engineering agency built to help ambitious brands scale. By merging high-converting UX
                with hyper-optimized development, we translate bold visions into measurable business growth.
              </p>
              <ButtonLink href="/contact">Start a project</ButtonLink>
            </div>
          </div>

          <div aria-hidden className="grid min-h-[320px] grid-cols-4 overflow-hidden rounded-lg min-[821px]:min-h-[458px]">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className={col}>
                <span className={i % 2 ? gold : navy} />
                <span className={i % 2 ? navy : gold} />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
