import { motion } from 'framer-motion'
import { Briefcase } from 'lucide-react'
import { experience } from '../data/portfolio'
import { staggerContainer, staggerItem, viewport } from '../lib/animations'
import { AnimatedSection } from './AnimatedSection'
import { SectionHeading } from './SectionHeading'

export function Experience() {
  return (
    <AnimatedSection id="experience" className="px-6 py-24 md:py-32">
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
            className="absolute left-[19px] top-2 hidden h-[calc(100%-2rem)] w-px bg-gradient-to-b from-rose-500/50 via-sky-500/30 to-transparent md:block"
          />

          <div className="flex flex-col gap-10">
            {experience.map((job) => (
              <motion.article
                key={`${job.company}-${job.period}`}
                variants={staggerItem}
                className="relative md:pl-14"
              >
                <div className="absolute left-0 top-1 hidden h-10 w-10 items-center justify-center rounded-full border border-rose-500/40 bg-[var(--color-surface-elevated)] md:flex">
                  <Briefcase size={16} className="text-rose-400" />
                </div>

                <motion.div
                  className="glass group rounded-2xl p-6 md:p-8"
                  whileHover={{
                    y: -6,
                    borderColor: 'rgba(244,63,94,0.35)',
                    boxShadow: '0 24px 60px rgba(244,63,94,0.12)',
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <motion.div>
                      <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-white md:text-2xl">
                        {job.role}
                      </h3>
                      <p className="mt-1 text-rose-400">{job.company}</p>
                      <p className="mt-1 text-sm text-[var(--color-muted)]">
                        {job.location}
                      </p>
                      <p className="mt-1 text-xs text-sky-400/90">
                        {job.employment}
                      </p>
                    </motion.div>
                    <span className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 font-mono text-xs text-sky-300">
                      {job.period}
                    </span>
                  </div>

                  <ul className="mt-6 space-y-3">
                    {job.highlights.map((point) => (
                      <li
                        key={point}
                        className="flex gap-3 text-sm leading-relaxed text-[#b8b8c8]"
                      >
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-rose-400" />
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
