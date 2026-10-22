'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, Send } from 'lucide-react'
import ContactSuccess from './ContactSuccess'
import FormField, { inputClass } from './FormField'
import { useContactForm } from './useContactForm'

const services = ['Website Development', 'Mobile App Development', 'Workflow Automation', 'Custom Software']
export default function ContactForm() {
  const { values, sent, busy, onChange, onSubmit, reset } = useContactForm()
  const field = { onChange, className: inputClass }

  return (
    <motion.div
      className="flex min-h-[520px] flex-col justify-center rounded-3xl border border-line bg-white p-[30px] shadow-[0_1px_3px_rgba(0,0,0,0.04)] min-[769px]:p-[45px]"
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
    >
      <AnimatePresence mode="wait">
        {sent ? (
          <ContactSuccess key="ok" values={values} onReset={reset} />
        ) : (
          <motion.form key="form" onSubmit={onSubmit} className="flex flex-col gap-6" exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.3 }}>
            <FormField label="NAME*" filled={!!values.name}>
              <input {...field} type="text" name="name" required value={values.name} placeholder="Your name" />
            </FormField>
            <FormField label="EMAIL*" filled={!!values.email}>
              <input {...field} type="email" name="email" required value={values.email} placeholder="name@company.com" />
            </FormField>
            <FormField label="SERVICE REQUIRED*" filled={!!values.service}>
              <div className="relative">
                <select
                  name="service"
                  required
                  value={values.service}
                  onChange={onChange}
                  className={`${inputClass} cursor-pointer appearance-none pr-[42px]`}
                >
                  <option value="" disabled hidden>Select a Service</option>
                  {services.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
                <ChevronDown size={14} strokeWidth={2.5} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#4a5568]" />
              </div>
            </FormField>
            <div className="grid grid-cols-1 gap-6 min-[769px]:grid-cols-2 min-[769px]:gap-5">
              <FormField label="PHONE*" filled={!!values.phone}>
                <input {...field} type="tel" name="phone" required value={values.phone} placeholder="+91 XXXXX XXXXX" />
              </FormField>
              <FormField label="COMPANY" filled={!!values.company}>
                <input {...field} type="text" name="company" value={values.company} placeholder="Company name" />
              </FormField>
            </div>
            <FormField label="MESSAGE*" filled={!!values.message}>
              <textarea {...field} name="message" required rows={5} value={values.message} placeholder="Write what's on your mind" className={`${inputClass} resize-y leading-normal`} />
            </FormField>
            <motion.button
              type="submit"
              disabled={busy}
              whileHover={{ scale: busy ? 1 : 1.01 }}
              whileTap={{ scale: busy ? 1 : 0.99 }}
              className="group mt-2.5 inline-flex items-center justify-center gap-2.5 rounded-[10px] bg-navy-deep px-[30px] py-[15px] text-[14.5px] font-semibold text-white shadow-[0_4px_12px_rgba(15,27,51,0.15)] transition hover:bg-navy hover:shadow-[0_6px_20px_rgba(15,27,51,0.25)] disabled:opacity-70"
            >
              {busy ? 'Sending...' : 'Send Message'}
              <Send size={16} strokeWidth={2.5} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:scale-110" />
            </motion.button>
          </motion.form>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
