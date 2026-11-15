import { motion } from 'framer-motion'

export const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] } }),
}

export function Reveal({ children, i = 0, className = '' }) {
  return (
    <motion.div className={className} variants={fadeUp} custom={i} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}>
      {children}
    </motion.div>
  )
}

export default function Section({ id, eyebrow, title, children }) {
  return (
    <section id={id} className="relative mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 md:py-28">
      <Reveal className="mb-12 text-center">
        <p className="font-mono text-sm tracking-widest text-accent-2 uppercase">{eyebrow}</p>
        <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl md:text-5xl">{title}</h2>
        <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-grad" />
      </Reveal>
      {children}
    </section>
  )
}
