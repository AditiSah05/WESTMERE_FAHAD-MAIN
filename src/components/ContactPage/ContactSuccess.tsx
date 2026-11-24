import { motion } from 'framer-motion'
import type { ContactValues } from './useContactForm'

export default function ContactSuccess({ values, onReset }: { values: ContactValues; onReset: () => void }) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center px-2.5 py-10 text-center"
      initial={{ opacity: 0, scale: 0.95, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="mb-6 size-[90px]">
        <svg
          viewBox="0 0 52 52"
          className="size-20 animate-[fillCheck_0.4s_ease-in-out_0.4s_forwards,scaleCheck_0.3s_ease-in-out_0.9s_alternate_infinite] rounded-full stroke-[#10b981] stroke-[2.5] shadow-[inset_0_0_0_#10b981]"
        >
          <circle cx="26" cy="26" r="25" fill="none" className="animate-[strokeCircle_0.6s_cubic-bezier(0.65,0,0.45,1)_forwards] [stroke-dasharray:166] [stroke-dashoffset:166]" />
          <path d="M14.1 27.2l7.1 7.2 16.7-16.8" fill="none" strokeLinecap="round" className="origin-center animate-[strokeCheck_0.35s_cubic-bezier(0.65,0,0.45,1)_0.6s_forwards] [stroke-dasharray:48] [stroke-dashoffset:48]" />
        </svg>
      </div>
      <h3 className="mb-4 text-[1.8rem] font-bold text-navy-deep min-[769px]:text-[2.2rem]">Message Received!</h3>
      <p className="mb-8 max-w-[440px] text-[1.15rem] leading-[1.6] text-[#718096]">
        Thank you for reaching out, <strong className="text-navy">{values.name}</strong>. Our strategy team has been notified and we will connect with you at{' '}
        <strong className="text-navy">{values.email}</strong> within
      </p>
      <motion.button
        type="button"
        onClick={onReset}
        whileHover={{ y: -1 }}
        className="rounded-[10px] border border-line bg-[#fafbfe] px-6 py-3 text-[13.5px] font-semibold text-[#4a5568] shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-colors hover:border-blue-accent/25 hover:bg-white hover:text-blue-accent"
      >
        Send another message
      </motion.button>
    </motion.div>
  )
}
