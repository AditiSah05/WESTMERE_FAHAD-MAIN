'use client'

import { useState } from 'react'
import {
  X,
  Star,
  Eye,
  EyeOff,
  Flag,
  Monitor,
  CheckCircle,
  Copy,
  Settings,
} from 'lucide-react'
import type { VisitorRating, WidgetSettings } from '@/lib/server/visitor-ratings'

export function PreviewRatingWidgetModal({
  isOpen,
  onClose,
  widgetSettings,
}: {
  isOpen: boolean
  onClose: () => void
  widgetSettings: WidgetSettings
}) {
  const [selectedRating, setSelectedRating] = useState<number>(5)
  const [feedback, setFeedback] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [copied, setCopied] = useState(false)

  if (!isOpen) return null

  const handleCopyCode = () => {
    navigator.clipboard?.writeText(
      `<div id="westmere-rating-widget" data-position="${widgetSettings.widgetPosition}"></div>`
    )
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
              <Eye size={16} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Live Rating Widget Preview
              </h3>
              <p className="text-[11px] text-slate-500">
                Interactive demonstration of public homepage rating component
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          >
            <X size={18} />
          </button>
        </div>

        {/* Live Customer Preview Canvas */}
        <div className="p-6">
          <div className="rounded-xl border border-dashed border-amber-300 bg-amber-50/20 p-6 text-center">
            {submitted ? (
              <div className="py-6">
                <CheckCircle
                  size={42}
                  className="mx-auto text-emerald-500 animate-bounce"
                />
                <h4 className="mt-3 text-base font-bold text-slate-900">
                  Thank you for your rating!
                </h4>
                <p className="mt-1 text-xs text-slate-500">
                  Your feedback helps us continuously improve Westmere products.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false)
                    setFeedback('')
                  }}
                  className="mt-4 rounded-lg bg-[#0f1b33] px-4 py-1.5 text-xs font-semibold text-white"
                >
                  Rate Again (Demo)
                </button>
              </div>
            ) : (
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  How was your experience today?
                </p>
                <div className="mt-3 flex items-center justify-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSelectedRating(s)}
                      className="p-1 transition hover:scale-115"
                    >
                      <Star
                        size={28}
                        className={
                          s <= selectedRating
                            ? 'fill-yellow-400 text-yellow-400 drop-shadow-xs'
                            : 'fill-slate-200 text-slate-300'
                        }
                      />
                    </button>
                  ))}
                </div>

                <div className="mt-2 text-xs font-semibold text-slate-700">
                  {selectedRating === 5 && '🌟 Excellent experience!'}
                  {selectedRating === 4 && '👍 Great and professional'}
                  {selectedRating === 3 && '👌 Good overall'}
                  {selectedRating === 2 && '👎 Needs improvement'}
                  {selectedRating === 1 && '⚠️ Very unsatisfied'}
                </div>

                {widgetSettings.showFeedbackMessages && (
                  <div className="mt-4">
                    <textarea
                      rows={3}
                      placeholder="Share your thoughts (optional)..."
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      className="w-full rounded-lg border border-slate-200 bg-white p-2.5 text-xs text-slate-800 placeholder-slate-400 focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                )}

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {/* Visitor Faces */}
                    <div className="flex -space-x-1.5">
                      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-white bg-blue-500 text-[8px] font-bold text-white shadow-xs">
                        V1
                      </span>
                      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-white bg-purple-500 text-[8px] font-bold text-white shadow-xs">
                        V2
                      </span>
                      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-white bg-emerald-500 text-[8px] font-bold text-white shadow-xs">
                        V5
                      </span>
                    </div>
                    <span className="text-[11px] font-medium text-slate-500">
                      4.6 / 5 (1,248 ratings)
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSubmitted(true)}
                    className="rounded-lg bg-[#c4943d] px-4 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-[#b3832d]"
                  >
                    Submit Rating
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Embed Code Snippet */}
          <div className="mt-4 rounded-lg bg-slate-50 p-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-700">Embed Code</span>
              <button
                type="button"
                onClick={handleCopyCode}
                className="inline-flex items-center gap-1 font-semibold text-amber-700 hover:text-amber-800"
              >
                <Copy size={12} />
                {copied ? 'Copied!' : 'Copy Snippet'}
              </button>
            </div>
            <code className="mt-1 block overflow-x-auto text-[11px] text-slate-600 font-mono">
              &lt;div id=&quot;westmere-rating-widget&quot; data-position=&quot;{widgetSettings.widgetPosition}&quot;&gt;&lt;/div&gt;
            </code>
          </div>
        </div>

        <div className="flex justify-end border-t border-slate-100 px-6 py-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-200 bg-white px-4 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export function ViewRatingDetailModal({
  rating,
  isOpen,
  onClose,
  onToggleVisibility,
  onFlagRating,
}: {
  rating: VisitorRating | null
  isOpen: boolean
  onClose: () => void
  onToggleVisibility: (id: string, visibility: 'visible' | 'hidden') => void
  onFlagRating: (id: string, flagged: boolean) => void
}) {
  if (!isOpen || !rating) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <div className="flex items-center gap-2.5">
            <div
              className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold ${rating.avatarBg} ${rating.avatarText}`}
            >
              {rating.visitorAvatar}
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                {rating.visitorName}
              </h3>
              <span className="text-[11px] text-slate-400">#{rating.id}</span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-4 p-6 text-xs text-slate-700">
          {/* Rating Stars + Category */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  size={16}
                  className={
                    s <= rating.rating
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'fill-slate-100 text-slate-200'
                  }
                />
              ))}
              <span className="ml-1.5 text-xs font-bold text-slate-900">
                {rating.rating} / 5
              </span>
            </div>
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600">
              {rating.category}
            </span>
          </div>

          {/* Feedback Body */}
          <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3.5">
            <span className="block text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              Visitor Feedback
            </span>
            <p className="mt-1 text-xs leading-relaxed text-slate-800">
              &quot;{rating.feedback}&quot;
            </p>
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-2 gap-3 text-[11px]">
            <div>
              <span className="text-slate-400">Submission Date:</span>
              <div className="font-semibold text-slate-800">
                {rating.submissionDate} at {rating.time}
              </div>
            </div>
            <div>
              <span className="text-slate-400">Device:</span>
              <div className="flex items-center gap-1 font-semibold text-slate-800">
                <Monitor size={12} className="text-slate-400" />
                {rating.device}
              </div>
            </div>
            <div>
              <span className="text-slate-400">Visitor IP (Hashed):</span>
              <div className="font-mono text-slate-800">{rating.ipMasked}</div>
            </div>
            <div>
              <span className="text-slate-400">Current Visibility:</span>
              <div>
                {rating.visibility === 'visible' ? (
                  <span className="inline-flex items-center gap-1 font-semibold text-emerald-600">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    Visible on Website
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 font-semibold text-red-600">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                    Hidden
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between border-t border-slate-100 px-6 py-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                onToggleVisibility(
                  rating.id,
                  rating.visibility === 'visible' ? 'hidden' : 'visible'
                )
                onClose()
              }}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
            >
              {rating.visibility === 'visible' ? (
                <>
                  <EyeOff size={13} className="text-slate-400" />
                  Hide from Website
                </>
              ) : (
                <>
                  <Eye size={13} className="text-slate-400" />
                  Show on Website
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => {
                onFlagRating(rating.id, !rating.flagged)
                onClose()
              }}
              className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold ${
                rating.flagged
                  ? 'border-amber-200 bg-amber-50 text-amber-800'
                  : 'border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Flag size={13} />
              {rating.flagged ? 'Unflag' : 'Flag'}
            </button>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-[#0f1b33] px-4 py-1.5 text-xs font-semibold text-white"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export function RatingSettingsModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
              <Settings size={16} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Visitor Rating Configuration
              </h3>
              <p className="text-[11px] text-slate-500">
                Manage global rules, notifications and privacy settings
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          >
            <X size={18} />
          </button>
        </div>

        <div className="space-y-4 p-6 text-xs text-slate-700">
          <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3.5">
            <h4 className="font-semibold text-slate-900">Privacy & IP Hashing</h4>
            <p className="mt-1 text-[11px] text-slate-500">
              Westmere anonymizes visitor IPs using salted SHA-256 digests. Raw IP addresses are never persisted in databases.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-medium text-slate-700">Send email notification on negative rating (≤ 2★)</span>
              <input type="checkbox" defaultChecked className="rounded border-slate-300 text-amber-600 focus:ring-amber-500" />
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium text-slate-700">Auto-hide ratings containing blacklisted keywords</span>
              <input type="checkbox" defaultChecked className="rounded border-slate-300 text-amber-600 focus:ring-amber-500" />
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium text-slate-700">Auto-publish positive ratings immediately</span>
              <input type="checkbox" defaultChecked className="rounded border-slate-300 text-amber-600 focus:ring-amber-500" />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 border-t border-slate-100 px-6 py-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-200 bg-white px-4 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-[#c4943d] px-4 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-[#b3832d]"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}
