import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { fadeUp, viewport } from '../lib/animations'
import { useReducedMotion } from '../hooks/useReducedMotion'

type Props = {
  children: ReactNode
  id?: string
  className?: string
}

export function AnimatedSection({ children, id, className = '' }: Props) {
  const reduced = useReducedMotion()

  return (
    <motion.section
      id={id}
      className={`px-6 py-14 md:py-20 ${className}`}
      initial={reduced ? false : 'hidden'}
      whileInView={reduced ? undefined : 'visible'}
      viewport={viewport}
      variants={fadeUp}
    >
      {children}
    </motion.section>
  )
}
