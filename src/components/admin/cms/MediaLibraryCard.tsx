'use client'

import React from 'react'
import Link from 'next/link'
import { Image as ImageIcon, Plus, ArrowRight } from 'lucide-react'
import type { MediaAssetItem } from '@/lib/server/cms'

interface Props {
  assets: MediaAssetItem[]
}

export default function MediaLibraryCard({ assets }: Props) {
  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <ImageIcon className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-800">Media Library</h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium">368 Assets</span>
            <button
              onClick={() => alert('Media upload dialog')}
              className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-lg shadow-xs transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Upload Media</span>
            </button>
          </div>
        </div>

        {/* Visual Asset Grid (3x3) */}
        <div className="grid grid-cols-3 gap-2 mt-3.5">
          {assets.map((asset) => (
            <div
              key={asset.id}
              className={`h-16 rounded-lg ${asset.previewBg} border border-slate-200/80 shadow-xs flex items-center justify-center text-center p-2 relative group overflow-hidden cursor-pointer hover:opacity-90 transition-opacity`}
            >
              <span className="text-[10px] font-bold text-white/90 drop-shadow-xs tracking-wider">
                {asset.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-3 border-t border-slate-100 mt-3 text-center">
        <Link
          href="#media-library"
          className="text-xs font-medium text-amber-600 hover:text-amber-700 inline-flex items-center gap-1"
        >
          View Library <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  )
}
