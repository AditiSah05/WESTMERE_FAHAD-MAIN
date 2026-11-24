'use client'

import { motion } from 'framer-motion'
import ProjectCard from './ProjectCard'
import { projects } from './data'

export default function WorkGrid() {
  return (
    <motion.div
      className="grid auto-rows-auto grid-cols-1 gap-5 min-[769px]:auto-rows-[120px] min-[769px]:grid-cols-[repeat(auto-fill,minmax(280px,1fr))] min-[769px]:grid-flow-dense min-[769px]:gap-[25px] min-[901px]:auto-rows-[140px] min-[901px]:grid-cols-[repeat(auto-fill,minmax(320px,1fr))]"
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }}
      initial="hidden"
      animate="show"
    >
      {projects.map((p, i) => <ProjectCard key={p.url} index={i} {...p} />)}
    </motion.div>
  )
}
