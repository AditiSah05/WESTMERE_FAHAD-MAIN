'use client'

import React from 'react'
import Link from 'next/link'
import { PenTool, ArrowRight } from 'lucide-react'
import type { RecentBlogArticleItem } from '@/lib/server/cms'

interface Props {
  articles: RecentBlogArticleItem[]
}

export default function RecentBlogArticlesCard({ articles }: Props) {
  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <PenTool className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-semibold text-slate-800">Recent Blog Articles</h3>
          </div>
          <Link
            href="#blog-manager"
            className="text-xs font-medium text-amber-600 hover:text-amber-700 flex items-center gap-1"
          >
            View All Articles <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {/* Articles List */}
        <div className="mt-3 space-y-2.5">
          {articles.map((art) => (
            <div
              key={art.id}
              className="flex items-center justify-between p-2 rounded-lg border border-slate-100 bg-slate-50/40 hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                {/* Thumbnail Icon */}
                <div
                  className={`w-8 h-8 rounded-lg ${art.thumbnailBg} flex items-center justify-center text-sm shadow-xs shrink-0`}
                >
                  <span>{art.thumbnailIcon}</span>
                </div>

                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-slate-800 truncate leading-snug">
                    {art.title}
                  </h4>
                  <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-0.5">
                    <span className="font-semibold text-slate-600">{art.category}</span>
                    <span>•</span>
                    <span>{art.lastUpdated}</span>
                  </div>
                </div>
              </div>

              <div className="shrink-0 ml-2">
                {art.status === 'Published' ? (
                  <span className="inline-flex items-center gap-1 text-[10px] font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                    <span className="w-1 h-1 rounded-full bg-emerald-500" />
                    Published
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[10px] font-medium text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                    Draft
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
