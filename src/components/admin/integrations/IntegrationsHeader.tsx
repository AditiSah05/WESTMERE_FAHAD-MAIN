'use client'

import { useState } from 'react'
import {
  Boxes,
  CheckCircle2,
  Plus,
  RefreshCw,
  Key,
  Webhook,
  SlidersHorizontal,
  ChevronDown,
  Download,
  BookOpen,
} from 'lucide-react'

export default function IntegrationsHeader({
  onConnectApp,
  onCreateWebhook,
  onNewApiKey,
  onSyncAll,
  isSyncing,
}: {
  onConnectApp: () => void
  onCreateWebhook: () => void
  onNewApiKey: () => void
  onSyncAll: () => void
  isSyncing: boolean
}) {
  const [moreOpen, setMoreOpen] = useState(false)

  return (
    <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      {/* Title & Breadcrumbs */}
      <div>
        <div className="flex items-center gap-2">
          <span className="rounded bg-amber-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-800">
            Admin
          </span>
          <span className="text-xs font-medium text-slate-500">Integrations & API Management</span>
        </div>
        <div className="mt-1 flex flex-wrap items-center gap-3">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Integrations & APIs
          </h1>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            All systems operational
          </div>
        </div>
        <p className="mt-0.5 text-xs text-slate-500">
          Connect payment gateways, transactional email, analytics, webhooks and developer APIs.
        </p>
      </div>

      {/* Action Controls */}
      <div className="flex flex-wrap items-center gap-2.5">
        {/* Sync All Button */}
        <button
          type="button"
          onClick={onSyncAll}
          disabled={isSyncing}
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:opacity-50"
        >
          <RefreshCw size={13} className={isSyncing ? 'animate-spin text-amber-600' : 'text-slate-500'} />
          <span>{isSyncing ? 'Syncing...' : 'Sync All'}</span>
        </button>

        {/* New API Key */}
        <button
          type="button"
          onClick={onNewApiKey}
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
        >
          <Key size={13} className="text-slate-500" />
          <span>New API Key</span>
        </button>

        {/* Create Webhook */}
        <button
          type="button"
          onClick={onCreateWebhook}
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
        >
          <Webhook size={13} className="text-slate-500" />
          <span>Create Webhook</span>
        </button>

        {/* Connect App (Primary Amber) */}
        <button
          type="button"
          onClick={onConnectApp}
          className="inline-flex items-center gap-1.5 rounded-lg bg-amber-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-amber-700 active:scale-[0.98]"
        >
          <Plus size={14} />
          <span>Connect App</span>
        </button>

        {/* More Actions Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setMoreOpen(!moreOpen)}
            className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 shadow-sm hover:bg-slate-50"
          >
            <span>More</span>
            <ChevronDown size={13} className="text-slate-400" />
          </button>

          {moreOpen && (
            <div className="absolute right-0 z-20 mt-1.5 w-48 rounded-lg border border-slate-200 bg-white py-1 shadow-lg">
              <a
                href="https://docs.westmere.io/api"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50"
              >
                <BookOpen size={13} className="text-slate-400" />
                API Documentation
              </a>
              <button
                type="button"
                onClick={() => {
                  setMoreOpen(false)
                  alert('Integration audit report exported.')
                }}
                className="flex w-full items-center gap-2 px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50"
              >
                <Download size={13} className="text-slate-400" />
                Export Credentials Manifest
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
