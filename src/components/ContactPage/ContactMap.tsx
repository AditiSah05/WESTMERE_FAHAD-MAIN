import { ExternalLink } from 'lucide-react'

const mapsLink =
  'https://www.google.com/maps/search/?api=1&query=Gera+Imperium+Gateway+Kasarwadi+Bhosari+Pune+Maharashtra+411034'
const road = 'absolute bg-white border-[#cbd5e0]'

/** Decorative vector map (no tiles) with a link out to Google Maps. */
export default function ContactMap() {
  return (
    <div className="relative h-[250px] overflow-hidden rounded-3xl border border-line bg-[#e8ecef] shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
      <div aria-hidden className="pointer-events-none absolute inset-0 z-[3] bg-[radial-gradient(circle_at_center,transparent_30%,rgba(27,42,74,0.05)_100%)]" />
      <div aria-hidden className="absolute inset-0 z-[1] overflow-hidden bg-[#edf2f7]">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(203,213,224,0.4)_1px,transparent_1px),linear-gradient(90deg,rgba(203,213,224,0.4)_1px,transparent_1px)] bg-[size:20px_20px]" />
        <div className={`${road} left-[-10%] top-[60%] h-[34px] w-[120%] -rotate-[10deg] border-y`} />
        <div className={`${road} left-[60%] top-[-10%] h-[120%] w-6 rotate-[35deg] border-x`} />
        <div className="absolute left-[-10%] top-[30%] h-1.5 w-[120%] rotate-[5deg] bg-[#48bb78]">
          <span className="absolute -top-6 left-[20%] -rotate-[5deg] rounded bg-[#38a169] px-1.5 py-[3px] text-[8.5px] font-bold text-white shadow-[0_2px_4px_rgba(0,0,0,0.1)]">
            Bhosari Metro Station
          </span>
        </div>
        <div className="absolute left-[55%] top-[55%] z-[5] -translate-x-1/2 -translate-y-1/2">
          <span className="pointer-events-none absolute -left-2.5 -top-2.5 size-[34px] animate-[mapPulse_2s_ease-out_infinite] rounded-full border-2 border-blue-accent/45" />
          <span className="block size-3.5 rounded-full border-2 border-white bg-blue-accent shadow-[0_2px_5px_rgba(0,0,0,0.3)]" />
        </div>
        <span className="absolute left-[45%] top-[35%] z-[4] whitespace-nowrap rounded-lg border border-white/10 bg-navy-deep px-2.5 py-1.5 text-[10px] font-bold text-white shadow-[0_4px_10px_rgba(15,27,51,0.15)]">
          Gera&apos;s Imperium Gateway
        </span>
      </div>
      <a
        href={mapsLink}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-4 left-4 z-10 flex items-center gap-2 rounded-[10px] border border-line bg-white/90 px-4 py-2.5 text-xs font-semibold text-navy shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition hover:-translate-y-px hover:bg-white hover:text-blue-accent hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)]"
      >
        Open in Maps
        <ExternalLink size={14} strokeWidth={2.5} />
      </a>
    </div>
  )
}
