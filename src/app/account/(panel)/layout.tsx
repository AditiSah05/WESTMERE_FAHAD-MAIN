import type { ReactNode } from 'react'
import AccountShell from '@/components/account/AccountShell'
import { requireCustomer } from '@/lib/server/customer'

export const dynamic = 'force-dynamic'

export default async function Layout({ children }: { children: ReactNode }) {
  const c = await requireCustomer()
  return <AccountShell name={c.name} email={c.email}>{children}</AccountShell>
}
