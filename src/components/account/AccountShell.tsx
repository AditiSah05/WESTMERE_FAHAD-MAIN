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

const isActive = (path: string, slug: string) => (slug ? path.startsWith(href(slug)) : path === '/account')

function Nav({ onNavigate, withTop }: { onNavigate?: () => void; withTop?: boolean }) {
  const path = usePathname()
  return (
    <nav className="min-h-0 flex-1 overflow-y-auto px-3 py-4" aria-label="Account">
      {sections.filter((s) => withTop || !s.top).map(({ slug, label, icon: Icon, top }) => {
        const active = isActive(path, slug)
        return (
          <Link key={slug} href={href(slug)} onClick={onNavigate} className={cn('flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors', top && 'min-[1025px]:hidden', active ? 'bg-[linear-gradient(135deg,#1b2a4a_0%,#2f4166_60%,#c4943d_100%)] text-white' : 'text-slate hover:bg-paper hover:text-navy-deep')}>
            <Icon size={17} strokeWidth={1.9} />{label}
          </Link>
        )
      })}
    </nav>
  )
}

/** Support, wishlist, notifications, help and profile live in the header on desktop (the drawer lists them on mobile). */
function TopLinks() {
  const path = usePathname()
  return (
    <nav aria-label="Quick links" className="ml-auto mr-2 hidden items-center gap-1 min-[1025px]:flex">
      {sections.filter((s) => s.top).map(({ slug, label, icon: Icon }) => (
        <Link key={slug} href={href(slug)} title={label} aria-label={label} className={cn('flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-[13px] font-medium transition-colors', isActive(path, slug) ? 'bg-navy-deep text-white' : 'text-slate hover:bg-paper hover:text-navy-deep')}>
          <Icon size={16} strokeWidth={1.9} /><span className="hidden min-[1280px]:inline">{label.replace(' Center', '')}</span>
        </Link>
      ))}
    </nav>
  )
}

export default function AccountShell({ children, name, email, needsPhone }: { children: ReactNode; name: string; email: string; needsPhone?: boolean }) {
  const [open, setOpen] = useState(false)
  const side = (onNavigate?: () => void, withTop?: boolean) => (
    <div className="flex h-full flex-col border-r border-line bg-white">
      <div className="flex h-16 flex-none items-center border-b border-line px-5"><Logo /></div>
      <Nav onNavigate={onNavigate} withTop={withTop} />
    </div>
  )

  return (
    <div className="min-h-screen bg-paper font-sans text-[#4a5568]">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[264px] min-[1025px]:block">{side()}</aside>
      {open && (
        <div className="fixed inset-0 z-50 min-[1025px]:hidden">
          <div className="absolute inset-0 bg-navy-deep/30 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <aside className="relative h-full w-[280px]">{side(() => setOpen(false), true)}</aside>
        </div>
      )}
      <div className="min-[1025px]:pl-[264px]">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-3 border-b border-line bg-white/85 px-4 backdrop-blur min-[1025px]:px-8">
          <div className="flex items-center gap-3">
            <button type="button" onClick={() => setOpen(true)} aria-label="Open menu" className="flex size-9 items-center justify-center rounded-lg border border-line min-[1025px]:hidden"><Menu size={18} /></button>
            <span className="rounded bg-blue/10 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-blue">My account</span>
          </div>
          <TopLinks />
          <div className="flex items-center gap-2.5">
            <Link href="/" className="hidden items-center gap-1.5 rounded-lg border border-line px-3 py-2 text-[13px] font-medium text-slate hover:bg-paper sm:flex">Back to site <ExternalLink size={13} /></Link>
            <div className="flex items-center gap-2.5 rounded-lg border border-line py-1 pl-1 pr-3">
              <span className="flex size-7 items-center justify-center rounded-md bg-navy-deep text-xs font-bold text-white">{(name || email).slice(0, 2).toUpperCase()}</span>
              <span className="hidden max-w-[180px] truncate text-[13px] font-semibold text-navy-deep sm:block">{name || email}</span>
            </div>
            <form action={customerLogout}><button type="submit" aria-label="Sign out" title="Sign out" className="flex size-9 items-center justify-center rounded-lg border border-line text-slate hover:bg-paper"><LogOut size={16} /></button></form>
          </div>
        </header>
        {needsPhone && (
          <p role="status" className="border-b border-gold/30 bg-gold/10 px-4 py-2.5 text-center text-[13px] font-medium text-navy-deep min-[1025px]:px-8">
            Add your mobile number so we can confirm your orders. <Link href="/account/profile" className="font-semibold underline underline-offset-2">Go to My Profile</Link>
          </p>
        )}
        <main className="mx-auto w-full max-w-[1280px] px-4 py-8 min-[1025px]:px-8">{children}</main>
      </div>
    </div>
  )
}
