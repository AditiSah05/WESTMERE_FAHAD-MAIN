'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  Layers,
  ArrowRight,
  GripVertical,
  Edit2,
  ExternalLink,
} from 'lucide-react'
import type { HomepageSectionItem } from '@/lib/server/cms'

interface Props {
  sections: HomepageSectionItem[]
}

export default function HomepageSectionsCard({ sections: initialSections }: Props) {
  const [sections, setSections] = useState(initialSections)

  const toggleSection = (id: string) => {
    setSections((prev) =>
      prev.map((s) => (s.id === id ? { ...s, isEnabled: !s.isEnabled } : s))
    )
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <Layers className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-semibold text-slate-800">Homepage Sections</h3>
          </div>
          <Link
            href="#homepage-builder"
            className="text-xs font-medium text-amber-600 hover:text-amber-700 flex items-center gap-1"
          >
            Edit Homepage <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {/* Content grid: Left visual preview + Right sections list */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mt-3.5">
          {/* Left: Miniature Westmere Hero Mockup (5 cols) */}
          <div className="md:col-span-5 rounded-xl border border-slate-200/80 bg-slate-900 text-white p-3 flex flex-col justify-between relative overflow-hidden shadow-xs">
            {/* Ambient gold glow */}
            <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-amber-500/20 rounded-full blur-2xl pointer-events-none" />

            <div>
              {/* Mini Nav */}
              <div className="flex items-center justify-between text-[8px] text-slate-400 pb-2 border-b border-slate-800">
                <span className="font-bold tracking-wider text-slate-200">WESTMERE</span>
                <span className="bg-amber-500/20 text-amber-400 px-1.5 py-0.5 rounded">Live</span>
              </div>

              {/* Mini Hero */}
              <div className="mt-3 space-y-1.5">
                <h4 className="text-xs font-extrabold tracking-tight text-white leading-tight">
                  Digital Technology Solutions for Modern Businesses
                </h4>
                <p className="text-[9px] text-slate-400 leading-relaxed">
                  Websites, SaaS Products, CRM, AI Automation and Custom Software Development
                </p>
              </div>

              {/* Mini Buttons */}
              <div className="flex items-center gap-1.5 mt-2.5">
                <span className="text-[8px] font-semibold bg-amber-500 text-slate-950 px-2 py-0.5 rounded shadow-xs">
                  Get Started →
                </span>
                <span className="text-[8px] font-medium text-slate-300 border border-slate-700 px-1.5 py-0.5 rounded">
                  Our Services
                </span>
              </div>
            </div>

            {/* Bottom Service Pills */}
            <div className="pt-4 border-t border-slate-800/80 mt-3 flex items-center justify-between text-[7px] text-slate-400">
              <span>Web Development</span>
              <span>CRM Solutions</span>
              <span>SaaS Products</span>
            </div>
          </div>

          {/* Right: Sections List with Toggles (7 cols) */}
          <div className="md:col-span-7 space-y-1.5">
            {sections.map((sec) => (
              <div
                key={sec.id}
                className="flex items-center justify-between p-2 rounded-lg border border-slate-100 bg-slate-50/50 hover:bg-slate-50 hover:border-slate-200 transition-colors"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <GripVertical className="w-3.5 h-3.5 text-slate-300 cursor-grab shrink-0" />
                  <div className="truncate">
                    <span className="text-xs font-bold text-slate-800 truncate block">
                      {sec.name}
                    </span>
                    {sec.subtitle && (
                      <span className="text-[10px] text-slate-400 truncate block">
                        {sec.subtitle}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2.5 shrink-0 ml-2">
                  {/* Toggle switch */}
                  <button
                    onClick={() => toggleSection(sec.id)}
                    className={`w-7 h-4 flex items-center rounded-full p-0.5 transition-colors ${
                      sec.isEnabled ? 'bg-emerald-500' : 'bg-slate-200'
                    }`}
                  >
                    <div
                      className={`bg-white w-3 h-3 rounded-full shadow-xs transform transition-transform ${
                        sec.isEnabled ? 'translate-x-3' : 'translate-x-0'
                      }`}
                    />
                  </button>

                  {/* Status Badge */}
                  {sec.status === 'Published' ? (
                    <span className="inline-flex items-center gap-1 text-[10px] font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded-full">
                      <span className="w-1 h-1 rounded-full bg-emerald-500" />
                      Published
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[10px] font-medium text-amber-700 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded-full">
                      Draft
                    </span>
                  )}

                  {/* Edit Pencil */}
                  <button className="text-slate-400 hover:text-slate-700 p-1 rounded hover:bg-slate-100">
                    <Edit2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
