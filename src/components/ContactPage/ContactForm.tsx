'use client'

import { AnimatePresence, motion } from 'framer-motion'
import ContactSuccess from './ContactSuccess'
import FormField, { controlClass } from './FormField'
import { useContactForm } from './useContactForm'

const input = `${controlClass} h-10 py-2.5`

export default function ContactForm() {
  const { values, sent, busy, onChange, onSubmit, reset } = useContactForm()
  const field = { onChange, className: input }

  return (
    <AnimatePresence mode="wait">
      {sent ? (
        <ContactSuccess key="ok" values={values} onReset={reset} />
      ) : (
        <motion.form key="form" onSubmit={onSubmit} className="flex flex-col gap-5" exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
          <FormField label="Name*"><input {...field} type="text" name="name" required value={values.name} placeholder="Your name" /></FormField>
          <FormField label="Email*"><input {...field} type="email" name="email" required value={values.email} placeholder="name@company.com" /></FormField>
          <div className="grid grid-cols-1 gap-5 min-[480px]:grid-cols-2">
            <FormField label="Phone*"><input {...field} type="tel" name="phone" required value={values.phone} placeholder="+91 XXXXX XXXXX" /></FormField>
            <FormField label="Company"><input {...field} type="text" name="company" value={values.company} /></FormField>
          </div>
          <FormField label="Message">
            <textarea name="message" value={values.message} onChange={onChange} placeholder="Write what's on your mind" className={`${controlClass} h-[100px] resize-y py-4`} />
          </FormField>
          <button
            type="submit"
            disabled={busy}
            className="flex h-[42px] w-fit min-w-[164px] items-center justify-center rounded-lg bg-gold px-5 text-base font-medium leading-[1.2] text-white shadow-[0_0_0_1px_#a87a2b,inset_0_1.4px_1px_rgba(255,255,255,0.12),0_1.4px_4px_rgba(15,27,51,0.3)] transition hover:bg-[#b3862f] disabled:opacity-70"
          >
            {busy ? 'Sending...' : 'Send a message'}
          </button>
        </motion.form>
      )}
    </AnimatePresence>
  )
}
