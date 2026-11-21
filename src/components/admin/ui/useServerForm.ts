'use client'

import { useState, useTransition, type FormEvent } from 'react'

/**
 * Submit a form to a server action without React clearing the fields when the server says no
 * (React resets uncontrolled forms after an action finishes, which would wipe what the person typed).
 */
export function useServerForm(run: (prev: undefined, fd: FormData) => Promise<{ error?: string } | undefined>, onDone: () => void) {
  const [error, setError] = useState<string>()
  const [pending, start] = useTransition()
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    setError(undefined)
    start(async () => {
      const r = await run(undefined, fd)
      if (r?.error) setError(r.error)
      else onDone()
    })
  }
  return { onSubmit, pending, error }
}
