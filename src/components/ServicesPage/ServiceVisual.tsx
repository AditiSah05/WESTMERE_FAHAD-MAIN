import type { Service } from './data'

const stage = 'relative h-[150px] overflow-hidden rounded-xl bg-[linear-gradient(135deg,#0f1b33_0%,#1b2a4a_60%,#2f4166_100%)]'
const dots = 'absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.12)_1px,transparent_1px)] bg-[size:16px_16px]'
const glow = 'absolute -right-8 -top-8 size-28 rounded-full bg-gold/30 blur-2xl'

/** Lighthouse-style score ring that fills on load, next to a page skeleton that shimmers. */
function Website() {
  return (
    <div className="absolute inset-0 flex items-center justify-center gap-5 px-5">
      <div className="w-[52%] overflow-hidden rounded-lg bg-white/95 shadow-xl">
        <div className="flex gap-1 bg-mist px-2 py-1.5">{[0, 1, 2].map((i) => <span key={i} className="size-1.5 rounded-full bg-[#cbd5e1]" />)}</div>
        <div className="space-y-1.5 p-2.5">
          <div className="h-2 w-2/3 animate-pulse rounded bg-navy-deep/80" />
          <div className="h-1.5 w-full animate-pulse rounded bg-[#cbd5e1] [animation-delay:200ms]" />
          <div className="h-1.5 w-5/6 animate-pulse rounded bg-[#cbd5e1] [animation-delay:400ms]" />
          <div className="mt-2 h-5 w-1/2 rounded bg-gold" />
        </div>
      </div>
      <svg viewBox="0 0 64 64" className="size-[68px] -rotate-90">
        <circle cx="32" cy="32" r="26" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="6" />
        <circle cx="32" cy="32" r="26" fill="none" stroke="#10b981" strokeWidth="6" strokeLinecap="round" strokeDasharray="163" strokeDashoffset="163">
          <animate attributeName="stroke-dashoffset" values="163;0;0;163" keyTimes="0;0.4;0.85;1" dur="5s" repeatCount="indefinite" />
        </circle>
        <text x="32" y="38" textAnchor="middle" className="rotate-90 origin-center fill-white text-[17px] font-bold" style={{ transformBox: 'fill-box' }}>100</text>
      </svg>
    </div>
  )
}

/** Phone with notification cards sliding in one after another. */
function App() {
  return (
    <div className="absolute inset-0 flex items-end justify-center">
      <div className="relative h-[128px] w-[84px] rounded-t-[22px] border-[3px] border-b-0 border-white/70 bg-navy-deep px-2 pt-4">
        <span className="absolute left-1/2 top-1.5 h-1 w-7 -translate-x-1/2 rounded-full bg-white/40" />
        {[0, 1, 2].map((i) => (
          <div key={i} className="mb-1.5 flex animate-[svcSlide_4.5s_ease-in-out_infinite] items-center gap-1.5 rounded-md bg-white/90 p-1.5 opacity-0 motion-reduce:animate-none motion-reduce:opacity-100" style={{ animationDelay: `${i * 0.9}s` }}>
            <span className={`size-3 flex-none rounded ${['bg-blue', 'bg-gold', 'bg-[#10b981]'][i]}`} />
            <span className="h-1.5 flex-1 rounded bg-[#cbd5e1]" />
          </div>
        ))}
      </div>
    </div>
  )
}

/** Three connected systems with data packets travelling along the links. */
function Automation() {
  const nodes = [[40, 75], [150, 40], [150, 110], [260, 75]]
  const links = ['M40 75 L150 40', 'M40 75 L150 110', 'M150 40 L260 75', 'M150 110 L260 75']
  return (
    <svg viewBox="0 0 300 150" className="absolute inset-0 size-full">
      {links.map((d, i) => (
        <g key={d}>
          <path d={d} stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" strokeDasharray="4 4" fill="none" />
          <circle r="3.5" fill="#c4943d"><animateMotion dur="2.6s" begin={`${i * 0.5}s`} repeatCount="indefinite" path={d} /></circle>
        </g>
      ))}
      {nodes.map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="15" fill="#fff" opacity="0.95" />
          <circle cx={x} cy={y} r="6" fill={['#2563eb', '#c4943d', '#10b981', '#1b2a4a'][i]} />
          <circle cx={x} cy={y} r="15" fill="none" stroke="#fff" strokeOpacity="0.5"><animate attributeName="r" values="15;24;15" dur="3s" begin={`${i * 0.4}s`} repeatCount="indefinite" /><animate attributeName="stroke-opacity" values="0.5;0;0.5" dur="3s" begin={`${i * 0.4}s`} repeatCount="indefinite" /></circle>
        </g>
      ))}
    </svg>
  )
}

/** Terminal that "types" a deploy. */
function Software() {
  const lines = [['$ migrate --apply', 'text-white/80'], ['✓ schema up to date', 'text-[#10b981]'], ['$ deploy --prod', 'text-white/80'], ['✓ live in 12s', 'text-gold']]
  return (
    <div className="absolute inset-x-5 inset-y-4 overflow-hidden rounded-lg bg-black/40 p-3 font-mono text-[11px] leading-[1.7] shadow-xl backdrop-blur-sm">
      {lines.map(([text, tone], i) => (
        <p key={text} className={`${tone} animate-[svcType_6s_steps(24)_infinite] overflow-hidden whitespace-nowrap opacity-0 motion-reduce:animate-none motion-reduce:opacity-100`} style={{ animationDelay: `${i * 1.1}s` }}>{text}</p>
      ))}
      <span className="mt-1 inline-block h-3 w-1.5 animate-pulse bg-white/80" />
    </div>
  )
}

const visuals: Record<Service['id'], () => React.JSX.Element> = { website: Website, app: App, automation: Automation, software: Software }

export default function ServiceVisual({ id }: { id: Service['id'] }) {
  const Visual = visuals[id]
  return (
    <div className={stage} aria-hidden>
      <div className={dots} />
      <span className={glow} />
      <Visual />
    </div>
  )
}
