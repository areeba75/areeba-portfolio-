import { motion, useMotionValue, useSpring } from 'framer-motion'
import type { ReactNode, MouseEvent } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

type Props = {
  children: ReactNode
  className?: string
  href?: string
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void
  target?: string
  rel?: string
}

export function MagneticButton({
  children,
  className = '',
  href,
  onClick,
  target,
  rel,
}: Props) {
  const reduced = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 300, damping: 20 })
  const springY = useSpring(y, { stiffness: 300, damping: 20 })

  const onMove = (e: MouseEvent<HTMLAnchorElement>) => {
    if (reduced) return
    const rect = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - rect.left - rect.width / 2) * 0.2)
    y.set((e.clientY - rect.top - rect.height / 2) * 0.2)
  }

  const onLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.a
      href={href}
      onClick={onClick}
      target={target}
      rel={rel}
      className={className}
      style={reduced ? undefined : { x: springX, y: springY }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileHover={reduced ? undefined : { scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
    >
      {children}
    </motion.a>
  )
}
