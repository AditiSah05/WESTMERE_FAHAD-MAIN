'use client'

import {
  Check,
  ChevronRight,
  CreditCard,
  Landmark,
} from 'lucide-react'
import type { GatewayStat } from '@/lib/server/payments'

type Props = {
  gateways: GatewayStat[]
}

export default function PaymentGatewaysCard({ gateways }: Props) {
  return (
    <div className="flex h-full flex-col justify-between rounded-xl border border-line bg-white p-4 shadow-xs">
      <div className="flex items-center justify-between border-b border-line pb-3">
        <div className="flex items-center gap-2">
          <span className="flex size-7 items-center justify-center rounded-lg bg-amber-50 text-gold">
            <Landmark size={15} />
          </span>
          <h3 className="text-sm font-bold text-navy-deep">Payment Gateways</h3>
        </div>

        <button
          type="button"
          onClick={() => alert('View all payment gateway connections & webhooks')}
          className="inline-flex items-center gap-0.5 text-xs font-bold text-gold hover:underline cursor-pointer"
        >
          <span>View All</span>
          <ChevronRight size={13} />
        </button>
      </div>

      <div className="mt-3.5 space-y-3">
        {gateways.map((g) => {
          return (
            <div
              key={g.name}
              className="rounded-xl border border-line bg-[#f8fafc]/60 p-3 transition-all hover:bg-white hover:border-gold/30 hover:shadow-2xs"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  {g.name === 'Razorpay' ? (
                    <div className="flex size-8 items-center justify-center rounded-lg bg-[#0c2340] text-blue-400 font-bold text-xs shadow-2xs">
                      ▲
                    </div>
                  ) : (
                    <div className="flex size-8 items-center justify-center rounded-lg bg-[#6366f1] text-white font-bold text-xs shadow-2xs">
                      S
                    </div>
                  )}

                  <div>
                    <h4 className="text-xs font-bold text-navy-deep">{g.name}</h4>
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
                      <span className="size-1.5 rounded-full bg-emerald-500" />
                      <span>{g.status}</span>
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="block text-xs font-bold text-navy-deep">{g.processedFormatted}</span>
                  <span className="text-[10px] font-medium text-muted">Processed</span>
                </div>
              </div>

              <div className="mt-2.5 flex items-center justify-between border-t border-line/60 pt-2 text-[11px] font-medium">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-navy-deep">{g.successCount}</span>
                  <span className="text-muted">Success</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-rose-600">{g.failedCount}</span>
                  <span className="text-muted">Failed</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
