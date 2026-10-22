import Image from 'next/image'
import type { ReactNode } from 'react'
import css3 from '@/assets/icons/css-3.png'
import html from '@/assets/icons/html.png'
import java from '@/assets/icons/java-logo.png'
import js from '@/assets/icons/js.png'
import programming from '@/assets/icons/programing.png'
import react from '@/assets/icons/react.png'
import wordpress from '@/assets/icons/wordpress-icon.png'

const img = (src: typeof react, alt: string): ReactNode => (
  <Image src={src} alt={alt} width={30} height={30} className="size-[30px] object-contain opacity-55 grayscale" />
)

export const rightTools: { name: string; icon: ReactNode }[] = [
  { name: 'React', icon: img(react, 'React') },
  { name: 'HTML5', icon: img(html, 'HTML5') },
  { name: 'CSS3', icon: img(css3, 'CSS3') },
  { name: 'JavaScript', icon: img(js, 'JavaScript') },
  { name: 'Java', icon: img(java, 'Java') },
  { name: 'WordPress', icon: img(wordpress, 'WordPress') },
  { name: 'Programming', icon: img(programming, 'Programming') },
]
