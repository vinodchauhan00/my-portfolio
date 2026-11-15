import { useState } from 'react'
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi'
import Section, { Reveal } from './Section'
import { profile } from '../data/content'

const API = import.meta.env.VITE_API_URL || ''
const empty = { name: '', email: '', subject: '', message: '', website: '' } // website = honeypot

export default function Contact() {
  const [form, setForm] = useState(empty)
  const [state, setState] = useState({ status: 'idle', msg: '' })
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  const submit = async (e) => {
    e.preventDefault()
    setState({ status: 'sending', msg: '' })
    try {
      const res = await fetch(`${API}/api/contact`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.error || 'Something went wrong. Please try again.')
      setForm(empty)
      setState({ status: 'ok', msg: "Thanks! Your message has reached me. I'll reply soon." })
    } catch (err) {
      setState({ status: 'error', msg: err.message })
    }
  }

  const info = [
    [FiMail, 'Email', profile.email, `mailto:${profile.email}`],
    [FiPhone, 'Phone', profile.phone, `tel:${profile.phone.replace(/-/g, '')}`],
    [FiMapPin, 'Location', profile.location, null],
  ]

  return (
    <Section id="contact" eyebrow="Get in touch" title="Have a project in mind?">
      <div className="grid gap-8 lg:grid-cols-5">
        <div className="space-y-4 lg:col-span-2">
          {info.map(([Icon, label, value, href], i) => (
            <Reveal key={label} i={i}>
              <div className="card flex items-center gap-4 p-5">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-grad text-white"><Icon /></span>
                <div className="min-w-0">
                  <p className="text-xs text-muted">{label}</p>
                  {href ? <a href={href} className="block truncate font-medium hover:text-accent">{value}</a> : <p className="font-medium">{value}</p>}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="lg:col-span-3">
          <form onSubmit={submit} className="card space-y-4 p-6 sm:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <input className="input" placeholder="Your name" required maxLength={80} value={form.name} onChange={set('name')} />
              <input className="input" type="email" placeholder="Your email" required maxLength={120} value={form.email} onChange={set('email')} />
            </div>
            <input className="input" placeholder="Subject" required maxLength={150} value={form.subject} onChange={set('subject')} />
            <textarea className="input min-h-36 resize-y" placeholder="Your message" required minLength={10} maxLength={3000} value={form.message} onChange={set('message')} />
            {/* honeypot: hidden from humans, bots fill it */}
            <input tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" name="website" value={form.website} onChange={set('website')} />
            <button disabled={state.status === 'sending'} className="btn btn-primary w-full disabled:opacity-60">
              {state.status === 'sending' ? 'Sending…' : <>Send message <FiSend /></>}
            </button>
            {state.msg && (
              <p role="status" className={`text-sm ${state.status === 'ok' ? 'text-emerald-500' : 'text-red-500'}`}>{state.msg}</p>
            )}
          </form>
        </Reveal>
      </div>
    </Section>
  )
}
