import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { profile } from '../data/portfolio'
import { staggerContainer, staggerItem, viewport } from '../lib/animations'
import { AnimatedSection } from './AnimatedSection'
import { LinkedInIcon } from './SocialIcons'

export function LinkedInCard() {
  return (
    <AnimatedSection id="linkedin" className="!py-10 md:!py-14">
      <motion.div
        className="mx-auto max-w-md"
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={staggerContainer(0.1)}
      >
        <motion.div
          variants={staggerItem}
          className="relative overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-6 shadow-lg transition-shadow duration-300 hover:shadow-xl"
          whileHover={{ y: -6, scale: 1.01 }}
        >
          <div className="absolute right-4 top-4 text-[#0A66C2]">
            <LinkedInIcon size={28} />
          </div>

          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#0A66C2] to-[#004182] text-2xl font-bold text-white">
              AA
            </div>
            <div>
              <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-[var(--color-text)]">
                {profile.name}
              </h3>
              <p className="text-sm text-[var(--color-muted)]">{profile.linkedinTitle}</p>
            </div>
          </div>

          <div className="mt-5 flex gap-6 border-t border-[var(--color-border)] pt-5 text-sm">
            <div>
              <p className="font-semibold text-[var(--color-text)]">{profile.linkedinFollowers}</p>
              <p className="text-[var(--color-muted)]">Followers</p>
            </div>
            <div>
              <p className="font-semibold text-[var(--color-text)]">{profile.linkedinConnections}</p>
              <p className="text-[var(--color-muted)]">Connections</p>
            </div>
          </div>

          <motion.a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#0A66C2] py-3 text-sm font-medium text-white transition hover:bg-[#004182]"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Let&apos;s View
            <ArrowRight size={16} />
          </motion.a>
        </motion.div>
      </motion.div>
    </AnimatedSection>
  )
}
