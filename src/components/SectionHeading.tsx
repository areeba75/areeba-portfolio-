import { motion } from 'framer-motion'
import { staggerContainer, staggerItem, viewport } from '../lib/animations'
import { useReducedMotion } from '../hooks/useReducedMotion'

type Props = {
  label: string
  title: string
  description?: string
}

export function SectionHeading({ label, title, description }: Props) {
  const reduced = useReducedMotion()

  return (
    <motion.div
      className="mb-8 md:mb-10"
      initial={reduced ? false : 'hidden'}
      whileInView={reduced ? undefined : 'visible'}
      viewport={viewport}
      variants={staggerContainer(0.12, 0)}
    >
      <motion.span
        variants={staggerItem}
        className="mb-3 inline-block text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-accent)]"
      >
        {label}
      </motion.span>
      <motion.h2
        variants={staggerItem}
        className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl"
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          variants={staggerItem}
          className="mt-4 max-w-2xl text-base text-white/80 md:text-lg"
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  )
}
