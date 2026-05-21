import { motion } from 'framer-motion'
import { profile } from '../data/portfolio'
import { viewport } from '../lib/animations'
import { GitHubIcon, LinkedInIcon } from './SocialIcons'

const socials = [
  { href: profile.github, icon: GitHubIcon, label: 'GitHub' },
  { href: profile.linkedin, icon: LinkedInIcon, label: 'LinkedIn' },
]

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-[var(--border-pink)] px-6 py-10">
      <motion.div
        className="mx-auto max-w-3xl text-center"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewport}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <p className="text-lg leading-relaxed text-[var(--text-primary)] md:text-xl">
          Thanks for visiting! ❤️ Hope you enjoyed the journey 🙌
          <br />
          <span className="text-[var(--text-muted)]">My inbox is always open.</span>
        </p>

        <div className="mt-8 flex justify-center gap-4">
          {socials.map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="footer-social flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--bg-card)] text-[var(--text-primary)] transition duration-300"
            >
              <Icon size={18} />
            </a>
          ))}
        </div>

        <p className="mt-10 text-[13px] text-[var(--text-muted)]">
          Designed &amp; built by {profile.name} · {year}
        </p>
      </motion.div>
    </footer>
  )
}
