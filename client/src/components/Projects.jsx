import { useRef } from 'react'
import { FaGithub } from 'react-icons/fa'
import { FiExternalLink } from 'react-icons/fi'
import Section, { Reveal } from './Section'
import { projects } from '../data/content'

function Tilt({ children }) {
  const ref = useRef(null)
  const move = (e) => {
    const el = ref.current
    if (!el || !matchMedia('(pointer: fine)').matches) return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    el.style.transform = `perspective(900px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-4px)`
  }
  const reset = () => { if (ref.current) ref.current.style.transform = '' }
  return <div ref={ref} onMouseMove={move} onMouseLeave={reset} className="h-full transition-transform duration-200 ease-out will-change-transform">{children}</div>
}

export default function Projects() {
  return (
    <Section id="projects" eyebrow="What I've built" title="Projects">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => (
          <Reveal key={p.title} i={i % 3}>
            <Tilt>
              <article className="card group flex h-full flex-col overflow-hidden">
                <div className="relative h-44 overflow-hidden">
                  {p.image ? (
                    <img src={p.image} alt={p.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  ) : (
                    <div className="grid h-full w-full place-items-center bg-grad">
                      <span className="px-4 text-center text-2xl font-extrabold text-white/95">{p.title}</span>
                    </div>
                  )}
                  <span className="absolute top-3 left-3 rounded-full bg-black/55 px-3 py-1 text-xs font-medium text-white backdrop-blur">{p.tag}</span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-lg font-bold">{p.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{p.desc}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {p.stack.map((s) => <span key={s} className="rounded-md bg-surface-2 px-2 py-1 font-mono text-[11px] text-muted">{s}</span>)}
                  </div>
                  <div className="mt-5 flex items-center gap-3">
                    {p.github && <a href={p.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-medium hover:text-accent"><FaGithub /> Code</a>}
                    {p.demo && <a href={p.demo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-medium hover:text-accent"><FiExternalLink /> Live demo</a>}
                    {p.status && <span className="ml-auto text-xs text-muted">{p.status}</span>}
                  </div>
                </div>
              </article>
            </Tilt>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
