import { useEffect } from 'react'
import Backdrop from '../components/Backdrop'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import About from '../components/About'
import Skills from '../components/Skills'
import Experience from '../components/Experience'
import Projects from '../components/Projects'
import Certifications from '../components/Certifications'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

export default function Home({ theme, toggleTheme }) {
  // count one visit per browser session (backend is optional; failures are ignored)
  useEffect(() => {
    if (sessionStorage.getItem('visited')) return
    sessionStorage.setItem('visited', '1')
    fetch(`${import.meta.env.VITE_API_URL || ''}/api/visit`, { method: 'POST' }).catch(() => {})
  }, [])
  return (
    <>
      <Backdrop />
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
