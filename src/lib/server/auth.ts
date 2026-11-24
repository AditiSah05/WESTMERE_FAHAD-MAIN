import 'server-only'
import { redirect } from 'next/navigation'
import { notFound } from 'next/navigation'
import { can, type Access, type ModuleKey } from '@/lib/admin/permissions'
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

/** For pages: signed in AND allowed to read this module (otherwise 404, so the screen's existence is not revealed). */
export async function requireModule(module: ModuleKey): Promise<Admin> {
  const admin = await requireAdmin()
  if (!can(admin.role, module, 'read')) notFound()
  return admin
}

/** For server actions: signed in AND allowed to read/write this module. */
export async function assertModule(module: ModuleKey, access: Access): Promise<Admin> {
  const admin = await assertAdmin()
  if (!can(admin.role, module, access)) throw new Error('FORBIDDEN')
  return admin
}
