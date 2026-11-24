import { redirect } from 'next/navigation'
import LoginForm from '@/components/admin/login/LoginForm'
import { getAdmin } from '@/lib/server/session'

export const metadata = { title: 'Sign in' }
export const dynamic = 'force-dynamic'

export default async function Page() {
  if (await getAdmin()) redirect('/admin')
  return <LoginForm />
}
