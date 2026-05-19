import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { fadeUp, viewport } from '../../lib/animations'
import { useReducedMotion } from '../../hooks/useReducedMotion'

type Props = {
  children: ReactNode
  className?: string
  delay?: number
  id?: string
  as?: 'section' | 'motion.div'
}

export function Reveal({
  children,
  className = '',
  delay = 0,
  id,
  as = 'section',
}: Props) {
  const reduced = useReducedMotion()
  const Component = as === 'section' ? motion.section : motion.div

  if (reduced) {
    return (
      <Component id={id} className={className}>
        {children}
      </Component>
    )
  }

  return (
    <Component
      id={id}
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={{
        hidden: fadeUp.hidden,
        visible: {
          ...fadeUp.visible,
          transition: {
            ...(typeof fadeUp.visible === 'object' &&
            fadeUp.visible !== null &&
            'transition' in fadeUp.visible
              ? fadeUp.visible.transition
              : {}),
            delay,
          },
        },
      }}
    >
      {children}
    </Component>
  )
}
