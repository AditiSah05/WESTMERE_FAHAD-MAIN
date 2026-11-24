import { requireModule } from '@/lib/server/auth'
import IntegrationsView from '@/components/admin/integrations/IntegrationsView'
import {
  SEED_INTEGRATIONS_STATS,
  SEED_INTEGRATION_SERVICES,
  SEED_WEBHOOK_ENDPOINTS,
  SEED_API_KEYS,
  SEED_WEBHOOK_LOGS,
} from '@/lib/server/integrations-crm'

export const metadata = { title: 'Integrations & APIs | Westmere Admin' }
export const dynamic = 'force-dynamic'

export default async function Page() {
  await requireModule('integrations')

  return (
    <IntegrationsView
      initialStats={SEED_INTEGRATIONS_STATS}
      initialServices={SEED_INTEGRATION_SERVICES}
      initialWebhooks={SEED_WEBHOOK_ENDPOINTS}
      initialApiKeys={SEED_API_KEYS}
      initialLogs={SEED_WEBHOOK_LOGS}
    />
  )
}
