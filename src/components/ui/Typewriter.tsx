import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'

interface TypewriterProps {
  words: readonly string[]
  interval?: number
  className?: string
}

function longestWord(words: readonly string[]) {
  return words.reduce((longest, word) =>
    word.length > longest.length ? word : longest,
  words[0] ?? '')
}

export function Typewriter({ words, interval = 2500, className = '' }: TypewriterProps) {
  const [index, setIndex] = useState(0)
  const shouldReduce = useReducedMotion()
  const placeholder = useMemo(() => longestWord(words), [words])

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
    <span className={`inline-flex items-center whitespace-nowrap ${className}`}>
      <span className="relative inline-block overflow-hidden">
        <span className="invisible select-none" aria-hidden>
          {placeholder}
        </span>
        <span className="absolute inset-0 flex items-center">
          <AnimatePresence mode="wait">
            <motion.span
              key={words[index]}
              className="block whitespace-nowrap"
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '-100%', opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              {words[index]}
            </motion.span>
          </AnimatePresence>
        </span>
      </span>
      <motion.span
        className="ml-1 inline-block h-[1em] w-[2px] shrink-0 bg-[var(--color-accent)]"
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        aria-hidden
      />
    </span>
  )
}
