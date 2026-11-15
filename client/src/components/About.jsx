import { useEffect, useRef, useState } from 'react'
import { useInView, animate } from 'framer-motion'
import { FiCheckCircle } from 'react-icons/fi'
import Section, { Reveal } from './Section'
import { about, stats } from '../data/content'

function Counter({ value, suffix }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!inView) return
    const c = animate(0, value, { duration: 1.6, ease: 'easeOut', onUpdate: (v) => setN(Math.round(v)) })
    return () => c.stop()
  }, [inView, value])
  return <span ref={ref}>{n}{suffix}</span>
}

export default function About() {
  return (
    <Section id="about" eyebrow="Who I am" title="About Me">
      <div className="grid items-start gap-10 lg:grid-cols-5">
        <div className="space-y-5 text-base leading-relaxed text-muted sm:text-lg lg:col-span-3">
          {about.paragraphs.map((p, i) => <Reveal key={i} i={i}><p>{p}</p></Reveal>)}
          <Reveal i={3}>
            <ul className="mt-2 grid gap-2 sm:grid-cols-2">
              {about.highlights.map((h) => (
                <li key={h} className="flex items-center gap-2 text-fg"><FiCheckCircle className="shrink-0 text-accent-2" /> {h}</li>
              ))}
            </ul>
          </Reveal>
        </div>
        <div className="grid grid-cols-2 gap-4 lg:col-span-2">
          {stats.map((s, i) => (
            <Reveal key={s.label} i={i}>
              <div className="card p-5 text-center">
                <div className="text-grad text-4xl font-extrabold"><Counter value={s.value} suffix={s.suffix} /></div>
                <div className="mt-1 text-sm text-muted">{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  )
}
