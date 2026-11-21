import 'server-only'

export type PageType = 'Homepage' | 'Standard' | 'Listing' | 'Legal'
export type CmsStatus = 'Published' | 'Draft'

export type CmsPageItem = {
  id: string
  name: string
  slug: string
  pageType: PageType
  lastUpdated: string
  author: string
  seoScore: number
  status: CmsStatus
}

export type HomepageSectionItem = {
  id: string
  name: string
  subtitle?: string
  isEnabled: boolean
  status: CmsStatus
}

export type RecentBlogArticleItem = {
  id: string
  title: string
  author: string
  category: string
  lastUpdated: string
  status: CmsStatus
  thumbnailBg: string
  thumbnailIcon: string
}

export type MediaAssetItem = {
  id: string
  title: string
  type: 'photo' | 'brand' | 'ui' | 'wave'
  previewBg: string
  label?: string
}

export type SeoHealthOverview = {
  score: number
  completePagesCount: number
  missingMetaCount: number
  duplicateTitleCount: number
  notIndexedCount: number
}

export type PendingContentChange = {
  id: string
  title: string
  actionLabel: string
}

export type RecentCmsActivity = {
  id: string
  type: 'update' | 'create' | 'publish' | 'section'
  title: string
  author: string
  timestamp: string
}

export type CmsOverview = {
  stats: {
    totalPages: { label: string; value: number; subtext: string }
    publishedPages: { label: string; value: number; subtext: string }
    draftPages: { label: string; value: number; subtext: string }
    blogArticles: { label: string; value: number; subtext: string }
    mediaAssets: { label: string; value: number; subtext: string }
    pendingChanges: { label: string; value: number; subtext: string }
  }
  pages: CmsPageItem[]
  homepageSections: HomepageSectionItem[]
  recentArticles: RecentBlogArticleItem[]
  mediaAssets: MediaAssetItem[]
  seoHealth: SeoHealthOverview
  pendingChanges: PendingContentChange[]
  recentActivity: RecentCmsActivity[]
}

const SEED_PAGES: CmsPageItem[] = [
  {
    id: 'page_1',
    name: 'Home',
    slug: '/',
    pageType: 'Homepage',
    lastUpdated: '28 Oct 2026, 11:24 AM',
    author: 'Admin',
    seoScore: 100,
    status: 'Published',
  },
  {
    id: 'page_2',
    name: 'About Us',
    slug: '/about-us',
    pageType: 'Standard',
    lastUpdated: '27 Oct 2026, 04:10 PM',
    author: 'Admin',
    seoScore: 95,
    status: 'Published',
  },
  {
    id: 'page_3',
    name: 'Services',
    slug: '/services',
    pageType: 'Standard',
    lastUpdated: '27 Oct 2026, 02:36 PM',
    author: 'Admin',
    seoScore: 92,
    status: 'Published',
  },
  {
    id: 'page_4',
    name: 'Products',
    slug: '/products',
    pageType: 'Listing',
    lastUpdated: '26 Oct 2026, 05:14 PM',
    author: 'Admin',
    seoScore: 88,
    status: 'Draft',
  },
  {
    id: 'page_5',
    name: 'Portfolio',
    slug: '/portfolio',
    pageType: 'Listing',
    lastUpdated: '25 Oct 2026, 01:20 PM',
    author: 'Admin',
    seoScore: 96,
    status: 'Published',
  },
  {
    id: 'page_6',
    name: 'Contact Us',
    slug: '/contact-us',
    pageType: 'Standard',
    lastUpdated: '24 Oct 2026, 03:41 PM',
    author: 'Admin',
    seoScore: 100,
    status: 'Published',
  },
  {
    id: 'page_7',
    name: 'Pricing',
    slug: '/pricing',
    pageType: 'Standard',
    lastUpdated: '24 Oct 2026, 11:05 AM',
    author: 'Admin',
    seoScore: 78,
    status: 'Draft',
  },
  {
    id: 'page_8',
    name: 'Privacy Policy',
    slug: '/privacy-policy',
    pageType: 'Legal',
    lastUpdated: '20 Oct 2026, 05:30 PM',
    author: 'Admin',
    seoScore: 100,
    status: 'Published',
  },
]

const SEED_HOMEPAGE_SECTIONS: HomepageSectionItem[] = [
  { id: 'sec_1', name: 'Hero Section', isEnabled: true, status: 'Published' },
  { id: 'sec_2', name: 'Services Section', isEnabled: true, status: 'Published' },
  { id: 'sec_3', name: 'Featured Products', subtitle: '(Mailora, CRM, SaaS, Templates)', isEnabled: true, status: 'Published' },
  { id: 'sec_4', name: 'Why Choose Us', isEnabled: true, status: 'Published' },
  { id: 'sec_5', name: 'Portfolio / Projects', isEnabled: false, status: 'Draft' },
  { id: 'sec_6', name: 'Testimonials', isEnabled: true, status: 'Published' },
  { id: 'sec_7', name: 'CTA Section', isEnabled: true, status: 'Draft' },
]

const SEED_ARTICLES: RecentBlogArticleItem[] = [
  {
    id: 'art_1',
    title: 'How to Choose the Right CRM for Your Business',
    author: 'AD',
    category: 'CRM',
    lastUpdated: '28 Oct 2026',
    status: 'Published',
    thumbnailBg: 'bg-blue-900',
    thumbnailIcon: '📊',
  },
  {
    id: 'art_2',
    title: 'AI Automation: Use Cases for Growing Businesses',
    author: 'AD',
    category: 'AI & Automation',
    lastUpdated: '27 Oct 2026',
    status: 'Published',
    thumbnailBg: 'bg-indigo-950',
    thumbnailIcon: '⚡',
  },
  {
    id: 'art_3',
    title: 'The Ultimate Guide to Bulk Email Marketing',
    author: 'AD',
    category: 'Mailora',
    lastUpdated: '26 Oct 2026',
    status: 'Draft',
    thumbnailBg: 'bg-slate-900',
    thumbnailIcon: '✉️',
  },
  {
    id: 'art_4',
    title: 'Website Templates vs Custom Development: What\'s Best?',
    author: 'AD',
    category: 'Web Development',
    lastUpdated: '24 Oct 2026',
    status: 'Published',
    thumbnailBg: 'bg-cyan-950',
    thumbnailIcon: '💻',
  },
]

const SEED_MEDIA_ASSETS: MediaAssetItem[] = [
  { id: 'm_1', title: 'Architecture Glass Building', type: 'photo', previewBg: 'bg-gradient-to-tr from-blue-900 via-sky-800 to-indigo-900', label: 'Office' },
  { id: 'm_2', title: 'Workspace Laptop Minimal', type: 'photo', previewBg: 'bg-gradient-to-tr from-stone-800 via-slate-700 to-amber-900', label: 'Desk' },
  { id: 'm_3', title: 'Team Meeting Collab', type: 'photo', previewBg: 'bg-gradient-to-tr from-slate-900 via-neutral-800 to-amber-800', label: 'Team' },
  { id: 'm_4', title: 'Mailora Brand Asset', type: 'brand', previewBg: 'bg-blue-600', label: 'Mailora' },
  { id: 'm_5', title: 'CRM Software Monogram', type: 'brand', previewBg: 'bg-slate-900', label: 'CRM' },
  { id: 'm_6', title: 'SaaS UI Dashboard Snapshot', type: 'ui', previewBg: 'bg-slate-800', label: 'Dashboard' },
  { id: 'm_7', title: 'Golden Energy Ribbon', type: 'wave', previewBg: 'bg-gradient-to-r from-amber-600 via-amber-400 to-yellow-600', label: 'Wave' },
  { id: 'm_8', title: 'Westmere Logo Mark', type: 'brand', previewBg: 'bg-slate-900', label: 'Logo' },
  { id: 'm_9', title: 'AI Spark Icon Asset', type: 'brand', previewBg: 'bg-indigo-900', label: 'AI' },
]

export async function getCmsOverview(): Promise<CmsOverview> {
  return {
    stats: {
      totalPages: {
        label: 'Total Website Pages',
        value: 24,
        subtext: 'All website pages (live + draft)',
      },
      publishedPages: {
        label: 'Published Pages',
        value: 18,
        subtext: 'Live on the website',
      },
      draftPages: {
        label: 'Draft Pages',
        value: 6,
        subtext: 'In progress / not published',
      },
      blogArticles: {
        label: 'Blog Articles',
        value: 42,
        subtext: '38 published, 4 drafts',
      },
      mediaAssets: {
        label: 'Media Assets',
        value: 368,
        subtext: 'Images, videos, docs & more',
      },
      pendingChanges: {
        label: 'Pending Changes',
        value: 7,
        subtext: 'Awaiting review or publish',
      },
    },
    pages: SEED_PAGES,
    homepageSections: SEED_HOMEPAGE_SECTIONS,
    recentArticles: SEED_ARTICLES,
    mediaAssets: SEED_MEDIA_ASSETS,
    seoHealth: {
      score: 92,
      completePagesCount: 18,
      missingMetaCount: 4,
      duplicateTitleCount: 1,
      notIndexedCount: 1,
    },
    pendingChanges: [
      { id: 'pc_1', title: 'Products page – content updated', actionLabel: 'Review' },
      { id: 'pc_2', title: 'Homepage – hero section changed', actionLabel: 'Review' },
      { id: 'pc_3', title: 'Pricing page – new pricing plans added', actionLabel: 'Review' },
    ],
    recentActivity: [
      {
        id: 'act_1',
        type: 'update',
        title: 'Updated "Services" page (content & SEO)',
        author: 'Admin (admin@westmere.io)',
        timestamp: '28 Oct 2026, 11:24 AM',
      },
      {
        id: 'act_2',
        type: 'create',
        title: 'Created draft "Pricing" page',
        author: 'Admin',
        timestamp: '27 Oct 2026, 04:10 PM',
      },
      {
        id: 'act_3',
        type: 'publish',
        title: 'Published blog "How to Choose the Right CRM for Your Business"',
        author: 'Admin',
        timestamp: '26 Oct 2026, 10:36 AM',
      },
      {
        id: 'act_4',
        type: 'section',
        title: 'Updated homepage – Testimonials section',
        author: 'Admin',
        timestamp: '25 Oct 2026, 03:20 PM',
      },
    ],
  }
}
