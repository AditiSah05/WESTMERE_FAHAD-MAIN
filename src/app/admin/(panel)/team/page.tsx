import TeamView from '@/components/admin/team/TeamView'
import { can } from '@/lib/admin/permissions'
import { requireModule } from '@/lib/server/auth'
import { listInvites, listUsers, recentAttempts, recentAudit } from '@/lib/server/team'

export const metadata = { title: 'Team & Permissions' }

export default async function Page() {
  const me = await requireModule('team')
  const [users, invites, attempts, audit] = await Promise.all([listUsers(), listInvites(), recentAttempts(), recentAudit()])
  return <TeamView me={{ id: me.userId, role: me.role }} canWrite={can(me.role, 'team', 'write')} users={users} invites={invites} attempts={attempts} audit={audit} />
}
