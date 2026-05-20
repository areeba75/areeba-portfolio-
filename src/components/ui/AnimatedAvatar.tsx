import { motion } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'

export function AnimatedAvatar() {
  const reduced = useReducedMotion()

  return (
    <motion.div
      className="relative h-64 w-64 sm:h-72 sm:w-72"
      initial={reduced ? false : { opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="absolute -inset-4 rounded-[2rem] bg-[var(--color-accent)]/20 blur-3xl"
        animate={reduced ? undefined : { scale: [1, 1.1, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-surface-elevated)] shadow-2xl"
        animate={reduced ? undefined : { y: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent)]/10 via-transparent to-violet-500/10" />

        <motion.div
          className="relative z-10 text-[5.5rem] leading-none sm:text-[6.5rem]"
          animate={reduced ? undefined : { rotate: [0, 5, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          role="img"
          aria-label="Developer avatar"
        >
          👩‍💻
        </motion.div>

        <div className="relative z-10 mt-2 flex gap-2">
          {['⚛️', '▲', 'TS'].map((badge, i) => (
            <motion.span
              key={badge}
              className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-2.5 py-1 text-xs font-medium text-[var(--color-text)]"
              animate={reduced ? undefined : { y: [0, -4, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
            >
              {badge}
            </motion.span>
          ))}
        </div>
      </motion.div>

      <motion.div
        className="absolute -bottom-3 -right-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] px-4 py-2 text-sm font-medium shadow-lg"
        animate={reduced ? undefined : { scale: [1, 1.05, 1] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      >
        <span className="text-emerald-500">●</span>{' '}
        <span className="text-[var(--color-text)]">Open to work ✅</span>
      </motion.div>
    </motion.div>
  )
}
