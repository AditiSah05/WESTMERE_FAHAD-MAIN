'use client'

import { ExternalLink, LogOut, Menu } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, type ReactNode } from 'react'
import { customerLogout } from '@/app/account/actions'
import Logo from '@/components/ui/Logo'
import { cn } from '@/lib/cn'
import { sections } from '@/lib/account/sections'

const href = (slug: string) => (slug ? `/account/${slug}` : '/account')

function Nav({ onNavigate }: { onNavigate?: () => void }) {
  const path = usePathname()
  return (
    <nav className="min-h-0 flex-1 overflow-y-auto px-3 py-4" aria-label="Account">
      {sections.map(({ slug, label, icon: Icon }) => {
        const active = slug ? path.startsWith(href(slug)) : path === '/account'
        return (
          <Link key={slug} href={href(slug)} onClick={onNavigate} className={cn('flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors', active ? 'bg-[linear-gradient(135deg,#1b2a4a_0%,#2f4166_60%,#c4943d_100%)] text-white' : 'text-slate hover:bg-paper hover:text-navy-deep')}>
            <Icon size={17} strokeWidth={1.9} />{label}
          </Link>
        )
      })}
    </nav>
  )
}

export default function AccountShell({ children, name, email }: { children: ReactNode; name: string; email: string }) {
  const [open, setOpen] = useState(false)
  const side = (onNavigate?: () => void) => (
    <div className="flex h-full flex-col border-r border-line bg-white">
      <div className="flex h-16 flex-none items-center border-b border-line px-5"><Logo /></div>
      <Nav onNavigate={onNavigate} />
    </div>
  )

  return (
    <div className="min-h-screen bg-paper font-sans text-[#4a5568]">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[264px] min-[1025px]:block">{side()}</aside>
      {open && (
        <div className="fixed inset-0 z-50 min-[1025px]:hidden">
          <div className="absolute inset-0 bg-navy-deep/30 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <aside className="relative h-full w-[280px]">{side(() => setOpen(false))}</aside>
        </div>
      )}
      <div className="min-[1025px]:pl-[264px]">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-3 border-b border-line bg-white/85 px-4 backdrop-blur min-[1025px]:px-8">
          <div className="flex items-center gap-3">
            <button type="button" onClick={() => setOpen(true)} aria-label="Open menu" className="flex size-9 items-center justify-center rounded-lg border border-line min-[1025px]:hidden"><Menu size={18} /></button>
            <span className="rounded bg-blue/10 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-blue">My account</span>
          </div>
          <div className="flex items-center gap-2.5">
            <Link href="/" className="hidden items-center gap-1.5 rounded-lg border border-line px-3 py-2 text-[13px] font-medium text-slate hover:bg-paper sm:flex">Back to site <ExternalLink size={13} /></Link>
            <div className="flex items-center gap-2.5 rounded-lg border border-line py-1 pl-1 pr-3">
              <span className="flex size-7 items-center justify-center rounded-md bg-navy-deep text-xs font-bold text-white">{(name || email).slice(0, 2).toUpperCase()}</span>
              <span className="hidden max-w-[180px] truncate text-[13px] font-semibold text-navy-deep sm:block">{name || email}</span>
            </div>
            <form action={customerLogout}><button type="submit" aria-label="Sign out" title="Sign out" className="flex size-9 items-center justify-center rounded-lg border border-line text-slate hover:bg-paper"><LogOut size={16} /></button></form>
          </div>
        </header>
        <main className="mx-auto w-full max-w-[1280px] px-4 py-8 min-[1025px]:px-8">{children}</main>
      </div>
    </div>
  )
}
