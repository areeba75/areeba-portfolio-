import { motion } from 'framer-motion'
import { useReducedMotion } from '../hooks/useReducedMotion'

export function Background() {
  const reduced = useReducedMotion()

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      aria-hidden
    >
      <div className="grid-bg absolute inset-0" />
      <motion.div
        className="absolute -left-40 top-[15%] h-[520px] w-[520px] rounded-full bg-rose-500/15 blur-[130px]"
        animate={reduced ? undefined : { x: [0, 50, 0], y: [0, -40, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -right-32 top-[25%] h-[440px] w-[440px] rounded-full bg-sky-500/12 blur-[110px]"
        animate={reduced ? undefined : { x: [0, -60, 0], y: [0, 50, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-0 left-1/2 h-[360px] w-[640px] -translate-x-1/2 rounded-full bg-violet-600/10 blur-[120px]"
        animate={reduced ? undefined : { scale: [1, 1.12, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
    </motion.div>
  )
}
