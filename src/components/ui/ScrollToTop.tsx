import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { useState } from 'react'
import { useLenis } from '../../providers/SmoothScrollProvider'
import { scrollToSection } from '../../utils/scroll'

export function ScrollToTop() {
  const { scrollY } = useScroll()
  const [visible, setVisible] = useState(false)
  const lenis = useLenis()

  useMotionValueEvent(scrollY, 'change', (v) => {
    setVisible(v > 400)
  })

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={() => scrollToSection('hero', lenis)}
          className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface-elevated)] text-[var(--color-text)] shadow-lg backdrop-blur-md transition-colors duration-300 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          whileHover={{ scale: 1.08, y: -2 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Scroll to top"
        >
          <ArrowUp size={20} />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
