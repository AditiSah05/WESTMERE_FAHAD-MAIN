import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { cn } from '@/lib/cn'
import { brandGradient, steps } from './data'

type Props = { step: number; onSelect: (i: number) => void }
const pad = (n: number) => String(n).padStart(2, '0')

export default function ProcessCopy({ step, onSelect }: Props) {
  const current = steps[step]
  return (
    <div className="absolute left-1/2 top-[clamp(120px,18vh,160px)] z-[2] flex w-full max-w-[360px] -translate-x-1/2 flex-col items-center gap-5 px-5 text-center min-[810px]:top-[clamp(130px,20vh,190px)]">
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          className="flex min-h-[112px] flex-col items-center gap-1.5"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -14 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <h3 className="text-[28px] font-medium leading-[1.2] tracking-[-0.03em] text-navy-deep">{current.title}</h3>
          <p className="text-base font-medium leading-[1.4] text-slate">{current.text}</p>
        </motion.div>
      </AnimatePresence>
      <Link
        href="/contact"
        className="whitespace-nowrap rounded-lg bg-[linear-gradient(135deg,#1b2a4a_0%,#2f4166_50%,#c4943d_100%)] px-[22px] py-2.5 text-base font-medium leading-[1.2] text-white shadow-[0_0_0_1px_#1b2a4a,inset_0_1.4px_1px_rgba(255,255,255,0.2),0_1.4px_4px_rgba(27,42,74,0.3)]"
      >
        Start your project
      </Link>
      <p className="mt-2.5 text-xs font-semibold tracking-[0.15em] text-slate">
        {pad(step + 1)}/{pad(steps.length)}
      </p>
      <div className="flex gap-1.5">
        {steps.map((s, i) => (
          <button
            key={s.title}
            type="button"
            onClick={() => onSelect(i)}
            aria-label={`Go to step ${i + 1}`}
            className={cn('size-2 rounded-full p-0 transition-colors duration-300', i === step ? brandGradient : 'bg-[#d5ddea]')}
          />
        ))}
      </div>
    </div>
  )
}
