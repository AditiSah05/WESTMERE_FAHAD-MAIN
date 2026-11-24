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
    <nav className="min-h-0 flex-1 overflow-y-auto p-2.5" aria-label="Account">
      {sections.filter((s) => withTop || !s.top).map(({ slug, label, icon: Icon, top }) => {
        const active = isActive(path, slug)
        return (
          <Link key={slug} href={href(slug)} onClick={onNavigate} className={cn('flex items-center gap-3 rounded px-3 py-2.5 text-sm font-medium transition-colors', top && 'min-[1025px]:hidden', active ? 'bg-navy-deep text-white shadow-[inset_0_1.4px_1px_rgba(255,255,255,0.08),0_0_0_1.4px_#2f4166]' : 'text-slate hover:bg-sky/60 hover:text-navy-deep')}>
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
    <nav aria-label="Quick links" className="ml-auto mr-1 hidden items-center gap-1 min-[1025px]:flex">
      {sections.filter((s) => s.top).map(({ slug, label, icon: Icon }) => (
        <Link key={slug} href={href(slug)} title={label} aria-label={label} className={cn('flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-[13px] font-medium transition-colors', isActive(path, slug) ? 'bg-navy-deep text-white' : 'text-slate hover:bg-paper hover:text-navy-deep')}>
          <Icon size={16} strokeWidth={1.9} /><span className="hidden min-[1280px]:inline">{label.replace(' Center', '')}</span>
        </Link>
      ))}
    </nav>
  )
}

const pill = 'rounded-lg border-2 border-sky bg-white outline outline-1 outline-navy/5 shadow-[0_2px_3px_rgba(27,42,74,0.05),0_14px_20px_rgba(27,42,74,0.05)]'

export default function AccountShell({ children, name, email, needsPhone }: { children: ReactNode; name: string; email: string; needsPhone?: boolean }) {
  const [open, setOpen] = useState(false)
  const side = (onNavigate?: () => void, withTop?: boolean) => (
    <div className={cn('flex h-full flex-col overflow-hidden', pill)}>
      <Nav onNavigate={onNavigate} withTop={withTop} />
    </div>
  )

  return (
    <div data-site-look className="relative min-h-screen overflow-x-clip bg-[#eef2f9] font-sans text-[#4a5568]">
      <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-[22%] top-1/2 size-[1100px] -translate-y-1/2 rounded-full border-[10px] border-sky/80" />
        <div className="absolute -left-[12%] top-1/2 size-[800px] -translate-y-1/2 rounded-full border-[10px] border-sky/70" />
        <div className="absolute -right-[22%] top-1/2 size-[1100px] -translate-y-1/2 rounded-full border-[10px] border-sky/80" />
        <div className="absolute -right-[12%] top-1/2 size-[800px] -translate-y-1/2 rounded-full border-[10px] border-sky/70" />
      </div>
      {open && (
        <div className="fixed inset-0 z-50 min-[1025px]:hidden">
          <div className="absolute inset-0 bg-navy-deep/30 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <aside className="relative h-full w-[280px] p-3">{side(() => setOpen(false), true)}</aside>
        </div>
      )}
      <header className="sticky top-2.5 z-30 px-2.5 md:top-5 md:px-5">
        <div className={cn('mx-auto flex h-[54px] max-w-[1440px] items-center gap-3 pl-3 pr-2', pill)}>
          <button type="button" onClick={() => setOpen(true)} aria-label="Open menu" className="flex size-9 items-center justify-center rounded-lg border border-line min-[1025px]:hidden"><Menu size={18} /></button>
          <Logo />
          <span className="hidden rounded bg-blue/10 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-blue sm:inline">My account</span>
          <TopLinks />
          <div className="ml-auto flex items-center gap-2 min-[1025px]:ml-0">
            <Link href="/" className="hidden items-center gap-1.5 rounded px-3 py-2 text-[13px] font-medium text-slate hover:bg-paper sm:flex">Back to site <ExternalLink size={13} /></Link>
            <span className="hidden max-w-[160px] truncate text-[13px] font-semibold text-navy-deep sm:block">{name || email}</span>
            <span className="flex size-8 items-center justify-center rounded bg-navy-deep text-xs font-bold text-white">{(name || email).slice(0, 2).toUpperCase()}</span>
            <form action={customerLogout}><button type="submit" aria-label="Sign out" title="Sign out" className="whitespace-nowrap rounded bg-navy-deep px-3.5 py-2 text-sm font-medium text-white shadow-[inset_0_1.4px_1px_rgba(255,255,255,0.08),0_0_0_1.4px_#2f4166] hover:bg-navy"><LogOut size={15} className="sm:hidden" /><span className="hidden sm:inline">Sign out</span></button></form>
          </div>
        </div>
      </header>
      <div className="relative mx-auto flex max-w-[1440px] gap-6 px-2.5 pb-10 pt-12 md:px-5">
        <aside className="sticky top-[104px] hidden h-[calc(100vh-148px)] mt-4 w-[248px] flex-none min-[1025px]:block">{side()}</aside>
        <div className="min-w-0 flex-1">
          {needsPhone && (
            <p role="status" className="mb-6 rounded-lg border border-gold/30 bg-gold/10 px-4 py-2.5 text-center text-[13px] font-medium text-navy-deep">
              Add your mobile number so we can confirm your orders. <Link href="/account/profile" className="font-semibold underline underline-offset-2">Go to My Profile</Link>
            </p>
          )}
          <main className="w-full">{children}</main>
        </div>
      </div>
    </div>
  )
}
