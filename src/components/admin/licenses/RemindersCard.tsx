'use client'

import { Check, Mail } from 'lucide-react'
import { useTransition } from 'react'
import { markReminderSent } from '@/app/admin/license-actions'
import type { Reminder } from '@/lib/server/licenses'
import Card from '../ui/Card'

const mail = (r: Reminder) => {
  const l = r.license
  const subject = `Your ${l.product} license expires on ${l.expires}`
  const body = `Hi ${l.customer},\n\nYour ${l.product} license (${l.key}) expires on ${l.expires}. Reply to this email and we will renew it for you.\n\nThanks,\nWestmere`
  return `mailto:${l.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

/** Who needs a renewal message now. The team contacts them and ticks "Sent"; nothing is sent automatically. */
export default function RemindersCard({ rows, write }: { rows: Reminder[]; write: boolean }) {
  const [pending, start] = useTransition()
  return (
    <Card className="mt-4 p-5">
      <h2 className="text-lg font-semibold tracking-[-0.02em] text-navy-deep">Renewal Reminders Due</h2>
      <p className="mb-3 text-[13px] font-medium text-muted">Licenses expiring within 30 days. Email the customer, then mark the reminder as sent so it is not repeated.</p>
      {!rows.length ? <p className="text-sm font-medium text-muted">No licenses are close to expiring.</p> : (
        <ul className="flex flex-col divide-y divide-line/60">
          {rows.slice(0, 12).map((r) => (
            <li key={r.license.id} className="flex flex-wrap items-center justify-between gap-3 py-2.5 text-sm font-medium text-navy-deep">
              <span className="min-w-0"><span className="block truncate font-semibold">{r.license.customer} · {r.license.product}</span><span className="block text-xs text-muted">{r.license.email} · expires {r.license.expires} ({r.license.daysLeft} day{r.license.daysLeft === 1 ? '' : 's'} left)</span></span>
              <span className="flex items-center gap-2">
                <span className="rounded-full bg-gold/15 px-2.5 py-1 text-xs font-semibold text-[#8a6420]">{r.stage} reminder</span>
                <a href={mail(r)} className="inline-flex items-center gap-1.5 rounded-lg border border-line px-3 py-1.5 text-xs font-semibold hover:border-gold"><Mail size={13} />Email</a>
                {r.sent ? <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#047857]"><Check size={14} />Sent</span>
                  : write && <button type="button" disabled={pending} onClick={() => start(async () => { await markReminderSent(r.license.id, r.stage) })} className="rounded-lg bg-navy-deep px-3 py-1.5 text-xs font-semibold text-white hover:bg-gold disabled:opacity-60">Mark as sent</button>}
              </span>
            </li>
          ))}
        </ul>
      )}
    </Card>
  )
}
