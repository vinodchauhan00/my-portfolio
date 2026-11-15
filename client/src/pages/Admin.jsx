import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiTrash2, FiCheck, FiLogOut, FiMail } from 'react-icons/fi'

const API = import.meta.env.VITE_API_URL || ''
const KEY = 'admin_token'

export default function Admin() {
  const [token, setToken] = useState(() => sessionStorage.getItem(KEY) || '')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [messages, setMessages] = useState([])
  const [stats, setStats] = useState(null)

  const logout = useCallback(() => { sessionStorage.removeItem(KEY); setToken('') }, [])
  const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }

  const load = useCallback(async () => {
    const [m, s] = await Promise.all([
      fetch(`${API}/api/admin/messages`, { headers }),
      fetch(`${API}/api/admin/stats`, { headers }),
    ])
    if (m.status === 401) return logout()
    setMessages((await m.json()).messages || [])
    setStats(await s.json())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, logout])

  useEffect(() => { if (token) load().catch(() => setError('Could not reach the server.')) }, [token, load])

  const login = async (e) => {
    e.preventDefault(); setError('')
    try {
      const res = await fetch(`${API}/api/admin/login`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password }) })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Login failed')
      sessionStorage.setItem(KEY, data.token); setToken(data.token); setPassword('')
    } catch (err) { setError(err.message) }
  }
  const markRead = async (id) => { await fetch(`${API}/api/admin/messages/${id}/read`, { method: 'PATCH', headers }); load() }
  const remove = async (id) => { if (confirm('Delete this message?')) { await fetch(`${API}/api/admin/messages/${id}`, { method: 'DELETE', headers }); load() } }

  if (!token) {
    return (
      <main className="grid min-h-screen place-items-center px-5">
        <form onSubmit={login} className="card w-full max-w-sm space-y-4 p-8">
          <h1 className="text-2xl font-bold">Admin login</h1>
          <input className="input" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} autoFocus required />
          <button className="btn btn-primary w-full">Sign in</button>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <Link to="/" className="block text-center text-sm text-muted hover:text-accent">← Back to portfolio</Link>
        </form>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-4xl px-5 py-10">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold sm:text-3xl">Messages</h1>
        <div className="flex gap-2">
          <Link to="/" className="btn btn-ghost !py-2">Portfolio</Link>
          <button onClick={logout} className="btn btn-ghost !py-2"><FiLogOut /> Logout</button>
        </div>
      </div>
      {stats && (
        <div className="mb-8 grid grid-cols-3 gap-4">
          {[['Visits', stats.visits], ['Messages', stats.messages], ['Unread', stats.unread]].map(([l, v]) => (
            <div key={l} className="card p-4 text-center"><div className="text-grad text-3xl font-extrabold">{v}</div><div className="text-sm text-muted">{l}</div></div>
          ))}
        </div>
      )}
      {error && <p className="mb-4 text-red-500">{error}</p>}
      {messages.length === 0 && <p className="text-center text-muted">No messages yet.</p>}
      <div className="space-y-4">
        {messages.map((m) => (
          <div key={m.id} className={`card p-5 ${m.read ? 'opacity-70' : 'border-accent/50'}`}>
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <h3 className="font-bold">{m.subject}</h3>
                <p className="text-sm text-muted">{m.name} · <a className="hover:text-accent" href={`mailto:${m.email}`}>{m.email}</a></p>
              </div>
              <span className="font-mono text-xs text-muted">{new Date(m.createdAt).toLocaleString()}</span>
            </div>
            <p className="mt-3 whitespace-pre-wrap text-sm">{m.message}</p>
            <div className="mt-4 flex gap-2">
              <a href={`mailto:${m.email}?subject=Re: ${encodeURIComponent(m.subject)}`} className="btn btn-ghost !px-3 !py-1.5 !text-sm"><FiMail /> Reply</a>
              {!m.read && <button onClick={() => markRead(m.id)} className="btn btn-ghost !px-3 !py-1.5 !text-sm"><FiCheck /> Mark read</button>}
              <button onClick={() => remove(m.id)} className="btn btn-ghost !px-3 !py-1.5 !text-sm text-red-500"><FiTrash2 /> Delete</button>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
