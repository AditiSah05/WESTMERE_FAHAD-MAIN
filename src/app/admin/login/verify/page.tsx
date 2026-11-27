import { redirect } from 'next/navigation'
import { ADMIN_LOGIN } from '@/lib/admin/loginPath'
import VerifyForm from '@/components/admin/login/VerifyForm'
import { hasChallengeCookie } from '@/lib/server/mfa'

export const metadata = { title: 'Verify sign-in' }
export const dynamic = 'force-dynamic'

export default async function Page() {
  if (!(await hasChallengeCookie())) redirect(ADMIN_LOGIN)
  return <VerifyForm />
}
