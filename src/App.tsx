import { motion } from 'framer-motion'
import { About } from './components/About'
import { Background } from './components/Background'
import { Contact } from './components/Contact'
import { Education } from './components/Education'
import { Experience } from './components/Experience'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Navbar } from './components/Navbar'
import { Projects } from './components/Projects'
import { Skills } from './components/Skills'
import { Testimonials } from './components/Testimonials'
import { CursorGlow } from './components/ui/CursorGlow'
import { pageTransition } from './lib/animations'
import { SmoothScrollProvider } from './providers/SmoothScrollProvider'

function App() {
  return (
    <SmoothScrollProvider>
      <motion.div
        initial="initial"
        animate="animate"
        variants={pageTransition}
      >
        <Background />
        <CursorGlow />
        <Navbar />
        <main>
          <Hero />
          <About />
          <Experience />
          <Skills />
          <Projects />
          <Testimonials />
          <Education />
          <Contact />
        </main>
        <Footer />
      </motion.div>
    </SmoothScrollProvider>
  )
}

export default App
