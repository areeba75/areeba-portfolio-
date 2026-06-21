import { motion, useScroll, useTransform } from 'framer-motion'
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
  const { scrollYProgress } = useScroll()

  const y = useTransform(scrollYProgress, [0, 0.4, 1], [18, 0, -18])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.88, 1, 1, 0.9])

  return (
    <motion.section
      id={id}
      className={`relative px-6 py-14 md:py-20 ${className}`}
      initial={reduced ? false : 'hidden'}
      whileInView={reduced ? undefined : 'visible'}
      viewport={viewport}
      variants={fadeUp}
      style={reduced ? undefined : { y, opacity }}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)]/15 to-transparent" />
      {children}
    </motion.section>
  )
}
