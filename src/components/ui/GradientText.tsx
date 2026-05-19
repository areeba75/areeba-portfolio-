import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

type Props = {
  children: ReactNode
  className?: string
}

export function GradientText({ children, className = '' }: Props) {
  const reduced = useReducedMotion()

  return (
    <motion.span
      className={`gradient-text-animated ${className}`}
      animate={
        reduced
          ? undefined
          : {
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }
      }
      transition={
        reduced
          ? undefined
          : { duration: 6, repeat: Infinity, ease: 'linear' }
      }
    >
      {children}
    </motion.span>
  )
}
