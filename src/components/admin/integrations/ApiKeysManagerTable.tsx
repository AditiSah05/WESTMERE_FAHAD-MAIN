'use client'

import { useState } from 'react'
import {
  KeyRound,
  Copy,
  Check,
  Plus,
  ShieldAlert,
  AlertCircle,
} from 'lucide-react'
import type { ApiKeyItem } from '@/lib/server/integrations-crm'

export default function ApiKeysManagerTable({
  apiKeys,
  onNewApiKey,
  onRevokeKey,
}: {
  apiKeys: ApiKeyItem[]
  onNewApiKey: () => void
  onRevokeKey: (id: string) => void
}) {
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const copyPrefix = (id: string, prefix: string) => {
    navigator.clipboard?.writeText(prefix)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <div className="space-y-4">
      {/* Top Banner & Action */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-base font-bold text-slate-900">Developer API Keys</h2>
          <p className="text-xs text-slate-500">
            Authenticate programmatic requests to Westmere REST endpoints via Bearer token headers.
          </p>
        </div>

        <button
          type="button"
          onClick={onNewApiKey}
          className="inline-flex items-center gap-1.5 self-start rounded-lg bg-amber-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-amber-700"
        >
          <Plus size={14} />
          <span>Generate New API Key</span>
        </button>
      </div>

      {/* Security note */}
      <div className="flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50/80 p-3 text-xs text-amber-900">
        <ShieldAlert size={16} className="text-amber-700 shrink-0" />
        <div>
          Keep secret keys confidential. Do not expose them in client-side code, git repositories, or browser environments.
        </div>
      </div>

      {/* API Keys Table */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-200 bg-slate-50/75 text-[11px] font-bold uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-4 py-3">Key Name</th>
                <th className="px-4 py-3">Token Prefix</th>
                <th className="px-4 py-3">Access Scope</th>
                <th className="px-4 py-3">Created</th>
                <th className="px-4 py-3">Last Active</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {apiKeys.map((item) => {
                const isActive = item.status === 'Active'
                const isFull = item.scope === 'Full Access'

                return (
                  <tr key={item.id} className="hover:bg-slate-50/60 transition">
                    {/* Name */}
                    <td className="px-4 py-3.5">
                      <div className="font-bold text-slate-900">{item.name}</div>
                      <div className="text-[10px] text-slate-400">ID: {item.id}</div>
                    </td>

                    {/* Prefix */}
                    <td className="px-4 py-3.5">
                      <button
                        type="button"
                        onClick={() => copyPrefix(item.id, item.keyPrefix)}
                        className="inline-flex items-center gap-1.5 rounded border border-slate-200 bg-slate-50 px-2 py-1 font-mono text-[10px] text-slate-700 hover:bg-slate-100"
                      >
                        {copiedId === item.id ? (
                          <>
                            <Check size={11} className="text-emerald-600" />
                            <span className="text-emerald-600">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy size={11} />
                            <span>{item.keyPrefix}</span>
                          </>
                        )}
                      </button>
                    </td>

                    {/* Scope */}
                    <td className="px-4 py-3.5">
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                          isFull
                            ? 'bg-purple-100 text-purple-700'
                            : 'bg-blue-100 text-blue-700'
                        }`}
                      >
                        {item.scope}
                      </span>
                    </td>

                    {/* Created */}
                    <td className="px-4 py-3.5 text-slate-500">{item.created}</td>

                    {/* Last Used */}
                    <td className="px-4 py-3.5 text-slate-500">{item.lastUsed}</td>

                    {/* Status */}
                    <td className="px-4 py-3.5">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${
                          isActive
                            ? 'border border-emerald-200 bg-emerald-50 text-emerald-700'
                            : 'border border-rose-200 bg-rose-50 text-rose-700'
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            isActive ? 'bg-emerald-500' : 'bg-rose-500'
                          }`}
                        />
                        {item.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3.5 text-right">
                      {isActive && (
                        <button
                          type="button"
                          onClick={() => onRevokeKey(item.id)}
                          className="rounded border border-rose-200 bg-rose-50/50 px-2.5 py-1 text-xs font-semibold text-rose-600 hover:bg-rose-100"
                        >
                          Revoke
                        </button>
                      )}
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
