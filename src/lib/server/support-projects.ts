export type SupportTicket = {
  id: string
  client: string
  clientAvatar: string
  avatarBg: string
  avatarText: string
  subject: string
  category: 'Technical Support' | 'Website Issue' | 'Software Support' | 'Payment Issue' | 'Account & Login'
  assignee: string
  assigneeInitials: string
  assigneeBg: string
  assigneeText: string
  priority: 'High' | 'Medium' | 'Low' | 'Critical'
  status: 'Open' | 'In Progress' | 'Resolved' | 'Awaiting Internal' | 'Awaiting Client'
  updated: string
  description?: string
}

export type SupportStats = {
  totalTickets: number
  totalGrowth: string
  openTickets: number
  openGrowth: string
  inProgress: number
  inProgressGrowth: string
  awaitingClient: number
  awaitingGrowth: string
  highPriority: number
  highPriorityGrowth: string
  activeProjects: number
  activeProjectsGrowth: string
  overdueTasks: number
  overdueTasksGrowth: string
  completedProjects: number
  completedProjectsGrowth: string
}

export type ActiveProject = {
  id: string
  name: string
  client: string
  type: string
  progress: number
  dueDate: string
  icon: 'monitor' | 'layers'
}

export type UpcomingDeadline = {
  id: string
  title: string
  project: string
  dateLabel: string
  urgency: 'critical' | 'warning' | 'normal'
}

export type TeamMember = {
  id: string
  name: string
  role: string
  initials: string
  avatarBg: string
  avatarText: string
  tasksCount: number
  capacityPercent: number
}

export type BugReport = {
  id: string
  product: string
  summary: string
  status: 'Open' | 'In Progress' | 'Resolved'
  severity: 'Critical' | 'Major' | 'Minor'
}

export type CustomOrder = {
  id: string
  client: string
  brief: string
  budget: number
  status: 'Pending' | 'In Progress' | 'Completed'
  deadline: string
}

export const SEED_SUPPORT_TICKETS: SupportTicket[] = [
  {
    id: '#T-212',
    client: 'Studio North',
    clientAvatar: 'SN',
    avatarBg: 'bg-blue-100',
    avatarText: 'text-blue-700',
    subject: 'License expired early',
    category: 'Technical Support',
    assignee: 'A. Khan',
    assigneeInitials: 'AK',
    assigneeBg: 'bg-red-100',
    assigneeText: 'text-red-700',
    priority: 'High',
    status: 'Open',
    updated: '12 min ago',
    description: 'The Studio North Mailora license key appears to show expired 3 days prior to monthly billing renewal.',
  },
  {
    id: '#T-211',
    client: 'Zoya Khan',
    clientAvatar: 'ZK',
    avatarBg: 'bg-purple-100',
    avatarText: 'text-purple-700',
    subject: 'Website form not submitting',
    category: 'Website Issue',
    assignee: 'R. Mehta',
    assigneeInitials: 'RM',
    assigneeBg: 'bg-amber-100',
    assigneeText: 'text-amber-700',
    priority: 'Medium',
    status: 'In Progress',
    updated: '35 min ago',
    description: 'Contact form on the agency template fails to trigger success modal on mobile browsers.',
  },
  {
    id: '#T-210',
    client: 'Aarav Mehta',
    clientAvatar: 'AM',
    avatarBg: 'bg-emerald-100',
    avatarText: 'text-emerald-700',
    subject: 'CSV import question',
    category: 'Software Support',
    assignee: 'S. Kapoor',
    assigneeInitials: 'SK',
    assigneeBg: 'bg-sky-100',
    assigneeText: 'text-sky-700',
    priority: 'Low',
    status: 'Resolved',
    updated: '2 hours ago',
    description: 'Assistance requested with UTF-8 character encoding on customer list bulk upload.',
  },
  {
    id: '#T-209',
    client: 'Meera Shah',
    clientAvatar: 'MS',
    avatarBg: 'bg-amber-100',
    avatarText: 'text-amber-700',
    subject: 'Checkout payment mismatch',
    category: 'Payment Issue',
    assignee: 'A. Khan',
    assigneeInitials: 'AK',
    assigneeBg: 'bg-red-100',
    assigneeText: 'text-red-700',
    priority: 'Critical',
    status: 'Awaiting Internal',
    updated: '3 hours ago',
    description: 'Stripe webhook retry caused double ledger entry on annual enterprise plan checkout.',
  },
  {
    id: '#T-208',
    client: 'Kabir Anand',
    clientAvatar: 'KA',
    avatarBg: 'bg-sky-100',
    avatarText: 'text-sky-700',
    subject: 'CRM login access',
    category: 'Account & Login',
    assignee: 'R. Mehta',
    assigneeInitials: 'RM',
    assigneeBg: 'bg-purple-100',
    assigneeText: 'text-purple-700',
    priority: 'Medium',
    status: 'Awaiting Client',
    updated: 'Yesterday',
    description: 'Invitation link expired for secondary administrator role.',
  },
  {
    id: '#T-207',
    client: 'Dev Patel',
    clientAvatar: 'DP',
    avatarBg: 'bg-teal-100',
    avatarText: 'text-teal-700',
    subject: 'API rate limit threshold',
    category: 'Technical Support',
    assignee: 'S. Kapoor',
    assigneeInitials: 'SK',
    assigneeBg: 'bg-sky-100',
    assigneeText: 'text-sky-700',
    priority: 'Medium',
    status: 'Open',
    updated: 'Yesterday',
    description: 'Need increase in burst limit for automation webhook endpoint.',
  },
  {
    id: '#T-206',
    client: 'Ananya Sharma',
    clientAvatar: 'AS',
    avatarBg: 'bg-pink-100',
    avatarText: 'text-pink-700',
    subject: 'Domain SSL certificate renew',
    category: 'Website Issue',
    assignee: 'R. Mehta',
    assigneeInitials: 'RM',
    assigneeBg: 'bg-amber-100',
    assigneeText: 'text-amber-700',
    priority: 'High',
    status: 'Resolved',
    updated: '2 days ago',
    description: 'Cloudflare SSL edge certificate revalidation after DNS change.',
  },
]

export const SUPPORT_STATS: SupportStats = {
  totalTickets: 48,
  totalGrowth: '↑ +12% vs previous period',
  openTickets: 12,
  openGrowth: '↑ +9% Requires attention',
  inProgress: 9,
  inProgressGrowth: '↑ +13% Currently being worked on',
  awaitingClient: 6,
  awaitingGrowth: '↓ -8% Waiting for client response',
  highPriority: 4,
  highPriorityGrowth: '↑ +33% Critical & high priority tickets',
  activeProjects: 8,
  activeProjectsGrowth: '↑ +14% Ongoing development projects',
  overdueTasks: 3,
  overdueTasksGrowth: '↓ -25% Tasks past their due date',
  completedProjects: 21,
  completedProjectsGrowth: '↑ +20% Successfully delivered projects',
}

export const ACTIVE_PROJECTS: ActiveProject[] = [
  {
    id: 'proj-1',
    name: 'Agency Website Redesign',
    client: 'Studio North',
    type: 'Web Development',
    progress: 72,
    dueDate: 'Due: 26 Nov',
    icon: 'monitor',
  },
  {
    id: 'proj-2',
    name: 'Mailora Dashboard Upgrade',
    client: 'Internal',
    type: 'SaaS Development',
    progress: 45,
    dueDate: 'Due: 30 Nov',
    icon: 'layers',
  },
]

export const UPCOMING_DEADLINES: UpcomingDeadline[] = [
  {
    id: 'dead-1',
    title: 'CRM integration review',
    project: 'Agency Website Redesign',
    dateLabel: '24 Nov',
    urgency: 'critical',
  },
  {
    id: 'dead-2',
    title: 'Website QA handoff',
    project: 'Mailora Dashboard Upgrade',
    dateLabel: '26 Nov',
    urgency: 'warning',
  },
  {
    id: 'dead-3',
    title: 'Ticket response SLA',
    project: 'Multiple Tickets (3)',
    dateLabel: 'Today',
    urgency: 'normal',
  },
]

export const TEAM_WORKLOAD: TeamMember[] = [
  {
    id: 'team-1',
    name: 'A. Khan',
    role: 'Project Manager',
    initials: 'AK',
    avatarBg: 'bg-red-100',
    avatarText: 'text-red-700',
    tasksCount: 12,
    capacityPercent: 75,
  },
  {
    id: 'team-2',
    name: 'R. Mehta',
    role: 'Senior Developer',
    initials: 'RM',
    avatarBg: 'bg-amber-100',
    avatarText: 'text-amber-700',
    tasksCount: 9,
    capacityPercent: 56,
  },
  {
    id: 'team-3',
    name: 'S. Kapoor',
    role: 'Full Stack Developer',
    initials: 'SK',
    avatarBg: 'bg-sky-100',
    avatarText: 'text-sky-700',
    tasksCount: 7,
    capacityPercent: 44,
  },
]

export const SEED_BUG_REPORTS: BugReport[] = [
  {
    id: 'B-45',
    product: 'Mailora Chrome Extension',
    summary: 'Gmail compose window not detected on first load',
    status: 'In Progress',
    severity: 'Major',
  },
  {
    id: 'B-44',
    product: 'SEO Dashboard App',
    summary: 'Chart tooltip clipped on mobile devices',
    status: 'Open',
    severity: 'Minor',
  },
]

export const SEED_CUSTOM_ORDERS: CustomOrder[] = [
  {
    id: 'ORD-CUST-101',
    client: 'Meera Shah',
    brief: 'Brand website with CMS, 8 pages + dark mode',
    budget: 25000,
    status: 'In Progress',
    deadline: '28 Nov 2026',
  },
  {
    id: 'ORD-CUST-102',
    client: 'Velora Interiors',
    brief: 'Portfolio gallery + custom booking integration',
    budget: 40000,
    status: 'Pending',
    deadline: '15 Dec 2026',
  },
]
