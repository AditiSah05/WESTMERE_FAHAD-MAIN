type Props = { labels: string[]; values: number[]; color?: string; height?: number }

/** Smooth area line chart in SVG. */
export default function LineChart({ labels, values, color = '#2563eb', height = 200 }: Props) {
  const w = 720
  const pad = { l: 8, r: 8, t: 14, b: 26 }
  const max = Math.max(4, ...values) * 1.1
  const min = Math.min(...values) * 0.9
  const x = (i: number) => pad.l + ((w - pad.l - pad.r) * i) / (values.length - 1)
  const y = (v: number) => pad.t + (height - pad.t - pad.b) * (1 - (v - min) / (max - min))
  const pts = values.map((v, i) => [x(i), y(v)] as const)
  const line = pts.map(([px, py], i) => `${i ? 'L' : 'M'}${px.toFixed(1)} ${py.toFixed(1)}`).join(' ')
  const area = `${line} L${x(values.length - 1)} ${height - pad.b} L${x(0)} ${height - pad.b} Z`
  const id = `grad-${color.replace('#', '')}`

  return (
    <svg viewBox={`0 0 ${w} ${height}`} className="h-auto w-full" role="img" aria-label="Line chart">
      <defs>
        <linearGradient id={id} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.22" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#${id})`} />
      <path d={line} fill="none" stroke={color} strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round" />
      {pts.map(([px, py], i) => <circle key={labels[i]} cx={px} cy={py} r="3.2" fill="#fff" stroke={color} strokeWidth="2" />)}
      {labels.map((l, i) => (i % Math.ceil(labels.length / 8) === 0 ? <text key={l} x={x(i)} y={height - 6} textAnchor="middle" fontSize="10.5" fill="#718096">{l}</text> : null))}
    </svg>
  )
}
