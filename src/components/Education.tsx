import { motion } from 'framer-motion'
import { Award, GraduationCap } from 'lucide-react'
import { achievements, education } from '../data/portfolio'
import { AnimatedSection } from './AnimatedSection'
import { SectionHeading } from './SectionHeading'

export function Education() {
  return (
    <AnimatedSection id="education">
      <motion.div className="mx-auto max-w-6xl">
        <SectionHeading
          label="Education"
          title="Background & achievements"
        />

        <div className="grid gap-6 md:grid-cols-2">
          <motion.div className="glass theme-card rounded-2xl p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--accent-soft)]">
              <GraduationCap className="text-[var(--accent)]" size={24} />
            </div>
            <h3 className="mt-6 font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--color-text)]">
              {education.degree}
            </h3>
            <p className="mt-2 text-lg text-[var(--accent)]">{education.school}</p>
            <p className="mt-2 text-sm text-[var(--color-muted)]">
              {education.location}
            </p>
            <span className="mt-4 inline-block rounded-full border border-[var(--color-border)] px-4 py-1.5 font-mono text-xs text-[var(--color-subtle)]">
              {education.period}
            </span>
          </motion.div>

          <div className="flex flex-col gap-4">
            {achievements.map((item, i) => (
              <motion.div
                key={item.title}
                className="glass theme-card flex gap-4 rounded-2xl p-6"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ x: 4 }}
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--accent-soft)]">
                  <Award className="text-[var(--accent)]" size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-[var(--color-text)]">{item.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">
                    {item.description}
                  </p>
                  <p className="mt-2 font-mono text-xs text-[var(--color-subtle)]">
                    {item.period}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatedSection>
  )
}
