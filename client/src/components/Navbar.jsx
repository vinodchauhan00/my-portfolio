import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMenu, FiX, FiSun, FiMoon } from 'react-icons/fi'

const links = ['about', 'skills', 'experience', 'projects', 'certifications', 'contact']

export default function Navbar({ theme, toggleTheme }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    )
    links.forEach((id) => document.getElementById(id) && io.observe(document.getElementById(id)))
    return () => { window.removeEventListener('scroll', onScroll); io.disconnect() }
  }, [])

  return (
    <header className={`fixed top-0 z-50 w-full transition-all duration-300 ${scrolled ? 'border-b border-line bg-bg/75 backdrop-blur-xl' : ''}`}>
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <a href="#top" className="text-lg font-extrabold tracking-tight">
          vinod<span className="text-grad">.dev</span>
        </a>
        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l}>
              <a href={`#${l}`} className={`rounded-lg px-3 py-2 text-sm font-medium capitalize transition-colors hover:text-fg ${active === l ? 'text-fg' : 'text-muted'}`}>
                {active === l && <motion.span layoutId="nav-pill" className="absolute inset-0 -z-10 rounded-lg bg-surface-2" />}
                <span className="relative">{l}</span>
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <button onClick={toggleTheme} aria-label="Toggle theme" className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-surface transition hover:border-accent">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span key={theme} initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                {theme === 'dark' ? <FiSun /> : <FiMoon />}
              </motion.span>
            </AnimatePresence>
          </button>
          <button onClick={() => setOpen(!open)} aria-label="Menu" className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-surface md:hidden">
            {open ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.ul initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden border-b border-line bg-bg/95 px-5 backdrop-blur-xl md:hidden">
            {links.map((l) => (
              <li key={l}>
                <a href={`#${l}`} onClick={() => setOpen(false)} className="block py-3 text-base font-medium capitalize text-muted hover:text-fg">{l}</a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  )
}
