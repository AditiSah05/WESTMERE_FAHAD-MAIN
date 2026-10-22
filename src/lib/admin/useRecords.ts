import { useCallback, useEffect, useRef, useState } from 'react'
import { loadRecords, resetRecords, writeRecords } from '@/app/admin/records'
import type { Row } from './types'

const toLogin = () => {
  window.location.href = '/admin/login'
}

/**
 * Rows for one admin screen, stored in the database through authenticated server actions.
 * Until something is saved, the built-in sample rows are shown.
 */
export function useRecords(storageKey: string, initial: Row[]) {
  const [rows, setRows] = useState<Row[]>(initial)
  const [ready, setReady] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const dirty = useRef(false)

  useEffect(() => {
    let live = true
    loadRecords(storageKey)
      .then((saved) => {
        if (live && saved) setRows(saved)
      })
      .catch(toLogin)
      .finally(() => live && setReady(true))
    return () => {
      live = false
    }
  }, [storageKey])

  useEffect(() => {
    if (!ready || !dirty.current) return
    const t = setTimeout(() => {
      writeRecords(storageKey, rows)
        .then(() => setError(null))
        .catch((e: Error) => (e.message.includes('UNAUTHORIZED') ? toLogin() : setError('Could not save. Check your connection and try again.')))
    }, 350)
    return () => clearTimeout(t)
  }, [rows, ready, storageKey])

  const mutate = useCallback((fn: (all: Row[]) => Row[]) => {
    dirty.current = true
    setRows(fn)
  }, [])

  const save = useCallback((row: Row) => mutate((all) => (all.some((r) => r.id === row.id) ? all.map((r) => (r.id === row.id ? row : r)) : [row, ...all])), [mutate])
  const remove = useCallback((id: string) => mutate((all) => all.filter((r) => r.id !== id)), [mutate])
  const reset = useCallback(() => {
    dirty.current = false
    setRows(initial)
    resetRecords(storageKey).catch(toLogin)
  }, [initial, storageKey])

  return { rows, save, remove, reset, error }
}
