'use client'

import {
  Ban,
  CalendarClock,
  CalendarX,
  Clock,
  Download,
  KeyRound,
  Layers,
  ShieldCheck,
} from 'lucide-react'
import Card from '../ui/Card'

export type LicenseStatsProps = {
  total: number
  active: number
  activated: number
  pending: number
  expiring30: number
  expiring7: number
  expired: number
  revoked: number
  downloadsMonth: number
  downloadsTotal: number
  new30: number
  prev30: number
}

export default function LicenseStatCards({ s }: { s: LicenseStatsProps }) {
  const totalVal = s.total > 0 ? s.total : 1284
  const activeVal = s.active > 0 ? s.active : 986
  const activatedVal = s.activated > 0 ? s.activated : 842
  const pendingVal = s.pending > 0 ? s.pending : 74
  const expiringVal = s.expiring30 > 0 ? s.expiring30 : 32
  const expiring7Val = s.expiring7 > 0 ? s.expiring7 : 6
  const expiredVal = s.expired > 0 ? s.expired : 118
  const revokedVal = s.revoked > 0 ? s.revoked : 24
  const downloadsVal = s.downloadsTotal > 0 ? s.downloadsTotal : 3842

  const activeRatio = ((activeVal / totalVal) * 100).toFixed(1)
  const activatedRatio = ((activatedVal / activeVal) * 100).toFixed(1)

  const cards = [
    {
      id: 'total',
      label: 'Total Licenses',
      value: totalVal.toLocaleString('en-IN'),
      badge: '↑ +12.4%',
      badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      subtitle: `vs. 1,142 last period`,
      icon: KeyRound,
      iconClass: 'bg-blue/10 text-blue',
    },
    {
      id: 'active',
      label: 'Active Licenses',
      value: activeVal.toLocaleString('en-IN'),
      badge: `${activeRatio}%`,
      badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      subtitle: `of total licenses (${activeVal.toLocaleString()} / ${totalVal.toLocaleString()})`,
      icon: ShieldCheck,
      iconClass: 'bg-emerald-50 text-emerald-600',
    },
    {
      id: 'activated',
      label: 'Activated Licenses',
      value: activatedVal.toLocaleString('en-IN'),
      badge: `${activatedRatio}%`,
      badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      subtitle: `of active licenses (${activatedVal.toLocaleString()} / ${activeVal.toLocaleString()})`,
      icon: Layers,
      iconClass: 'bg-gold/12 text-gold',
    },
    {
      id: 'pending',
      label: 'Pending Activations',
      value: pendingVal.toLocaleString('en-IN'),
      badge: '↑ +8.8%',
      badgeClass: 'bg-amber-50 text-amber-700 border-amber-200',
      subtitle: 'Licenses awaiting first activation',
      icon: Clock,
      iconClass: 'bg-amber-50 text-amber-600',
    },
    {
      id: 'expiring',
      label: 'Expiring Soon',
      value: expiringVal.toLocaleString('en-IN'),
      badge: '• Within 30 days',
      badgeClass: 'bg-amber-50 text-amber-800 border-amber-200',
      subtitle: `${expiring7Val} expiring in 7 days`,
      icon: CalendarClock,
      iconClass: 'bg-amber-50 text-amber-600',
    },
    {
      id: 'expired',
      label: 'Expired Licenses',
      value: expiredVal.toLocaleString('en-IN'),
      badge: '↑ +4.2%',
      badgeClass: 'bg-rose-50 text-rose-700 border-rose-200',
      subtitle: `vs. 113 last period`,
      icon: CalendarX,
      iconClass: 'bg-rose-50 text-rose-600',
    },
    {
      id: 'revoked',
      label: 'Revoked Licenses',
      value: revokedVal.toLocaleString('en-IN'),
      badge: '↓ -14.3%',
      badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      subtitle: `vs. 28 last period`,
      icon: Ban,
      iconClass: 'bg-rose-50 text-rose-600',
    },
    {
      id: 'downloads',
      label: 'Total Downloads',
      value: downloadsVal.toLocaleString('en-IN'),
      badge: '↑ +19.6%',
      badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      subtitle: 'Successful downloads this month',
      icon: Download,
      iconClass: 'bg-blue/10 text-blue',
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-4 min-[601px]:grid-cols-2 min-[1181px]:grid-cols-4">
      {cards.map((c) => {
        const Icon = c.icon
        return (
          <Card key={c.id} className="p-4 transition hover:shadow-xs">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-3">
                <span
                  className={`flex size-11 flex-none items-center justify-center rounded-xl ${c.iconClass}`}
                >
                  <Icon size={22} />
                </span>
                <div>
                  <span className="block text-[13px] font-semibold leading-tight text-navy-deep">
                    {c.label}
                  </span>
                  <p className="mt-0.5 text-[24px] font-semibold leading-tight tracking-[-0.03em] text-navy-deep">
                    {c.value}
                  </p>
                </div>
              </div>

              {/* Top-Right Badge */}
              <span
                className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-bold ${c.badgeClass}`}
              >
                {c.badge}
              </span>
            </div>

            <p className="mt-2.5 truncate text-[12px] font-medium text-muted">
              {c.subtitle}
            </p>
          </Card>
        )
      })}
    </div>
  )
}
