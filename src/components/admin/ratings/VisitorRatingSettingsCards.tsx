'use client'

import { useState } from 'react'
import {
  Layout,
  Sliders,
  ShieldAlert,
  Clock,
  ArrowRight,
  Plus,
  EyeOff,
  RotateCcw,
  Settings,
  ChevronDown,
  Star,
} from 'lucide-react'
import type {
  WidgetSettings,
  SubmissionSettings,
  ModerationSummary,
  ActivityLogItem,
} from '@/lib/server/visitor-ratings'

export default function VisitorRatingSettingsCards({
  widgetSettings: initialWidget,
  submissionSettings: initialSubmission,
  moderation,
  activities,
  onSaveWidget,
  onSaveSubmission,
  onReviewModeration,
  onViewActivity,
}: {
  widgetSettings: WidgetSettings
  submissionSettings: SubmissionSettings
  moderation: ModerationSummary
  activities: ActivityLogItem[]
  onSaveWidget: (settings: WidgetSettings) => void
  onSaveSubmission: (settings: SubmissionSettings) => void
  onReviewModeration: () => void
  onViewActivity: () => void
}) {
  const [widget, setWidget] = useState<WidgetSettings>(initialWidget)
  const [submission, setSubmission] = useState<SubmissionSettings>(initialSubmission)

  const toggleWidgetField = (field: keyof WidgetSettings) => {
    const updated = { ...widget, [field]: !widget[field] }
    setWidget(updated)
    onSaveWidget(updated)
  }

  const toggleSubmissionField = (field: keyof SubmissionSettings) => {
    const updated = { ...submission, [field]: !submission[field] }
    setSubmission(updated)
    onSaveSubmission(updated)
  }

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
      {/* 1. Homepage Rating Widget Management (5 cols) */}
      <div className="flex flex-col justify-between rounded-xl border border-slate-200/90 bg-white p-4 shadow-sm lg:col-span-6 xl:col-span-5">
        <div>
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded bg-amber-50 text-amber-600">
                <Layout size={14} />
              </div>
              <h2 className="text-xs font-bold text-slate-800">
                Homepage Rating Widget Management
              </h2>
            </div>
            <button
              type="button"
              onClick={() => toggleWidgetField('collectionEnabled')}
              className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-semibold transition ${
                widget.collectionEnabled
                  ? 'bg-emerald-50 text-emerald-700'
                  : 'bg-slate-100 text-slate-500'
              }`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  widget.collectionEnabled ? 'bg-emerald-500' : 'bg-slate-400'
                }`}
              />
              Widget Enabled
            </button>
          </div>

          <div className="mt-3.5 grid grid-cols-1 gap-4 sm:grid-cols-12">
            {/* Left Column: Toggles */}
            <div className="space-y-2 text-xs text-slate-700 sm:col-span-6">
              {[
                {
                  key: 'showOnHomepage' as const,
                  label: 'Show rating widget on homepage',
                },
                {
                  key: 'showVisitorFaces' as const,
                  label: 'Show visitor faces (avatars)',
                },
                {
                  key: 'showAverageRating' as const,
                  label: 'Show average rating',
                },
                {
                  key: 'showTotalRatingCount' as const,
                  label: 'Show total rating count',
                },
                {
                  key: 'showStarDistribution' as const,
                  label: 'Show star distribution',
                },
                {
                  key: 'showLatestRatings' as const,
                  label: 'Show latest ratings',
                },
                {
                  key: 'showFeedbackMessages' as const,
                  label: 'Show feedback messages',
                },
              ].map(({ key, label }) => {
                const checked = Boolean(widget[key])
                return (
                  <div
                    key={key}
                    className="flex items-center justify-between gap-2"
                  >
                    <span className="text-[11px] font-medium">{label}</span>
                    <button
                      type="button"
                      aria-label={`Toggle ${label}`}
                      onClick={() => toggleWidgetField(key)}
                      className={`relative inline-flex h-4 w-7 flex-none cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${
                        checked ? 'bg-emerald-500' : 'bg-slate-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-3 w-3 transform rounded-full bg-white shadow-xs transition duration-200 ease-in-out ${
                          checked ? 'translate-x-3.5' : 'translate-x-0.5'
                        } mt-0.5`}
                      />
                    </button>
                  </div>
                )
              })}
            </div>

            {/* Right Column: Settings + Widget Preview Box */}
            <div className="flex flex-col justify-between space-y-3 sm:col-span-6">
              <div className="space-y-2 text-xs">
                <div>
                  <label className="block text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                    Display Style
                  </label>
                  <div className="relative mt-0.5">
                    <select
                      aria-label="Display style"
                      value={widget.displayStyle}
                      onChange={(e) => {
                        const updated = { ...widget, displayStyle: e.target.value }
                        setWidget(updated)
                        onSaveWidget(updated)
                      }}
                      className="w-full appearance-none rounded-lg border border-slate-200 bg-white py-1.5 pl-2.5 pr-7 text-xs font-medium text-slate-700 focus:outline-none"
                    >
                      <option value="Visitor Faces Display">Visitor Faces Display</option>
                      <option value="Compact Rating Pill">Compact Rating Pill</option>
                      <option value="Detailed Star Grid">Detailed Star Grid</option>
                    </select>
                    <ChevronDown
                      size={12}
                      className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                      Widget Position
                    </label>
                    <div className="relative mt-0.5">
                      <select
                        aria-label="Widget position"
                        value={widget.widgetPosition}
                        onChange={(e) => {
                          const updated = { ...widget, widgetPosition: e.target.value }
                          setWidget(updated)
                          onSaveWidget(updated)
                        }}
                        className="w-full appearance-none rounded-lg border border-slate-200 bg-white py-1.5 pl-2 pr-6 text-xs font-medium text-slate-700 focus:outline-none"
                      >
                        <option value="Homepage Section">Homepage Section</option>
                        <option value="Footer Banner">Footer Banner</option>
                        <option value="Header Floating">Header Floating</option>
                      </select>
                      <ChevronDown
                        size={12}
                        className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2 text-slate-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                      Max Avatars
                    </label>
                    <div className="relative mt-0.5">
                      <select
                        aria-label="Max avatars"
                        value={widget.maxAvatars.toString()}
                        onChange={(e) => {
                          const updated = {
                            ...widget,
                            maxAvatars: parseInt(e.target.value, 10),
                          }
                          setWidget(updated)
                          onSaveWidget(updated)
                        }}
                        className="w-full appearance-none rounded-lg border border-slate-200 bg-white py-1.5 pl-2.5 pr-6 text-xs font-medium text-slate-700 focus:outline-none"
                      >
                        <option value="5">5</option>
                        <option value="8">8</option>
                        <option value="12">12</option>
                      </select>
                      <ChevronDown
                        size={12}
                        className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-slate-400"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Live Preview Box */}
              <div className="rounded-xl border border-slate-200/80 bg-slate-50/70 p-3 text-center">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  Widget Preview (Public Website)
                </span>
                <div className="mt-1 flex items-baseline justify-center gap-1">
                  <span className="text-xl font-bold tracking-tight text-slate-900">
                    4.6
                  </span>
                  <span className="text-xs font-medium text-slate-500">/ 5</span>
                </div>
                <div className="mt-0.5 flex justify-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      size={12}
                      className="fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <div className="mt-1 text-[10px] font-medium text-slate-500">
                  Rated by 1,248 visitors
                </div>

                {/* Faces Row */}
                <div className="mt-2 flex items-center justify-center -space-x-1.5">
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-white bg-blue-500 text-[8px] font-bold text-white shadow-xs">
                    V1
                  </span>
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-white bg-purple-500 text-[8px] font-bold text-white shadow-xs">
                    V2
                  </span>
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-white bg-amber-500 text-[8px] font-bold text-white shadow-xs">
                    V3
                  </span>
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-white bg-emerald-500 text-[8px] font-bold text-white shadow-xs">
                    V5
                  </span>
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-white bg-indigo-500 text-[8px] font-bold text-white shadow-xs">
                    V6
                  </span>
                  <span className="inline-flex h-5 items-center justify-center rounded-full border border-white bg-slate-200 px-1 text-[8px] font-bold text-slate-700 shadow-xs">
                    +3
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Rating Submission Settings (3.5 cols) */}
      <div className="flex flex-col justify-between rounded-xl border border-slate-200/90 bg-white p-4 shadow-sm lg:col-span-6 xl:col-span-3">
        <div>
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-amber-50 text-amber-600">
              <Sliders size={14} />
            </div>
            <h2 className="text-xs font-bold text-slate-800">
              Rating Submission Settings
            </h2>
          </div>

          <div className="mt-3.5 space-y-2.5 text-xs text-slate-700">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium">One rating per visitor per day</span>
              <button
                type="button"
                aria-label="Toggle one rating per visitor per day"
                onClick={() => toggleSubmissionField('onePerDay')}
                className={`relative inline-flex h-4 w-7 flex-none cursor-pointer rounded-full transition-colors duration-200 ${
                  submission.onePerDay ? 'bg-emerald-500' : 'bg-slate-300'
                }`}
              >
                <span
                  className={`inline-block h-3 w-3 transform rounded-full bg-white shadow-xs transition duration-200 ${
                    submission.onePerDay ? 'translate-x-3.5' : 'translate-x-0.5'
                  } mt-0.5`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium">Allow anonymous ratings</span>
              <button
                type="button"
                aria-label="Toggle allow anonymous ratings"
                onClick={() => toggleSubmissionField('allowAnonymous')}
                className={`relative inline-flex h-4 w-7 flex-none cursor-pointer rounded-full transition-colors duration-200 ${
                  submission.allowAnonymous ? 'bg-emerald-500' : 'bg-slate-300'
                }`}
              >
                <span
                  className={`inline-block h-3 w-3 transform rounded-full bg-white shadow-xs transition duration-200 ${
                    submission.allowAnonymous ? 'translate-x-3.5' : 'translate-x-0.5'
                  } mt-0.5`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium">Allow written feedback</span>
              <button
                type="button"
                aria-label="Toggle allow written feedback"
                onClick={() => toggleSubmissionField('allowFeedback')}
                className={`relative inline-flex h-4 w-7 flex-none cursor-pointer rounded-full transition-colors duration-200 ${
                  submission.allowFeedback ? 'bg-emerald-500' : 'bg-slate-300'
                }`}
              >
                <span
                  className={`inline-block h-3 w-3 transform rounded-full bg-white shadow-xs transition duration-200 ${
                    submission.allowFeedback ? 'translate-x-3.5' : 'translate-x-0.5'
                  } mt-0.5`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium">Feedback character limit</span>
              <div className="relative">
                <select
                  aria-label="Feedback character limit"
                  value={submission.characterLimit.toString()}
                  onChange={(e) => {
                    const updated = {
                      ...submission,
                      characterLimit: parseInt(e.target.value, 10),
                    }
                    setSubmission(updated)
                    onSaveSubmission(updated)
                  }}
                  className="appearance-none rounded border border-slate-200 bg-white py-1 pl-2 pr-6 text-xs font-medium text-slate-700 focus:outline-none"
                >
                  <option value="200">200</option>
                  <option value="300">300</option>
                  <option value="500">500</option>
                </select>
                <ChevronDown
                  size={12}
                  className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2 text-slate-400"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium">Show confirmation message</span>
              <button
                type="button"
                aria-label="Toggle show confirmation message"
                onClick={() => toggleSubmissionField('showConfirmation')}
                className={`relative inline-flex h-4 w-7 flex-none cursor-pointer rounded-full transition-colors duration-200 ${
                  submission.showConfirmation ? 'bg-emerald-500' : 'bg-slate-300'
                }`}
              >
                <span
                  className={`inline-block h-3 w-3 transform rounded-full bg-white shadow-xs transition duration-200 ${
                    submission.showConfirmation ? 'translate-x-3.5' : 'translate-x-0.5'
                  } mt-0.5`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium">Enable basic spam protection</span>
              <button
                type="button"
                aria-label="Toggle enable basic spam protection"
                onClick={() => toggleSubmissionField('spamProtection')}
                className={`relative inline-flex h-4 w-7 flex-none cursor-pointer rounded-full transition-colors duration-200 ${
                  submission.spamProtection ? 'bg-emerald-500' : 'bg-slate-300'
                }`}
              >
                <span
                  className={`inline-block h-3 w-3 transform rounded-full bg-white shadow-xs transition duration-200 ${
                    submission.spamProtection ? 'translate-x-3.5' : 'translate-x-0.5'
                  } mt-0.5`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium text-slate-500">
                Enable CAPTCHA (if integrated)
              </span>
              <button
                type="button"
                aria-label="Toggle enable CAPTCHA"
                onClick={() => toggleSubmissionField('enableCaptcha')}
                className={`relative inline-flex h-4 w-7 flex-none cursor-pointer rounded-full transition-colors duration-200 ${
                  submission.enableCaptcha ? 'bg-emerald-500' : 'bg-slate-300'
                }`}
              >
                <span
                  className={`inline-block h-3 w-3 transform rounded-full bg-white shadow-xs transition duration-200 ${
                    submission.enableCaptcha ? 'translate-x-3.5' : 'translate-x-0.5'
                  } mt-0.5`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Moderation (Flagged / Hidden) & Recent Activity (4 cols) */}
      <div className="flex flex-col justify-between space-y-4 lg:col-span-12 xl:col-span-4">
        {/* Moderation Card */}
        <div className="rounded-xl border border-slate-200/90 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
              <ShieldAlert size={14} className="text-amber-500" />
              Moderation (Flagged / Hidden)
            </div>
            <button
              type="button"
              onClick={onReviewModeration}
              className="inline-flex items-center gap-0.5 text-[11px] font-medium text-amber-700 hover:text-amber-800"
            >
              View All
              <ArrowRight size={11} />
            </button>
          </div>

          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center gap-3 text-xs">
              <span className="inline-flex items-center gap-1 font-semibold text-amber-700">
                🚩 {moderation.flaggedCount} Flagged
              </span>
              <span className="inline-flex items-center gap-1 font-semibold text-rose-700">
                👁 {moderation.hiddenCount} Hidden
              </span>
              <span className="inline-flex items-center gap-1 font-semibold text-orange-700">
                ⚠️ {moderation.reportedCount} Reported
              </span>
            </div>

            <button
              type="button"
              onClick={onReviewModeration}
              className="rounded-lg border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700 shadow-xs hover:bg-slate-50"
            >
              Review
            </button>
          </div>
        </div>

        {/* Recent Activity Card */}
        <div className="flex-1 rounded-xl border border-slate-200/90 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
              <Clock size={14} className="text-amber-500" />
              Recent Activity
            </div>
            <button
              type="button"
              onClick={onViewActivity}
              className="inline-flex items-center gap-0.5 text-[11px] font-medium text-amber-700 hover:text-amber-800"
            >
              View All
              <ArrowRight size={11} />
            </button>
          </div>

          <div className="mt-3 space-y-2 text-xs">
            {activities.map((act) => (
              <div key={act.id} className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 truncate">
                  {act.type === 'submit' && (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                      <Plus size={11} />
                    </span>
                  )}
                  {act.type === 'hide' && (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-rose-100 text-rose-600">
                      <EyeOff size={11} />
                    </span>
                  )}
                  {act.type === 'restore' && (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                      <RotateCcw size={11} />
                    </span>
                  )}
                  {act.type === 'settings' && (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-100 text-slate-600">
                      <Settings size={11} />
                    </span>
                  )}
                  <span className="truncate text-slate-700">{act.title}</span>
                </div>
                <span className="flex-none text-[10px] text-slate-400">
                  {act.timestamp}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
