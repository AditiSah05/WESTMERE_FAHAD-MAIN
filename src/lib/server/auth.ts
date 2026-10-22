import 'server-only'
import { redirect } from 'next/navigation'
import { getAdmin, type Admin } from './session'

/** For pages/layouts: send anonymous visitors to the login screen. */
export async function requireAdmin(): Promise<Admin> {
  const admin = await getAdmin()
  if (!admin) redirect('/admin/login')
  return admin
}

/** For server actions: never trust the UI, re-check the session and throw if missing. */
export async function assertAdmin(): Promise<Admin> {
  const admin = await getAdmin()
  if (!admin) throw new Error('UNAUTHORIZED')
  return admin
}
