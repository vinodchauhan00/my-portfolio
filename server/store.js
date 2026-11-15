// Storage layer: MongoDB if MONGO_URI is set, otherwise a local JSON file.
import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import { fileURLToPath } from 'node:url'
import mongoose from 'mongoose'

const dir = path.join(path.dirname(fileURLToPath(import.meta.url)), 'data')
const file = path.join(dir, 'db.json')

function fileStore() {
  const read = () => { try { return JSON.parse(fs.readFileSync(file, 'utf8')) } catch { return { messages: [], visits: 0 } } }
  const write = (d) => { fs.mkdirSync(dir, { recursive: true }); fs.writeFileSync(file, JSON.stringify(d, null, 2)) }
  return {
    kind: 'file',
    async add(m) { const d = read(); const doc = { id: crypto.randomUUID(), read: false, createdAt: new Date().toISOString(), ...m }; d.messages.unshift(doc); write(d); return doc },
    async list() { return read().messages },
    async markRead(id) { const d = read(); const m = d.messages.find((x) => x.id === id); if (m) m.read = true; write(d) },
    async remove(id) { const d = read(); d.messages = d.messages.filter((x) => x.id !== id); write(d) },
    async visit() { const d = read(); d.visits++; write(d) },
    async stats() { const d = read(); return { visits: d.visits, messages: d.messages.length, unread: d.messages.filter((m) => !m.read).length } },
  }
}

async function mongoStore(uri) {
  await mongoose.connect(uri)
  const Message = mongoose.model('Message', new mongoose.Schema({
    name: String, email: String, subject: String, message: String, ip: String, read: { type: Boolean, default: false },
  }, { timestamps: true }))
  const Counter = mongoose.model('Counter', new mongoose.Schema({ _id: String, n: { type: Number, default: 0 } }))
  const out = (m) => ({ id: String(m._id), name: m.name, email: m.email, subject: m.subject, message: m.message, read: m.read, createdAt: m.createdAt })
  return {
    kind: 'mongo',
    async add(m) { return out(await Message.create(m)) },
    async list() { return (await Message.find().sort({ createdAt: -1 }).limit(500)).map(out) },
    async markRead(id) { await Message.findByIdAndUpdate(id, { read: true }) },
    async remove(id) { await Message.findByIdAndDelete(id) },
    async visit() { await Counter.findByIdAndUpdate('visits', { $inc: { n: 1 } }, { upsert: true }) },
    async stats() {
      const [messages, unread, v] = await Promise.all([Message.countDocuments(), Message.countDocuments({ read: false }), Counter.findById('visits')])
      return { visits: v?.n || 0, messages, unread }
    },
  }
}

export async function createStore() {
  const uri = process.env.MONGO_URI
  if (uri) {
    try { const s = await mongoStore(uri); console.log('Storage: MongoDB'); return s }
    catch (e) { console.error('MongoDB connection failed, falling back to JSON file:', e.message) }
  }
  console.log('Storage: local JSON file (server/data/db.json)')
  return fileStore()
}
