'use client'

import React, { useState } from 'react'
import {
  ExternalLink,
  Play,
  Save,
  UploadCloud,
  ChevronDown,
} from 'lucide-react'
import type { CmsOverview } from '@/lib/server/cms'
import CmsStatCards from './CmsStatCards'
import RecentlyUpdatedPagesTable from './RecentlyUpdatedPagesTable'
import HomepageSectionsCard from './HomepageSectionsCard'
import RecentBlogArticlesCard from './RecentBlogArticlesCard'
import MediaLibraryCard from './MediaLibraryCard'
import SeoHealthAndPendingCard from './SeoHealthAndPendingCard'
import CmsBottomSection from './CmsBottomSection'
import { CreatePageModal, CreateBlogPostModal } from './CmsModals'
import { publishChangesAction } from '@/app/admin/cms-actions'

interface Props {
  initialData: CmsOverview
  canWrite: boolean
}

const TABS = [
  'Overview',
  'Homepage Builder',
  'Website Pages',
  'Header & Navigation',
  'Footer Manager',
  'Banners & Popups',
  'Landing Pages',
  'Blog Manager',
  'FAQs',
  'Testimonials',
  'Media Library',
  'SEO Manager',
  'Redirect Manager',
  'Global Settings',
]

export default function CmsView({ initialData, canWrite }: Props) {
  const [activeTab, setActiveTab] = useState('Overview')
  const [isPageModalOpen, setIsPageModalOpen] = useState(false)
  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false)
  const [isPublishing, setIsPublishing] = useState(false)

  const handlePublish = async () => {
    setIsPublishing(true)
    await publishChangesAction()
    setIsPublishing(false)
    alert('All pending CMS changes successfully published to live website!')
  }

  return (
    <div className="space-y-5 pb-12 font-sans">
      {/* 1. Header with Unpublished Changes & Top Action Buttons */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Website / CMS
            </h1>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
              Unpublished changes (7)
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage website pages, homepage content, navigation, media, SEO and publishing workflows from one central place.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* View Live Website */}
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 shadow-2xs transition-colors"
          >
            <span>View Live Website</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </a>

          {/* Preview Changes */}
          <button
            onClick={() => alert('Live site preview opened in staging view')}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 shadow-2xs transition-colors"
          >
            <Play className="w-3 h-3 text-slate-500" />
            <span>Preview Changes</span>
          </button>

          {/* Save Changes */}
          <button
            onClick={() => alert('Draft changes saved successfully')}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 shadow-2xs transition-colors"
          >
            <Save className="w-3.5 h-3.5 text-slate-500" />
            <span>Save Changes</span>
          </button>

          {/* Publish Changes (Amber Primary) */}
          <button
            onClick={handlePublish}
            disabled={isPublishing}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-white bg-amber-600 hover:bg-amber-700 rounded-lg shadow-xs transition-colors"
          >
            <UploadCloud className="w-3.5 h-3.5" />
            <span>{isPublishing ? 'Publishing...' : 'Publish Changes'}</span>
          </button>

          {/* More Actions Dropdown */}
          <button className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 shadow-2xs">
            <span>More</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>
        </div>
      </div>

      {/* 2. Top 6 KPI Metric Cards */}
      <CmsStatCards stats={initialData.stats} />

      {/* 3. Horizontal Navigation Tabs (14 Tabs) */}
      <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none border-b border-slate-200/80">
        {TABS.map((tab) => {
          const isActive = activeTab === tab
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                isActive
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
              }`}
            >
              {tab}
            </button>
          )
        })}
      </div>

      {/* 4. Row 1: Recently Updated Pages (6 cols) + Homepage Sections (6 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-6">
          <RecentlyUpdatedPagesTable pages={initialData.pages} />
        </div>
        <div className="lg:col-span-6">
          <HomepageSectionsCard sections={initialData.homepageSections} />
        </div>
      </div>

      {/* 5. Row 2: Recent Blog Articles (4 cols) + Media Library (4 cols) + SEO Health & Pending (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-4">
          <RecentBlogArticlesCard articles={initialData.recentArticles} />
        </div>
        <div className="lg:col-span-4">
          <MediaLibraryCard assets={initialData.mediaAssets} />
        </div>
        <div className="lg:col-span-4">
          <SeoHealthAndPendingCard
            seoHealth={initialData.seoHealth}
            pendingChanges={initialData.pendingChanges}
          />
        </div>
      </div>

      {/* 6. Bottom Row: Recent CMS Activity (5 cols) + Quick Actions (7 cols) */}
      <CmsBottomSection
        activity={initialData.recentActivity}
        onOpenCreatePage={() => setIsPageModalOpen(true)}
        onOpenCreateBlog={() => setIsBlogModalOpen(true)}
      />

      {/* Modals */}
      <CreatePageModal
        isOpen={isPageModalOpen}
        onClose={() => setIsPageModalOpen(false)}
      />
      <CreateBlogPostModal
        isOpen={isBlogModalOpen}
        onClose={() => setIsBlogModalOpen(false)}
      />
    </div>
  )
}
