'use client'

import { useState } from 'react'
import {
  Eye,
  Settings,
  Download,
  ChevronDown,
} from 'lucide-react'

export default function VisitorRatingsHeader({
  collectionEnabled,
  onToggleCollection,
  onOpenPreview,
  onOpenSettings,
  onExport,
}: {
  collectionEnabled: boolean
  onToggleCollection: () => void
  onOpenPreview: () => void
  onOpenSettings: () => void
  onExport: () => void
}) {
  const [moreOpen, setMoreOpen] = useState(false)

  return (
    <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <div className="flex items-center gap-2">
          <span className="rounded bg-amber-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-800">
            Admin
          </span>
          <span className="text-xs font-medium text-slate-500">Visitor ratings</span>
        </div>
        <div className="mt-1 flex flex-wrap items-center gap-3">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Visitor Ratings
          </h1>
          <button
            type="button"
            onClick={onToggleCollection}
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold transition ${
              collectionEnabled
                ? 'border border-emerald-200 bg-emerald-50 text-emerald-700'
                : 'border border-slate-200 bg-slate-50 text-slate-600'
            }`}
          >
            <span
              className={`h-2 w-2 rounded-full ${
                collectionEnabled ? 'animate-pulse bg-emerald-500' : 'bg-slate-400'
              }`}
            />
            {collectionEnabled ? 'Collection enabled' : 'Collection paused'}
          </button>
        </div>
        <p className="mt-0.5 text-xs text-slate-500">
          Monitor website visitor feedback, analyse rating trends and manage your public homepage rating experience.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2.5">
        <button
          type="button"
          onClick={onOpenPreview}
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
        >
          <Eye size={14} className="text-slate-500" />
          Preview Rating Widget
        </button>

        <button
          type="button"
          onClick={onOpenSettings}
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
        >
          <Settings size={14} className="text-slate-500" />
          Rating Settings
        </button>

        <button
          type="button"
          onClick={onExport}
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
        >
          <Download size={14} className="text-slate-500" />
          Export Report
        </button>

        <div className="relative">
          <button
            type="button"
            onClick={() => setMoreOpen(!moreOpen)}
            className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
          >
            More
            <ChevronDown size={14} />
          </button>
          {moreOpen && (
            <div className="absolute right-0 z-20 mt-1 w-44 rounded-lg border border-slate-200 bg-white py-1 shadow-lg">
              <button
                type="button"
                onClick={() => {
                  setMoreOpen(false)
                  onOpenPreview()
                }}
                className="block w-full px-4 py-2 text-left text-xs text-slate-700 hover:bg-slate-50"
              >
                Embed Code
              </button>
              <button
                type="button"
                onClick={() => {
                  setMoreOpen(false)
                  onToggleCollection()
                }}
                className="block w-full px-4 py-2 text-left text-xs text-slate-700 hover:bg-slate-50"
              >
                Pause / Resume Collection
              </button>
              <button
                type="button"
                onClick={() => {
                  setMoreOpen(false)
                  onExport()
                }}
                className="block w-full px-4 py-2 text-left text-xs text-slate-700 hover:bg-slate-50"
              >
                Download CSV Data
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
