import 'server-only'

export type ReviewStatus = 'Published' | 'Pending' | 'Reported' | 'Hidden'

export type ReviewItem = {
  id: string
  customerName: string
  customerEmail: string
  avatarInitial?: string
  avatarBg?: string
  avatarUrl?: string
  productName: string
  productCategory: string
  rating: number
  title: string
  contentSnippet: string
  isVerified: boolean
  submittedDate: string
  status: ReviewStatus
}

export type RatingDistributionItem = {
  stars: number
  count: number
  pct: number
}

export type TopRatedProduct = {
  id: string
  name: string
  iconType: 'plane' | 'grid' | 'chart' | 'layers' | 'lightning'
  rating: number
  reviewsCount: number
}

export type AttentionItem = {
  id: string
  title: string
  description: string
  count: number
  type: 'reported' | 'pending' | 'hidden'
}

export type ReviewsOverview = {
  stats: {
    totalReviews: { label: string; value: number; subtext: string }
    avgRating: { label: string; value: string; stars: number }
    pendingApproval: { label: string; value: number; subtext: string }
    publishedReviews: { label: string; value: number; subtext: string }
    reportedReviews: { label: string; value: number; subtext: string }
    verifiedPurchases: { label: string; value: number; badge: string; subtext: string }
  }
  reviews: ReviewItem[]
  distribution: RatingDistributionItem[]
  ratingTrend: {
    months: string[]
    points: number[]
  }
  topRatedProducts: TopRatedProduct[]
  needsAttention: AttentionItem[]
}

const SEED_REVIEWS: ReviewItem[] = [
  {
    id: 'rev_1',
    customerName: 'Aarav Mehta',
    customerEmail: 'aarav.mehta@example.com',
    avatarInitial: 'AM',
    avatarBg: 'bg-purple-100 text-purple-700',
    productName: 'Mailora Chrome Extension',
    productCategory: 'Software / Extension',
    rating: 5,
    title: 'Excellent tool for email marketing',
    contentSnippet: 'The Mailora extension is super easy to use and saves a lot of time managing client outreaches...',
    isVerified: true,
    submittedDate: '28 Oct 2026, 11:24 AM',
    status: 'Published',
  },
  {
    id: 'rev_2',
    customerName: 'Zoya Khan',
    customerEmail: 'zoya.khan@example.com',
    avatarInitial: 'ZK',
    avatarBg: 'bg-pink-100 text-pink-700',
    productName: 'Business Website UI Kit',
    productCategory: 'Website Template',
    rating: 4,
    title: 'Clean and professional design',
    contentSnippet: 'Loved the design quality and the component structure. It integrated effortlessly with our Next.js frontend...',
    isVerified: true,
    submittedDate: '27 Oct 2026, 04:10 PM',
    status: 'Pending',
  },
  {
    id: 'rev_3',
    customerName: 'Rohan Iyer',
    customerEmail: 'rohan.iyer@example.com',
    avatarInitial: 'RI',
    avatarBg: 'bg-amber-100 text-amber-700',
    productName: 'NZXTGEN CRM',
    productCategory: 'CRM Software',
    rating: 5,
    title: 'Powerful and reliable CRM',
    contentSnippet: 'The CRM is feature rich, well built and fits perfectly for our multi-client pipeline workflows...',
    isVerified: true,
    submittedDate: '26 Oct 2026, 06:52 PM',
    status: 'Published',
  },
  {
    id: 'rev_4',
    customerName: 'Ananya Sharma',
    customerEmail: 'ananya.sharma@example.com',
    avatarInitial: 'AS',
    avatarBg: 'bg-emerald-100 text-emerald-700',
    productName: 'E-commerce Website Template',
    productCategory: 'Website Template',
    rating: 4,
    title: 'Great template for online stores',
    contentSnippet: 'The template is modern, responsive and easy to customise. Checkout flow is smooth...',
    isVerified: true,
    submittedDate: '25 Oct 2026, 02:36 PM',
    status: 'Reported',
  },
  {
    id: 'rev_5',
    customerName: 'Vikram Suri',
    customerEmail: 'vikram.suri@example.com',
    avatarInitial: 'VS',
    avatarBg: 'bg-blue-100 text-blue-700',
    productName: 'SEO Dashboard Application',
    productCategory: 'SaaS / Tool',
    rating: 5,
    title: 'Very useful for our SEO team',
    contentSnippet: 'The dashboard gives clear insights and helps us track rankings across several domains effortlessly...',
    isVerified: true,
    submittedDate: '24 Oct 2026, 11:05 AM',
    status: 'Published',
  },
  {
    id: 'rev_6',
    customerName: 'Priya Desai',
    customerEmail: 'priya.desai@example.com',
    avatarInitial: 'PD',
    avatarBg: 'bg-purple-100 text-purple-700',
    productName: 'Workflow Automation Pack',
    productCategory: 'Software / Automation',
    rating: 4,
    title: 'Good value and time saving',
    contentSnippet: 'Helped us automate multiple processes. Setup was simple and scripts are well documented...',
    isVerified: false,
    submittedDate: '23 Oct 2026, 05:48 PM',
    status: 'Hidden',
  },
]

export async function getReviewsOverview(): Promise<ReviewsOverview> {
  return {
    stats: {
      totalReviews: {
        label: 'Total Reviews',
        value: 428,
        subtext: 'All customer reviews',
      },
      avgRating: {
        label: 'Average Rating',
        value: '4.6 / 5',
        stars: 4.6,
      },
      pendingApproval: {
        label: 'Pending Approval',
        value: 7,
        subtext: 'Awaiting moderation',
      },
      publishedReviews: {
        label: 'Published Reviews',
        value: 389,
        subtext: 'Visible on public site',
      },
      reportedReviews: {
        label: 'Reported Reviews',
        value: 5,
        subtext: 'Customer-reported reviews',
      },
      verifiedPurchases: {
        label: 'Verified Purchases',
        value: 342,
        badge: '79.9%',
        subtext: 'Reviews from verified orders',
      },
    },
    reviews: SEED_REVIEWS,
    distribution: [
      { stars: 5, count: 256, pct: 59.8 },
      { stars: 4, count: 104, pct: 24.3 },
      { stars: 3, count: 38, pct: 8.9 },
      { stars: 2, count: 18, pct: 4.2 },
      { stars: 1, count: 12, pct: 2.8 },
    ],
    ratingTrend: {
      months: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
      points: [4.3, 4.45, 4.52, 4.58, 4.62, 4.7],
    },
    topRatedProducts: [
      { id: 'p_1', name: 'Mailora Chrome Extension', iconType: 'plane', rating: 4.8, reviewsCount: 128 },
      { id: 'p_2', name: 'NZXTGEN CRM', iconType: 'grid', rating: 4.7, reviewsCount: 96 },
      { id: 'p_3', name: 'SEO Dashboard Application', iconType: 'chart', rating: 4.6, reviewsCount: 64 },
      { id: 'p_4', name: 'Business Website UI Kit', iconType: 'layers', rating: 4.6, reviewsCount: 52 },
      { id: 'p_5', name: 'Workflow Automation Pack', iconType: 'lightning', rating: 4.5, reviewsCount: 37 },
    ],
    needsAttention: [
      {
        id: 'att_1',
        title: '5 Reported reviews',
        description: 'Review reports require moderation',
        count: 5,
        type: 'reported',
      },
      {
        id: 'att_2',
        title: '7 Pending approvals',
        description: 'Reviews waiting for your review',
        count: 7,
        type: 'pending',
      },
      {
        id: 'att_3',
        title: '8 Hidden reviews',
        description: 'Currently not visible on public site',
        count: 8,
        type: 'hidden',
      },
    ],
  }
}
