import type { ReactNode } from 'react'

/** Brand glyphs for the left orbit (decorative, shown greyed out). */
const IconVSCode = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path d="M17.5 0L6.5 10.5L2 7L0 8.5L5 13.5L0 18.5L2 20L6.5 16.5L17.5 27L24 23.5V3.5L17.5 0ZM17.5 19.5L9.5 13.5L17.5 7.5V19.5Z" fill="#007ACC"/>
  </svg>
)

const IconReact = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#61DAFB" strokeWidth="1.8">
    <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(0 12 12)" />
    <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(60 12 12)" />
    <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(120 12 12)" />
    <circle cx="12" cy="12" r="2" fill="#61DAFB" />
  </svg>
)

const IconNext = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="11" fill="#000" />
    <path d="M7 16V8h2.5l5.5 8h-2.5L7 8z" fill="#FFF" />
    <path d="M15 8v8h-2V8h2z" fill="#FFF" />
  </svg>
)

const IconNode = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path d="M12 2L2 7.5v9L12 22l10-5.5v-9L12 2z" fill="#339933"/>
    <path d="M12 6.5L6.5 9.5v5L12 17.5l5.5-3v-5L12 6.5z" fill="#FFFFFF" opacity="0.3"/>
    <path d="M12 9.5v5" stroke="#FFF" strokeWidth="1.5"/>
  </svg>
)

const IconExpress = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <text x="1" y="16" fontFamily="Inter, sans-serif" fontSize="13" fontWeight="800" fill="#111" letterSpacing="-0.5">ex</text>
    <path d="M17 7l4 10M21 7l-4 10" stroke="#111" strokeWidth="2" strokeLinecap="round"/>
  </svg>
)

const IconMongo = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path d="M12 2s-6 6-6 12a6 6 0 0 0 12 0c0-6-6-12-6-12z" fill="#47A248"/>
    <path d="M12 2v19.5" stroke="#FFFFFF" strokeWidth="1.2" opacity="0.6"/>
  </svg>
)

const IconFirebase = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path d="M3.89 15.67L7.6 2.65a.66.66 0 0 1 1.25.07l2.25 9.56" fill="#FFA000"/>
    <path d="M13.57 7.23l2.06-2.52a.66.66 0 0 1 1.13.2l3.35 13.06-16.22-2.3" fill="#F44336"/>
    <path d="M12 22l8.1-4.23L16.76 4.91a.66.66 0 0 0-1.13-.2l-2.06 2.52L12 22z" fill="#FFCA28"/>
  </svg>
)

const IconMySQL = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path d="M12 3C7.03 3 3 7.03 3 12s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm0 16c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z" fill="#00618A"/>
    <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5z" fill="#F29111"/>
  </svg>
)

const IconGit = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#F05032" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="6" y1="3" x2="6" y2="15"/>
    <circle cx="18" cy="6" r="3"/>
    <circle cx="6" cy="18" r="3"/>
    <path d="M18 9a9 9 0 0 1-9 9"/>
  </svg>
)

const IconGitHub = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="#181717">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
  </svg>
)

export const leftTools: { name: string; icon: ReactNode }[] = [
  { name: 'VS Code', icon: <IconVSCode /> },
  { name: 'React.js', icon: <IconReact /> },
  { name: 'Next.js', icon: <IconNext /> },
  { name: 'Node.js', icon: <IconNode /> },
  { name: 'Express.js', icon: <IconExpress /> },
  { name: 'MongoDB', icon: <IconMongo /> },
  { name: 'Firebase', icon: <IconFirebase /> },
  { name: 'MySQL', icon: <IconMySQL /> },
  { name: 'Git', icon: <IconGit /> },
  { name: 'GitHub', icon: <IconGitHub /> },
]
