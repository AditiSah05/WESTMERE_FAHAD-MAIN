import { createHash } from 'node:crypto'
import AcceptInviteForm from '@/components/admin/team/AcceptInviteForm'
import { db } from '@/lib/server/schema'

export const metadata = { title: 'Accept invitation' }
export const dynamic = 'force-dynamic'

export default async function Page({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params
  const { query } = await db()
  const [inv] = token.length <= 100
    ? await query<{ email: string }>(`SELECT email FROM admin_invites WHERE token_hash = $1 AND used_at IS NULL AND expires_at > now()`, [createHash('sha256').update(token).digest('hex')])
    : []
  return <AcceptInviteForm token={token} email={inv?.email ?? null} />
}
