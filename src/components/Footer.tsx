import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import { profile } from '../data/portfolio'
import { staggerContainer, staggerItem, viewport } from '../lib/animations'
import { GitHubIcon, LinkedInIcon } from './SocialIcons'

const socials = [
  { href: profile.github, icon: GitHubIcon, label: 'GitHub' },
  { href: profile.linkedin, icon: LinkedInIcon, label: 'LinkedIn' },
]

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-white/5 px-6 py-12">
      <motion.div
        className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-8 md:flex-row"
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={staggerContainer(0.08)}
      >
        <motion.p variants={staggerItem} className="text-sm text-[var(--color-muted)]">
          © {year}{' '}
          <span className="text-white">{profile.name}</span>. All rights reserved.
        </motion.p>

        <motion.div variants={staggerItem} className="flex gap-4">
          {socials.map(({ href, icon: Icon, label }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white"
              whileHover={{
                y: -4,
                scale: 1.1,
                borderColor: 'rgba(244,63,94,0.5)',
                boxShadow: '0 0 24px rgba(244,63,94,0.35)',
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon size={18} />
            </motion.a>
          ))}
        </motion.div>

        <motion.p
          variants={staggerItem}
          className="flex items-center gap-1.5 text-sm text-[var(--color-muted)]"
        >
          Built with React, Framer Motion & Lenis
          <Heart size={14} className="fill-rose-500 text-rose-500" />
        </motion.p>
      </motion.div>
    </footer>
  )
}
