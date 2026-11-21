'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import {
  FileText,
  Search,
  MoreHorizontal,
  ArrowRight,
  Home,
  File,
  Layers,
  Scale,
} from 'lucide-react'
import type { CmsPageItem } from '@/lib/server/cms'

interface Props {
  pages: CmsPageItem[]
}

export default function RecentlyUpdatedPagesTable({ pages }: Props) {
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')
  const [seoFilter, setSeoFilter] = useState('All')

  const filtered = useMemo(() => {
    return pages.filter((page) => {
      const matchSearch =
        search === '' ||
        page.name.toLowerCase().includes(search.toLowerCase()) ||
        page.slug.toLowerCase().includes(search.toLowerCase())
      const matchType = typeFilter === 'All' || page.pageType === typeFilter
      const matchStatus = statusFilter === 'All' || page.status === statusFilter
      return matchSearch && matchType && matchStatus
    })
  }, [pages, search, typeFilter, statusFilter])

  const renderPageIcon = (type: CmsPageItem['pageType']) => {
    switch (type) {
      case 'Homepage':
        return <Home className="w-3.5 h-3.5 text-blue-500" />
      case 'Standard':
        return <File className="w-3.5 h-3.5 text-slate-400" />
      case 'Listing':
        return <Layers className="w-3.5 h-3.5 text-indigo-500" />
      case 'Legal':
        return <Scale className="w-3.5 h-3.5 text-amber-500" />
      default:
        return <FileText className="w-3.5 h-3.5 text-slate-400" />
    }
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-2xs p-4 flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-semibold text-slate-800">Recently Updated Pages</h3>
          </div>
          <Link
            href="#all-pages"
            className="text-xs font-medium text-amber-600 hover:text-amber-700 flex items-center gap-1"
          >
            View All Pages <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {/* Filter Toolbar */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 mt-3">
          <div className="sm:col-span-5 relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search pages by name or URL..."
              className="w-full pl-8 pr-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 placeholder:text-slate-400"
            />
          </div>

          <div className="sm:col-span-7 flex flex-wrap gap-2">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="flex-1 text-xs px-2 py-1.5 border border-slate-200 rounded-lg bg-white text-slate-700 focus:outline-none focus:border-amber-500"
            >
              <option value="All">All Page Types</option>
              <option value="Homepage">Homepage</option>
              <option value="Standard">Standard</option>
              <option value="Listing">Listing</option>
              <option value="Legal">Legal</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="flex-1 text-xs px-2 py-1.5 border border-slate-200 rounded-lg bg-white text-slate-700 focus:outline-none focus:border-amber-500"
            >
              <option value="All">All Status</option>
              <option value="Published">Published</option>
              <option value="Draft">Draft</option>
            </select>

            <select
              value={seoFilter}
              onChange={(e) => setSeoFilter(e.target.value)}
              className="flex-1 text-xs px-2 py-1.5 border border-slate-200 rounded-lg bg-white text-slate-700 focus:outline-none focus:border-amber-500"
            >
              <option value="All">SEO: All</option>
              <option value="good">90%+</option>
              <option value="medium">&lt; 90%</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto mt-3">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                <th className="py-2 px-1">Page Name</th>
                <th className="py-2 px-2">URL / Slug</th>
                <th className="py-2 px-2">Page Type</th>
                <th className="py-2 px-2">Last Updated</th>
                <th className="py-2 px-2">Author</th>
                <th className="py-2 px-2">SEO</th>
                <th className="py-2 px-2 text-center">Status</th>
                <th className="py-2 pr-1 pl-2 text-center w-8">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.map((page) => (
                <tr key={page.id} className="hover:bg-slate-50/60 transition-colors">
                  {/* Page Name */}
                  <td className="py-2.5 px-1 font-semibold text-slate-800">
                    <div className="flex items-center gap-1.5">
                      {renderPageIcon(page.pageType)}
                      <span>{page.name}</span>
                    </div>
                  </td>

                  {/* Slug */}
                  <td className="py-2.5 px-2 font-mono text-[11px] text-slate-500">
                    {page.slug}
                  </td>

                  {/* Page Type */}
                  <td className="py-2.5 px-2">
                    {page.pageType === 'Homepage' ? (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-purple-50 text-purple-700 border border-purple-200">
                        Homepage
                      </span>
                    ) : (
                      <span className="text-slate-600 text-[11px]">{page.pageType}</span>
                    )}
                  </td>

                  {/* Last Updated */}
                  <td className="py-2.5 px-2 text-[11px] text-slate-500 whitespace-nowrap">
                    {page.lastUpdated}
                  </td>

                  {/* Author */}
                  <td className="py-2.5 px-2">
                    <div className="flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-[10px] font-bold">
                        AD
                      </span>
                      <span className="text-slate-600 text-[11px]">{page.author}</span>
                    </div>
                  </td>

                  {/* SEO Score */}
                  <td className="py-2.5 px-2">
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`w-2 h-2 rounded-full shrink-0 ${
                          page.seoScore >= 95
                            ? 'bg-emerald-500'
                            : page.seoScore >= 85
                            ? 'bg-amber-500'
                            : 'bg-orange-500'
                        }`}
                      />
                      <span className="font-semibold text-slate-700 text-[11px]">
                        {page.seoScore}%
                      </span>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="py-2.5 px-2 text-center">
                    {page.status === 'Published' ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        Published
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-amber-50 text-amber-700 border border-amber-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                        Draft
                      </span>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="py-2.5 pr-1 pl-2 text-center">
                    <button className="text-slate-400 hover:text-slate-700 p-1 rounded-md hover:bg-slate-100">
                      <MoreHorizontal className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
