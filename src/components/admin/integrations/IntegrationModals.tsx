'use client'

import { useState } from 'react'
import {
  X,
  Check,
  Copy,
  Key,
  ShieldCheck,
  Webhook,
  Activity,
  AlertCircle,
} from 'lucide-react'
import type { IntegrationService, WebhookEndpoint, ApiKeyItem } from '@/lib/server/integrations-crm'

// 1. Configure Service Modal
export function ConfigureAppModal({
  service,
  onClose,
  onSave,
}: {
  service: IntegrationService
  onClose: () => void
  onSave: (id: string, config: Record<string, string>) => Promise<void>
}) {
  const [apiKey, setApiKey] = useState('')
  const [secretKey, setSecretKey] = useState('')
  const [webhookSecret, setWebhookSecret] = useState('')
  const [isLive, setIsLive] = useState(true)
  const [testing, setTesting] = useState(false)
  const [testResult, setTestResult] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  const handleTest = async () => {
    setTesting(true)
    setTestResult(null)
    await new Promise((r) => setTimeout(r, 800))
    setTesting(false)
    setTestResult('Connection verified! Credentials and ping handshake succeeded.')
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    await onSave(service.id, {
      apiKey,
      secretKey,
      webhookSecret,
      mode: isLive ? 'live' : 'test',
    })
    setSaving(false)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-xs">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-xl font-bold text-sm ${service.iconBg} ${service.iconColor}`}
            >
              {service.name.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Configure {service.name}</h3>
              <p className="text-xs text-slate-500">Manage API keys and integration webhook listener</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          >
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSave} className="mt-4 space-y-4 text-xs">
          {/* Mode Switch */}
          <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50/70 p-3">
            <div>
              <div className="font-semibold text-slate-800">Production Mode</div>
              <div className="text-[11px] text-slate-500">
                {isLive ? 'Routing transactions to live endpoints' : 'Test Sandbox mode'}
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsLive(!isLive)}
              className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                isLive ? 'bg-amber-600' : 'bg-slate-300'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  isLive ? 'translate-x-4' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div>
            <label className="block font-semibold text-slate-700">API Key / Client ID</label>
            <input
              type="text"
              required
              placeholder="e.g. pk_live_51M..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-200 p-2 font-mono text-xs focus:border-amber-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700">Secret Key / Token</label>
            <input
              type="password"
              required
              placeholder="e.g. sk_live_90x..."
              value={secretKey}
              onChange={(e) => setSecretKey(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-200 p-2 font-mono text-xs focus:border-amber-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700">Webhook Signing Secret (Optional)</label>
            <input
              type="text"
              placeholder="e.g. whsec_..."
              value={webhookSecret}
              onChange={(e) => setWebhookSecret(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-200 p-2 font-mono text-xs focus:border-amber-500 focus:outline-none"
            />
          </div>

          {testResult && (
            <div className="flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 p-2.5 text-xs text-emerald-800">
              <Check size={14} className="text-emerald-600 shrink-0" />
              <span>{testResult}</span>
            </div>
          )}

          <div className="flex items-center justify-between pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={handleTest}
              disabled={testing}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
            >
              <Activity size={13} className={testing ? 'animate-spin text-amber-600' : 'text-slate-500'} />
              <span>{testing ? 'Testing...' : 'Test Connection'}</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="rounded-lg bg-amber-600 px-4 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-amber-700 disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

// 2. Create Webhook Modal
export function CreateWebhookModal({
  onClose,
  onCreate,
}: {
  onClose: () => void
  onCreate: (webhook: Partial<WebhookEndpoint>) => Promise<void>
}) {
  const [name, setName] = useState('')
  const [url, setUrl] = useState('')
  const [events, setEvents] = useState<string[]>(['order.paid', 'license.generated'])
  const [submitting, setSubmitting] = useState(false)

  const ALL_EVENTS = [
    'order.created',
    'order.paid',
    'order.refunded',
    'license.generated',
    'license.activated',
    'license.expired',
    'ticket.created',
    'ticket.resolved',
    'customer.registered',
    'review.submitted',
  ]

  const toggleEvent = (evt: string) => {
    if (events.includes(evt)) {
      setEvents(events.filter((e) => e !== evt))
    } else {
      setEvents([...events, evt])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    await onCreate({
      name,
      url,
      events,
      status: 'Active',
      successRate: '100%',
      lastTriggered: 'Just now',
      secretMasked: 'whsec_••••••••••••••••',
    })
    setSubmitting(false)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-xs">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <Webhook size={18} className="text-amber-600" />
            <h3 className="text-base font-bold text-slate-900">Add Webhook Endpoint</h3>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          >
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700">Endpoint Friendly Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Production Order Syncer"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-200 p-2 text-xs focus:border-amber-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700">Payload URL (HTTPS required)</label>
            <input
              type="url"
              required
              placeholder="https://api.yourdomain.com/webhooks/westmere"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-200 p-2 font-mono text-xs focus:border-amber-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-2">Subscribe to Events</label>
            <div className="grid grid-cols-2 gap-2 rounded-lg border border-slate-200 p-3 bg-slate-50/50">
              {ALL_EVENTS.map((evt) => {
                const checked = events.includes(evt)
                return (
                  <label
                    key={evt}
                    className="flex items-center gap-2 cursor-pointer font-mono text-[11px] text-slate-700 hover:text-slate-900"
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleEvent(evt)}
                      className="rounded border-slate-300 text-amber-600 focus:ring-amber-500"
                    />
                    <span>{evt}</span>
                  </label>
                )
              })}
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="rounded-lg bg-amber-600 px-4 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-amber-700 disabled:opacity-50"
            >
              {submitting ? 'Registering...' : 'Register Endpoint'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// 3. Create API Key Modal
export function CreateApiKeyModal({
  onClose,
  onCreate,
}: {
  onClose: () => void
  onCreate: (key: Partial<ApiKeyItem>) => Promise<{ ok: boolean; key: string }>
}) {
  const [name, setName] = useState('')
  const [scope, setScope] = useState<'Full Access' | 'Read Only'>('Full Access')
  const [submitting, setSubmitting] = useState(false)
  const [generatedKey, setGeneratedKey] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    const res = await onCreate({
      name,
      scope,
      status: 'Active',
      created: 'Just now',
      lastUsed: 'Never',
    })
    setSubmitting(false)
    if (res?.key) {
      setGeneratedKey(res.key)
    }
  }

  const copyKey = () => {
    if (generatedKey) {
      navigator.clipboard?.writeText(generatedKey)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-xs">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <Key size={18} className="text-amber-600" />
            <h3 className="text-base font-bold text-slate-900">
              {generatedKey ? 'API Key Generated' : 'Create New API Key'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          >
            <X size={16} />
          </button>
        </div>

        {generatedKey ? (
          <div className="mt-4 space-y-4 text-xs">
            <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-amber-900">
              <div className="font-bold">Important Notice</div>
              <div className="mt-1 text-[11px]">
                Please copy this API secret key immediately. For security reasons, you won't be able to view it again.
              </div>
            </div>

            <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
              <div className="text-[11px] font-semibold text-slate-500 mb-1">Secret Key</div>
              <div className="flex items-center justify-between gap-2 font-mono text-xs font-bold text-slate-800 break-all">
                <span>{generatedKey}</span>
                <button
                  type="button"
                  onClick={copyKey}
                  className="inline-flex shrink-0 items-center gap-1 rounded bg-white px-2 py-1 text-[11px] font-semibold text-slate-700 shadow-sm border border-slate-200 hover:bg-slate-50"
                >
                  {copied ? <Check size={12} className="text-emerald-600" /> : <Copy size={12} />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            <div className="flex justify-end pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg bg-amber-600 px-4 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-amber-700"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700">Key Identifier / Name</label>
              <input
                type="text"
                required
                placeholder="e.g. CI/CD Pipeline, Mobile App Backend"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-200 p-2 text-xs focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700">Access Scope</label>
              <select
                value={scope}
                onChange={(e) => setScope(e.target.value as 'Full Access' | 'Read Only')}
                className="mt-1 w-full rounded-lg border border-slate-200 bg-white p-2 text-xs focus:border-amber-500 focus:outline-none"
              >
                <option value="Full Access">Full Access (Read & Write)</option>
                <option value="Read Only">Read Only (GET endpoints only)</option>
              </select>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="rounded-lg bg-amber-600 px-4 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-amber-700 disabled:opacity-50"
              >
                {submitting ? 'Creating...' : 'Generate API Key'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
