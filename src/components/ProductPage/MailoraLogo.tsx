import Image from 'next/image'
import full from '@/assets/mailora-logo.jpeg'
import mark from '@/assets/mailora-mark.jpeg'

/**
 * Mailora's real logo, cropped from the supplied artwork: `full` is mark + wordmark, `mark` is the "M" alone for
 * small spots. The artwork has a white background, so `mix-blend-multiply` lets it sit on any light surface.
 */
export default function MailoraLogo({ variant = 'mark', height = 24 }: { variant?: 'mark' | 'full'; height?: number }) {
  const src = variant === 'full' ? full : mark
  return (
    <Image
      src={src}
      alt={variant === 'full' ? 'Mailora' : ''}
      height={height}
      width={Math.round((height * src.width) / src.height)}
      className="block flex-none mix-blend-multiply"
    />
  )
}
