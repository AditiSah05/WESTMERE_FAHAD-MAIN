'use client'

import {
  Calendar,
  CheckCircle2,
  FileText,
  Mail,
  MessageCircle,
  MoreVertical,
  Phone,
  Trophy,
  UserPlus,
  Zap,
} from 'lucide-react'
import type { CrmActivity, TodayFollowUp } from '@/lib/server/crm'

type Props = {
  followUps: TodayFollowUp[]
  activities: CrmActivity[]
  onActionClick?: (type: string, item: TodayFollowUp) => void
}

export default function FollowUpsAndActivity({ followUps, activities, onActionClick }: Props) {
  return (
    <div className="space-y-4">
      {/* 1. Today's Follow-ups */}
      <div className="rounded-xl border border-line bg-white p-4 shadow-xs">
        <div className="flex items-center justify-between border-b border-line pb-3">
          <div className="flex items-center gap-2">
            <span className="flex size-7 items-center justify-center rounded-lg bg-amber-50 text-gold">
              <Calendar size={16} />
            </span>
            <h3 className="text-sm font-bold text-navy-deep">Today&apos;s Follow-ups ({followUps.length})</h3>
          </div>

          <button
            type="button"
            onClick={() => alert('View all follow-ups')}
            className="text-xs font-bold text-gold hover:underline cursor-pointer"
          >
            View All →
          </button>
        </div>

        <div className="mt-3 space-y-3">
          {followUps.map((item) => {
            return (
              <div
                key={item.id}
                className="flex items-center justify-between gap-2.5 rounded-lg border border-line/60 bg-[#f8fafc]/50 p-2.5 transition-colors hover:bg-white hover:border-gold/30 hover:shadow-2xs"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span
                    className={`flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${item.avatarColor}`}
                  >
                    {item.initials}
                  </span>

                  <div className="min-w-0">
                    <h4 className="truncate text-xs font-bold text-navy-deep">{item.name}</h4>
                    <p className="truncate text-[10.5px] font-medium text-muted">{item.company}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[11px] font-semibold text-muted">{item.time}</span>

                  {item.actionType === 'call' && (
                    <button
                      type="button"
                      onClick={() => onActionClick?.('call', item)}
                      className="inline-flex items-center gap-1 rounded-md border border-amber-200 bg-amber-50 px-2 py-1 text-[11px] font-bold text-amber-700 hover:bg-amber-100/70"
                    >
                      <Phone size={11} />
                      <span>Call</span>
                    </button>
                  )}

                  {item.actionType === 'whatsapp' && (
                    <button
                      type="button"
                      onClick={() => onActionClick?.('whatsapp', item)}
                      className="inline-flex items-center gap-1 rounded-md border border-emerald-200 bg-emerald-50 px-2 py-1 text-[11px] font-bold text-emerald-700 hover:bg-emerald-100/70"
                    >
                      <MessageCircle size={11} />
                      <span>WhatsApp</span>
                    </button>
                  )}

                  {item.actionType === 'email' && (
                    <button
                      type="button"
                      onClick={() => onActionClick?.('email', item)}
                      className="inline-flex items-center gap-1 rounded-md border border-blue-200 bg-blue-50 px-2 py-1 text-[11px] font-bold text-blue-700 hover:bg-blue-100/70"
                    >
                      <Mail size={11} />
                      <span>Email</span>
                    </button>
                  )}

                  <button
                    type="button"
                    className="flex size-6 items-center justify-center rounded text-muted hover:text-navy-deep"
                  >
                    <MoreVertical size={13} />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* 2. Recent Activity */}
      <div className="rounded-xl border border-line bg-white p-4 shadow-xs">
        <div className="flex items-center justify-between border-b border-line pb-3">
          <div className="flex items-center gap-2">
            <span className="flex size-7 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <Zap size={16} />
            </span>
            <h3 className="text-sm font-bold text-navy-deep">Recent Activity</h3>
          </div>

          <button
            type="button"
            onClick={() => alert('View all CRM activity')}
            className="text-xs font-bold text-gold hover:underline cursor-pointer"
          >
            View All →
          </button>
        </div>

        <div className="mt-3 space-y-3">
          {activities.map((act) => {
            const Icon =
              act.icon === 'zap'
                ? Zap
                : act.icon === 'userPlus'
                ? UserPlus
                : act.icon === 'checkCircle'
                ? CheckCircle2
                : act.icon === 'fileText'
                ? FileText
                : Trophy

            const iconCls =
              act.color === 'amber'
                ? 'bg-amber-50 text-amber-600'
                : act.color === 'blue'
                ? 'bg-blue-50 text-blue-600'
                : act.color === 'green'
                ? 'bg-emerald-50 text-emerald-600'
                : 'bg-purple-50 text-purple-600'

            return (
              <div key={act.id} className="flex items-start justify-between gap-2.5 text-xs">
                <div className="flex items-start gap-2.5 min-w-0">
                  <span className={`mt-0.5 flex size-6.5 shrink-0 items-center justify-center rounded-full ${iconCls}`}>
                    <Icon size={13} />
                  </span>
                  <div className="min-w-0">
                    <h5 className="font-bold text-navy-deep leading-tight truncate">{act.title}</h5>
                    <p className="mt-0.5 text-[11px] font-medium text-muted leading-snug">{act.description}</p>
                  </div>
                </div>
                <span className="shrink-0 text-[10.5px] font-medium text-muted whitespace-nowrap">{act.time}</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
