import { motion } from 'framer-motion'
import { ArrowRight, ExternalLink } from 'lucide-react'
import { projects, type Project } from '../data/portfolio'
import { staggerContainer, staggerItem, viewport } from '../lib/animations'
import { AnimatedSection } from './AnimatedSection'

function getInitials(title: string): string {
  return title
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.article
      variants={staggerItem}
      className="project-card-v2 group flex h-full flex-col"
    >
      <div className="project-thumb">
        {project.image ? (
          <img
            src={project.image}
            alt={`${project.title} preview`}
            className="project-thumb-img"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="project-thumb-inner">{getInitials(project.title)}</div>
        )}
        <div className="project-overlay">
          <div className="project-cta-slide flex flex-wrap justify-center gap-3">
            {project.href && (
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-accent)] px-4 py-2 text-xs font-medium text-white"
              >
                <ExternalLink size={14} />
                View Live
              </a>
            )}
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/30 px-4 py-2 text-xs font-medium text-white">
              View Project
              <ArrowRight size={14} />
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5 md:p-6">
        <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-[var(--color-text)]">
          {project.title}
        </h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide text-[var(--color-accent)]"
            >
              {tech}
            </span>
          ))}
        </div>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--color-muted)]">
          {project.description}
        </p>
      </div>
    </motion.article>
  )
}

export function Projects() {
  return (
    <AnimatedSection id="projects">
      <motion.div className="mx-auto max-w-6xl">
        <motion.div
          className="mb-8 md:mb-10"
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={staggerContainer(0.1)}
        >
          <motion.span
            variants={staggerItem}
            className="mb-3 inline-block text-xs font-medium uppercase tracking-[0.2em] text-[var(--color-accent)]"
          >
            Portfolio
          </motion.span>
          <motion.h2
            variants={staggerItem}
            className="font-[family-name:var(--font-display)] text-3xl tracking-tight text-[var(--color-text)] md:text-4xl lg:text-5xl"
          >
            See <span className="font-extrabold">What</span> I&apos;ve Been{' '}
            <span className="text-accent-word font-extrabold">Crafting</span> Lately
          </motion.h2>
        </motion.div>

        <motion.div
          className="projects-scroll sm:grid sm:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={staggerContainer(0.08)}
        >
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </motion.div>
      </motion.div>
    </AnimatedSection>
  )
}
