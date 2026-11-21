'use client'

import React from 'react'
import Link from 'next/link'
import {
  Activity,
  Plus,
  PenTool,
  Upload,
  Megaphone,
  Network,
  ArrowRight,
  FileText,
} from 'lucide-react'
import type { RecentCmsActivity } from '@/lib/server/cms'

interface Props {
  activity: RecentCmsActivity[]
  onOpenCreatePage: () => void
  onOpenCreateBlog: () => void
}

export default function CmsBottomSection({
  activity,
  onOpenCreatePage,
  onOpenCreateBlog,
}: Props) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
      {/* Left: Recent CMS Activity (approx 5 cols) */}
      <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                <Activity className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-semibold text-slate-800">Recent CMS Activity</h3>
            </div>
            <Link
              href="#activity"
              className="text-xs font-medium text-amber-600 hover:text-amber-700 flex items-center gap-1"
            >
              View Activity Log <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="mt-3.5 space-y-3 relative pl-3 before:absolute before:left-1 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
            {activity.map((act) => (
              <div key={act.id} className="relative flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-amber-500 ring-4 ring-white shrink-0 mt-1 -ml-[13px]" />
                <div className="text-xs">
                  <div className="font-semibold text-slate-800 leading-tight">
                    {act.title}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    by {act.author} • {act.timestamp}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right: Quick Actions (approx 7 cols) */}
      <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <span className="text-sm font-bold">⚡</span>
            </div>
            <h3 className="text-sm font-semibold text-slate-800">Quick Actions</h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mt-3.5">
            {/* 1. Create Page */}
            <button
              onClick={onOpenCreatePage}
              className="flex flex-col items-center justify-center text-center p-3 rounded-xl border border-slate-200/80 bg-slate-50/40 hover:bg-slate-50 hover:border-amber-400 hover:shadow-xs transition-all group"
            >
              <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                <FileText className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-slate-800 block">Create Page</span>
              <span className="text-[10px] text-slate-400 block mt-0.5">
                Add a new website page
              </span>
            </button>

            {/* 2. Write Blog Post */}
            <button
              onClick={onOpenCreateBlog}
              className="flex flex-col items-center justify-center text-center p-3 rounded-xl border border-slate-200/80 bg-slate-50/40 hover:bg-slate-50 hover:border-amber-400 hover:shadow-xs transition-all group"
            >
              <div className="w-9 h-9 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                <PenTool className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-slate-800 block">Write Blog Post</span>
              <span className="text-[10px] text-slate-400 block mt-0.5">
                Create a new article
              </span>
            </button>

            {/* 3. Upload Media */}
            <button
              onClick={() => alert('Media uploader activated')}
              className="flex flex-col items-center justify-center text-center p-3 rounded-xl border border-slate-200/80 bg-slate-50/40 hover:bg-slate-50 hover:border-amber-400 hover:shadow-xs transition-all group"
            >
              <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                <Upload className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-slate-800 block">Upload Media</span>
              <span className="text-[10px] text-slate-400 block mt-0.5">
                Add images, videos or files
              </span>
            </button>

            {/* 4. Add Banner */}
            <button
              onClick={() => alert('Banner builder activated')}
              className="flex flex-col items-center justify-center text-center p-3 rounded-xl border border-slate-200/80 bg-slate-50/40 hover:bg-slate-50 hover:border-amber-400 hover:shadow-xs transition-all group"
            >
              <div className="w-9 h-9 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                <Megaphone className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-slate-800 block">Add Banner</span>
              <span className="text-[10px] text-slate-400 block mt-0.5">
                Create a promotional banner
              </span>
            </button>

            {/* 5. Manage Navigation */}
            <button
              onClick={() => alert('Navigation editor activated')}
              className="flex flex-col items-center justify-center text-center p-3 rounded-xl border border-slate-200/80 bg-slate-50/40 hover:bg-slate-50 hover:border-amber-400 hover:shadow-xs transition-all group"
            >
              <div className="w-9 h-9 rounded-lg bg-cyan-50 text-cyan-600 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                <Network className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-slate-800 block">Manage Navigation</span>
              <span className="text-[10px] text-slate-400 block mt-0.5">
                Update header menus
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
