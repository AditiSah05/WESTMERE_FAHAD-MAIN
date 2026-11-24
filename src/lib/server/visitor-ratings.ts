export type VisitorRating = {
  id: string
  visitorName: string
  visitorAvatar: string
  avatarBg: string
  avatarText: string
  rating: number
  feedback: string
  submissionDate: string
  time: string
  device: 'Desktop' | 'Mobile' | 'Tablet'
  visibility: 'visible' | 'hidden'
  flagged: boolean
  reported: boolean
  category: string
  ipMasked: string
}

export type VisitorRatingsStats = {
  totalRatings: number
  totalGrowth: string
  averageRating: number
  todayRatings: number
  todaySubtitle: string
  positiveRatings: number
  positivePercent: string
  positiveSubtitle: string
  negativeRatings: number
  negativePercent: string
  negativeSubtitle: string
  uniqueVisitorsRated: number
  uniquePercent: string
}

export type RatingDistributionItem = {
  stars: number
  count: number
  percentage: number
}

export type RatingTrendPoint = {
  date: string
  score: number
}

export type SentimentBreakdown = {
  positiveCount: number
  positivePercent: number
  neutralCount: number
  neutralPercent: number
  negativeCount: number
  negativePercent: number
}

export type LatestFeedbackItem = {
  id: string
  avatar: string
  avatarBg: string
  avatarText: string
  feedback: string
  date: string
  rating: number
}

export type WidgetSettings = {
  collectionEnabled: boolean
  showOnHomepage: boolean
  showVisitorFaces: boolean
  showAverageRating: boolean
  showTotalRatingCount: boolean
  showStarDistribution: boolean
  showLatestRatings: boolean
  showFeedbackMessages: boolean
  displayStyle: string
  widgetPosition: string
  maxAvatars: number
}

export type SubmissionSettings = {
  onePerDay: boolean
  allowAnonymous: boolean
  allowFeedback: boolean
  characterLimit: number
  showConfirmation: boolean
  spamProtection: boolean
  enableCaptcha: boolean
}

export type ModerationSummary = {
  flaggedCount: number
  hiddenCount: number
  reportedCount: number
}

export type ActivityLogItem = {
  id: string
  type: 'submit' | 'hide' | 'restore' | 'settings'
  title: string
  timestamp: string
}

export const SEED_VISITOR_RATINGS: VisitorRating[] = [
  {
    id: 'VR-18924',
    visitorName: 'Visitor 01',
    visitorAvatar: 'V1',
    avatarBg: 'bg-blue-100',
    avatarText: 'text-blue-700',
    rating: 5,
    feedback: 'Excellent experience. The website is clean, modern and easy to use.',
    submissionDate: '28 Oct 2026',
    time: '11:24 AM',
    device: 'Desktop',
    visibility: 'visible',
    flagged: false,
    reported: false,
    category: 'Website UI',
    ipMasked: '192.168.***.14',
  },
  {
    id: 'VR-18923',
    visitorName: 'Visitor 02',
    visitorAvatar: 'V2',
    avatarBg: 'bg-purple-100',
    avatarText: 'text-purple-700',
    rating: 4,
    feedback: 'Professional website with great layout and information.',
    submissionDate: '28 Oct 2026',
    time: '10:47 AM',
    device: 'Mobile',
    visibility: 'visible',
    flagged: false,
    reported: false,
    category: 'General',
    ipMasked: '185.220.***.89',
  },
  {
    id: 'VR-18922',
    visitorName: 'Visitor 03',
    visitorAvatar: 'V3',
    avatarBg: 'bg-amber-100',
    avatarText: 'text-amber-700',
    rating: 4,
    feedback: 'Good overall experience. Could add more detailed examples.',
    submissionDate: '27 Oct 2026',
    time: '06:32 PM',
    device: 'Desktop',
    visibility: 'visible',
    flagged: false,
    reported: false,
    category: 'Services',
    ipMasked: '49.36.***.112',
  },
  {
    id: 'VR-18921',
    visitorName: 'Visitor 04',
    visitorAvatar: 'V4',
    avatarBg: 'bg-rose-100',
    avatarText: 'text-rose-700',
    rating: 2,
    feedback: 'Needs improvement in navigation and loading speed.',
    submissionDate: '26 Oct 2026',
    time: '02:16 PM',
    device: 'Mobile',
    visibility: 'hidden',
    flagged: true,
    reported: false,
    category: 'Performance',
    ipMasked: '103.21.***.55',
  },
  {
    id: 'VR-18920',
    visitorName: 'Visitor 05',
    visitorAvatar: 'V5',
    avatarBg: 'bg-emerald-100',
    avatarText: 'text-emerald-700',
    rating: 5,
    feedback: 'Very impressive services and a great user experience.',
    submissionDate: '25 Oct 2026',
    time: '04:58 PM',
    device: 'Desktop',
    visibility: 'visible',
    flagged: false,
    reported: false,
    category: 'Services',
    ipMasked: '157.240.***.35',
  },
  {
    id: 'VR-18919',
    visitorName: 'Visitor 06',
    visitorAvatar: 'V6',
    avatarBg: 'bg-indigo-100',
    avatarText: 'text-indigo-700',
    rating: 5,
    feedback: 'Fast checkout flow and wonderful digital assets available here.',
    submissionDate: '25 Oct 2026',
    time: '01:15 PM',
    device: 'Desktop',
    visibility: 'visible',
    flagged: false,
    reported: false,
    category: 'Website UI',
    ipMasked: '142.250.***.78',
  },
  {
    id: 'VR-18918',
    visitorName: 'Visitor 07',
    visitorAvatar: 'V7',
    avatarBg: 'bg-cyan-100',
    avatarText: 'text-cyan-700',
    rating: 3,
    feedback: 'Decent portal, though dark mode toggle was tricky to spot at first.',
    submissionDate: '24 Oct 2026',
    time: '07:42 PM',
    device: 'Tablet',
    visibility: 'visible',
    flagged: false,
    reported: false,
    category: 'General',
    ipMasked: '104.28.***.210',
  },
  {
    id: 'VR-18917',
    visitorName: 'Visitor 08',
    visitorAvatar: 'V8',
    avatarBg: 'bg-orange-100',
    avatarText: 'text-orange-700',
    rating: 1,
    feedback: 'Faced a timeout during verification step on older safari browser.',
    submissionDate: '24 Oct 2026',
    time: '11:10 AM',
    device: 'Mobile',
    visibility: 'hidden',
    flagged: true,
    reported: true,
    category: 'Performance',
    ipMasked: '172.68.***.44',
  },
]

export const VISITOR_RATINGS_STATS: VisitorRatingsStats = {
  totalRatings: 1248,
  totalGrowth: '↑ +12.4% vs previous period',
  averageRating: 4.6,
  todayRatings: 18,
  todaySubtitle: 'Submitted today',
  positiveRatings: 1102,
  positivePercent: '88.3%',
  positiveSubtitle: '4-5 star ratings',
  negativeRatings: 42,
  negativePercent: '3.4%',
  negativeSubtitle: '1-2 star ratings',
  uniqueVisitorsRated: 1086,
  uniquePercent: '87.0% of total ratings',
}

export const RATING_DISTRIBUTION: RatingDistributionItem[] = [
  { stars: 5, count: 724, percentage: 58.0 },
  { stars: 4, count: 378, percentage: 30.3 },
  { stars: 3, count: 104, percentage: 8.3 },
  { stars: 2, count: 24, percentage: 1.9 },
  { stars: 1, count: 18, percentage: 1.4 },
]

export const RATING_TRENDS: RatingTrendPoint[] = [
  { date: 'Sep 29', score: 4.3 },
  { date: 'Oct 6', score: 4.42 },
  { date: 'Oct 13', score: 4.45 },
  { date: 'Oct 20', score: 4.41 },
  { date: 'Oct 27', score: 4.6 },
]

export const RATING_SENTIMENT: SentimentBreakdown = {
  positiveCount: 1102,
  positivePercent: 88.3,
  neutralCount: 104,
  neutralPercent: 8.3,
  negativeCount: 42,
  negativePercent: 3.4,
}

export const LATEST_FEEDBACK: LatestFeedbackItem[] = [
  {
    id: 'VR-18920',
    avatar: 'V5',
    avatarBg: 'bg-emerald-100',
    avatarText: 'text-emerald-700',
    feedback: 'Very impressive services and a great user experience.',
    date: '25 Oct',
    rating: 5,
  },
  {
    id: 'VR-18922',
    avatar: 'V3',
    avatarBg: 'bg-amber-100',
    avatarText: 'text-amber-700',
    feedback: 'Good overall experience. Could add more detailed examples.',
    date: '27 Oct',
    rating: 4,
  },
  {
    id: 'VR-18923',
    avatar: 'V2',
    avatarBg: 'bg-purple-100',
    avatarText: 'text-purple-700',
    feedback: 'Professional website with great layout and information.',
    date: '28 Oct',
    rating: 4,
  },
]

export const INITIAL_WIDGET_SETTINGS: WidgetSettings = {
  collectionEnabled: true,
  showOnHomepage: true,
  showVisitorFaces: true,
  showAverageRating: true,
  showTotalRatingCount: true,
  showStarDistribution: false,
  showLatestRatings: true,
  showFeedbackMessages: true,
  displayStyle: 'Visitor Faces Display',
  widgetPosition: 'Homepage Section',
  maxAvatars: 8,
}

export const INITIAL_SUBMISSION_SETTINGS: SubmissionSettings = {
  onePerDay: true,
  allowAnonymous: true,
  allowFeedback: true,
  characterLimit: 300,
  showConfirmation: true,
  spamProtection: true,
  enableCaptcha: false,
}

export const MODERATION_SUMMARY: ModerationSummary = {
  flaggedCount: 7,
  hiddenCount: 12,
  reportedCount: 3,
}

export const RECENT_ACTIVITY: ActivityLogItem[] = [
  {
    id: 'act-1',
    type: 'submit',
    title: 'New rating submitted - #VR-18924 (5★)',
    timestamp: '28 Oct, 11:24 AM',
  },
  {
    id: 'act-2',
    type: 'hide',
    title: 'Rating hidden - #VR-18921 (2★)',
    timestamp: '26 Oct, 02:16 PM',
  },
  {
    id: 'act-3',
    type: 'restore',
    title: 'Rating restored - #VR-18910 (4★)',
    timestamp: '25 Oct, 11:03 AM',
  },
  {
    id: 'act-4',
    type: 'settings',
    title: 'Widget settings updated - by Admin',
    timestamp: '24 Oct, 05:40 PM',
  },
]
