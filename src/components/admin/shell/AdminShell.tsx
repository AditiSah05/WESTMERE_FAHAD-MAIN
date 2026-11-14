'use client'

import type { ReactNode } from 'react'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { Role } from '@/lib/admin/permissions'
import Sidebar from './Sidebar'
import Topbar from './Topbar'

export type Theme = 'light' | 'dark'

export default function AdminShell({ children, email, role, theme: initial }: { children: ReactNode; email: string; role: Role; theme: Theme }) {
  const [open, setOpen] = useState(false)
  const [theme, setTheme] = useState<Theme>(initial)
  const toggleTheme = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    document.cookie = `wm_admin_theme=${next}; path=/admin; max-age=31536000; samesite=lax`
  }

  return (
    <div data-admin-theme={theme} className="min-h-screen bg-paper font-sans text-[#4a5568]">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[264px] min-[1025px]:block"><Sidebar role={role} /></aside>
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-50 min-[1025px]:hidden">
            <motion.div className="absolute inset-0 bg-navy-deep/30 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)} />
            <motion.aside className="relative h-full w-[280px]" initial={{ x: -290 }} animate={{ x: 0 }} exit={{ x: -290 }} transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}>
              <Sidebar role={role} onNavigate={() => setOpen(false)} />
            </motion.aside>
          </div>
        )}
      </AnimatePresence>

      <div className="min-[1025px]:pl-[264px]">
        <Topbar onMenu={() => setOpen(true)} email={email} theme={theme} onToggleTheme={toggleTheme} />
        <main className="mx-auto w-full max-w-[1280px] px-4 py-8 min-[1025px]:px-8">{children}</main>
      </div>
    </div>
  )
}
