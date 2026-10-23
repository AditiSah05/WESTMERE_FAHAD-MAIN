import { ExternalLink } from 'lucide-react'

const place = 'Gera Imperium Gateway, Kasarwadi, Bhosari, Pune, Maharashtra 411034'
const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place)}`
const embed = `https://www.google.com/maps?q=${encodeURIComponent(place)}&output=embed`

export default function ContactMap() {
  return (
    <div className="relative h-[200px] overflow-hidden rounded-xl border border-line bg-mist min-[769px]:h-[220px]">
      <iframe src={embed} title="Westmere office on Google Maps" loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="size-full border-0" />
      <a
        href={mapsLink}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute left-3 top-3 flex items-center gap-2 rounded-md bg-white px-3 py-1.5 text-[11px] font-semibold text-blue shadow-[0_2px_8px_rgba(0,0,0,0.15)] transition hover:bg-mist"
      >
        Open in Maps
        <ExternalLink size={14} strokeWidth={2.5} />
      </a>
    </div>
  )
}
