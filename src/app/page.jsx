import Hero from '../components/Hero'
import Approach from '../components/Approach'
import Comparison from '../components/Comparison'
import AboutBento from '../components/AboutBento/AboutBento'
import WhatWeDo from '../components/WhatWeDo/WhatWeDo'
import HashRedirect from '../components/HashRedirect'

export default function Home() {
  return (
    <>
      <HashRedirect />
      <Hero />
      <Approach />
      <Comparison />
      <AboutBento />
      <WhatWeDo />
    </>
  )
}
