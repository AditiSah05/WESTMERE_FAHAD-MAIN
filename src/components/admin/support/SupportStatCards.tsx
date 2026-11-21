'use client'

import {
  Headphones,
  FolderOpen,
  RefreshCw,
  Users,
  AlertTriangle,
  Layers,
  Calendar,
  CheckCircle,
  ChevronRight,
} from 'lucide-react'
import type { SupportStats } from '@/lib/server/support-projects'

export default function SupportStatCards({
  stats,
  onCardClick,
}: {
  stats: SupportStats
  onCardClick?: (metric: string) => void
}) {
  const cards = [
    {
      id: 'total',
      label: 'Total Tickets',
      value: stats.totalTickets,
      subtext: stats.totalGrowth,
      subtextColor: 'text-emerald-600',
      icon: Headphones,
      iconBg: 'bg-amber-50',
      iconColor: 'text-amber-600',
    },
    {
      id: 'open',
      label: 'Open Tickets',
      value: stats.openTickets,
      subtext: stats.openGrowth,
      subtextColor: 'text-emerald-600',
      icon: FolderOpen,
      iconBg: 'bg-amber-50',
      iconColor: 'text-amber-500',
    },
    {
      id: 'in-progress',
      label: 'In Progress',
      value: stats.inProgress,
      subtext: stats.inProgressGrowth,
      subtextColor: 'text-emerald-600',
      icon: RefreshCw,
      iconBg: 'bg-blue-50',
      iconColor: 'text-blue-500',
    },
    {
      id: 'awaiting-client',
      label: 'Awaiting Client',
      value: stats.awaitingClient,
      subtext: stats.awaitingGrowth,
      subtextColor: 'text-rose-600',
      icon: Users,
      iconBg: 'bg-orange-50',
      iconColor: 'text-orange-500',
    },
    {
      id: 'high-priority',
      label: 'High Priority',
      value: stats.highPriority,
      subtext: stats.highPriorityGrowth,
      subtextColor: 'text-rose-600',
      icon: AlertTriangle,
      iconBg: 'bg-red-50',
      iconColor: 'text-red-500',
    },
    {
      id: 'active-projects',
      label: 'Active Projects',
      value: stats.activeProjects,
      subtext: stats.activeProjectsGrowth,
      subtextColor: 'text-emerald-600',
      icon: Layers,
      iconBg: 'bg-slate-100',
      iconColor: 'text-slate-700',
    },
    {
      id: 'overdue-tasks',
      label: 'Overdue Tasks',
      value: stats.overdueTasks,
      subtext: stats.overdueTasksGrowth,
      subtextColor: 'text-emerald-600',
      icon: Calendar,
      iconBg: 'bg-rose-50',
      iconColor: 'text-rose-500',
    },
    {
      id: 'completed-projects',
      label: 'Completed Projects',
      value: stats.completedProjects,
      subtext: stats.completedProjectsGrowth,
      subtextColor: 'text-emerald-600',
      icon: CheckCircle,
      iconBg: 'bg-emerald-50',
      iconColor: 'text-emerald-600',
    },
  ]

  return (
    <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((c) => {
        const Icon = c.icon
        return (
          <div
            key={c.id}
            onClick={() => onCardClick?.(c.id)}
            className="group flex cursor-pointer items-center justify-between rounded-xl border border-slate-200/90 bg-white p-4 shadow-sm transition hover:border-slate-300 hover:shadow-md"
          >
            <div className="flex items-start gap-3">
              <div
                className={`flex h-9 w-9 flex-none items-center justify-center rounded-lg ${c.iconBg} ${c.iconColor}`}
              >
                <Icon size={18} />
              </div>
              <div>
                <span className="text-xs font-semibold text-slate-600">
                  {c.label}
                </span>
                <div className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
                  {c.value}
                </div>
                <div className={`mt-0.5 text-[11px] font-medium ${c.subtextColor}`}>
                  {c.subtext}
                </div>
              </div>
            </div>

            <ChevronRight
              size={16}
              className="text-slate-300 transition-transform group-hover:translate-x-0.5 group-hover:text-slate-500"
            />
          </div>
        )
      })}
    </div>
  )
}
