import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ModuleView from '@/components/admin/ModuleView'
import { can, isModule } from '@/lib/admin/permissions'
import { modules } from '@/lib/admin/modules'
import { requireModule } from '@/lib/server/auth'

type Params = { params: Promise<{ module: string }> }

export const dynamicParams = false
export const generateStaticParams = () => Object.keys(modules).map((module) => ({ module }))

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { module } = await params
  return { title: modules[module]?.title ?? 'Admin' }
}

export default async function Page({ params }: Params) {
  const { module } = await params
  const config = modules[module]
  if (!config || !isModule(module)) notFound()
  const admin = await requireModule(module)
  return <ModuleView module={module} {...config} canWrite={can(admin.role, module, 'write')} />
}
