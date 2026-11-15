import crypto from 'node:crypto'

const secret = () => process.env.TOKEN_SECRET || process.env.ADMIN_PASSWORD || 'dev-secret'
const sign = (p) => crypto.createHmac('sha256', secret()).update(p).digest('base64url')
const safeEq = (a, b) => { const x = Buffer.from(String(a)), y = Buffer.from(String(b)); return x.length === y.length && crypto.timingSafeEqual(x, y) }

export function checkPassword(pw) {
  const real = process.env.ADMIN_PASSWORD
  return Boolean(real) && safeEq(pw ?? '', real)
}
export function issueToken(hours = 12) {
  const payload = Buffer.from(JSON.stringify({ exp: Date.now() + hours * 3600_000 })).toString('base64url')
  return `${payload}.${sign(payload)}`
}
export function requireAdmin(req, res, next) {
  const [payload, sig] = (req.headers.authorization || '').replace('Bearer ', '').split('.')
  if (payload && sig && safeEq(sig, sign(payload))) {
    try { if (JSON.parse(Buffer.from(payload, 'base64url')).exp > Date.now()) return next() } catch { /* fallthrough */ }
  }
  res.status(401).json({ error: 'Unauthorized' })
}
