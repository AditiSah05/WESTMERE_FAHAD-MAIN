import Approach from '@/components/Approach'
import Comparison from '@/components/legacy/Comparison'
import Hero from '@/components/Hero'
import '@/components/legacy/legacy.css'
import AboutBento from '@/components/AboutBento/AboutBento'
import Process from '@/components/Process'
import WhatWeDo from '@/components/WhatWeDo/WhatWeDo'
import HashRedirect from '@/components/HashRedirect'
import { getComparison } from '@/lib/server/content'

// Static, refreshed whenever admin saves (revalidatePath) and at most once a minute.
export const revalidate = 60

export default async function Home() {
  return (
    <>
      <HashRedirect />
      <Hero />
      <Approach />
      <div className="legacy-home"><Comparison rows={await getComparison()} /></div>
      <AboutBento />
      <Process />
      <WhatWeDo />
    </>
  )
}
