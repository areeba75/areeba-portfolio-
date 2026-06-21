import { About } from './components/About'
import { Contact } from './components/Contact'
import { Education } from './components/Education'
import { Experience } from './components/Experience'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { LinkedInCard } from './components/LinkedInCard'
import { Navbar } from './components/Navbar'
import { Projects } from './components/Projects'
import { Skills } from './components/Skills'
import { CursorGlow } from './components/ui/CursorGlow'
import { GlobalThreeScene } from './components/ui/GlobalThreeScene'
import { ScrollToTop } from './components/ui/ScrollToTop'
import { SmoothScrollProvider } from './providers/SmoothScrollProvider'

function App() {
  return (
    <SmoothScrollProvider>
      <CursorGlow />
      <GlobalThreeScene />
      <Navbar />
      <ScrollToTop />
      <main className="relative z-10">
        <Hero />
        <About />
        <LinkedInCard />
        <Experience />
        <Skills />
        <Projects />
        <Education />
        <Contact />
      </main>
      <Footer />
    </SmoothScrollProvider>
  )
}

export default App
