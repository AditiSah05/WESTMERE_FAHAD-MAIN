import type { ReactNode } from 'react'
import AdminShell from '@/components/admin/shell/AdminShell'
import { requireAdmin } from '@/lib/server/auth'

// Every admin page renders per request and is checked against the database session here.
export const dynamic = 'force-dynamic'

export default async function PanelLayout({ children }: { children: ReactNode }) {
  const admin = await requireAdmin()
  return <AdminShell email={admin.email}>{children}</AdminShell>
}
