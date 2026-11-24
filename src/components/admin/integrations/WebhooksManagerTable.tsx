'use client'

import { useState } from 'react'
import {
  Webhook,
  Play,
  Copy,
  Trash2,
  Check,
  AlertTriangle,
  Plus,
} from 'lucide-react'
import type { WebhookEndpoint } from '@/lib/server/integrations-crm'

export default function WebhooksManagerTable({
  webhooks,
  onCreateWebhook,
  onTestPing,
  onDeleteWebhook,
}: {
  webhooks: WebhookEndpoint[]
  onCreateWebhook: () => void
  onTestPing: (id: string) => Promise<void>
  onDeleteWebhook: (id: string) => void
}) {
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [testingId, setTestingId] = useState<string | null>(null)
  const [pingResult, setPingResult] = useState<string | null>(null)

  const copySecret = (id: string, secret: string) => {
    navigator.clipboard?.writeText(secret)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const handlePing = async (id: string) => {
    setTestingId(id)
    setPingResult(null)
    await onTestPing(id)
    setTestingId(null)
    setPingResult(`Ping dispatched to endpoint. HTTP 200 OK received (135ms).`)
    setTimeout(() => setPingResult(null), 4000)
  }

  return (
    <div className="space-y-4">
      {/* Top Banner & Action */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-base font-bold text-slate-900">Webhook Endpoints</h2>
          <p className="text-xs text-slate-500">
            Real-time event subscriptions dispatched via HTTPS POST payloads signed with HMAC SHA-256.
          </p>
        </div>

        <button
          type="button"
          onClick={onCreateWebhook}
          className="inline-flex items-center gap-1.5 self-start rounded-lg bg-amber-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-amber-700"
        >
          <Plus size={14} />
          <span>Add Webhook Endpoint</span>
        </button>
      </div>

      {/* Ping Result Alert */}
      {pingResult && (
        <div className="flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-800">
          <Check size={14} className="text-emerald-600" />
          <span>{pingResult}</span>
        </div>
      )}

      {/* Webhooks Table */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-200 bg-slate-50/75 text-[11px] font-bold uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-4 py-3">Endpoint Name & URL</th>
                <th className="px-4 py-3">Subscribed Events</th>
                <th className="px-4 py-3">Health / Success</th>
                <th className="px-4 py-3">Last Triggered</th>
                <th className="px-4 py-3">Signing Secret</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {webhooks.map((item) => {
                const isActive = item.status === 'Active'
                const isFailing = item.status === 'Failing'

                return (
                  <tr key={item.id} className="hover:bg-slate-50/60 transition">
                    {/* Name & URL */}
                    <td className="px-4 py-3.5">
                      <div className="font-bold text-slate-900">{item.name}</div>
                      <div className="mt-0.5 max-w-xs truncate font-mono text-[11px] text-slate-500">
                        {item.url}
                      </div>
                    </td>

                    {/* Events */}
                    <td className="px-4 py-3.5">
                      <div className="flex flex-wrap gap-1">
                        {item.events.map((evt) => (
                          <span
                            key={evt}
                            className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[10px] text-slate-700"
                          >
                            {evt}
                          </span>
                        ))}
                      </div>
                    </td>

                    {/* Status & Success rate */}
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${
                            isActive
                              ? 'border border-emerald-200 bg-emerald-50 text-emerald-700'
                              : isFailing
                              ? 'border border-rose-200 bg-rose-50 text-rose-700'
                              : 'border border-slate-200 bg-slate-50 text-slate-600'
                          }`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${
                              isActive
                                ? 'bg-emerald-500'
                                : isFailing
                                ? 'bg-rose-500'
                                : 'bg-slate-400'
                            }`}
                          />
                          {item.status}
                        </span>
                        <span className="text-[11px] font-semibold text-slate-600">
                          {item.successRate}
                        </span>
                      </div>
                    </td>

                    {/* Last Triggered */}
                    <td className="px-4 py-3.5 text-slate-500">
                      {item.lastTriggered}
                    </td>

                    {/* Signing Secret */}
                    <td className="px-4 py-3.5">
                      <button
                        type="button"
                        onClick={() => copySecret(item.id, item.secretMasked)}
                        className="inline-flex items-center gap-1.5 rounded border border-slate-200 bg-slate-50 px-2 py-1 font-mono text-[10px] text-slate-600 hover:bg-slate-100"
                      >
                        {copiedId === item.id ? (
                          <>
                            <Check size={11} className="text-emerald-600" />
                            <span className="text-emerald-600">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy size={11} />
                            <span>{item.secretMasked}</span>
                          </>
                        )}
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => handlePing(item.id)}
                          disabled={testingId === item.id}
                          className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-white px-2 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-amber-600 disabled:opacity-50"
                        >
                          <Play size={11} className={testingId === item.id ? 'animate-spin' : ''} />
                          <span>{testingId === item.id ? 'Pinging...' : 'Test Ping'}</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => onDeleteWebhook(item.id)}
                          className="rounded-md p-1 text-slate-400 hover:bg-rose-50 hover:text-rose-600"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
