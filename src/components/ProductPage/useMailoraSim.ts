import { useEffect, useState } from 'react'

export const TOTAL_EMAILS = 1250

/** Fake campaign: upload -> edit template -> animated sending -> completed. */
export function useMailoraSim() {
  const [fileName, setFileName] = useState('')
  const [message, setMessage] = useState(
    "Hi {name},\n\nI hope you're doing great. We wanted to reach out to you with an exciting opportunity...",
  )
  const [sending, setSending] = useState(false)
  const [done, setDone] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!sending) return
    const id = setInterval(() => setProgress((p) => Math.min(100, p + 4)), 120)
    return () => clearInterval(id)
  }, [sending])

  useEffect(() => {
    if (progress >= 100 && sending) {
      setSending(false)
      setDone(true)
    }
  }, [progress, sending])

  return {
    fileName, message, sending, done, progress,
    uploaded: !!fileName,
    sent: Math.min(TOTAL_EMAILS, Math.floor((progress / 100) * TOTAL_EMAILS)),
    setMessage,
    upload: () => setFileName(`leads.csv (${TOTAL_EMAILS.toLocaleString()} emails)`),
    start: () => { if (fileName) { setSending(true); setProgress(0); setDone(false) } },
    reset: () => { setFileName(''); setProgress(0); setSending(false); setDone(false) },
  }
}
