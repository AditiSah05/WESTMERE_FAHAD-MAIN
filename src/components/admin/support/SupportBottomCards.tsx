'use client'

import {
  Layers,
  Calendar,
  Users,
  ArrowRight,
  Monitor,
} from 'lucide-react'
import type {
  ActiveProject,
  UpcomingDeadline,
  TeamMember,
} from '@/lib/server/support-projects'

export default function SupportBottomCards({
  projects,
  deadlines,
  team,
  onViewProjects,
  onViewDeadlines,
  onViewTeam,
}: {
  projects: ActiveProject[]
  deadlines: UpcomingDeadline[]
  team: TeamMember[]
  onViewProjects: () => void
  onViewDeadlines: () => void
  onViewTeam: () => void
}) {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
      {/* 1. Active Projects (8) */}
      <div className="flex flex-col justify-between rounded-xl border border-slate-200/90 bg-white p-4 shadow-sm lg:col-span-4">
        <div>
          <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
              <Layers size={14} className="text-amber-500" />
              Active Projects (8)
            </div>
            <button
              type="button"
              onClick={onViewProjects}
              className="inline-flex items-center gap-0.5 text-[11px] font-medium text-amber-700 hover:text-amber-800"
            >
              View All
              <ArrowRight size={11} />
            </button>
          </div>

          <div className="mt-3.5 space-y-3">
            {projects.map((proj) => (
              <div
                key={proj.id}
                className="rounded-lg border border-slate-100 bg-slate-50/50 p-3 transition hover:bg-slate-50"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                      {proj.icon === 'monitor' ? (
                        <Monitor size={16} />
                      ) : (
                        <Layers size={16} />
                      )}
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-slate-900">
                        {proj.name}
                      </h3>
                      <p className="text-[11px] text-slate-500">
                        {proj.client} • {proj.type}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-bold text-slate-900">
                      {proj.progress}%
                    </span>
                    <div className="text-[10px] text-slate-400">
                      {proj.dueDate}
                    </div>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      proj.progress >= 70 ? 'bg-emerald-500' : 'bg-amber-500'
                    }`}
                    style={{ width: `${proj.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Upcoming Deadlines */}
      <div className="flex flex-col justify-between rounded-xl border border-slate-200/90 bg-white p-4 shadow-sm lg:col-span-4">
        <div>
          <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
              <Calendar size={14} className="text-amber-500" />
              Upcoming Deadlines
            </div>
            <button
              type="button"
              onClick={onViewDeadlines}
              className="inline-flex items-center gap-0.5 text-[11px] font-medium text-amber-700 hover:text-amber-800"
            >
              View All
              <ArrowRight size={11} />
            </button>
          </div>

          <div className="relative mt-3.5 pl-4">
            {/* Connecting Vertical Line */}
            <div className="absolute bottom-2 left-1.5 top-2 w-0.5 bg-slate-200" />

            <div className="space-y-4">
              {deadlines.map((dl) => (
                <div key={dl.id} className="relative flex items-center justify-between gap-2">
                  {/* Dot */}
                  <div className="absolute -left-4 top-1.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-amber-500 shadow-xs" />

                  <div className="min-w-0 flex-1 pl-1">
                    <h4 className="truncate text-xs font-bold text-slate-900">
                      {dl.title}
                    </h4>
                    <p className="truncate text-[11px] text-slate-500">
                      {dl.project}
                    </p>
                  </div>

                  {/* Date badge */}
                  <div>
                    {dl.urgency === 'critical' && (
                      <span className="rounded-md border border-rose-200 bg-rose-50 px-2 py-0.5 text-[10px] font-bold text-rose-700">
                        {dl.dateLabel}
                      </span>
                    )}
                    {dl.urgency === 'warning' && (
                      <span className="rounded-md border border-amber-200 bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-700">
                        {dl.dateLabel}
                      </span>
                    )}
                    {dl.urgency === 'normal' && (
                      <span className="rounded-md border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                        {dl.dateLabel}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Team Workload */}
      <div className="flex flex-col justify-between rounded-xl border border-slate-200/90 bg-white p-4 shadow-sm lg:col-span-4">
        <div>
          <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
              <Users size={14} className="text-amber-500" />
              Team Workload
            </div>
            <button
              type="button"
              onClick={onViewTeam}
              className="inline-flex items-center gap-0.5 text-[11px] font-medium text-amber-700 hover:text-amber-800"
            >
              View All
              <ArrowRight size={11} />
            </button>
          </div>

          <div className="mt-3.5 space-y-3">
            {team.map((member) => (
              <div key={member.id} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div
                      className={`flex h-6 w-6 items-center justify-center rounded-full text-[9px] font-bold ${member.avatarBg} ${member.avatarText}`}
                    >
                      {member.initials}
                    </div>
                    <div>
                      <span className="font-semibold text-slate-900">
                        {member.name}
                      </span>
                      <span className="ml-1.5 text-[10px] text-slate-400">
                        {member.role}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-medium text-slate-500">
                      {member.tasksCount} tasks
                    </span>
                    <span className="w-7 text-right text-[11px] font-bold text-slate-700">
                      {member.capacityPercent}%
                    </span>
                  </div>
                </div>

                {/* Workload Progress Bar */}
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      member.capacityPercent >= 70
                        ? 'bg-emerald-500'
                        : member.capacityPercent >= 50
                        ? 'bg-[#c4943d]'
                        : 'bg-sky-500'
                    }`}
                    style={{ width: `${member.capacityPercent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
