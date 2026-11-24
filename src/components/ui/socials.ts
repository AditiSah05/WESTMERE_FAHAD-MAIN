import { FacebookIcon, InstagramIcon } from './SocialIcons'

export type Socials = { instagram: string; facebook: string }

/** Only networks with a link set are returned, so an empty field hides its icon everywhere. */
export const socialList = (s: Socials) =>
  [
    { href: s.instagram, label: 'Instagram', Icon: InstagramIcon },
    { href: s.facebook, label: 'Facebook', Icon: FacebookIcon },
  ].filter((x) => x.href)
