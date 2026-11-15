import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa'
import { profile } from '../data/content'

export default function Footer() {
  return (
    <footer className="border-t border-line py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 text-sm text-muted sm:flex-row sm:px-8">
        <p>© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
        <div className="flex gap-4 text-lg">
          <a href={profile.socials.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-accent"><FaGithub /></a>
          <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-accent"><FaLinkedin /></a>
          <a href={profile.socials.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-accent"><FaInstagram /></a>
        </div>
      </div>
    </footer>
  )
}
