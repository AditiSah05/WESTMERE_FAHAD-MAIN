import { GitBranch } from 'lucide-react'
import Image from 'next/image'
import type { ReactNode } from 'react'
import java from '@/assets/icons/java-logo.png'
import js from '@/assets/icons/js.png'
import react from '@/assets/icons/react.png'
import wordpress from '@/assets/icons/wordpress-icon.png'

const png = (src: typeof react, alt: string): ReactNode => <Image src={src} alt={alt} width={26} height={26} className="size-[26px] object-contain" />

const GitHub = () => (
  <svg viewBox="0 0 24 24" width="26" height="26" aria-label="GitHub"><path fill="#181717" d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 0-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2 0-.4-.5-1.6.2-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.7 18.3 5 18.3 5c.7 1.6.2 2.9.1 3.2.8.8 1.3 1.9 1.3 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3" /></svg>
)

const VSCode = () => (
  <svg viewBox="0 0 24 24" width="26" height="26" aria-label="VS Code"><path fill="#2f80ed" d="M23.2 2.4 18.3.1a1.4 1.4 0 0 0-1.6.3L7 9.2 2.9 6.1a.9.9 0 0 0-1.1.1L.4 7.4a.9.9 0 0 0 0 1.3L4 12 .4 15.3a.9.9 0 0 0 0 1.3l1.4 1.2a.9.9 0 0 0 1.1.1L7 14.8l9.7 8.8a1.4 1.4 0 0 0 1.6.3l4.9-2.3A1.5 1.5 0 0 0 24 20.3V3.7a1.5 1.5 0 0 0-.8-1.3zM18 17.4 10.5 12 18 6.6z" /></svg>
)

export type HeroIcon = { name: string; node: ReactNode; side: 'left' | 'right'; x: number; y: number; delay: number; dur: number }

/** Where each tile floats, as a percentage of the hero (taken from the reference design). */
export const heroIcons: HeroIcon[] = [
  { name: 'Git', node: <GitBranch size={24} strokeWidth={2.2} color="#e2543c" />, side: 'left', x: 11.7, y: 14.6, delay: 0, dur: 6.5 },
  { name: 'GitHub', node: <GitHub />, side: 'left', x: 19.6, y: 43.8, delay: 1.2, dur: 7.5 },
  { name: 'VS Code', node: <VSCode />, side: 'left', x: 16.2, y: 75, delay: 2.4, dur: 6 },
  { name: 'React', node: png(react, 'React'), side: 'left', x: 2.7, y: 96, delay: 0.6, dur: 7 },
  { name: 'WordPress', node: png(wordpress, 'WordPress'), side: 'right', x: 90, y: 11.4, delay: 0.8, dur: 7 },
  { name: 'Java', node: png(java, 'Java'), side: 'right', x: 79.9, y: 53.3, delay: 1.8, dur: 6.5 },
  { name: 'JavaScript', node: png(js, 'JavaScript'), side: 'right', x: 92.5, y: 93, delay: 3, dur: 7.5 },
]
