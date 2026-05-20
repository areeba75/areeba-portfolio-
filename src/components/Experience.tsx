import { motion } from 'framer-motion'
import { Briefcase } from 'lucide-react'
import { experience } from '../data/portfolio'
import { staggerContainer, staggerItem, viewport } from '../lib/animations'
import { AnimatedSection } from './AnimatedSection'
import { SectionHeading } from './SectionHeading'

export function Experience() {
  return (
    <AnimatedSection id="experience">
      <motion.div className="mx-auto max-w-6xl">
        <SectionHeading
          label="Experience"
          title="Where I've shipped code"
          description="On-site full-time roles in Lahore — owning features end-to-end in Agile teams."
        />

        <motion.div
          className="relative"
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={staggerContainer(0.12)}
        >
          <motion.div
            variants={staggerItem}
            className="absolute left-[19px] top-2 hidden h-[calc(100%-2rem)] w-px bg-[var(--color-border)] md:block"
          />

          <div className="flex flex-col gap-10">
            {experience.map((job) => (
              <motion.article
                key={`${job.company}-${job.period}`}
                variants={staggerItem}
                className="relative md:pl-14"
              >
                <div className="absolute left-0 top-1 hidden h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border-hover)] bg-[var(--color-surface-elevated)] md:flex">
                  <Briefcase size={16} className="text-[var(--accent)]" />
                </div>

                <motion.div
                  className="glass group rounded-2xl p-6 md:p-8"
                  whileHover={{
                    y: -6,
                    borderColor: 'var(--color-border-hover)',
                    boxShadow: '0 24px 60px var(--color-glow)',
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <motion.div>
                      <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-[var(--color-text)] md:text-2xl">
                        {job.role}
                      </h3>
                      <p className="mt-1 text-[var(--accent)]">{job.company}</p>
                      <p className="mt-1 text-sm text-[var(--color-muted)]">
                        {job.location}
                      </p>
                      <p className="mt-1 text-xs text-[var(--color-subtle)]">
                        {job.employment}
                      </p>
                    </motion.div>
                    <span className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-1.5 font-mono text-xs text-[var(--color-subtle)]">
                      {job.period}
                    </span>
                  </div>

                  <ul className="mt-6 space-y-3">
                    {job.highlights.map((point) => (
                      <li
                        key={point}
                        className="flex gap-3 text-sm leading-relaxed text-[var(--color-muted)]"
                      >
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--accent)]" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </AnimatedSection>
  )
}
