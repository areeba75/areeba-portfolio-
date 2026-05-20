import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface TypewriterProps {
  words: readonly string[]
  interval?: number
  className?: string
}

export function Typewriter({ words, interval = 2500, className = '' }: TypewriterProps) {
  const [index, setIndex] = useState(0)
  const shouldReduce = useReducedMotion()

  useEffect(() => {
    if (shouldReduce) return
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % words.length)
    }, interval)
    return () => window.clearInterval(id)
  }, [words, interval, shouldReduce])

  if (shouldReduce) {
    return <span className={className}>{words[0]}</span>
  }

  return (
    <span className={`inline-flex min-h-[1.4em] items-center ${className}`}>
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -16, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
      <motion.span
        className="ml-1 inline-block h-[1em] w-[2px] bg-[var(--color-accent)]"
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.8, repeat: Infinity }}
      />
    </span>
  )
}
