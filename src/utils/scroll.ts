import type Lenis from 'lenis'

export function scrollToSection(id: string, lenis?: Lenis | null) {
  const el = document.getElementById(id)
  if (!el) return

  if (lenis) {
    lenis.scrollTo(el, { offset: -96, duration: 1.4 })
    return
  }

  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
