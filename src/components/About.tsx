import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import { profile, projects } from '../data/portfolio'
import { staggerContainer, staggerItem, viewport } from '../lib/animations'
import { AnimatedSection } from './AnimatedSection'
import { SectionHeading } from './SectionHeading'
import { AnimatedCounter } from './ui/AnimatedCounter'
import { SpotlightCard } from './ui/SpotlightCard'

export function About() {
  return (
    <AnimatedSection id="about">
      <motion.div className="mx-auto max-w-6xl">
        <SectionHeading
          label="About"
          title="Building interfaces that scale"
          description={profile.summary}
        />

        <div className="grid gap-8 lg:grid-cols-2">
          <SpotlightCard className="p-8">
            <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--color-text)]">
              What I bring to your team
            </h3>
            <p className="mt-4 leading-relaxed text-[var(--color-muted)]">
              Strong understanding of responsive design, accessibility,
              cross-browser compatibility, and modern frontend architecture.
              Experienced in independently owning frontend features from
              development to deployment within Agile teams.
            </p>
            <motion.div
              className="mt-8 grid grid-cols-2 gap-6"
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              variants={staggerContainer(0.08)}
            >
              {[
                { value: 2, suffix: '+', label: 'Years experience' },
                { value: 4, suffix: '', label: 'Companies' },
                { value: projects.length, suffix: '+', label: 'Projects shipped' },
                { value: 10, suffix: '+', label: 'Core technologies' },
              ].map((stat) => (
                <motion.div key={stat.label} variants={staggerItem}>
                  <p className="font-[family-name:var(--font-display)] text-3xl font-bold text-[var(--accent)]">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="mt-1 text-sm text-[var(--color-muted)]">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </SpotlightCard>

          <motion.ul
            className="flex flex-col gap-3"
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={staggerContainer(0.06)}
          >
            {profile.highlights.map((text) => (
              <motion.li key={text} variants={staggerItem}>
                <SpotlightCard className="flex items-start gap-3 p-4">
                  <CheckCircle2
                    size={20}
                    className="mt-0.5 shrink-0 text-[var(--accent)]"
                  />
                  <span className="text-sm text-[var(--color-muted)]">{text}</span>
                </SpotlightCard>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </motion.div>
    </AnimatedSection>
  )
}
