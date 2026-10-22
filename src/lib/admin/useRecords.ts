import { useCallback, useEffect, useState } from 'react'
import type { Row } from './types'

/** Rows kept in React state and mirrored to localStorage (demo persistence; swap for an API later). */
export function useRecords(storageKey: string, initial: Row[]) {
  const [rows, setRows] = useState<Row[]>(initial)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey)
      if (saved) setRows(JSON.parse(saved) as Row[])
    } catch {
      /* ignore corrupt or blocked storage */
    }
    setReady(true)
  }, [storageKey])

  useEffect(() => {
    if (!ready) return
    try {
      localStorage.setItem(storageKey, JSON.stringify(rows))
    } catch {
      /* quota or private mode */
    }
  }, [rows, ready, storageKey])

  const save = useCallback((row: Row) => {
    setRows((all) => (all.some((r) => r.id === row.id) ? all.map((r) => (r.id === row.id ? row : r)) : [row, ...all]))
  }, [])
  const remove = useCallback((id: string) => setRows((all) => all.filter((r) => r.id !== id)), [])
  const reset = useCallback(() => setRows(initial), [initial])

  return { rows, save, remove, reset }
}
