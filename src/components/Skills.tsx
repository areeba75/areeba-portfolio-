import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import type { ReactNode } from 'react'
import { coreSkills, skillGroups } from '../data/portfolio'
import { staggerContainer, staggerItem, viewport } from '../lib/animations'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { AnimatedSection } from './AnimatedSection'
import { SectionHeading } from './SectionHeading'
function SkillBar({ name, level }: { name: string; level: number }) {
  return (
    <div>
      <motion.div className="mb-2 flex justify-between text-sm">
        <span className="text-[var(--color-text)]">{name}</span>
        <span className="text-[var(--color-muted)]">{level}%</span>
      </motion.div>
      <motion.div className="h-1.5 overflow-hidden rounded-full bg-[var(--color-border)]">
        <motion.div
          className="h-full rounded-full bg-[var(--accent)]"
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        />
      </motion.div>
    </div>
  )
}

function TiltCard({
  children,
  index,
}: {
  children: ReactNode
  index: number
}) {
  const reduced = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), {
    stiffness: 300,
    damping: 30,
  })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), {
    stiffness: 300,
    damping: 30,
  })

  if (reduced) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.08 }}
        className="glass rounded-2xl p-6"
      >
        {children}
      </motion.div>
    )
  }

  return (
    <motion.div
      className="glass rounded-2xl p-6"
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        x.set((e.clientX - rect.left) / rect.width - 0.5)
        y.set((e.clientY - rect.top) / rect.height - 0.5)
      }}
      onMouseLeave={() => {
        x.set(0)
        y.set(0)
      }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      whileHover={{ y: -6 }}
    >
      {children}
    </motion.div>
  )
}

export function Skills() {
  return (
    <AnimatedSection id="skills">
      <motion.div className="mx-auto max-w-6xl">
        <SectionHeading
          label="Skills"
          title="Tools & technologies"
          description="A modern frontend stack — from component architecture to deployment."
        />

        <motion.div
          className="mb-8 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-8"
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={staggerContainer(0.1)}
        >
          <motion.h3
            variants={staggerItem}
            className="mb-6 font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--color-text)]"
          >
            Core proficiency
          </motion.h3>
          <motion.div
            variants={staggerContainer(0.08)}
            className="grid gap-6 md:grid-cols-2"
          >
            {coreSkills.map((skill) => (
              <motion.div key={skill.name} variants={staggerItem}>
                <SkillBar name={skill.name} level={skill.level} />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={staggerContainer(0.08)}
        >
          {skillGroups.map((group, groupIndex) => (
            <motion.div key={group.label} variants={staggerItem}>
              <TiltCard index={groupIndex}>
                <h3 className="font-[family-name:var(--font-display)] text-sm font-semibold uppercase tracking-wider text-[var(--color-accent)]">
                  {group.label}
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {group.skills.map((skill, i) => (
                    <motion.span
                      key={skill}
                      className="skill-pill"
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: groupIndex * 0.05 + i * 0.03 }}
                      whileHover={{
                        scale: 1.05,
                        y: -3,
                      }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </AnimatedSection>
  )
}
