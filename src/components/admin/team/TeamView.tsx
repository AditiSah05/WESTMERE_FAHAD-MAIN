'use client'

import { useState } from 'react'
import type { Role } from '@/lib/admin/permissions'
import type { AttemptRow, AuditRow, TeamInvite, TeamUser } from '@/lib/server/team'
import PageHeader from '../ui/PageHeader'
import Tabs from '../ui/Tabs'
import { ActivityTab, HistoryTab, InvitesTab } from './LogTabs'
import RolesTab from './RolesTab'
import UsersTab from './UsersTab'

type Props = { me: { id: string; role: Role }; canWrite: boolean; users: TeamUser[]; invites: TeamInvite[]; attempts: AttemptRow[]; audit: AuditRow[] }

const tabs = [
  { key: 'users', label: 'Admin users' }, { key: 'roles', label: 'Roles & permissions' }, { key: 'invites', label: 'Invitations' },
  { key: 'logins', label: 'Login history' }, { key: 'activity', label: 'Activity log' },
]

export default function TeamView({ me, canWrite, users, invites, attempts, audit }: Props) {
  const [tab, setTab] = useState('users')
  return (
    <>
      <PageHeader title="Team & Permissions" subtitle="Who can sign in, what they can do, and a record of what happened." />
      <Tabs tabs={tabs} active={tab} onChange={setTab} />
      {tab === 'users' && <UsersTab me={me} canWrite={canWrite} users={users} />}
      {tab === 'roles' && <RolesTab />}
      {tab === 'invites' && <InvitesTab invites={invites} canWrite={canWrite} />}
      {tab === 'logins' && <HistoryTab attempts={attempts} />}
      {tab === 'activity' && <ActivityTab audit={audit} />}
    </>
  )
}
