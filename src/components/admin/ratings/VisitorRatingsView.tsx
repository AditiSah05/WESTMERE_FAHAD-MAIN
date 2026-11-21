'use client'

import { useState } from 'react'
import VisitorRatingsHeader from './VisitorRatingsHeader'
import VisitorRatingStatCards from './VisitorRatingStatCards'
import VisitorRatingsTable, { type TabType } from './VisitorRatingsTable'
import VisitorRatingAnalyticsCards from './VisitorRatingAnalyticsCards'
import VisitorRatingSettingsCards from './VisitorRatingSettingsCards'
import {
  PreviewRatingWidgetModal,
  ViewRatingDetailModal,
  RatingSettingsModal,
} from './VisitorRatingModals'
import {
  toggleRatingVisibilityAction,
  flagRatingAction,
  updateWidgetSettingsAction,
  updateSubmissionSettingsAction,
} from '@/app/admin/visitor-rating-actions'
import type {
  VisitorRating,
  VisitorRatingsStats,
  RatingDistributionItem,
  RatingTrendPoint,
  SentimentBreakdown,
  LatestFeedbackItem,
  WidgetSettings,
  SubmissionSettings,
  ModerationSummary,
  ActivityLogItem,
} from '@/lib/server/visitor-ratings'

export default function VisitorRatingsView({
  initialRatings,
  stats,
  distribution,
  trends,
  sentiment,
  feedback,
  widgetSettings: initialWidgetSettings,
  submissionSettings: initialSubmissionSettings,
  moderation,
  activities,
}: {
  initialRatings: VisitorRating[]
  stats: VisitorRatingsStats
  distribution: RatingDistributionItem[]
  trends: RatingTrendPoint[]
  sentiment: SentimentBreakdown
  feedback: LatestFeedbackItem[]
  widgetSettings: WidgetSettings
  submissionSettings: SubmissionSettings
  moderation: ModerationSummary
  activities: ActivityLogItem[]
}) {
  const [ratings, setRatings] = useState<VisitorRating[]>(initialRatings)
  const [widgetSettings, setWidgetSettings] = useState<WidgetSettings>(initialWidgetSettings)
  const [submissionSettings, setSubmissionSettings] = useState<SubmissionSettings>(initialSubmissionSettings)
  const [activeTab, setActiveTab] = useState<TabType>('all')

  // Modals state
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [selectedRatingDetail, setSelectedRatingDetail] = useState<VisitorRating | null>(null)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3000)
  }

  // Action handlers
  const handleToggleCollection = async () => {
    const updated = {
      ...widgetSettings,
      collectionEnabled: !widgetSettings.collectionEnabled,
    }
    setWidgetSettings(updated)
    await updateWidgetSettingsAction({ collectionEnabled: updated.collectionEnabled })
    showToast(
      updated.collectionEnabled
        ? 'Visitor rating collection has been enabled.'
        : 'Visitor rating collection paused.'
    )
  }

  const handleToggleVisibility = async (id: string, current: 'visible' | 'hidden') => {
    const next = current === 'visible' ? 'hidden' : 'visible'
    setRatings((prev) =>
      prev.map((r) => (r.id === id ? { ...r, visibility: next } : r))
    )
    await toggleRatingVisibilityAction(id, next)
    showToast(`Rating #${id} visibility set to ${next}.`)
  }

  const handleFlagRating = async (id: string, flagged: boolean) => {
    setRatings((prev) =>
      prev.map((r) => (r.id === id ? { ...r, flagged } : r))
    )
    await flagRatingAction(id, flagged)
    showToast(flagged ? `Rating #${id} flagged for review.` : `Rating #${id} unflagged.`)
  }

  const handleExportSelected = (ids: string[]) => {
    const count = ids.length ? ids.length : ratings.length
    showToast(`Exported ${count} visitor rating record(s) to CSV.`)
  }

  const handleSaveWidgetSettings = async (settings: WidgetSettings) => {
    setWidgetSettings(settings)
    await updateWidgetSettingsAction(settings)
  }

  const handleSaveSubmissionSettings = async (settings: SubmissionSettings) => {
    setSubmissionSettings(settings)
    await updateSubmissionSettingsAction(settings)
  }

  return (
    <div className="relative min-h-screen">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 rounded-xl bg-[#0f1b33] px-4 py-3 text-xs font-semibold text-white shadow-xl">
          {toastMessage}
        </div>
      )}

      {/* Header */}
      <VisitorRatingsHeader
        collectionEnabled={widgetSettings.collectionEnabled}
        onToggleCollection={handleToggleCollection}
        onOpenPreview={() => setIsPreviewOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onExport={() => handleExportSelected([])}
      />

      {/* Top 6 KPI Metric Cards */}
      <VisitorRatingStatCards stats={stats} />

      {/* Tab Selector & Ledger Table */}
      <VisitorRatingsTable
        ratings={ratings}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onViewRating={(r) => setSelectedRatingDetail(r)}
        onToggleVisibility={handleToggleVisibility}
        onFlagRating={handleFlagRating}
        onExportSelected={handleExportSelected}
      />

      {/* 4 Middle Visual Analytics Cards */}
      <VisitorRatingAnalyticsCards
        distribution={distribution}
        trends={trends}
        sentiment={sentiment}
        feedback={feedback}
        onViewAllFeedback={() => setActiveTab('recent')}
      />

      {/* Bottom 3 Settings & Moderation Cards */}
      <VisitorRatingSettingsCards
        widgetSettings={widgetSettings}
        submissionSettings={submissionSettings}
        moderation={moderation}
        activities={activities}
        onSaveWidget={handleSaveWidgetSettings}
        onSaveSubmission={handleSaveSubmissionSettings}
        onReviewModeration={() => setActiveTab('flagged')}
        onViewActivity={() => showToast('Displaying recent activity logs.')}
      />

      {/* Modals */}
      <PreviewRatingWidgetModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        widgetSettings={widgetSettings}
      />

      <ViewRatingDetailModal
        rating={selectedRatingDetail}
        isOpen={Boolean(selectedRatingDetail)}
        onClose={() => setSelectedRatingDetail(null)}
        onToggleVisibility={handleToggleVisibility}
        onFlagRating={handleFlagRating}
      />

      <RatingSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </div>
  )
}
