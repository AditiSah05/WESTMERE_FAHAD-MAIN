import { FacebookIcon, InstagramIcon, LinkedinIcon, ThreadsIcon, XIcon } from '@/components/ui/SocialIcons'
import { NETWORKS, type NetworkKey } from '@/lib/site-defaults'

const icons = { instagram: InstagramIcon, facebook: FacebookIcon, linkedin: LinkedinIcon, threads: ThreadsIcon, x: XIcon }

/** One round icon link per network that has a link set in admin; renders nothing when none are set. */
export default function SocialLinks({ socials, className, iconClass }: { socials: Record<NetworkKey, string>; className: string; iconClass: string }) {
  const live = NETWORKS.filter((n) => socials[n.key])
  if (!live.length) return null
  return (
    <div className={className}>
      {live.map(({ key, label }) => {
        const Icon = icons[key]
        return (
          <a key={key} href={socials[key]} target="_blank" rel="noopener noreferrer" aria-label={label} className={iconClass}>
            <Icon width={14} height={14} />
          </a>
        )
      })}
    </div>
  )
}
