import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

const frame = 'relative w-full overflow-hidden border-line bg-white shadow-[0_4px_12px_rgba(0,0,0,0.06)]'
const desktop = 'aspect-[4/3] max-w-[440px] rounded-xl border-[1.5px]'
const bar = 'flex items-center gap-1.5 border-b-[1.5px] border-line bg-[#f1f5f9] px-3.5 py-2.5'
const Dots = () => [0, 1, 2].map((i) => <span key={i} className="size-2 rounded-full bg-[#cbd5e1]" />)

const Line = ({ indent = 0, children }: { indent?: 0 | 1 | 2 | 3; children: ReactNode }) => (
  <div className="leading-[1.4]" style={{ paddingLeft: indent * 15 }}>{children}</div>
)
const c = { kw: 'text-[#f43f5e]', fn: 'text-[#38bdf8]', tag: 'text-[#f472b6]', attr: 'text-[#f59e0b]', str: 'text-[#34d399]' }

export const WebMockup = () => (
  <div className={cn(frame, desktop, 'flex flex-col')}>
    <div className={bar}>
      <Dots />
      <div className="ml-2.5 grow rounded border border-line bg-white px-3 py-[3px] text-center font-sans text-[11px] text-[#94a3b8]">
        https://westmere.agency/development
      </div>
    </div>
    <div className="flex grow flex-col justify-center gap-1.5 bg-[#0a1128] p-5 font-mono text-[13px] text-[#f8fafc]">
      <Line><span className={c.kw}>const</span> <span className={c.fn}>Website</span> = () =&gt; {'{'}</Line>
      <Line indent={1}><span className={c.kw}>return</span> (</Line>
      <Line indent={2}>&lt;<span className={c.tag}>div</span> <span className={c.attr}>className</span>=<span className={c.str}>&quot;performance-100&quot;</span>&gt;</Line>
      <Line indent={3}>&lt;<span className={c.tag}>OptimizedSpeed</span> <span className={c.attr}>load</span>=<span className={c.str}>&quot;instant&quot;</span> /&gt;</Line>
      <Line indent={2}>&lt;/<span className={c.tag}>div</span>&gt;</Line>
      <Line indent={1}>)</Line>
      <Line>{'}'}</Line>
    </div>
  </div>
)

const Stat = ({ label, value, color }: { label: string; value: string; color: string }) => (
  <div className="flex flex-col gap-1 rounded-lg border border-line p-3">
    <span className="text-[8px] font-bold text-[#718096]">{label}</span>
    <span className={cn('text-lg font-extrabold', color)}>{value}</span>
  </div>
)

export const AppMockup = () => (
  <div className={cn(frame, 'flex aspect-[9/19] max-w-[220px] flex-col rounded-[28px] border-4')}>
    <div className="flex h-6 items-center justify-center gap-2 border-b border-line bg-[#f1f5f9]">
      <div className="size-1.5 rounded-full bg-[#94a3b8]" />
      <div className="h-1 w-[35px] rounded-sm bg-[#cbd5e1]" />
    </div>
    <div className="flex grow flex-col gap-5 px-4 py-6">
      <div className="flex items-center justify-between">
        <span className="text-base font-extrabold text-navy-deep">Westmere</span>
        <span className="rounded bg-gold/[0.06] px-2 py-1 text-[9px] font-bold text-gold">Native v1.2</span>
      </div>
      <div className="grid gap-3">
        <Stat label="CPU LOAD" value="1.2%" color="text-[#10b981]" />
        <Stat label="FPS RATE" value="120hz" color="text-blue-accent" />
      </div>
      <div className="w-full rounded-md bg-black p-3 text-center text-xs font-bold text-white">Active Syncing</div>
    </div>
  </div>
)

export const AutomationMockup = () => (
  <div className={cn(frame, desktop, 'flex flex-col items-center justify-center p-[30px]')}>
    <svg viewBox="0 0 200 120" fill="none" className="block h-auto w-full">
      <path d="M10 20 H80 V100 H190" stroke="#4a7bf7" strokeWidth="2" strokeDasharray="4 4" />
      <path d="M10 100 H80 V20 H190" stroke="#c4943d" strokeWidth="2" />
      <circle cx="80" cy="60" r="14" fill="#0A1128" stroke="#e2e8f0" strokeWidth="2" />
      <circle cx="10" cy="20" r="5" fill="#4a7bf7" />
      <circle cx="10" cy="100" r="5" fill="#c4943d" />
      <polygon points="186,100 194,96 194,104" fill="#4a7bf7" />
      <polygon points="186,20 194,16 194,24" fill="#c4943d" />
    </svg>
    <div className="mt-[15px] flex w-full justify-between text-[11px] font-bold text-[#718096]">
      <span>API Gateway</span>
      <span>Cloud Lambda</span>
    </div>
  </div>
)

const Bar = ({ pct, color }: { pct: string; color: string }) => (
  <div className="relative h-2 rounded bg-line">
    <div className={cn('absolute inset-y-0 left-0 rounded', color)} style={{ width: pct }} />
  </div>
)

export const SoftwareMockup = () => (
  <div className={cn(frame, desktop, 'flex flex-col')}>
    <div className={bar}>
      <Dots />
      <div className="ml-2.5 text-[11px] font-bold text-[#718096]">Admin Dashboard</div>
    </div>
    <div className="flex h-[calc(100%-35px)] grow">
      <div className="flex w-[45px] flex-col items-center gap-3.5 border-r-[1.5px] border-line bg-[#f8fafc] py-[15px]">
        <span className="block h-1.5 w-5 rounded-[3px] bg-blue-accent" />
        <span className="block h-1.5 w-5 rounded-[3px] bg-line" />
        <span className="block h-1.5 w-5 rounded-[3px] bg-line" />
      </div>
      <div className="flex grow flex-col justify-center gap-[15px] p-[25px]">
        <span className="text-[10px] font-extrabold tracking-[0.5px] text-[#718096]">POSTGRESQL SYNC STATUS</span>
        <div className="flex flex-col gap-2.5">
          <Bar pct="85%" color="bg-blue-accent" />
          <Bar pct="60%" color="bg-gold" />
          <Bar pct="95%" color="bg-[#10b981]" />
        </div>
      </div>
    </div>
  </div>
)

export const mockups = { website: WebMockup, app: AppMockup, automation: AutomationMockup, software: SoftwareMockup }
