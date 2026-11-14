import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

const base = { width: 16, height: 16, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true } as const

export const InstagramIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
)

export const FacebookIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
)

export const LinkedinIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4z" />
  </svg>
)

export const XIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M4 4l16 16M20 4L4 20" />
  </svg>
)

export const ThreadsIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M19 8.5C17.6 4.9 14.6 3 12 3 7.6 3 5 6.3 5 12s2.6 9 7 9c3.6 0 5.9-1.9 5.9-4.6 0-2.3-1.9-3.7-4.6-3.7-2.4 0-3.9 1-3.9 2.6 0 1.5 1.3 2.4 3 2.4 2.3 0 3.6-1.5 3.6-4.2 0-2.1-1.3-3.6-3.6-3.6-1.5 0-2.7.5-3.5 1.5" />
  </svg>
)
