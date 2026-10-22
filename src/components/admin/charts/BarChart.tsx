type Props = { labels: string[]; series: { name: string; color: string; values: number[] }[]; height?: number }

const fmt = (n: number) => (n >= 100000 ? `${(n / 100000).toFixed(1)}L` : n >= 1000 ? `${Math.round(n / 1000)}k` : String(n))

/** Grouped bars drawn in SVG (no chart library). */
export default function BarChart({ labels, series, height = 240 }: Props) {
  const max = Math.max(4, ...series.flatMap((s) => s.values)) * 1.1
  const w = 720
  const pad = { l: 44, r: 8, t: 10, b: 28 }
  const inner = { w: w - pad.l - pad.r, h: height - pad.t - pad.b }
  const group = inner.w / labels.length
  const bar = Math.min(22, (group - 8) / series.length)

  return (
    <svg viewBox={`0 0 ${w} ${height}`} className="h-auto w-full" role="img" aria-label="Bar chart">
      {[0, 0.25, 0.5, 0.75, 1].map((t) => {
        const y = pad.t + inner.h * (1 - t)
        return (
          <g key={t}>
            <line x1={pad.l} x2={w - pad.r} y1={y} y2={y} stroke="#e2e8f0" strokeDasharray="3 4" />
            <text x={pad.l - 8} y={y + 4} textAnchor="end" fontSize="10.5" fill="#718096">{fmt(Math.round(max * t))}</text>
          </g>
        )
      })}
      {labels.map((l, i) => (
        <g key={l}>
          {series.map((s, j) => {
            const h = (s.values[i] / max) * inner.h
            const x = pad.l + group * i + (group - bar * series.length) / 2 + bar * j
            return <rect key={s.name} x={x} y={pad.t + inner.h - h} width={bar - 2} height={h} rx="3" fill={s.color} />
          })}
          <text x={pad.l + group * i + group / 2} y={height - 8} textAnchor="middle" fontSize="10.5" fill="#718096">{l}</text>
        </g>
      ))}
    </svg>
  )
}
