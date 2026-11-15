import { FiAward, FiExternalLink } from 'react-icons/fi'
import Section, { Reveal } from './Section'
import { certifications } from '../data/content'

export default function Certifications() {
  return (
    <Section id="certifications" eyebrow="Recognition" title="Certifications & Achievements">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {certifications.map((c, i) => (
          <Reveal key={c.title + i} i={i % 3}>
            <div className="card group h-full overflow-hidden">
              {c.image ? (
                <img src={c.image} alt={c.title} loading="lazy" className="h-48 w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              ) : (
                <div className="grid h-32 place-items-center bg-surface-2"><FiAward className="text-5xl text-accent-2" /></div>
              )}
              <div className="p-5">
                <h3 className="font-bold">{c.title}</h3>
                {(c.issuer || c.date) && <p className="mt-1 text-sm text-muted">{[c.issuer, c.date].filter(Boolean).join(' · ')}</p>}
                {c.link && <a href={c.link} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline"><FiExternalLink /> Verify</a>}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
