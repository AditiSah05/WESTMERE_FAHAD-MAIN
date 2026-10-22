import { ArrowRight, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'
import { money } from '@/lib/admin/format'
import type { Dash } from '@/lib/server/dashboard'
import Card from '../ui/Card'

const title = 'mb-4 text-lg font-medium tracking-[-0.02em] text-navy-deep'
const empty = (text: string) => <p className="text-sm font-medium text-muted">{text}</p>

const ago = (iso: string) => {
  const m = Math.max(0, Math.round((Date.now() - new Date(iso).getTime()) / 60000))
  if (m < 1) return 'Just now'
  if (m < 60) return `${m} min ago`
  if (m < 1440) return `${Math.round(m / 60)} hr ago`
  return `${Math.round(m / 1440)} d ago`
}

export function TopProducts({ items }: { items: Dash['top'] }) {
  const max = items[0]?.revenue || 1
  return (
    <Card className="p-5">
      <h2 className={title}>Top products</h2>
      {!items.length ? empty('Paid orders will show up here.') : (
        <ul className="flex flex-col gap-4">
          {items.map((p) => (
            <li key={p.name}>
              <div className="mb-1.5 flex items-baseline justify-between gap-3 text-sm font-medium text-navy-deep">
                <span className="truncate">{p.name}</span>
                <span className="flex-none text-muted">{p.sold} sold · {money(p.revenue)}</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-line"><div className="h-full rounded-full bg-[linear-gradient(90deg,#2563eb,#1b2a4a,#c4943d)]" style={{ width: `${(p.revenue / max) * 100}%` }} /></div>
            </li>
          ))}
        </ul>
      )}
    </Card>
  )
}

/** Computed from open work, so an item disappears once it is actually handled. */
export function PendingTasks({ tasks }: { tasks: Dash['tasks'] }) {
  return (
    <Card className="p-5">
      <h2 className={title}>Pending tasks</h2>
      {!tasks.length ? <p className="flex items-center gap-2 text-sm font-medium text-[#047857]"><CheckCircle2 size={16} />All caught up.</p> : (
        <ul className="flex flex-col gap-2.5">
          {tasks.map((t) => (
            <li key={t.text}><Link href={t.href} className="group flex items-center justify-between gap-3 text-sm font-medium text-navy-deep hover:text-blue">{t.text}<ArrowRight size={14} className="text-muted transition group-hover:translate-x-0.5" /></Link></li>
          ))}
        </ul>
      )}
    </Card>
  )
}

export function RecentActivity({ items }: { items: Dash['activity'] }) {
  return (
    <Card className="p-5">
      <h2 className={title}>Recent activity</h2>
      {!items.length ? empty('Activity will appear as customers use the shop.') : (
        <ol className="relative flex flex-col gap-4 border-l border-dashed border-line pl-5">
          {items.map((a, i) => (
            <li key={i} className="relative">
              <span className="absolute -left-[26px] top-1.5 size-2.5 rounded-full border-2 border-white bg-gold shadow-[0_0_0_1px_#e2e8f0]" />
              <p className="text-sm font-medium text-navy-deep">{a.text}</p>
              <p className="text-xs font-medium text-muted">{ago(a.at)}</p>
            </li>
          ))}
        </ol>
      )}
    </Card>
  )
}
