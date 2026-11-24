import type { ReactNode } from 'react'
import AccountShell from '@/components/account/AccountShell'
import { ImagesProvider } from '@/components/ui/ImagesProvider'
import { requireCustomer } from '@/lib/server/customer'
import { getImages } from '@/lib/server/media'
import { profile } from '@/lib/server/shop-more'

export const dynamic = 'force-dynamic'

export default async function Layout({ children }: { children: ReactNode }) {
  const c = await requireCustomer()
  const needsPhone = !(await profile(c.userId)).phone
  return (
    <ImagesProvider images={await getImages()}>
      <AccountShell name={c.name} email={c.email} needsPhone={needsPhone}>{children}</AccountShell>
    </ImagesProvider>
  )
}
