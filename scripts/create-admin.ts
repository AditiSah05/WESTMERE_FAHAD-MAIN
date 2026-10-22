/**
 * Create or reset an admin account. Run from the project root:
 *   DATABASE_URL=postgres://... npx tsx --conditions react-server scripts/create-admin.ts
 * (Without DATABASE_URL it uses the local dev database in ./.data.) The password is typed at a hidden prompt.
 */
import { createInterface } from 'node:readline'
import { hashPassword, passwordProblem } from '../src/lib/server/password'
import { db } from '../src/lib/server/schema'

function ask(question: string, hidden = false): Promise<string> {
  return new Promise((resolve) => {
    const rl = createInterface({ input: process.stdin, output: process.stdout, terminal: true })
    const out = rl as unknown as { _writeToOutput: (s: string) => void }
    if (hidden) out._writeToOutput = (s) => (s.includes(question) ? process.stdout.write(s) : process.stdout.write(''))
    rl.question(question, (answer) => {
      rl.close()
      if (hidden) process.stdout.write('\n')
      resolve(answer.trim())
    })
  })
}

async function main() {
  // Non-interactive (CI/provisioning): ADMIN_EMAIL and ADMIN_PASSWORD. Prefer the prompt on shared machines.
  const fromEnv = process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD
  const email = (process.env.ADMIN_EMAIL ?? (await ask('Admin email: '))).toLowerCase()
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error('Enter a valid email address.')
  const password = process.env.ADMIN_PASSWORD ?? (await ask('Password (hidden): ', true))
  const problem = passwordProblem(password, email)
  if (problem) throw new Error(problem)
  if (!fromEnv && password !== (await ask('Repeat password (hidden): ', true))) throw new Error('Passwords do not match.')

  const { query } = await db()
  const hash = await hashPassword(password)
  const existing = await query<{ id: string }>(`SELECT id FROM admin_users WHERE email = $1`, [email])
  if (existing[0]) {
    await query(`UPDATE admin_users SET password_hash = $1, password_changed_at = now() WHERE id = $2`, [hash, existing[0].id])
    await query(`DELETE FROM admin_sessions WHERE user_id = $1`, [existing[0].id])
    await query(`DELETE FROM login_attempts WHERE email = $1`, [email])
    console.log(`Password reset for ${email}; all sessions signed out and lockout cleared.`)
  } else {
    await query(`INSERT INTO admin_users (email, password_hash) VALUES ($1, $2)`, [email, hash])
    console.log(`Admin ${email} created.`)
  }
  process.exit(0)
}

main().catch((e: Error) => {
  console.error(e.message)
  process.exit(1)
})
