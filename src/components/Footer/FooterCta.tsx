import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import logo from '@/assets/westmere-logo.png'

const chip =
  'flex size-10 items-center justify-center rounded-lg bg-white shadow-[0_2px_4px_rgba(27,42,74,0.06),0_8px_14px_rgba(27,42,74,0.06)]'
const arc = 'pointer-events-none absolute z-0 size-[520px] rounded-full border-[10px] border-gold'

export default function FooterCta() {
  return (
    <div className="flex flex-col gap-[3px]">
      <div className="flex items-center justify-center gap-3" aria-hidden>
        <span className="h-px w-[290px] flex-none bg-gradient-to-r from-transparent to-navy-deep/35" />
        <span className={chip}><ChevronLeft size={14} /></span>
        <span className={chip}><ChevronRight size={14} /></span>
        <span className="h-px w-[290px] flex-none bg-gradient-to-l from-transparent to-navy-deep/35" />
      </div>

      <div className="rounded-[20px] border border-[#dce5f3] bg-sky p-3 shadow-[0_14px_30px_rgba(27,42,74,0.08)] min-[601px]:p-[18px]">
        <div className="relative flex flex-col items-start justify-between gap-[30px] overflow-hidden rounded-lg border border-white/15 bg-gradient-to-br from-navy-deep via-navy to-[#24365f] px-6 py-8 min-[901px]:flex-row min-[901px]:items-center min-[901px]:gap-[50px] min-[901px]:p-[50px]">
          <span className={`${arc} -top-[440px] left-[calc(50%-260px)]`} />
          <span className={`${arc} -bottom-[370px] -right-10`} />

          <div className="relative z-[1] flex flex-[1_0_0] flex-col gap-2.5">
            <p className="text-xs font-semibold uppercase leading-none tracking-[0.15em] text-white/65">
              Let&apos;s build something great
            </p>
            <h2 className="text-balance text-[clamp(34px,4.6vw,52px)] font-medium leading-[1.2] tracking-[-0.03em] text-white">
              Ready to start your next project?
            </h2>
          </div>

          <div className="relative z-[1] w-full rounded-lg bg-white/10 p-2 min-[901px]:max-w-[360px] min-[901px]:flex-[1_0_0]">
            <div className="flex flex-col gap-5 rounded-md border border-white bg-paper px-5 pb-4 pt-[19px] shadow-[inset_0_0_5px_rgba(27,42,74,0.12)]">
              <p className="flex items-center gap-2 text-xs font-semibold leading-none tracking-[0.15em] text-slate">
                <span className="size-2 rounded-full bg-navy-deep shadow-[0_0_0_3px_#e2e8f0]" />
                AVAILABLE FOR PROJECT
              </p>
              <div className="flex items-center gap-2">
                <Image src={logo} alt="Westmere" className="size-[50px] rounded-full border border-line bg-white object-contain p-[9px]" />
                <span className="text-base text-slate">+</span>
                <span className="flex size-[50px] items-center justify-center rounded-full bg-navy-deep text-base font-medium text-white">You</span>
              </div>
              <h3 className="-mb-3.5 text-[22px] font-medium leading-[1.2] tracking-[-0.03em] text-navy-deep">Quick 15-minute call</h3>
              <p className="text-base font-medium leading-[1.2] text-muted">Pick a time that works for you.</p>
              <a
                href="https://wa.me/919654664191"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center rounded-lg bg-gold px-4 py-[11px] text-base font-medium leading-[1.2] text-white shadow-[0_0_0_1px_#a87a2b,inset_0_1.4px_1px_rgba(255,255,255,0.25),0_1.4px_4px_rgba(27,42,74,0.3)] hover:bg-[#b3862f]"
              >
                Book your free Strategy Call
              </a>
            </div>
          </div>

          <div
            aria-hidden
            className="pointer-events-none absolute right-1 top-1/2 z-[2] -mt-[50px] hidden h-10 animate-[footerPointerFloat_2.8s_ease-in-out_infinite_alternate] items-start motion-reduce:animate-none min-[901px]:flex"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="#060612" className="-mr-1">
              <path d="M1.6.6l16.2 6.4a.9.9 0 0 1 0 1.7l-7 2.2a.4.4 0 0 0-.3.3l-2.3 7.4a.9.9 0 0 1-1.8 0L.4 1.8A.9.9 0 0 1 1.6.6z" />
            </svg>
            <span className="mt-[15px] rounded-full bg-ink px-3 py-1.5 text-[11px] font-semibold leading-none tracking-[0.15em] text-white shadow-[0_0_0_1.5px_rgba(255,255,255,0.85)]">
              WESTMERE
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
