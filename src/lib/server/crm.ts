import 'server-only'
import { db } from './schema'

export type LeadSource = 'Website' | 'WhatsApp' | 'LinkedIn' | 'Google Ads' | 'Referral' | 'Instagram' | 'Other'
export type LeadStatus = 'New Lead' | 'Contacted' | 'Qualified' | 'Proposal Sent' | 'Negotiation' | 'Won' | 'Lost'

export type Lead = {
  id: string
  name: string
  company: string
  initials: string
  avatarColor: string
  email: string
  phone: string
  source: LeadSource
  service: string
  owner: string
  ownerName: string
  score: number
  status: LeadStatus
  nextFollowUp: string
  value: number
  created: string
}

export type DealCardItem = {
  id: string
  name: string
  company: string
  service: string
  value: number
  valueFormatted: string
  closeDate: string
  assignee: string
  assigneeColor: string
  priority: 'High' | 'Medium' | 'Low' | 'Won'
  isWon?: boolean
}

export type DealStage = {
  key: string
  title: string
  count: number
  totalAmountFormatted: string
  deals: DealCardItem[]
}

export type TodayFollowUp = {
  id: string
  name: string
  company: string
  initials: string
  avatarColor: string
  time: string
  actionType: 'call' | 'whatsapp' | 'email'
}

export type CrmActivity = {
  id: string
  type: 'deal_stage' | 'lead_new' | 'followup_done' | 'proposal' | 'deal_won'
  title: string
  description: string
  time: string
  icon: 'zap' | 'userPlus' | 'checkCircle' | 'fileText' | 'trophy'
  color: 'amber' | 'blue' | 'green' | 'purple'
}

export type CrmOverview = {
  stats: {
    totalLeads: { label: string; value: string; badge: string; subtext: string; spark: number[] }
    newLeads: { label: string; value: string; badge: string; subtext: string; spark: number[] }
    qualifiedLeads: { label: string; value: string; badge: string; subtext: string; spark: number[] }
    activeDeals: { label: string; value: string; badge: string; subtext: string; spark: number[] }
    pipelineValue: { label: string; value: string; badge: string; subtext: string; spark: number[] }
    weightedPipeline: { label: string; value: string; badge: string; subtext: string; spark: number[] }
    wonRevenue: { label: string; value: string; badge: string; subtext: string; spark: number[] }
    pendingFollowUps: { label: string; value: string; badge: string; subtext: string; spark: number[] }
  }
  pipeline: DealStage[]
  leads: Lead[]
  todayFollowUps: TodayFollowUp[]
  recentActivities: CrmActivity[]
  leadTrend: {
    period: string
    labels: string[]
    values: number[]
  }
  wonVsLost: {
    total: number
    won: number
    lost: number
    wonPct: string
    lostPct: string
  }
  leadsBySource: {
    source: string
    pct: number
    color: string
  }[]
  counts: {
    allLeads: number
    contacts: number
    companies: number
    deals: number
    followUps: number
    tasks: number
  }
}

const SEED_LEADS: Lead[] = [
  {
    id: 'lead-1',
    name: 'Aarav Mehta',
    company: 'Northstar Technologies',
    initials: 'AM',
    avatarColor: 'bg-[#f43f5e]',
    email: 'aarav@northstar.in',
    phone: '+91 98*** 4321',
    source: 'Website',
    service: 'Corporate Website Development',
    owner: 'AK',
    ownerName: 'Anand Kumar',
    score: 92,
    status: 'Qualified',
    nextFollowUp: 'Nov 10, 2026',
    value: 35000,
    created: 'Oct 28, 2026',
  },
  {
    id: 'lead-2',
    name: 'Zoya Khan',
    company: 'UrbanNest Pvt. Ltd.',
    initials: 'ZK',
    avatarColor: 'bg-[#ea580c]',
    email: 'zoya@urbannest.com',
    phone: '+91 99*** 1184',
    source: 'WhatsApp',
    service: 'E-commerce Website',
    owner: 'SK',
    ownerName: 'Sanjay Kapoor',
    score: 85,
    status: 'Contacted',
    nextFollowUp: 'Nov 11, 2026',
    value: 55000,
    created: 'Oct 29, 2026',
  },
  {
    id: 'lead-3',
    name: 'Studio North',
    company: 'Studio North Agency',
    initials: 'SN',
    avatarColor: 'bg-[#3b82f6]',
    email: 'hello@studionorth.co',
    phone: '+1 415*** 9801',
    source: 'LinkedIn',
    service: 'CRM Software Implementation',
    owner: 'RS',
    ownerName: 'Rohan Sharma',
    score: 88,
    status: 'Proposal Sent',
    nextFollowUp: 'Nov 20, 2026',
    value: 75000,
    created: 'Oct 30, 2026',
  },
  {
    id: 'lead-4',
    name: 'Kabir Anand',
    company: 'BrightCare Solutions',
    initials: 'KA',
    avatarColor: 'bg-[#d97706]',
    email: 'kabir@brightcare.in',
    phone: '+91 99*** 7765',
    source: 'Google Ads',
    service: 'Mailora SaaS Subscription',
    owner: 'AM',
    ownerName: 'Aarav Mukherjee',
    score: 76,
    status: 'Negotiation',
    nextFollowUp: 'Nov 18, 2026',
    value: 12000,
    created: 'Oct 31, 2026',
  },
  {
    id: 'lead-5',
    name: 'Meera Shah',
    company: 'Vertex Innovations',
    initials: 'MS',
    avatarColor: 'bg-[#10b981]',
    email: 'meera@vertex.in',
    phone: '+91 98*** 3342',
    source: 'Referral',
    service: 'Custom Application Development',
    owner: 'SK',
    ownerName: 'Sanjay Kapoor',
    score: 95,
    status: 'Qualified',
    nextFollowUp: 'Nov 28, 2026',
    value: 150000,
    created: 'Nov 01, 2026',
  },
  {
    id: 'lead-6',
    name: 'Dev Patel',
    company: 'GrowTech Media',
    initials: 'DP',
    avatarColor: 'bg-[#06b6d4]',
    email: 'dev@growtech.in',
    phone: '+91 96*** 2233',
    source: 'Website',
    service: 'AI Automation Setup',
    owner: 'AK',
    ownerName: 'Anand Kumar',
    score: 98,
    status: 'Won',
    nextFollowUp: 'Completed',
    value: 85000,
    created: 'Oct 20, 2026',
  },
]

const SEED_PIPELINE: DealStage[] = [
  {
    key: 'new_lead',
    title: 'New Lead',
    count: 12,
    totalAmountFormatted: '₹3.2L',
    deals: [
      {
        id: 'deal-1',
        name: 'Aarav Mehta',
        company: 'Northstar Technologies',
        service: 'Corporate Website',
        value: 35000,
        valueFormatted: '₹35,000',
        closeDate: 'Nov 10, 2026',
        assignee: 'AK',
        assigneeColor: 'bg-[#e11d48]',
        priority: 'High',
      },
    ],
  },
  {
    key: 'contacted',
    title: 'Contacted',
    count: 8,
    totalAmountFormatted: '₹4.1L',
    deals: [
      {
        id: 'deal-2',
        name: 'Zoya Khan',
        company: 'UrbanNest Pvt. Ltd.',
        service: 'E-commerce Website',
        value: 55000,
        valueFormatted: '₹55,000',
        closeDate: 'Nov 15, 2026',
        assignee: 'SK',
        assigneeColor: 'bg-[#4338ca]',
        priority: 'Medium',
      },
    ],
  },
  {
    key: 'qualified',
    title: 'Qualified',
    count: 9,
    totalAmountFormatted: '₹4.8L',
    deals: [
      {
        id: 'deal-3',
        name: 'Studio North',
        company: 'Studio North Agency',
        service: 'CRM Implementation',
        value: 75000,
        valueFormatted: '₹75,000',
        closeDate: 'Nov 20, 2026',
        assignee: 'RS',
        assigneeColor: 'bg-[#0f172a]',
        priority: 'High',
      },
    ],
  },
  {
    key: 'proposal_sent',
    title: 'Proposal Sent',
    count: 7,
    totalAmountFormatted: '₹3.1L',
    deals: [
      {
        id: 'deal-4',
        name: 'Kabir Anand',
        company: 'BrightCare Solutions',
        service: 'Mailora SaaS Subscription',
        value: 12000,
        valueFormatted: '₹12,000',
        closeDate: 'Nov 18, 2026',
        assignee: 'AM',
        assigneeColor: 'bg-[#854d0e]',
        priority: 'Medium',
      },
    ],
  },
  {
    key: 'negotiation',
    title: 'Negotiation',
    count: 6,
    totalAmountFormatted: '₹3.4L',
    deals: [
      {
        id: 'deal-5',
        name: 'Meera Shah',
        company: 'Vertex Innovations',
        service: 'Custom Software Dev.',
        value: 150000,
        valueFormatted: '₹1,50,000',
        closeDate: 'Nov 28, 2026',
        assignee: 'SK',
        assigneeColor: 'bg-[#4338ca]',
        priority: 'High',
      },
    ],
  },
  {
    key: 'won',
    title: 'Won',
    count: 26,
    totalAmountFormatted: '₹4.8L',
    deals: [
      {
        id: 'deal-6',
        name: 'Dev Patel',
        company: 'GrowTech Media',
        service: 'AI Automation Setup',
        value: 85000,
        valueFormatted: '₹85,000',
        closeDate: 'Oct 20, 2026',
        assignee: 'Won',
        assigneeColor: 'bg-[#10b981]',
        priority: 'Won',
        isWon: true,
      },
    ],
  },
]

const SEED_FOLLOWUPS: TodayFollowUp[] = [
  {
    id: 'f-1',
    name: 'Aarav Mehta',
    company: 'Northstar Technologies',
    initials: 'AM',
    avatarColor: 'bg-[#f43f5e]',
    time: '10:00 AM',
    actionType: 'call',
  },
  {
    id: 'f-2',
    name: 'Zoya Khan',
    company: 'UrbanNest Pvt. Ltd.',
    initials: 'ZK',
    avatarColor: 'bg-[#ea580c]',
    time: '11:30 AM',
    actionType: 'whatsapp',
  },
  {
    id: 'f-3',
    name: 'Studio North',
    company: 'Studio North Agency',
    initials: 'SN',
    avatarColor: 'bg-[#3b82f6]',
    time: '02:00 PM',
    actionType: 'email',
  },
  {
    id: 'f-4',
    name: 'Kabir Anand',
    company: 'BrightCare Solutions',
    initials: 'KA',
    avatarColor: 'bg-[#d97706]',
    time: '03:30 PM',
    actionType: 'call',
  },
  {
    id: 'f-5',
    name: 'Meera Shah',
    company: 'Vertex Innovations',
    initials: 'MS',
    avatarColor: 'bg-[#10b981]',
    time: '05:00 PM',
    actionType: 'email',
  },
]

const SEED_ACTIVITIES: CrmActivity[] = [
  {
    id: 'act-1',
    type: 'deal_stage',
    title: 'Deal stage updated',
    description: 'Meera Shah - moved to Negotiation',
    time: '10 min ago',
    icon: 'zap',
    color: 'amber',
  },
  {
    id: 'act-2',
    type: 'lead_new',
    title: 'New lead added',
    description: 'AI Automation Enquiry - from Website',
    time: '28 min ago',
    icon: 'userPlus',
    color: 'blue',
  },
  {
    id: 'act-3',
    type: 'followup_done',
    title: 'Follow-up completed',
    description: 'Studio North - Call (Interested)',
    time: '1 hour ago',
    icon: 'checkCircle',
    color: 'green',
  },
  {
    id: 'act-4',
    type: 'proposal',
    title: 'Proposal sent',
    description: 'Kabir Anand - Mailora SaaS',
    time: '2 hours ago',
    icon: 'fileText',
    color: 'purple',
  },
  {
    id: 'act-5',
    type: 'deal_won',
    title: 'Deal won',
    description: 'Dev Patel - ₹85,000',
    time: '3 hours ago',
    icon: 'trophy',
    color: 'amber',
  },
]

export async function getCrmOverview(): Promise<CrmOverview> {
  return {
    stats: {
      totalLeads: {
        label: 'Total Leads',
        value: '1,284',
        badge: '+12.8%',
        subtext: 'vs. 1,138 last period',
        spark: [20, 24, 23, 28, 30, 34, 38, 42, 45, 50],
      },
      newLeads: {
        label: 'New Leads',
        value: '86',
        badge: '+8.4%',
        subtext: 'vs. 79 last period',
        spark: [12, 14, 16, 15, 19, 22, 25, 27, 29, 32],
      },
      qualifiedLeads: {
        label: 'Qualified Leads',
        value: '342',
        badge: '26.6%',
        subtext: 'of total leads',
        spark: [25, 28, 30, 31, 33, 35, 38, 41, 44, 48],
      },
      activeDeals: {
        label: 'Active Deals',
        value: '48',
        badge: '',
        subtext: 'open opportunities',
        spark: [15, 17, 18, 20, 22, 23, 26, 28, 30, 33],
      },
      pipelineValue: {
        label: 'Pipeline Value',
        value: '₹18.6L',
        badge: '+14.2%',
        subtext: 'Total value of open deals',
        spark: [18, 22, 25, 27, 29, 32, 36, 40, 44, 49],
      },
      weightedPipeline: {
        label: 'Weighted Pipeline',
        value: '₹9.2L',
        badge: '+11.6%',
        subtext: 'Based on deal probability',
        spark: [10, 13, 15, 16, 18, 20, 23, 25, 28, 30],
      },
      wonRevenue: {
        label: 'Won Revenue',
        value: '₹4.8L',
        badge: '+22.5%',
        subtext: 'from 26 closed deals',
        spark: [14, 16, 19, 21, 23, 27, 30, 33, 37, 42],
      },
      pendingFollowUps: {
        label: 'Pending Follow-ups',
        value: '17',
        badge: '4 overdue',
        subtext: 'follow-ups require attention',
        spark: [30, 28, 26, 29, 27, 25, 24, 22, 20, 17],
      },
    },
    pipeline: SEED_PIPELINE,
    leads: SEED_LEADS,
    todayFollowUps: SEED_FOLLOWUPS,
    recentActivities: SEED_ACTIVITIES,
    leadTrend: {
      period: 'Last 6 Months',
      labels: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
      values: [60, 110, 175, 230, 275, 320],
    },
    wonVsLost: {
      total: 34,
      won: 26,
      lost: 8,
      wonPct: '76.5%',
      lostPct: '23.5%',
    },
    leadsBySource: [
      { source: 'Website Contact Form', pct: 32.4, color: '#0f172a' },
      { source: 'WhatsApp', pct: 18.9, color: '#1e3a8a' },
      { source: 'LinkedIn', pct: 14.6, color: '#2563eb' },
      { source: 'Google Ads', pct: 12.8, color: '#38bdf8' },
      { source: 'Instagram', pct: 8.5, color: '#93c5fd' },
      { source: 'Other Sources', pct: 12.8, color: '#cbd5e1' },
    ],
    counts: {
      allLeads: 1284,
      contacts: 618,
      companies: 312,
      deals: 48,
      followUps: 17,
      tasks: 29,
    },
  }
}
