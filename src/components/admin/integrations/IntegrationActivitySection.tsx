'use client'

import {
  Activity,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ShieldCheck,
  Terminal,
  FileCode2,
  Clock,
} from 'lucide-react'
import type { WebhookLogItem } from '@/lib/server/integrations-crm'

export default function IntegrationActivitySection({
  logs,
}: {
  logs: WebhookLogItem[]
}) {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      {/* 1. Recent Webhook Deliveries */}
      <div className="rounded-xl border border-slate-200/90 bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity size={15} className="text-amber-600" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
              Recent Webhook Deliveries
            </h3>
          </div>
          <span className="text-[11px] font-semibold text-emerald-600">Live</span>
        </div>

        <div className="mt-3 divide-y divide-slate-100">
          {logs.map((log) => {
            const is200 = log.httpStatus >= 200 && log.httpStatus < 300
            return (
              <div key={log.id} className="py-2.5 flex items-center justify-between text-xs">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`inline-block h-1.5 w-1.5 rounded-full ${
                        is200 ? 'bg-emerald-500' : 'bg-rose-500'
                      }`}
                    />
                    <span className="font-mono text-[11px] font-bold text-slate-800">
                      {log.event}
                    </span>
                    <span
                      className={`rounded px-1 text-[10px] font-bold ${
                        is200
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-rose-100 text-rose-700'
                      }`}
                    >
                      {log.httpStatus}
                    </span>
                  </div>
                  <div className="mt-0.5 truncate text-[10px] text-slate-400 font-mono">
                    {log.endpoint}
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-mono text-[11px] font-semibold text-slate-600">
                    {log.latencyMs}ms
                  </div>
                  <div className="text-[10px] text-slate-400">{log.timestamp}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* 2. System Sync & Health Status */}
      <div className="rounded-xl border border-slate-200/90 bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck size={15} className="text-emerald-600" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
              System Sync & Health
            </h3>
          </div>
          <span className="rounded bg-emerald-100 px-1.5 py-0.5 text-[10px] font-bold text-emerald-700">
            99.98% Uptime
          </span>
        </div>

        <div className="mt-3 space-y-3">
          <div className="rounded-lg border border-slate-100 bg-slate-50/60 p-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-700">Payment Gateway Dispatcher</span>
              <span className="text-[11px] font-bold text-emerald-600">Operational</span>
            </div>
            <div className="mt-1 text-[10px] text-slate-500">
              Stripe & Razorpay signature verification active. Zero failed webhooks in 24h.
            </div>
          </div>

          <div className="rounded-lg border border-slate-100 bg-slate-50/60 p-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-700">Transactional Email Router</span>
              <span className="text-[11px] font-bold text-emerald-600">Operational</span>
            </div>
            <div className="mt-1 text-[10px] text-slate-500">
              Resend SMTP / API verified. DKIM, SPF & DMARC passing with 100% score.
            </div>
          </div>

          <div className="rounded-lg border border-slate-100 bg-slate-50/60 p-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-700">Digital License Activator</span>
              <span className="text-[11px] font-bold text-emerald-600">Operational</span>
            </div>
            <div className="mt-1 text-[10px] text-slate-500">
              Hardware key fingerprinting and cloud token renewal operating normally.
            </div>
          </div>
        </div>
      </div>

      {/* 3. Developer Resources & Documentation */}
      <div className="rounded-xl border border-slate-200/90 bg-white p-4 shadow-sm flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Terminal size={15} className="text-slate-700" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
              Developer Resources
            </h3>
          </div>

          <div className="mt-3 space-y-2">
            <a
              href="https://docs.westmere.io/sdk/nextjs"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50 p-2 text-xs font-semibold text-slate-700 transition hover:border-amber-300 hover:bg-amber-50/30"
            >
              <div className="flex items-center gap-2">
                <FileCode2 size={13} className="text-amber-600" />
                <span>Next.js Westmere SDK</span>
              </div>
              <ExternalLink size={12} className="text-slate-400" />
            </a>

            <a
              href="https://docs.westmere.io/webhooks/security"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50 p-2 text-xs font-semibold text-slate-700 transition hover:border-amber-300 hover:bg-amber-50/30"
            >
              <div className="flex items-center gap-2">
                <ShieldCheck size={13} className="text-emerald-600" />
                <span>HMAC Signature Verification</span>
              </div>
              <ExternalLink size={12} className="text-slate-400" />
            </a>

            <a
              href="https://docs.westmere.io/api/postman"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50 p-2 text-xs font-semibold text-slate-700 transition hover:border-amber-300 hover:bg-amber-50/30"
            >
              <div className="flex items-center gap-2">
                <Terminal size={13} className="text-blue-600" />
                <span>Postman API Collection</span>
              </div>
              <ExternalLink size={12} className="text-slate-400" />
            </a>
          </div>
        </div>

        <div className="mt-3 border-t border-slate-100 pt-3 flex items-center justify-between text-[11px] text-slate-500">
          <span>API Version: v2.4 (Latest)</span>
          <span className="font-semibold text-amber-600">Production Ready</span>
        </div>
      </div>
    </div>
  )
}
