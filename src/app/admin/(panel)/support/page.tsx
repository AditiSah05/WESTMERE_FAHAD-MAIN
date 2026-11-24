import { requireModule } from '@/lib/server/auth'
import SupportProjectsView from '@/components/admin/support/SupportProjectsView'
import {
  SEED_SUPPORT_TICKETS,
  SUPPORT_STATS,
  ACTIVE_PROJECTS,
  UPCOMING_DEADLINES,
  TEAM_WORKLOAD,
} from '@/lib/server/support-projects'

export const metadata = { title: 'Support & Projects' }
export const dynamic = 'force-dynamic'

export default async function Page() {
  await requireModule('support')

  return (
    <SupportProjectsView
      initialTickets={SEED_SUPPORT_TICKETS}
      stats={SUPPORT_STATS}
      projects={ACTIVE_PROJECTS}
      deadlines={UPCOMING_DEADLINES}
      team={TEAM_WORKLOAD}
    />
  )
}
