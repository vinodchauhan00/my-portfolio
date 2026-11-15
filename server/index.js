import 'dotenv/config'
import path from 'node:path'
import fs from 'node:fs'
import { fileURLToPath } from 'node:url'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import { createStore } from './store.js'
import { notify } from './mailer.js'
import { checkPassword, issueToken, requireAdmin } from './auth.js'

const app = express()
const store = await createStore()
const PORT = process.env.PORT || 5000

app.set('trust proxy', 1) // correct client IPs behind Render/Vercel/Nginx
app.use(helmet({ contentSecurityPolicy: false }))
app.use(cors({ origin: (process.env.CORS_ORIGIN || '').split(',').filter(Boolean).concat(['http://localhost:5173']) }))
app.use(express.json({ limit: '20kb' }))

const contactLimit = rateLimit({ windowMs: 15 * 60_000, limit: 5, message: { error: 'Too many messages. Please try again later.' } })
const loginLimit = rateLimit({ windowMs: 15 * 60_000, limit: 10, message: { error: 'Too many attempts. Try again later.' } })
const clean = (v, max) => String(v ?? '').trim().slice(0, max)
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

app.get('/api/health', (_req, res) => res.json({ ok: true, storage: store.kind }))

app.post('/api/visit', rateLimit({ windowMs: 60_000, limit: 10 }), async (_req, res) => {
  await store.visit().catch(() => {})
  res.json({ ok: true })
})

app.post('/api/contact', contactLimit, async (req, res) => {
  const { name, email, subject, message, website } = req.body || {}
  if (website) return res.json({ ok: true }) // honeypot: pretend success to bots
  const msg = { name: clean(name, 80), email: clean(email, 120), subject: clean(subject, 150), message: clean(message, 3000), ip: req.ip }
  if (!msg.name || !msg.subject || msg.message.length < 10) return res.status(400).json({ error: 'Please fill in all fields (message needs at least 10 characters).' })
  if (!emailRe.test(msg.email)) return res.status(400).json({ error: 'Please enter a valid email address.' })
  try {
    await store.add(msg)
  } catch (e) {
    console.error('save failed', e)
    return res.status(500).json({ error: 'Could not save your message. Please email me directly.' })
  }
  notify(msg).catch((e) => console.error('email failed:', e.message)) // don't block the visitor on email
  res.json({ ok: true })
})

// ---- admin ----
app.post('/api/admin/login', loginLimit, (req, res) => {
  if (!process.env.ADMIN_PASSWORD) return res.status(503).json({ error: 'ADMIN_PASSWORD is not set on the server.' })
  if (!checkPassword(req.body?.password)) return res.status(401).json({ error: 'Wrong password.' })
  res.json({ token: issueToken() })
})
app.get('/api/admin/messages', requireAdmin, async (_req, res) => res.json({ messages: await store.list() }))
app.get('/api/admin/stats', requireAdmin, async (_req, res) => res.json(await store.stats()))
app.patch('/api/admin/messages/:id/read', requireAdmin, async (req, res) => { await store.markRead(req.params.id); res.json({ ok: true }) })
app.delete('/api/admin/messages/:id', requireAdmin, async (req, res) => { await store.remove(req.params.id); res.json({ ok: true }) })

// ---- serve the built frontend (single-deploy mode) ----
const dist = path.join(path.dirname(fileURLToPath(import.meta.url)), '../client/dist')
if (fs.existsSync(dist)) {
  app.use(express.static(dist))
  app.get(/^(?!\/api).*/, (_req, res) => res.sendFile(path.join(dist, 'index.html')))
}

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))
