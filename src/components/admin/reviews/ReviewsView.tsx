'use client'

import React, { useState } from 'react'
import {
  ExternalLink,
  Settings,
  Download,
  ChevronDown,
  BarChart2,
} from 'lucide-react'
import type { ReviewsOverview, ReviewItem } from '@/lib/server/reviews'
import ReviewStatCards from './ReviewStatCards'
import ReviewsTable from './ReviewsTable'
import RatingDistributionCard from './RatingDistributionCard'
import RatingTrendCard from './RatingTrendCard'
import TopRatedProductsCard from './TopRatedProductsCard'
import NeedsAttentionCard from './NeedsAttentionCard'
import ReviewReplyModal from './ReviewReplyModal'

interface Props {
  initialData: ReviewsOverview
  canWrite: boolean
}

const TABS = [
  { id: 'All', label: 'All Reviews (428)' },
  { id: 'Pending', label: 'Pending Approval (7)' },
  { id: 'Published', label: 'Published (389)' },
  { id: 'Reported', label: 'Reported Reviews (5)' },
  { id: 'Verified', label: 'Verified Purchases (342)' },
  { id: 'Unverified', label: 'Unverified Reviews (86)' },
  { id: 'Hidden', label: 'Hidden Reviews (8)' },
  { id: 'Analytics', label: 'Ratings Analytics', icon: BarChart2 },
]

export default function ReviewsView({ initialData, canWrite }: Props) {
  const [activeTab, setActiveTab] = useState('All')
  const [selectedReviewForReply, setSelectedReviewForReply] = useState<ReviewItem | null>(null)
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false)

  const handleOpenReply = (review: ReviewItem) => {
    setSelectedReviewForReply(review)
    setIsReplyModalOpen(true)
  }

  const handleExportAll = () => {
    const headers = 'Customer,Email,Product,Category,Rating,Title,Review,Verified,Submitted,Status\n'
    const rows = initialData.reviews
      .map(
        (r) =>
          `"${r.customerName}","${r.customerEmail}","${r.productName}","${r.productCategory}",${r.rating},"${r.title}","${r.contentSnippet}",${r.isVerified ? 'Yes' : 'No'},"${r.submittedDate}","${r.status}"`
      )
      .join('\n')
    const blob = new Blob([headers + rows], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `all_reviews.csv`
    a.click()
  }

  return (
    <div className="space-y-5 pb-12 font-sans">
      {/* 1. Page Header & Action Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Reviews & Ratings
            </h1>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
              7 reviews awaiting moderation
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage customer feedback, monitor product ratings, moderate reviews and build trust across Westmere's digital product ecosystem.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* View Public Reviews */}
          <a
            href="/reviews"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 shadow-2xs transition-colors"
          >
            <span>View Public Reviews</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </a>

          {/* Review Settings */}
          <button
            onClick={() => alert('Review settings dialog opened')}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 shadow-2xs transition-colors"
          >
            <Settings className="w-3.5 h-3.5 text-slate-500" />
            <span>Review Settings</span>
          </button>

          {/* Export Reviews */}
          <button
            onClick={handleExportAll}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 shadow-2xs transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export Reviews</span>
          </button>

          {/* More Actions Dropdown */}
          <button className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 shadow-2xs">
            <span>More</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>
        </div>
      </div>

      {/* 2. Top 6 KPI Metric Cards */}
      <ReviewStatCards stats={initialData.stats} />

      {/* 3. Horizontal Navigation Tabs (8 Tabs) */}
      <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none border-b border-slate-200/80">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id
          const TabIcon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                isActive
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
              }`}
            >
              {TabIcon && <TabIcon className="w-3.5 h-3.5" />}
              <span>{tab.label}</span>
            </button>
          )
        })}
      </div>

      {/* 4. Reviews Table */}
      <ReviewsTable
        reviews={initialData.reviews}
        onOpenReply={handleOpenReply}
      />

      {/* 5. Bottom 4 Cards Grid (Rating Distribution + Rating Trend + Top Rated Products + Needs Attention) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <RatingDistributionCard
          distribution={initialData.distribution}
          totalReviews={initialData.stats.totalReviews.value}
        />
        <RatingTrendCard ratingTrend={initialData.ratingTrend} />
        <TopRatedProductsCard products={initialData.topRatedProducts} />
        <NeedsAttentionCard items={initialData.needsAttention} />
      </div>

      {/* Reply Modal */}
      <ReviewReplyModal
        review={selectedReviewForReply}
        isOpen={isReplyModalOpen}
        onClose={() => setIsReplyModalOpen(false)}
      />
    </div>
  )
}
