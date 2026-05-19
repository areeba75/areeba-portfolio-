import { motion, useMotionTemplate, useMotionValue } from 'framer-motion'
import type { ReactNode, MouseEvent } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

type Props = {
  children: ReactNode
  className?: string
}

export function SpotlightCard({ children, className = '' }: Props) {
  const reduced = useReducedMotion()
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const background = useMotionTemplate`radial-gradient(480px circle at ${mouseX}px ${mouseY}px, rgba(244,63,94,0.12), transparent 65%)`

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
  }

  return (
    <motion.div
      className={`group relative overflow-hidden rounded-2xl border border-white/8 bg-[var(--color-surface-elevated)] ${className}`}
      onMouseMove={reduced ? undefined : onMove}
      whileHover={reduced ? undefined : { y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
    >
      {!reduced && (
        <motion.div
          className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background }}
        />
      )}
      <motion.div
        className="relative z-10"
        style={
          reduced
            ? undefined
            : { rotateX: 0, rotateY: 0, transformStyle: 'preserve-3d' }
        }
      >
        {children}
      </motion.div>
    </motion.div>
  )
}
