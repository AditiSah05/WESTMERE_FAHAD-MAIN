'use client'

import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { InstagramIcon } from '@/components/ui/SocialIcons'
import { cn } from '@/lib/cn'
import { navLinks } from './links'

type Props = { open: boolean; current: string; onClose: () => void }

export default function NavDrawer({ open, current, onClose }: Props) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[999] flex items-start justify-center bg-navy-deep/25 pt-[72px] backdrop-blur-xl md:pt-[86px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
        >
          <motion.div
            className="flex w-[calc(100%-24px)] max-w-[320px] flex-col rounded-[20px] border border-line/90 bg-white px-[26px] py-[22px] shadow-[0_20px_50px_rgba(0,0,0,0.12),0_4px_14px_rgba(0,0,0,0.04)] md:w-[330px] md:max-w-none"
            initial={{ opacity: 0, y: -15, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <nav className="flex flex-col">
              {navLinks.map((link) => (
                <div key={link.label} className="border-b border-dashed border-[#e5e7eb] last:border-b-0">
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className={cn(
                      'block px-0.5 py-[13px] font-body text-[21px] font-bold text-[#111827]',
                      'transition-[color,transform] duration-300 hover:translate-x-1.5 hover:text-blue',
                      current === link.value && 'text-blue',
                    )}
                  >
                    {link.label}
                  </Link>
                </div>
              ))}
            </nav>
            <div className="mt-5 flex items-center gap-2.5 pt-1">
              <a
                href="https://www.instagram.com/westmere.io/"
                aria-label="Instagram"
                className="flex h-[38px] w-[38px] items-center justify-center rounded-[10px] bg-[#efefef] text-navy-deep transition hover:-translate-y-0.5 hover:bg-navy-deep hover:text-white"
              >
                <InstagramIcon />
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
