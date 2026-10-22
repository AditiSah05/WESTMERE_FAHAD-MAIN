'use client'

import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { avatarPool } from './data'
import { useProofCounter } from './useProofCounter'

const MotionImage = motion.create(Image)
const lefts = ['left-0', 'left-[28px]', 'left-[56px]']

export default function ProofAvatars() {
  const { digit, up, avatar } = useProofCounter()
  const visible = [0, 1, 2].map((o) => avatarPool[(avatar + o) % avatarPool.length])

  return (
    <div className="flex items-center">
      <div className="relative h-[38px] w-[94px] flex-none">
        <AnimatePresence initial={false}>
          {visible.map((src, i) => (
            <MotionImage
              key={src}
              src={src}
              alt="Client avatar"
              width={38}
              height={38}
              className={`absolute top-0 size-[38px] rounded-full border-2 border-white object-cover shadow-[0_2px_6px_rgba(0,0,0,0.1)] ${lefts[i]}`}
              style={{ zIndex: 3 - i }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: up ? 0.6 : 0.14, ease: 'easeInOut' }}
            />
          ))}
        </AnimatePresence>
      </div>
      <div className="relative z-[4] ml-2 flex h-[38px] w-[58px] flex-none items-center justify-center rounded-full border-2 border-white bg-[#f1f5f9] text-[15px] font-extrabold text-navy-deep shadow-[0_2px_6px_rgba(0,0,0,0.08)]">
        <span className="leading-none">+5</span>
        <span className="relative ml-px inline-flex h-[18px] w-2.5 overflow-hidden leading-[18px]">
          <AnimatePresence mode="wait">
            <motion.span
              key={digit}
              className="absolute inset-x-0 top-0 text-center font-extrabold"
              initial={{ y: up ? 22 : -22, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: up ? -22 : 22, opacity: 0 }}
              transition={{ duration: up ? 0.6 : 0.12, ease: up ? [0.22, 1, 0.36, 1] : 'easeOut' }}
            >
              {digit}
            </motion.span>
          </AnimatePresence>
        </span>
      </div>
    </div>
  )
}
