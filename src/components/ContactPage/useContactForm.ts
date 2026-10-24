import { useState, type ChangeEvent, type FormEvent } from 'react'

export type ContactValues = { name: string; email: string; phone: string; company: string; message: string }

const empty: ContactValues = { name: '', email: '', phone: '', company: '', message: '' }
const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? 'bbfc06b0-0d26-4bbf-b509-c5b026f601b4'

/** Form state + Web3Forms submission. */
export function useContactForm() {
  const [values, setValues] = useState<ContactValues>(empty)
  const [sent, setSent] = useState(false)
  const [busy, setBusy] = useState(false)

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }))

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!values.name || !values.email || !values.phone) {
      alert('Please fill out all required fields (*)')
      return
    }
    setBusy(true)
    try {
      const body = new FormData(e.currentTarget)
      body.append('access_key', ACCESS_KEY)
      const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body })
      const data = (await res.json()) as { success: boolean; message?: string }
      if (data.success) setSent(true)
      else alert(data.message || 'Something went wrong while submitting the form. Please try again.')
    } catch (error) {
      console.error('Web3Forms submission error:', error)
      alert('Network error. Please check your connection and try again.')
    } finally {
      setBusy(false)
    }
  }

  const reset = () => {
    setSent(false)
    setValues(empty)
  }

  return { values, sent, busy, onChange, onSubmit, reset }
}
