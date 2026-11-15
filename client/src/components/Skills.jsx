import { motion } from 'framer-motion'
import {
  FaNodeJs, FaReact, FaPython, FaAws, FaDocker, FaLinux, FaWindows, FaGitAlt, FaGithub, FaJs, FaNetworkWired, FaTerminal, FaVideo, FaMapMarkedAlt, FaCogs, FaNpm, FaCode, FaMapMarkerAlt,
} from 'react-icons/fa'
import { SiExpress, SiMongodb, SiMysql, SiKubernetes, SiJenkins, SiGithubactions, SiPostman, SiTailwindcss, SiSocketdotio } from 'react-icons/si'
import Section, { Reveal } from './Section'
import { skillGroups } from '../data/content'

const icons = {
  js: FaJs, node: FaNodeJs, express: SiExpress, react: FaReact, socket: SiSocketdotio, api: FaCode, python: FaPython,
  bash: FaTerminal, ps: FaTerminal, aws: FaAws, docker: FaDocker, k8s: SiKubernetes, jenkins: SiJenkins, gha: SiGithubactions,
  cicd: FaCogs, mongo: SiMongodb, mysql: SiMysql, linux: FaLinux, win: FaWindows, pm2: FaCogs, nssm: FaCogs, net: FaNetworkWired,
  cam: FaVideo, gps: FaMapMarkerAlt, maps: FaMapMarkedAlt, git: FaGitAlt, github: FaGithub, postman: SiPostman, npm: FaNpm, tailwind: SiTailwindcss,
}

export default function Skills() {
  const all = skillGroups.flatMap((g) => g.items.map(([n]) => n.split(' (')[0]))
  const loop = [...all, ...all]
  return (
    <Section id="skills" eyebrow="What I work with" title="Skills & Tools">
      <div className="mb-12 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
        <div className="animate-marquee flex w-max gap-3">
          {loop.map((s, i) => (
            <span key={i} className="rounded-full border border-line bg-surface px-4 py-2 font-mono text-sm whitespace-nowrap text-muted">{s}</span>
          ))}
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((g, gi) => (
          <Reveal key={g.title} i={gi}>
            <div className="card h-full p-6">
              <h3 className="mb-4 text-lg font-bold text-grad">{g.title}</h3>
              <div className="flex flex-wrap gap-2.5">
                {g.items.map(([name, key]) => {
                  const Icon = icons[key] || FaCode
                  return (
                    <motion.span key={name} whileHover={{ y: -3, scale: 1.04 }} className="inline-flex items-center gap-2 rounded-xl border border-line bg-surface-2 px-3 py-2 text-sm">
                      <Icon className="text-accent-2" /> {name}
                    </motion.span>
                  )
                })}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
