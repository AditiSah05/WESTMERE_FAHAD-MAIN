'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import Logo from '@/components/ui/Logo'
import MenuButton from './MenuButton'
import NavDrawer from './NavDrawer'

const divider = <div className="w-0.5 self-stretch bg-sky" aria-hidden />

export default function Navbar() {
  const pathname = usePathname()
  const current = pathname === '/' ? 'home' : pathname.slice(1)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : 'unset'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [open])

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-2.5 z-[1000] flex justify-center px-2.5 md:top-8 md:px-4">
        <motion.nav
          className="pointer-events-auto flex h-[50px] w-full items-center overflow-hidden rounded-lg border-2 border-sky bg-white outline outline-1 outline-navy/5 shadow-[0_2px_3px_rgba(27,42,74,0.05),0_14px_20px_rgba(27,42,74,0.05)] md:h-[54px] md:w-auto md:min-w-[480px]"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex flex-1 items-center self-stretch p-2 md:flex-none md:grow md:p-3">
            <Logo />
          </div>
          {divider}
          <div className="flex w-14 items-center justify-center self-stretch p-2 md:w-[70px] md:p-3">
            <MenuButton open={open} onToggle={() => setOpen((v) => !v)} />
          </div>
          {divider}
          <div className="flex items-center justify-end self-stretch p-2 md:min-w-[140px] md:flex-1 md:p-3">
            <a
              href="https://wa.me/919654664191"
              target="_blank"
              rel="noopener noreferrer"
              className="whitespace-nowrap rounded bg-navy-deep px-[11px] py-[7px] text-[12.5px] font-medium leading-[1.2] text-white shadow-[inset_0_1.4px_1px_rgba(255,255,255,0.08),0_0_0_1.4px_#2f4166] transition-colors hover:bg-navy md:px-3.5 md:py-2 md:text-sm"
            >
              Let&apos;s Talk
            </a>
          </div>
        </motion.nav>
      </header>
      <NavDrawer open={open} current={current} onClose={() => setOpen(false)} />
    </>
  )
}
