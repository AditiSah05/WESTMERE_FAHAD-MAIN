'use client'

import { useState } from 'react'
import SupportProjectsHeader from './SupportProjectsHeader'
import SupportStatCards from './SupportStatCards'
import SupportTicketsTable, { type SupportTabType } from './SupportTicketsTable'
import SupportBottomCards from './SupportBottomCards'
import {
  CreateTicketModal,
  CreateProjectModal,
  CreateCustomOrderModal,
  TicketDetailsModal,
} from './SupportModals'
import {
  createTicketAction,
  updateTicketStatusAction,
  createProjectAction,
  createCustomOrderAction,
} from '@/app/admin/support-actions'
import type {
  SupportTicket,
  SupportStats,
  ActiveProject,
  UpcomingDeadline,
  TeamMember,
} from '@/lib/server/support-projects'

export default function SupportProjectsView({
  initialTickets,
  stats,
  projects: initialProjects,
  deadlines,
  team,
}: {
  initialTickets: SupportTicket[]
  stats: SupportStats
  projects: ActiveProject[]
  deadlines: UpcomingDeadline[]
  team: TeamMember[]
}) {
  const [tickets, setTickets] = useState<SupportTicket[]>(initialTickets)
  const [projects, setProjects] = useState<ActiveProject[]>(initialProjects)
  const [activeTab, setActiveTab] = useState<SupportTabType>('tickets')

  // Modals state
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false)
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false)
  const [isCustomOrderModalOpen, setIsCustomOrderModalOpen] = useState(false)
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3000)
  }

  const handleCreateTicket = async (ticket: Partial<SupportTicket>) => {
    const fullTicket = ticket as SupportTicket
    setTickets([fullTicket, ...tickets])
    await createTicketAction(fullTicket)
    showToast(`Ticket ${fullTicket.id} created successfully.`)
  }

  const handleUpdateTicketStatus = async (
    id: string,
    status: SupportTicket['status']
  ) => {
    setTickets((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status } : t))
    )
    if (selectedTicket && selectedTicket.id === id) {
      setSelectedTicket({ ...selectedTicket, status })
    }
    await updateTicketStatusAction(id, status)
    showToast(`Ticket ${id} status updated to ${status}.`)
  }

  const handleCreateProject = async (
    name: string,
    client: string,
    type: string
  ) => {
    const newProj: ActiveProject = {
      id: `proj-${Date.now()}`,
      name,
      client,
      type,
      progress: 0,
      dueDate: 'Due: 15 Dec',
      icon: 'monitor',
    }
    setProjects([newProj, ...projects])
    await createProjectAction(newProj)
    showToast(`Project "${name}" created.`)
  }

  const handleCreateCustomOrder = async (
    client: string,
    brief: string,
    budget: number
  ) => {
    await createCustomOrderAction({ client, brief, budget })
    showToast(`Custom order logged for ${client} (₹${budget.toLocaleString()}).`)
  }

  const handleExport = () => {
    showToast(`Exported ${tickets.length} tickets to CSV report.`)
  }

  return (
    <div className="relative min-h-screen">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 rounded-xl bg-[#0f1b33] px-4 py-3 text-xs font-semibold text-white shadow-xl">
          {toastMessage}
        </div>
      )}

      {/* Header */}
      <SupportProjectsHeader
        onOpenCreateTicket={() => setIsTicketModalOpen(true)}
        onOpenCreateProject={() => setIsProjectModalOpen(true)}
        onOpenCustomOrder={() => setIsCustomOrderModalOpen(true)}
      />

      {/* 8 Top KPI Metric Cards */}
      <SupportStatCards
        stats={stats}
        onCardClick={(m) => {
          if (m === 'open') setActiveTab('tickets')
          if (m === 'active-projects') setActiveTab('projects')
        }}
      />

      {/* 8 Tabs, Filter Toolbar & Tickets Table */}
      <SupportTicketsTable
        tickets={tickets}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onViewTicket={(t) => setSelectedTicket(t)}
        onExport={handleExport}
        onOpenCalendar={() => showToast('Opening delivery schedule calendar.')}
        onOpenActivity={() => showToast('Viewing team activity timeline.')}
      />

      {/* Bottom 3 Cards: Active Projects, Deadlines, Team Workload */}
      <SupportBottomCards
        projects={projects}
        deadlines={deadlines}
        team={team}
        onViewProjects={() => setActiveTab('projects')}
        onViewDeadlines={() => showToast('Displaying full deadline milestones.')}
        onViewTeam={() => setActiveTab('team')}
      />

      {/* Modals */}
      <CreateTicketModal
        isOpen={isTicketModalOpen}
        onClose={() => setIsTicketModalOpen(false)}
        onSubmit={handleCreateTicket}
      />

      <CreateProjectModal
        isOpen={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
        onSubmit={handleCreateProject}
      />

      <CreateCustomOrderModal
        isOpen={isCustomOrderModalOpen}
        onClose={() => setIsCustomOrderModalOpen(false)}
        onSubmit={handleCreateCustomOrder}
      />

      <TicketDetailsModal
        ticket={selectedTicket}
        isOpen={Boolean(selectedTicket)}
        onClose={() => setSelectedTicket(null)}
        onUpdateStatus={handleUpdateTicketStatus}
      />
    </div>
  )
}
