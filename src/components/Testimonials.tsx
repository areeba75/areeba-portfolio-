import { AnimatePresence, motion } from 'framer-motion'
import { Quote } from 'lucide-react'
import { useEffect, useState } from 'react'
import { testimonials } from '../data/portfolio'
import { fadeUp, viewport } from '../lib/animations'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { AnimatedSection } from './AnimatedSection'
import { SectionHeading } from './SectionHeading'

export function Testimonials() {
  const [index, setIndex] = useState(0)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length)
    }, 5000)
    return () => window.clearInterval(id)
  }, [reduced])

  const current = testimonials[index]

  return (
    <AnimatedSection id="testimonials" className="px-6 py-24 md:py-32">
      <motion.div className="mx-auto max-w-4xl">
        <SectionHeading
          label="Testimonials"
          title="What teams say"
          description="Feedback from collaborators and teams I've worked with on production products."
        />

        <motion.div
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-rose-500/8 via-[var(--color-surface-elevated)] to-sky-500/8 p-10 md:p-14"
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={fadeUp}
        >
          <Quote
            size={40}
            className="mb-6 text-rose-400/40"
            aria-hidden
          />

          <div className="min-h-[140px]">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="text-lg leading-relaxed text-[var(--color-text)] md:text-xl"
              >
                &ldquo;{current.quote}&rdquo;
              </motion.blockquote>
            </AnimatePresence>
          </div>

          <AnimatePresence mode="wait">
            <motion.footer
              key={`author-${index}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-8 border-t border-white/10 pt-6"
            >
              <p className="font-semibold text-[var(--color-text)]">{current.author}</p>
              <p className="mt-1 text-sm text-[var(--color-accent)]">{current.role}</p>
            </motion.footer>
          </AnimatePresence>

          <motion.div className="mt-8 flex justify-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                className={`h-2 rounded-full transition-all ${
                  i === index
                    ? 'w-8 bg-rose-400'
                    : 'w-2 bg-white/20 hover:bg-white/40'
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatedSection>
  )
}
