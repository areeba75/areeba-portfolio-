import { motion } from 'framer-motion'
import { Award, GraduationCap } from 'lucide-react'
import { achievements, education } from '../data/portfolio'
import { AnimatedSection } from './AnimatedSection'
import { SectionHeading } from './SectionHeading'

export function Education() {
  return (
    <AnimatedSection id="education" className="px-6 py-24 md:py-32">
      <motion.div className="mx-auto max-w-6xl">
        <SectionHeading
          label="Education"
          title="Background & achievements"
        />

        <div className="grid gap-6 md:grid-cols-2">
          <motion.div
            className="glass rounded-2xl p-8"
            whileHover={{ borderColor: 'rgba(56,189,248,0.25)' }}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-500/10">
              <GraduationCap className="text-sky-400" size={24} />
            </div>
            <h3 className="mt-6 font-[family-name:var(--font-display)] text-2xl font-bold text-white">
              {education.degree}
            </h3>
            <p className="mt-2 text-lg text-rose-400">{education.school}</p>
            <p className="mt-2 text-sm text-[var(--color-muted)]">
              {education.location}
            </p>
            <span className="mt-4 inline-block rounded-full border border-white/10 px-4 py-1.5 font-mono text-xs text-sky-300">
              {education.period}
            </span>
          </motion.div>

          <div className="flex flex-col gap-4">
            {achievements.map((item, i) => (
              <motion.div
                key={item.title}
                className="glass flex gap-4 rounded-2xl p-6"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ x: 4 }}
              >
                <motion.div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-rose-500/10">
                  <Award className="text-rose-400" size={20} />
                </motion.div>
                <div>
                  <h4 className="font-semibold text-white">{item.title}</h4>
                  <p className="mt-2 text-sm text-[var(--color-muted)] leading-relaxed">
                    {item.description}
                  </p>
                  <p className="mt-2 font-mono text-xs text-sky-400">
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
