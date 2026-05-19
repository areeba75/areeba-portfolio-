import { motion, useInView, useSpring, useTransform } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

type Props = {
  value: number
  suffix?: string
  className?: string
}

export function AnimatedCounter({ value, suffix = '', className = '' }: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const reduced = useReducedMotion()
  const spring = useSpring(0, { stiffness: 60, damping: 18 })
  const display = useTransform(spring, (v) => `${Math.round(v)}${suffix}`)

  useEffect(() => {
    if (reduced) {
      spring.set(value)
      return
    }
    if (inView) spring.set(value)
  }, [inView, value, spring, reduced])

  if (reduced) {
    return (
      <span ref={ref} className={className}>
        {value}
        {suffix}
      </span>
    )
  }

  return (
    <motion.span ref={ref} className={className}>
      {display}
    </motion.span>
  )
}
