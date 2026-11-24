'use client'

import React, { useState } from 'react'
import { X, FileText, PenTool } from 'lucide-react'
import { createPageAction, createBlogPostAction } from '@/app/admin/cms-actions'

interface CreatePageModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
}

export function CreatePageModal({ isOpen, onClose, onSuccess }: CreatePageModalProps) {
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [pageType, setPageType] = useState('Standard')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (!isOpen) return null

  const handleTitleChange = (val: string) => {
    setTitle(val)
    if (!slug || slug === `/${title.toLowerCase().replace(/\s+/g, '-')}`) {
      setSlug(`/${val.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-/]/g, '')}`)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const fd = new FormData()
    fd.append('title', title)
    fd.append('slug', slug)
    fd.append('pageType', pageType)

    const res = await createPageAction(fd)
    setLoading(false)
    if (res.success) {
      onSuccess?.()
      onClose()
    } else {
      setError(res.error || 'Failed to create page')
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-600 flex items-center justify-center font-bold">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-800">Create New Website Page</h3>
              <p className="text-xs text-slate-400">Add a standard page, listing, or legal document</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {error && (
            <div className="p-3 text-xs bg-rose-50 text-rose-600 rounded-lg border border-rose-200">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Page Title
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Case Studies"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              URL / Slug
            </label>
            <input
              type="text"
              required
              placeholder="/case-studies"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="w-full text-xs font-mono px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Page Type
            </label>
            <select
              value={pageType}
              onChange={(e) => setPageType(e.target.value)}
              className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 bg-white"
            >
              <option value="Standard">Standard Page</option>
              <option value="Listing">Listing Page</option>
              <option value="Legal">Legal / Policy Document</option>
              <option value="Homepage">Homepage Variant</option>
            </select>
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 text-xs font-medium text-white bg-amber-600 hover:bg-amber-700 rounded-lg shadow-xs flex items-center gap-1.5"
            >
              {loading ? 'Creating...' : '+ Create Page'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

interface CreateBlogModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
}

export function CreateBlogPostModal({ isOpen, onClose, onSuccess }: CreateBlogModalProps) {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('Web Development')
  const [excerpt, setExcerpt] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const fd = new FormData()
    fd.append('title', title)
    fd.append('category', category)
    fd.append('excerpt', excerpt)

    const res = await createBlogPostAction(fd)
    setLoading(false)
    if (res.success) {
      onSuccess?.()
      onClose()
    } else {
      setError(res.error || 'Failed to create article')
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-600 flex items-center justify-center font-bold">
              <PenTool className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-800">Write New Blog Article</h3>
              <p className="text-xs text-slate-400">Publish insights, tutorials, or agency updates</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {error && (
            <div className="p-3 text-xs bg-rose-50 text-rose-600 rounded-lg border border-rose-200">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Article Title
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Scaling Next.js Apps with Turbopack in 2026"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 bg-white"
            >
              <option value="Web Development">Web Development</option>
              <option value="CRM">CRM Software</option>
              <option value="AI & Automation">AI & Automation</option>
              <option value="Mailora">Mailora SaaS</option>
              <option value="UI & Design">UI & Design Systems</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Short Excerpt / Summary
            </label>
            <textarea
              rows={3}
              placeholder="Brief introductory summary..."
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 text-xs font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-xs flex items-center gap-1.5"
            >
              {loading ? 'Creating...' : '+ Create Draft Article'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
