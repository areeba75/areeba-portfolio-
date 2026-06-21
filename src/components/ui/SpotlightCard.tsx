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

  const background = useMotionTemplate`radial-gradient(480px circle at ${mouseX}px ${mouseY}px, var(--color-spotlight), transparent 65%)`

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
  }

  return (
    <motion.div
      className={`group relative overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))] shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_18px_50px_rgba(0,0,0,0.28)] backdrop-blur-xl ${className}`}
      onMouseMove={reduced ? undefined : onMove}
      whileHover={reduced ? undefined : { y: -8, scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
    >
      {!reduced && (
        <motion.div
          className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background }}
        />
      )}
      <div className="absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)]/40 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,47,144,0.06),transparent_22%)]" />
      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}
