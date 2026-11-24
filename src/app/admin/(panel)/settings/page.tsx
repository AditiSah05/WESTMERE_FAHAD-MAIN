import { requireModule } from '@/lib/server/auth'
import { remainingRecoveryCodes } from '@/lib/server/mfa'
import SettingsView from '@/components/admin/settings/SettingsView'

export const metadata = { title: 'Settings' }

export default async function Page() {
  const me = await requireModule('settings')
  return <SettingsView totpEnabled={me.totpEnabled} recoveryLeft={me.totpEnabled ? await remainingRecoveryCodes(me.userId) : 0} />
}
