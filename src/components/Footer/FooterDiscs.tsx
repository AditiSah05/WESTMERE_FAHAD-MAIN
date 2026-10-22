import { BarChart3, Code, Layers, Lightbulb, MessageSquare, Zap, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/cn'

const icons: LucideIcon[] = [Lightbulb, Zap, Code, Layers, BarChart3, MessageSquare]
const spokes = [0, 1, 2, 3, 4, 5, 6, 7]

const disc =
  'pointer-events-none absolute left-1/2 z-0 flex aspect-square items-center justify-center rounded-full bg-sky select-none ' +
  'shadow-[inset_0_0_6px_rgba(27,42,74,0.14)] animate-[footerDiscIn_0.9s_cubic-bezier(0.44,0,0.56,1)_both] motion-reduce:animate-none'

const Inner = () => <div className="h-full w-px flex-[1_0_0] rounded-full border border-white bg-paper" />

/** Two huge concentric discs; the outer carries icon tiles that orbit and stay upright. */
export default function FooterDiscs() {
  return (
    <div aria-hidden>
      <div className={cn(disc, 'top-[254px] w-[2400px] p-2.5')}>
        <Inner />
        <div className="absolute inset-0 z-[1] animate-[footerOrbit_180s_linear_infinite] motion-reduce:animate-none">
          {spokes.map((i) => (
            <div
              key={i}
              className="absolute -bottom-[33px] -top-[33px] left-[calc(50%-38px)] flex w-[76px] flex-col items-center justify-between"
              style={{ transform: `rotate(${i * 22.5}deg)` }}
            >
              {[0, 1].map((end) => {
                const Icon = icons[(i + end * 3) % icons.length]
                return (
                  <div key={end} className="size-[76px]" style={{ transform: `rotate(${-i * 22.5}deg)` }}>
                    <span className="flex size-[76px] animate-[footerOrbitCounter_180s_linear_infinite] items-center justify-center rounded-lg bg-white text-[#a9b4c6] shadow-[0_2px_4px_rgba(27,42,74,0.05),0_14px_20px_rgba(27,42,74,0.05)] motion-reduce:animate-none">
                      <Icon size={30} strokeWidth={1.6} />
                    </span>
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>
      <div className={cn(disc, 'top-[354px] w-[2200px] p-3 [animation-delay:0.1s]')}>
        <Inner />
      </div>
    </div>
  )
}
