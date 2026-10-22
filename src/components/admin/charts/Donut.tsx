type Props = { parts: { label: string; value: number; color: string }[]; center?: string }

export default function Donut({ parts, center }: Props) {
  const total = parts.reduce((a, p) => a + p.value, 0)
  const r = 52
  const c = 2 * Math.PI * r
  let offset = 0

  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
      <svg viewBox="0 0 140 140" className="size-[140px] flex-none -rotate-90" role="img" aria-label="Donut chart">
        <circle cx="70" cy="70" r={r} fill="none" stroke="#eef2f9" strokeWidth="16" />
        {parts.map((p) => {
          const len = (p.value / total) * c
          const el = <circle key={p.label} cx="70" cy="70" r={r} fill="none" stroke={p.color} strokeWidth="16" strokeDasharray={`${len - 2} ${c - len + 2}`} strokeDashoffset={-offset} />
          offset += len
          return el
        })}
        {center && <text x="70" y="75" textAnchor="middle" fontSize="18" fontWeight="500" fill="#0f1b33" className="rotate-90 origin-center">{center}</text>}
      </svg>
      <ul className="flex flex-col gap-2 text-sm font-medium text-navy-deep">
        {parts.map((p) => (
          <li key={p.label} className="flex items-center gap-2 whitespace-nowrap"><span className="size-2.5 rounded-full" style={{ background: p.color }} />{p.label} <span className="text-muted">{Math.round((p.value / total) * 100)}%</span></li>
        ))}
      </ul>
    </div>
  )
}
