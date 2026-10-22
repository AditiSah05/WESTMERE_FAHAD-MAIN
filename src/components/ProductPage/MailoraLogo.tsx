export default function MailoraLogo({ size = 28, inner = '#000000' }: { size?: number; inner?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden className="block">
      <path d="M4 26 L12 6 L18 20 L24 6 L32 26" stroke="#C4943D" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 26 L16 16 L28 26" stroke={inner} strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
