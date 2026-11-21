import { AlertTriangle } from 'lucide-react'
import Link from 'next/link'
import { customerLicenses } from '@/lib/server/licenses'

/** On My Licenses: tells the customer which licenses are close to expiring or have expired. */
export default async function LicenseNotice({ userId }: { userId: string }) {
  const rows = await customerLicenses(userId)
  const soon = rows.filter((l) => (l.state === 'Active' || l.state === 'Pending') && l.daysLeft !== null && l.daysLeft >= 0 && l.daysLeft <= 30)
  const gone = rows.filter((l) => l.state === 'Expired')
  if (!soon.length && !gone.length) return null
  return (
    <div role="status" className="mb-5 flex gap-3 rounded-xl border border-gold/30 bg-gold/10 p-4 text-sm font-medium text-navy-deep">
      <AlertTriangle size={18} className="mt-0.5 flex-none text-gold" />
      <div className="flex flex-col gap-1">
        {soon.map((l) => <p key={l.id}><b>{l.product}</b> expires on {l.expires} ({l.daysLeft} day{l.daysLeft === 1 ? '' : 's'} left).</p>)}
        {gone.map((l) => <p key={l.id}><b>{l.product}</b> expired on {l.expires}.</p>)}
        <p className="text-muted">To renew, <Link href="/account/support" className="font-semibold text-navy-deep underline underline-offset-2">contact support</Link> and quote your license key.</p>
      </div>
    </div>
  )
}
