import { useEffect, useRef } from 'react'

const SPEED = 24 // px per second
const SPREAD = 55 // px: how quickly rows fade away from the window centre

/**
 * Vertical marquee: time-based transform drift (scrollTop rounds sub-pixel steps and stalls),
 * centre-weighted row opacity, pause on hover, drag to move. The list is rendered twice so it loops.
 */
export function useTicker() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const win = ref.current
    const track = win?.querySelector<HTMLElement>('[data-track]')
    if (!win || !track) return
    const rows = track.querySelectorAll<HTMLElement>('[data-row]')

    let offset = 0, hovered = false, dragging = false, dragY = 0, dragStart = 0
    let last = performance.now()
    let raf = 0

    const tick = (now: number) => {
      const dt = Math.min(now - last, 64) / 1000
      last = now
      const half = track.scrollHeight / 2
      if (!hovered && !dragging) offset += SPEED * dt
      offset = ((offset % half) + half) % half
      track.style.transform = `translate3d(0, ${-offset}px, 0)`
      const mid = offset + win.clientHeight / 2
      rows.forEach((row) => {
        const d = row.offsetTop + row.offsetHeight / 2 - mid
        row.style.opacity = (0.05 + 0.95 * Math.exp(-(d * d) / (SPREAD * SPREAD))).toFixed(3)
      })
      raf = requestAnimationFrame(tick)
    }

    const on = { enter: () => (hovered = true), leave: () => (hovered = false), up: () => (dragging = false) }
    const down = (e: PointerEvent) => { dragging = true; dragY = e.clientY; dragStart = offset; win.setPointerCapture(e.pointerId) }
    const move = (e: PointerEvent) => { if (dragging) offset = dragStart - (e.clientY - dragY) }

    win.addEventListener('mouseenter', on.enter)
    win.addEventListener('mouseleave', on.leave)
    win.addEventListener('pointerdown', down)
    win.addEventListener('pointermove', move)
    win.addEventListener('pointerup', on.up)
    win.addEventListener('pointercancel', on.up)
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      win.removeEventListener('mouseenter', on.enter)
      win.removeEventListener('mouseleave', on.leave)
      win.removeEventListener('pointerdown', down)
      win.removeEventListener('pointermove', move)
      win.removeEventListener('pointerup', on.up)
      win.removeEventListener('pointercancel', on.up)
    }
  }, [])

  return ref
}
