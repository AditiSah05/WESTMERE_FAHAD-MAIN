import Image from 'next/image'
import logo from '@/assets/westmere-logo.png'

/** Westmere emblem with a slowly spinning orbit; all motion is CSS (no JS). */
export default function ApproachGraphic() {
  return (
    <div aria-hidden className="relative flex size-[200px] flex-none items-center justify-center">
      <svg className="absolute size-full animate-[spinSlow_30s_linear_infinite] motion-reduce:animate-none" viewBox="0 0 220 220" fill="none">
        <circle cx="110" cy="110" r="100" stroke="rgba(226,232,240,0.7)" strokeWidth="1.2" strokeDasharray="4 4" />
        <circle cx="110" cy="110" r="76" stroke="rgba(215,230,255,0.8)" strokeWidth="1.2" />
        <circle cx="186" cy="110" r="5" fill="#2563EB" className="origin-[186px_110px] animate-[approachPulse_2s_ease-in-out_infinite_alternate] drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)] motion-reduce:animate-none" />
        <circle cx="110" cy="34" r="4" fill="#C4943D" className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)]" />
        <circle cx="34" cy="110" r="4.5" fill="#94A3B8" className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)]" />
      </svg>
      <div className="z-[2] flex size-[86px] animate-[approachFloat_3s_ease-in-out_infinite_alternate] items-center justify-center rounded-full border border-line/85 bg-white shadow-[0_12px_30px_rgba(0,0,0,0.07),0_2px_6px_rgba(0,0,0,0.03),inset_0_2px_0_rgba(255,255,255,0.9)] transition-transform duration-[400ms] group-hover:scale-[1.06] motion-reduce:animate-none">
        <Image src={logo} alt="" className="h-[34px] w-auto object-contain" />
      </div>
    </div>
  )
}
