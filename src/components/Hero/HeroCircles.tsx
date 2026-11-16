import type { CSSProperties } from 'react'
import { leftTools } from './techIcons'
import { rightTools } from './rightTools'

type Side = 'left' | 'right'

// Full literal class strings so Tailwind can see them. Offsets/sizes: desktop, then 810-1439px.
const lines: Record<Side, string[]> = {
  left: [
    'left-[-1400px] top-1/2 w-[1800px] p-2.5 min-[810px]:max-[1439px]:left-[-1000px] min-[810px]:max-[1439px]:w-[1150px]',
    'left-[-1150px] top-[52%] w-[1400px] p-2 min-[810px]:max-[1439px]:left-[-850px] min-[810px]:max-[1439px]:w-[900px]',
    'left-[-900px] top-1/2 w-[1000px] p-1.5 min-[810px]:max-[1439px]:hidden',
  ],
  right: [
    'right-[-1400px] top-1/2 w-[1800px] p-2.5 min-[810px]:max-[1439px]:right-[-1000px] min-[810px]:max-[1439px]:w-[1150px]',
    'right-[-1150px] top-[52%] w-[1400px] p-2 min-[810px]:max-[1439px]:right-[-850px] min-[810px]:max-[1439px]:w-[900px]',
    'right-[-900px] top-1/2 w-[1000px] p-1.5 min-[810px]:max-[1439px]:hidden',
  ],
}

const spokes = [0, 30, 60, 90, 120, 150]

const Orbit = ({ side }: { side: Side }) => {
  const tools = side === 'left' ? leftTools : rightTools
  const dir = side === 'right' ? '[animation-direction:reverse]' : ''
  return (
    <div className={`absolute inset-0 animate-[heroOrbit_120s_linear_infinite] motion-reduce:animate-none ${dir}`}>
      {spokes.map((deg, i) => {
        const d = deg + (side === 'left' ? -15 : 15)
        return (
          <div
            key={deg}
            className="absolute -bottom-[33px] -top-[33px] left-[calc(50%-38px)] flex w-[76px] flex-col items-center justify-between min-[810px]:max-[1439px]:-bottom-[22px] min-[810px]:max-[1439px]:-top-[22px]"
            style={{ transform: `rotate(${d}deg)` }}
          >
            {[0, 1].map((end) => (
              <div key={end} className="size-[76px]" style={{ transform: `rotate(${-d}deg)` }}>
                <div
                  className={`flex size-[76px] animate-[heroCounter_120s_linear_infinite] items-center justify-center rounded-lg bg-white shadow-soft motion-reduce:animate-none [&_svg]:size-[30px] [&_svg]:opacity-55 [&_svg]:grayscale ${dir}`}
                >
                  {tools[(i * 2 + end) % tools.length].icon}
                </div>
              </div>
            ))}
          </div>
        )
      })}
    </div>
  )
}

/** Three nested discs per side; the outermost carries the orbiting tool tiles. */
export default function HeroCircles() {
  return (
    <div aria-hidden className="hidden min-[810px]:block">
      {(['left', 'right'] as const).map((side) =>
        lines[side].map((cls, n) => (
          <div
            key={`${side}${n}`}
            style={{ '--dx': side === 'left' ? '-50px' : '50px' } as CSSProperties}
            className={`pointer-events-none absolute z-[1] flex aspect-square -translate-y-1/2 select-none rounded-full bg-sky opacity-0 shadow-[inset_0_0_6px_rgba(27,42,74,0.14)] animate-[heroLineIn_0.9s_cubic-bezier(0.44,0,0.56,1)_0.1s_forwards] motion-reduce:animate-none motion-reduce:opacity-100 ${cls}`}
          >
            <div className="h-full w-px flex-[1_0_0] rounded-full border border-white bg-paper" />
            {n === 0 && <Orbit side={side} />}
          </div>
        )),
      )}
    </div>
  )
}
