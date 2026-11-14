import { cookies } from 'next/headers'
import type { ReactNode } from 'react'
import AdminShell from '@/components/admin/shell/AdminShell'
import { requireAdmin } from '@/lib/server/auth'

// Every admin page renders per request and is checked against the database session here.
export const dynamic = 'force-dynamic'

export default async function PanelLayout({ children }: { children: ReactNode }) {
  const admin = await requireAdmin()
  // Read on the server so the chosen theme is in the first paint (no light flash).
  const theme = (await cookies()).get('wm_admin_theme')?.value === 'dark' ? 'dark' : 'light'
  return <AdminShell email={admin.email} role={admin.role} theme={theme}>{children}</AdminShell>
}
