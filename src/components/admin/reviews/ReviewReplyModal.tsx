'use client'

import React, { useState } from 'react'
import { X, MessageSquare, Send } from 'lucide-react'
import type { ReviewItem } from '@/lib/server/reviews'
import { replyReviewAction } from '@/app/admin/review-actions'

interface Props {
  review: ReviewItem | null
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
}

export default function ReviewReplyModal({ review, isOpen, onClose, onSuccess }: Props) {
  const [replyText, setReplyText] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (!isOpen || !review) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const fd = new FormData()
    fd.append('reviewId', review.id)
    fd.append('reply', replyText)

    const res = await replyReviewAction(fd)
    setLoading(false)
    if (res.success) {
      onSuccess?.()
      onClose()
    } else {
      setError(res.error || 'Failed to submit reply')
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-800">Reply to Review</h3>
              <p className="text-xs text-slate-400">Response will appear on public product page</p>
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

          {/* Customer & Review summary */}
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 text-xs">
            <div className="flex items-center justify-between font-semibold text-slate-800">
              <span>{review.customerName}</span>
              <span className="text-amber-500">{'★'.repeat(review.rating)}</span>
            </div>
            <p className="text-slate-600 font-medium mt-1">{review.title}</p>
            <p className="text-slate-400 text-[11px] mt-0.5 line-clamp-2">{review.contentSnippet}</p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Official Response (Westmere Support)
            </label>
            <textarea
              required
              rows={4}
              placeholder="Thank you for your feedback! We're glad to hear..."
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
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
              className="px-4 py-2 text-xs font-medium text-white bg-amber-600 hover:bg-amber-700 rounded-lg shadow-xs flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{loading ? 'Sending...' : 'Post Official Reply'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
