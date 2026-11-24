'use client'

import {
  Calendar,
  Check,
  ChevronRight,
  Layers,
  MoreVertical,
} from 'lucide-react'
import type { DealStage } from '@/lib/server/crm'

type Props = {
  stages: DealStage[]
  onDealClick?: (dealId: string) => void
}

export default function SalesPipelineKanban({ stages, onDealClick }: Props) {
  return (
    <div className="rounded-xl border border-line bg-white p-4 shadow-xs">
      {/* Header with Title, Stats & View Full Pipeline Link */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-3">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="flex size-7 items-center justify-center rounded-lg bg-amber-50 text-gold">
              <Layers size={16} />
            </span>
            <h3 className="text-sm font-bold text-navy-deep">Sales Pipeline (Deals)</h3>
          </div>

          <div className="hidden items-center gap-2 text-xs font-medium text-muted md:flex">
            <span>Total Deals: <strong className="font-semibold text-navy-deep">48</strong></span>
            <span>|</span>
            <span>Pipeline Value: <strong className="font-semibold text-navy-deep">₹18.6L</strong></span>
            <span>|</span>
            <span>Weighted Value: <strong className="font-semibold text-navy-deep">₹9.2L</strong></span>
            <span>|</span>
            <span>Won: <strong className="font-semibold text-emerald-700">26 (₹4.8L)</strong></span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => alert('Opening full interactive sales pipeline...')}
          className="inline-flex items-center gap-1 text-xs font-bold text-gold hover:underline cursor-pointer"
        >
          <span>View Full Pipeline</span>
          <ChevronRight size={14} />
        </button>
      </div>

      {/* 6 Stage Kanban Grid */}
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6">
        {stages.map((stage) => {
          return (
            <div
              key={stage.key}
              className="flex flex-col rounded-xl border border-line bg-[#f8fafc]/70 p-2.5 min-w-0"
            >
              {/* Stage Column Header */}
              <div className="flex items-center justify-between border-b border-line/60 pb-2 text-xs">
                <span className="font-bold text-navy-deep truncate">
                  {stage.title} ({stage.count})
                </span>
                <span className="font-bold text-muted text-[11px] shrink-0">
                  {stage.totalAmountFormatted}
                </span>
              </div>

              {/* Deal Cards in this Stage */}
              <div className="mt-2.5 space-y-2.5">
                {stage.deals.map((deal) => {
                  return (
                    <div
                      key={deal.id}
                      onClick={() => onDealClick?.(deal.id)}
                      className="cursor-pointer rounded-lg border border-line bg-white p-2.5 shadow-2xs transition-all hover:border-gold/50 hover:shadow-sm"
                    >
                      <div className="flex items-start justify-between gap-1.5">
                        <div className="min-w-0 flex-1">
                          <h4 className="truncate text-xs font-bold text-navy-deep">
                            {deal.name}
                          </h4>
                          <p className="truncate text-[10.5px] font-medium text-muted">
                            {deal.company}
                          </p>
                        </div>
                        <button
                          type="button"
                          className="flex size-5 shrink-0 items-center justify-center rounded text-muted hover:text-navy-deep"
                        >
                          <MoreVertical size={13} />
                        </button>
                      </div>

                      {/* Service tag */}
                      <div className="mt-2">
                        <span className="inline-block truncate rounded bg-mist px-1.5 py-0.5 text-[10px] font-medium text-navy-deep/80 max-w-full">
                          {deal.service}
                        </span>
                      </div>

                      {/* Deal Value */}
                      <p className="mt-2 text-xs font-bold text-navy-deep">
                        {deal.valueFormatted}
                      </p>

                      {/* Footer: Close date + Assignee + Priority badge */}
                      <div className="mt-2.5 flex items-center justify-between border-t border-line/50 pt-2 text-[10.5px] text-muted">
                        <span className="inline-flex items-center gap-1 truncate text-muted">
                          <Calendar size={11} className="shrink-0" />
                          <span className="truncate">{deal.isWon ? 'Won: ' : 'Close: '}{deal.closeDate.replace(', 2026', '')}</span>
                        </span>

                        <div className="flex items-center gap-1.5 shrink-0">
                          <span
                            className={`flex size-4.5 items-center justify-center rounded-full text-[9px] font-bold text-white ${deal.assigneeColor}`}
                          >
                            {deal.isWon ? <Check size={10} strokeWidth={3} /> : deal.assignee}
                          </span>

                          <span
                            className={`rounded px-1.5 py-0.2 text-[9.5px] font-bold ${
                              deal.priority === 'High'
                                ? 'bg-rose-50 text-rose-700'
                                : deal.priority === 'Medium'
                                ? 'bg-amber-50 text-amber-700'
                                : 'bg-emerald-50 text-emerald-700'
                            }`}
                          >
                            {deal.priority}
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
