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

  const background = useMotionTemplate`radial-gradient(600px circle at ${x}px ${y}px, rgba(244,63,94,0.07), transparent 55%)`

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-30"
      style={{ background }}
      aria-hidden
    />
  )
}
