'use client'

import { Download } from 'lucide-react'
import { downloadCsv } from '@/lib/admin/csv'
import { money } from '@/lib/admin/format'
import { categoryPerformance, funnel, productPerformance, retention, retentionLabels, weekly, weeks } from '@/lib/admin/data/analytics'
import { sources } from '@/lib/admin/data/dashboard'
import { c } from '@/lib/admin/data/helpers'
import BarChart from '../charts/BarChart'
import Donut from '../charts/Donut'
import LineChart from '../charts/LineChart'
import Card from '../ui/Card'
import PageHeader, { btn } from '../ui/PageHeader'
import StatCard from '../ui/StatCard'
import { Eye, Percent, Repeat, ShoppingBag } from 'lucide-react'

const h = 'mb-4 text-lg font-medium tracking-[-0.02em] text-navy-deep'

export default function Analytics() {
  const top = funnel[0].value
  const exportReport = () =>
    downloadCsv('product-performance', [c('name', 'Product'), c('views', 'Views'), c('sales', 'Sales'), c('conv', 'Conversion')], productPerformance.map((p, i) => ({ id: String(i), ...p })))

  return (
    <>
      <PageHeader title="Analytics & Reports" subtitle="Sales, conversion, traffic and retention." actions={<button type="button" className={btn.ghost} onClick={exportReport}><Download size={15} />Export report</button>} />
      <div className="grid grid-cols-1 gap-5 min-[601px]:grid-cols-2 min-[1181px]:grid-cols-4">
        <StatCard label="Visitors" value="48.2k" delta={9.3} icon={Eye} accent="blue" />
        <StatCard label="Conversion rate" value="2.66%" delta={0.4} icon={Percent} accent="gold" />
        <StatCard label="Orders" value="1,284" delta={8.1} icon={ShoppingBag} accent="navy" />
        <StatCard label="Repeat customers" value="34%" delta={2.2} icon={Repeat} accent="green" />
      </div>
      <div className="mt-5 grid grid-cols-1 gap-5 min-[1181px]:grid-cols-2">
        <Card className="p-5">
          <h2 className={h}>Conversion funnel</h2>
          <ul className="flex flex-col gap-3">
            {funnel.map((s) => (
              <li key={s.label}>
                <div className="mb-1 flex justify-between text-sm font-medium text-navy-deep"><span>{s.label}</span><span className="text-muted">{s.value.toLocaleString()} · {((s.value / top) * 100).toFixed(1)}%</span></div>
                <div className="h-2.5 overflow-hidden rounded-full bg-line"><div className="h-full rounded-full bg-[linear-gradient(90deg,#2563eb,#1b2a4a,#c4943d)]" style={{ width: `${(s.value / top) * 100}%` }} /></div>
              </li>
            ))}
          </ul>
        </Card>
        <Card className="p-5"><h2 className={h}>Traffic sources</h2><Donut parts={sources} center="48.2k" /></Card>
        <Card className="p-5"><h2 className={h}>Category performance</h2><BarChart labels={categoryPerformance.map((x) => x.name.split(' ')[0])} series={[{ name: 'Revenue', color: '#c4943d', values: categoryPerformance.map((x) => x.revenue) }]} height={220} /></Card>
        <Card className="p-5"><h2 className={h}>Weekly conversion rate (%)</h2><LineChart labels={weeks} values={weekly} color="#c4943d" height={220} /></Card>
        <Card className="p-5"><h2 className={h}>Customer retention (% still buying)</h2><LineChart labels={retentionLabels} values={retention} height={200} /></Card>
        <Card className="p-5">
          <h2 className={h}>Product performance</h2>
          <table className="w-full text-sm"><thead><tr className="text-left text-[11px] uppercase tracking-[0.12em] text-slate"><th className="pb-2">Product</th><th className="pb-2 text-right">Views</th><th className="pb-2 text-right">Sales</th><th className="pb-2 text-right">Conv.</th></tr></thead>
            <tbody>{productPerformance.map((p) => (<tr key={p.name} className="border-t border-line/60 font-medium text-navy-deep"><td className="py-2.5">{p.name}</td><td className="py-2.5 text-right">{p.views.toLocaleString()}</td><td className="py-2.5 text-right">{p.sales}</td><td className="py-2.5 text-right">{p.conv}</td></tr>))}</tbody>
          </table>
          <p className="mt-3 text-xs font-medium text-muted">Top category revenue: {money(categoryPerformance[1].revenue)}</p>
        </Card>
      </div>
    </>
  )
}
