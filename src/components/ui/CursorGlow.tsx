import { motion, useMotionTemplate, useMotionValue } from 'framer-motion'
import { useEffect } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

export function CursorGlow() {
  const reduced = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  useEffect(() => {
    if (reduced) return

    const move = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }

    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [reduced, x, y])

  if (reduced) return null

  const background = useMotionTemplate`radial-gradient(400px circle at ${x}px ${y}px, rgba(247, 37, 133, 0.06), transparent 70%)`

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-0"
      style={{ background }}
      aria-hidden
    />
  )
}
