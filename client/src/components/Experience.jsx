import { FiBriefcase, FiBookOpen } from 'react-icons/fi'
import Section, { Reveal } from './Section'
import { experience, education } from '../data/content'

export default function Experience() {
  return (
    <Section id="experience" eyebrow="My journey" title="Experience & Education">
      <div className="relative ml-3 space-y-10 border-l-2 border-line pl-8 md:ml-0 md:pl-10">
        {experience.map((e, i) => (
          <Reveal key={e.role + e.company} i={i}>
            <div className="relative">
              <span className="absolute top-1.5 -left-[2.9rem] grid h-8 w-8 place-items-center rounded-full bg-grad text-white md:-left-[3.4rem]"><FiBriefcase size={15} /></span>
              <div className="card p-6">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <h3 className="text-xl font-bold">{e.role}</h3>
                    <p className="text-accent-2">{e.company} · {e.place}</p>
                  </div>
                  <span className="rounded-full border border-line bg-surface-2 px-3 py-1 font-mono text-xs text-muted">{e.period}</span>
                </div>
                <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted sm:text-base">
                  {e.points.map((p) => (
                    <li key={p} className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />{p}</li>
                  ))}
                </ul>
                <div className="mt-4 flex flex-wrap gap-2">
                  {e.tools.map((t) => <span key={t} className="rounded-md bg-surface-2 px-2.5 py-1 font-mono text-xs text-muted">{t}</span>)}
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <h3 className="mt-16 mb-6 text-center text-2xl font-bold">Education</h3>
      <div className="grid gap-5 md:grid-cols-3">
        {education.map((e, i) => (
          <Reveal key={e.title} i={i}>
            <div className="card h-full p-5">
              <FiBookOpen className="mb-3 text-xl text-accent-2" />
              <p className="font-mono text-xs text-muted">{e.period}</p>
              <h4 className="mt-1 font-semibold">{e.title}</h4>
              <p className="mt-1 text-sm text-muted">{e.place}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
