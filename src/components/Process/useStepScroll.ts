import { useCallback, useEffect, useRef, useState } from 'react'

/** Maps scroll position inside a tall sticky section to one of `count` steps. */
export function useStepScroll(count: number) {
  const ref = useRef<HTMLElement>(null)
  const [step, setStep] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const el = ref.current
      if (!el) return
      const scrollable = el.offsetHeight - window.innerHeight
      const raw = Math.min(0.999, Math.max(0, -el.getBoundingClientRect().top / scrollable))
      setStep(Math.floor(raw * count))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [count])

  const goTo = useCallback(
    (i: number) => {
      const el = ref.current
      if (!el) return
      const scrollable = el.offsetHeight - window.innerHeight
      const top = el.getBoundingClientRect().top + window.scrollY
      window.scrollTo({ top: top + ((i + 0.5) / count) * scrollable, behavior: 'smooth' })
    },
    [count],
  )

  return { ref, step, goTo }
}
