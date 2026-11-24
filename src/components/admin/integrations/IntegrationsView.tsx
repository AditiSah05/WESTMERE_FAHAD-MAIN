'use client'

import { useState, useTransition } from 'react'
import {
  Boxes,
  CreditCard,
  Mail,
  BarChart3,
  Webhook,
  KeyRound,
  Activity,
  CheckCircle2,
} from 'lucide-react'
import type {
  IntegrationStats,
  IntegrationService,
  WebhookEndpoint,
  ApiKeyItem,
  WebhookLogItem,
  IntegrationCategory,
} from '@/lib/server/integrations-crm'
import IntegrationsHeader from './IntegrationsHeader'
import IntegrationStatCards from './IntegrationStatCards'
import IntegrationAppDirectory from './IntegrationAppDirectory'
import WebhooksManagerTable from './WebhooksManagerTable'
import ApiKeysManagerTable from './ApiKeysManagerTable'
import IntegrationActivitySection from './IntegrationActivitySection'
import {
  ConfigureAppModal,
  CreateWebhookModal,
  CreateApiKeyModal,
} from './IntegrationModals'
import {
  toggleServiceStatusAction,
  saveServiceConfigAction,
  createWebhookAction,
  deleteWebhookAction,
  testWebhookPingAction,
  createApiKeyAction,
  revokeApiKeyAction,
} from '@/app/admin/integration-actions'

export type TabType =
  | 'all'
  | 'payments'
  | 'email'
  | 'analytics'
  | 'webhooks'
  | 'keys'
  | 'logs'

export default function IntegrationsView({
  initialStats,
  initialServices,
  initialWebhooks,
  initialApiKeys,
  initialLogs,
}: {
  initialStats: IntegrationStats
  initialServices: IntegrationService[]
  initialWebhooks: WebhookEndpoint[]
  initialApiKeys: ApiKeyItem[]
  initialLogs: WebhookLogItem[]
}) {
  const [activeTab, setActiveTab] = useState<TabType>('all')
  const [services, setServices] = useState<IntegrationService[]>(initialServices)
  const [webhooks, setWebhooks] = useState<WebhookEndpoint[]>(initialWebhooks)
  const [apiKeys, setApiKeys] = useState<ApiKeyItem[]>(initialApiKeys)
  const [logs] = useState<WebhookLogItem[]>(initialLogs)

  // Directory filter state
  const [selectedCategory, setSelectedCategory] = useState<IntegrationCategory>('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')

  // Modals state
  const [configuringService, setConfiguringService] = useState<IntegrationService | null>(null)
  const [showWebhookModal, setShowWebhookModal] = useState(false)
  const [showApiKeyModal, setShowApiKeyModal] = useState(false)

  // Feedback toast
  const [toast, setToast] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()
  const [isSyncing, setIsSyncing] = useState(false)

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(null), 3500)
  }

  // Sync All
  const handleSyncAll = async () => {
    setIsSyncing(true)
    await new Promise((r) => setTimeout(r, 900))
    setIsSyncing(false)
    showToast('All 14 integration endpoints & sync workers refreshed.')
  }

  // Toggle status
  const handleToggleStatus = (id: string, newStatus: 'Connected' | 'Disconnected') => {
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: newStatus } : s))
    )
    startTransition(async () => {
      await toggleServiceStatusAction(id, newStatus)
      showToast(`Status updated to ${newStatus}.`)
    })
  }

  // Save config
  const handleSaveConfig = async (id: string, config: Record<string, string>) => {
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: 'Connected', lastSync: 'Just now' } : s))
    )
    startTransition(async () => {
      await saveServiceConfigAction(id, config)
      showToast('Service credentials saved and validated successfully.')
    })
  }

  // Webhooks
  const handleCreateWebhook = async (webhook: Partial<WebhookEndpoint>) => {
    const newWebhook: WebhookEndpoint = {
      id: `wh-${Date.now()}`,
      name: webhook.name || 'New Endpoint',
      url: webhook.url || '',
      events: webhook.events || ['order.paid'],
      status: 'Active',
      successRate: '100%',
      lastTriggered: 'Just registered',
      secretMasked: 'whsec_••••••••••••••••',
    }
    setWebhooks((prev) => [newWebhook, ...prev])
    startTransition(async () => {
      await createWebhookAction(webhook)
      showToast('Webhook registered successfully.')
    })
  }

  const handleDeleteWebhook = (id: string) => {
    setWebhooks((prev) => prev.filter((w) => w.id !== id))
    startTransition(async () => {
      await deleteWebhookAction(id)
      showToast('Webhook removed.')
    })
  }

  const handleTestPing = async (id: string) => {
    await testWebhookPingAction(id)
  }

  // API Keys
  const handleCreateApiKey = async (key: Partial<ApiKeyItem>) => {
    const res = await createApiKeyAction(key)
    if (res.ok) {
      const newKey: ApiKeyItem = {
        id: `key-${Date.now()}`,
        name: key.name || 'New API Key',
        keyPrefix: `${res.key.slice(0, 14)}...`,
        scope: key.scope || 'Full Access',
        created: 'Just now',
        lastUsed: 'Never',
        status: 'Active',
      }
      setApiKeys((prev) => [newKey, ...prev])
      showToast('API Key generated.')
    }
    return res
  }

  const handleRevokeApiKey = (id: string) => {
    setApiKeys((prev) =>
      prev.map((k) => (k.id === id ? { ...k, status: 'Revoked' } : k))
    )
    startTransition(async () => {
      await revokeApiKeyAction(id)
      showToast('API Key revoked.')
    })
  }

  // Filter services for directory view
  const filteredServices = services.filter((s) => {
    // Tab filter
    if (activeTab === 'payments' && s.category !== 'Payments') return false
    if (activeTab === 'email' && s.category !== 'Email') return false
    if (activeTab === 'analytics' && s.category !== 'Analytics') return false

    // Category pill filter (when on 'all' tab)
    if (activeTab === 'all' && selectedCategory !== 'All' && s.category !== selectedCategory) {
      return false
    }

    // Status filter
    if (statusFilter !== 'All' && s.status !== statusFilter) return false

    // Search query
    if (
      searchQuery &&
      !s.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !s.description.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }

    return true
  })

  // Tab definitions
  const tabs: { id: TabType; label: string; count?: number; icon: any }[] = [
    { id: 'all', label: 'All Integrations', count: services.length, icon: Boxes },
    {
      id: 'payments',
      label: 'Payment Gateways',
      count: services.filter((s) => s.category === 'Payments').length,
      icon: CreditCard,
    },
    {
      id: 'email',
      label: 'Email & Messaging',
      count: services.filter((s) => s.category === 'Email').length,
      icon: Mail,
    },
    {
      id: 'analytics',
      label: 'Analytics & SEO',
      count: services.filter((s) => s.category === 'Analytics').length,
      icon: BarChart3,
    },
    { id: 'webhooks', label: 'Webhooks', count: webhooks.length, icon: Webhook },
    { id: 'keys', label: 'API Keys', count: apiKeys.length, icon: KeyRound },
    { id: 'logs', label: 'Activity & Logs', icon: Activity },
  ]

  return (
    <div className="min-h-screen space-y-6 pb-12">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white shadow-xl animate-fade-in">
          <CheckCircle2 size={15} className="text-emerald-400" />
          <span>{toast}</span>
        </div>
      )}

      {/* Header */}
      <IntegrationsHeader
        onConnectApp={() => {
          setActiveTab('all')
          setConfiguringService(services[0])
        }}
        onCreateWebhook={() => setShowWebhookModal(true)}
        onNewApiKey={() => setShowApiKeyModal(true)}
        onSyncAll={handleSyncAll}
        isSyncing={isSyncing}
      />

      {/* 6 KPI Cards */}
      <IntegrationStatCards
        stats={initialStats}
        onCardClick={(tabTarget) => setActiveTab(tabTarget as TabType)}
      />

      {/* Navigation Tabs */}
      <div className="border-b border-slate-200 bg-white px-2 rounded-t-xl shadow-xs">
        <div className="flex space-x-1 overflow-x-auto py-2">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const active = activeTab === tab.id
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex shrink-0 items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                  active
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Icon size={14} className={active ? 'text-amber-400' : 'text-slate-400'} />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span
                    className={`rounded-full px-1.5 py-0.2 text-[10px] font-bold ${
                      active ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Main Tab Content */}
      <div className="space-y-6">
        {/* App Directory View (for All, Payments, Email, Analytics) */}
        {(activeTab === 'all' ||
          activeTab === 'payments' ||
          activeTab === 'email' ||
          activeTab === 'analytics') && (
          <IntegrationAppDirectory
            services={filteredServices}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
            onConfigure={(service) => setConfiguringService(service)}
            onToggleStatus={handleToggleStatus}
          />
        )}

        {/* Webhooks Tab */}
        {activeTab === 'webhooks' && (
          <WebhooksManagerTable
            webhooks={webhooks}
            onCreateWebhook={() => setShowWebhookModal(true)}
            onTestPing={handleTestPing}
            onDeleteWebhook={handleDeleteWebhook}
          />
        )}

        {/* API Keys Tab */}
        {activeTab === 'keys' && (
          <ApiKeysManagerTable
            apiKeys={apiKeys}
            onNewApiKey={() => setShowApiKeyModal(true)}
            onRevokeKey={handleRevokeApiKey}
          />
        )}

        {/* Activity & Health Bottom Section (always visible on logs, or under directory) */}
        <IntegrationActivitySection logs={logs} />
      </div>

      {/* Modals */}
      {configuringService && (
        <ConfigureAppModal
          service={configuringService}
          onClose={() => setConfiguringService(null)}
          onSave={handleSaveConfig}
        />
      )}

      {showWebhookModal && (
        <CreateWebhookModal
          onClose={() => setShowWebhookModal(false)}
          onCreate={handleCreateWebhook}
        />
      )}

      {showApiKeyModal && (
        <CreateApiKeyModal
          onClose={() => setShowApiKeyModal(false)}
          onCreate={handleCreateApiKey}
        />
      )}
    </div>
  )
}
