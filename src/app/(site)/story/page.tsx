import Link from 'next/link'
import { getStory } from '@/lib/server/content'

export const metadata = {
  title: 'Our Story | Westmere',
  description: 'How Westmere began and what we believe: design and engineering under one roof.',
}
export const revalidate = 60

export default async function Page() {
  const { title, paragraphs } = await getStory()
  return (
    <article className="mx-auto w-full max-w-[720px] px-5 pb-24 pt-[120px] min-[769px]:pt-[150px]">
      <h1 className="text-[2.4rem] font-medium leading-[1.1] tracking-[-0.03em] text-ink min-[769px]:text-[3.2rem]">{title}</h1>
      <div className="mt-8 space-y-5 text-[17px] leading-[1.75] text-[#4a5568]">
        {paragraphs.map((p) => <p key={p}>{p}</p>)}
      </div>
      <Link href="/contact" className="mt-10 inline-flex rounded-lg bg-navy px-6 py-3 text-[15px] font-medium text-white transition-colors hover:bg-navy-deep">Start your project</Link>
    </article>
  )
}
