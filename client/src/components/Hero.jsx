import { motion } from 'framer-motion'
import { FiDownload, FiArrowRight, FiMapPin } from 'react-icons/fi'
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa'
import photo from '../assets/vinod.jpg'
import useTyped from '../hooks/useTyped'
import { profile } from '../data/content'

const social = [
  [FaGithub, profile.socials.github, 'GitHub'],
  [FaLinkedin, profile.socials.linkedin, 'LinkedIn'],
  [FaInstagram, profile.socials.instagram, 'Instagram'],
]

export default function Hero() {
  const typed = useTyped(profile.roles)
  return (
    <section id="top" className="relative mx-auto flex min-h-screen max-w-6xl flex-col-reverse items-center justify-center gap-12 px-5 pt-28 pb-16 sm:px-8 md:flex-row md:justify-between">
      <motion.div initial="hidden" animate="show" transition={{ staggerChildren: 0.12 }} className="max-w-xl text-center md:text-left">
        {[
          <p key="a" className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-1.5 text-sm text-muted">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" /> Open to opportunities
          </p>,
          <h1 key="b" className="mt-5 text-4xl leading-tight font-extrabold sm:text-5xl lg:text-6xl">
            Hi, I'm <span className="text-grad">{profile.name}</span>
          </h1>,
          <h2 key="c" className="mt-3 h-9 font-mono text-xl text-accent-2 sm:text-2xl">
            {typed}<span className="caret">|</span>
          </h2>,
          <p key="d" className="mt-5 text-base leading-relaxed text-muted sm:text-lg">{profile.tagline}</p>,
          <div key="e" className="mt-8 flex flex-wrap justify-center gap-3 md:justify-start">
            <a href="#contact" className="btn btn-primary">Let's talk <FiArrowRight /></a>
            <a href={profile.resume} download className="btn btn-ghost"><FiDownload /> Resume</a>
          </div>,
          <div key="f" className="mt-7 flex items-center justify-center gap-4 md:justify-start">
            {social.map(([Icon, href, label]) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="grid h-11 w-11 place-items-center rounded-xl border border-line bg-surface text-lg transition hover:-translate-y-1 hover:border-accent hover:text-accent">
                <Icon />
              </a>
            ))}
            <span className="ml-2 hidden items-center gap-1 text-sm text-muted sm:flex"><FiMapPin /> {profile.location}</span>
          </div>,
        ].map((el, i) => (
          <motion.div key={i} variants={{ hidden: { opacity: 0, y: 26 }, show: { opacity: 1, y: 0, transition: { duration: 0.7 } } }}>{el}</motion.div>
        ))}
      </motion.div>

      <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }} className="relative">
        <div className="animate-float relative h-72 w-72 sm:h-80 sm:w-80 lg:h-96 lg:w-96">
          <div className="animate-spin-slow absolute -inset-2 rounded-full" style={{ background: 'conic-gradient(from 0deg, var(--accent), var(--accent-2), transparent 60%, var(--accent))' }} />
          <div className="absolute inset-0 rounded-full bg-bg" />
          <img src={photo} alt="Vinod Chauhan" className="absolute inset-1.5 h-[calc(100%-12px)] w-[calc(100%-12px)] rounded-full object-cover object-top" />
          <div className="card absolute -bottom-2 -left-4 px-4 py-2 text-sm font-semibold shadow-xl sm:-left-10">🚌 1000+ EV buses</div>
          
        </div>
      </motion.div>
    </section>
  )
}
