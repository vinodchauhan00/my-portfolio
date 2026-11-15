import { useEffect, useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'

export default function Backdrop() {
  const glow = useRef(null)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24 })

  useEffect(() => {
    if (!matchMedia('(pointer: fine)').matches) return
    const move = (e) => {
      if (glow.current) glow.current.style.transform = `translate(${e.clientX - 200}px, ${e.clientY - 200}px)`
    }
    window.addEventListener('pointermove', move, { passive: true })
    return () => window.removeEventListener('pointermove', move)
  }, [])

  return (
    <>
      <motion.div style={{ scaleX }} className="fixed top-0 left-0 z-[60] h-[3px] w-full origin-left bg-grad" />
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="grid-bg absolute inset-0" />
        <div className="animate-blob absolute -top-32 -left-24 h-96 w-96 rounded-full bg-accent opacity-25 blur-3xl" />
        <div className="animate-blob absolute top-1/3 -right-24 h-96 w-96 rounded-full bg-accent-2 opacity-20 blur-3xl" style={{ animationDelay: '-6s' }} />
        <div ref={glow} className="absolute top-0 left-0 hidden h-[400px] w-[400px] rounded-full opacity-30 blur-3xl transition-transform duration-200 ease-out md:block" style={{ background: 'radial-gradient(circle, var(--glow), transparent 70%)' }} />
      </div>
    </>
  )
}
