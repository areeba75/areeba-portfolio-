import { motion, useMotionTemplate, useMotionValue } from 'framer-motion'
import type { ReactNode, MouseEvent } from 'react'

type Props = {
  children: ReactNode
  className?: string
}

export function ParallaxLayer({ children, className = '' }: Props) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const glow = useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(247,37,133,0.08), transparent 40%)`

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
  }

  return (
    <motion.div
      className={`group relative overflow-hidden ${className}`}
      onMouseMove={onMove}
      style={{ perspective: 1200 }}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: glow }}
      />
      <motion.div
        className="relative z-10"
        whileHover={{ y: -4 }}
        transition={{ type: 'spring', stiffness: 230, damping: 18 }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}
