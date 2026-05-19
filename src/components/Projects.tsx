import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, ExternalLink, Layers } from 'lucide-react'
import { useMemo, useState } from 'react'
import { projects, type Project } from '../data/portfolio'
import { staggerContainer, staggerItem, viewport } from '../lib/animations'
import { AnimatedSection } from './AnimatedSection'
import { SectionHeading } from './SectionHeading'

const filters = ['All', 'SaaS', 'E-commerce', 'Platform'] as const
type Filter = (typeof filters)[number]

function getCategory(project: Project): Filter {
  const t = project.title.toLowerCase()
  if (
    t.includes('pulsse') ||
    t.includes('stylz') ||
    t.includes('admission') ||
    t.includes('pakpreneur')
  )
    return 'SaaS'
  if (
    t.includes('carflix') ||
    t.includes('mall') ||
    t.includes('miguel') ||
    t.includes('e-commerce')
  )
    return 'E-commerce'
  return 'Platform'
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.article
      layout
      variants={staggerItem}
      className={`group relative overflow-hidden rounded-2xl border border-white/8 bg-gradient-to-br ${project.gradient} p-[1px]`}
      whileHover={{ y: -10, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
    >
      <div className="relative flex h-full min-h-[280px] flex-col overflow-hidden rounded-2xl bg-[var(--color-surface-elevated)]">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-rose-500/10 via-transparent to-sky-500/10 opacity-60"
          whileHover={{ scale: 1.15 }}
          transition={{ duration: 0.5 }}
        />

        <motion.div className="relative z-10 flex flex-1 flex-col p-6 md:p-8">
          <motion.div className="mb-6 flex items-start justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5">
              <Layers size={22} className="text-rose-400" />
            </div>
            {project.href && (
              <span className="text-white/40 transition-colors group-hover:text-rose-400">
                <ArrowUpRight size={22} />
              </span>
            )}
          </motion.div>

          <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-white">
            {project.title}
          </h3>

          <motion.div className="mt-3 flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="rounded-md bg-white/5 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide text-sky-300"
              >
                {tech}
              </span>
            ))}
          </motion.div>

          <p className="mt-4 flex-1 text-sm leading-relaxed text-[var(--color-muted)]">
            {project.description}
          </p>

          <motion.div className="mt-6 flex flex-wrap gap-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            {project.href && (
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-rose-500 px-4 py-2 text-xs font-medium text-white"
              >
                <ExternalLink size={14} />
                Live site
              </a>
            )}
            {project.secondaryHref && (
              <a
                href={project.secondaryHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-4 py-2 text-xs font-medium text-white"
              >
                Dashboard
              </a>
            )}
          </motion.div>

          <motion.div className="mt-4 flex flex-wrap gap-3 group-hover:hidden">
            {project.href ? (
              <span className="text-xs text-rose-400">View live site →</span>
            ) : (
              <span className="text-xs text-[var(--color-muted)]">
                Professional project
              </span>
            )}
          </motion.div>
        </motion.div>
      </div>
    </motion.article>
  )
}

export function Projects() {
  const [active, setActive] = useState<Filter>('All')

  const filtered = useMemo(() => {
    if (active === 'All') return projects
    return projects.filter((p) => getCategory(p) === active)
  }, [active])

  return (
    <AnimatedSection id="projects" className="px-6 py-24 md:py-32">
      <motion.div className="mx-auto max-w-6xl">
        <SectionHeading
          label="Projects"
          title="Selected work"
          description="Production platforms — e-commerce, SaaS, AI admission systems, and marketplace applications."
        />

        <motion.div
          className="mb-10 flex flex-wrap gap-2"
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={staggerContainer(0.06)}
        >
          {filters.map((filter) => (
            <motion.button
              key={filter}
              type="button"
              variants={staggerItem}
              onClick={() => setActive(filter)}
              className={`relative rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                active === filter
                  ? 'text-white'
                  : 'text-[var(--color-muted)] hover:text-white'
              }`}
            >
              {active === filter && (
                <motion.span
                  layoutId="project-filter"
                  className="absolute inset-0 rounded-full bg-rose-500"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{filter}</span>
            </motion.button>
          ))}
        </motion.div>

        <motion.div
          layout
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={staggerContainer(0.08)}
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </AnimatedSection>
  )
}
