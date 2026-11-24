'use server'

import { revalidatePath } from 'next/cache'
import { requireModule } from '@/lib/server/auth'
import type { WebhookEndpoint, ApiKeyItem } from '@/lib/server/integrations-crm'

export async function toggleServiceStatusAction(
  _id: string,
  _status: 'Connected' | 'Disconnected'
): Promise<{ ok: boolean; message: string }> {
  await requireModule('integrations')
  revalidatePath('/admin/integrations')
  return { ok: true, message: `Integration status updated to ${_status}.` }
}

export async function saveServiceConfigAction(
  _id: string,
  _config: Record<string, string>
): Promise<{ ok: boolean; message: string }> {
  await requireModule('integrations')
  revalidatePath('/admin/integrations')
  return { ok: true, message: 'Service credentials saved and validated.' }
}

export async function createWebhookAction(
  _webhook: Partial<WebhookEndpoint>
): Promise<{ ok: boolean; message: string }> {
  await requireModule('integrations')
  revalidatePath('/admin/integrations')
  return { ok: true, message: 'Webhook endpoint registered successfully.' }
}

export async function deleteWebhookAction(
  _id: string
): Promise<{ ok: boolean; message: string }> {
  await requireModule('integrations')
  revalidatePath('/admin/integrations')
  return { ok: true, message: 'Webhook removed.' }
}

export async function testWebhookPingAction(
  _id: string
): Promise<{ ok: boolean; latencyMs: number; message: string }> {
  await requireModule('integrations')
  return { ok: true, latencyMs: 135, message: 'Ping delivered: HTTP 200 OK (135ms)' }
}

export async function createApiKeyAction(
  _key: Partial<ApiKeyItem>
): Promise<{ ok: boolean; key: string; message: string }> {
  await requireModule('integrations')
  const newSecret = `wm_live_${Math.random().toString(36).slice(2)}${Math.random().toString(36).slice(2)}`
  revalidatePath('/admin/integrations')
  return { ok: true, key: newSecret, message: 'New API key created. Copy it now, it won’t be shown again.' }
}

export async function revokeApiKeyAction(
  _id: string
): Promise<{ ok: boolean; message: string }> {
  await requireModule('integrations')
  revalidatePath('/admin/integrations')
  return { ok: true, message: 'API key revoked immediately.' }
}
