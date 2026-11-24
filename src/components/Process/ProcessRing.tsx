import { cn } from '@/lib/cn'
import { STEP_ANGLE, brandGradient, steps } from './data'

type Props = { step: number; onSelect: (i: number) => void }

export default function ProcessRing({ step, onSelect }: Props) {
  return (
    <div
      className="absolute left-1/2 top-[clamp(56px,8vh,84px)] size-[var(--ring)] transition-transform duration-[800ms] ease-[cubic-bezier(0.65,0,0.35,1)] will-change-transform motion-reduce:transition-none"
      style={{ transform: `translateX(-50%) rotate(${-step * STEP_ANGLE}deg)` }}
    >
      <div className="absolute inset-0 rounded-full bg-sky shadow-[inset_0_0_6px_rgba(27,42,74,0.14)]" />
      <div className="absolute inset-3 rounded-full border border-white bg-sky" />
      {steps.map((s, i) => {
        const active = i === step
        return (
          <div key={s.title} className="pointer-events-none absolute inset-0" style={{ transform: `rotate(${i * STEP_ANGLE}deg)` }}>
            <button
              type="button"
              onClick={() => onSelect(i)}
              aria-label={`Step ${i + 1}: ${s.title}`}
              className={cn(
                'pointer-events-auto absolute -top-2.5 left-1/2 -ml-[22px] flex size-11 items-center justify-center rounded-lg border text-base font-medium shadow-[0_2px_4px_rgba(27,42,74,0.06),0_8px_14px_rgba(27,42,74,0.06)] transition-[color,border-color,background-color] duration-[400ms]',
                active ? `border-navy ${brandGradient} text-white` : 'border-line bg-white text-slate',
              )}
            >
              <span
                className={cn(
                  'absolute bottom-full mb-1.5 text-xs font-medium uppercase tracking-[0.15em] text-slate transition-opacity duration-[400ms]',
                  active ? 'opacity-100' : 'opacity-0',
                )}
              >
                Step
              </span>
              {String(i + 1).padStart(2, '0')}
            </button>
          </div>
        )
      })}
    </div>
  )
}
