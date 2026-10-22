import { BarChart3, Code, Layers, Lightbulb, MessageSquare, Zap, type LucideIcon } from 'lucide-react'
import type { CSSProperties } from 'react'

const icons: LucideIcon[] = [Lightbulb, Zap, Code, Layers, BarChart3, MessageSquare]

// Full literal classes (Tailwind scans source): width/z/background per ring + rotation per ring.
const rings = [
  { angles: [0, 60, 120, 180, 240, 300], ring: 'z-[3] w-[760px] bg-mist min-[821px]:w-[1130px] animate-[aboutRingCW_90s_linear_infinite]', tile: 'animate-[aboutTileCW_90s_linear_infinite]' },
  { angles: [30, 90, 150, 210, 270, 330], ring: 'z-[2] w-[1060px] bg-[#f2f5fb] min-[821px]:w-[1490px] animate-[aboutRingCCW_120s_linear_infinite]', tile: 'animate-[aboutTileCCW_120s_linear_infinite]' },
  { angles: [0, 45, 90, 135, 180, 225, 270, 315], ring: 'z-[1] w-[1360px] bg-transparent min-[821px]:w-[1870px] animate-[aboutRingCW_150s_linear_infinite]', tile: 'animate-[aboutTileCW_150s_linear_infinite]' },
]

/** Three concentric rings centred above the top edge; alternating rotation, icon tiles stay upright. */
export default function AboutRings() {
  return (
    <div aria-hidden>
      {rings.map(({ angles, ring, tile }, n) => (
        <div
          key={n}
          className={`pointer-events-none absolute left-1/2 top-[-80px] aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full border-[5px] border-white shadow-[0_0_0_1px_rgba(27,42,74,0.05),0_6px_18px_rgba(27,42,74,0.05),inset_0_-6px_14px_rgba(27,42,74,0.04)] motion-reduce:animate-none min-[821px]:top-[-130px] ${ring}`}
        >
          {angles.map((a, i) => {
            const Icon = icons[(i + n + 1) % icons.length]
            return (
              <div key={a} className="absolute inset-0" style={{ transform: `rotate(${a}deg)` }}>
                <span
                  className={`absolute -top-[26px] left-1/2 -ml-[26px] flex size-[52px] items-center justify-center rounded-lg bg-white text-[#a9b4c6] shadow-[0_2px_4px_rgba(27,42,74,0.06),0_10px_16px_rgba(27,42,74,0.07)] motion-reduce:animate-none ${tile}`}
                  style={{ '--a': `${a}deg` } as CSSProperties}
                >
                  <Icon size={22} strokeWidth={1.6} />
                </span>
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}
