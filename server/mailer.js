import nodemailer from 'nodemailer'

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))

export async function notify(msg) {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, NOTIFY_TO } = process.env
  if (!SMTP_USER || !SMTP_PASS) return // email is optional
  const transporter = nodemailer.createTransport({ host: SMTP_HOST || 'smtp.gmail.com', port: Number(SMTP_PORT) || 465, secure: (Number(SMTP_PORT) || 465) === 465, auth: { user: SMTP_USER, pass: SMTP_PASS } })
  await transporter.sendMail({
    from: `"Portfolio" <${SMTP_USER}>`,
    to: NOTIFY_TO || SMTP_USER,
    replyTo: msg.email,
    subject: `[Portfolio] ${msg.subject}`,
    text: `From: ${msg.name} <${msg.email}>\n\n${msg.message}`,
    html: `<p><b>${esc(msg.name)}</b> &lt;${esc(msg.email)}&gt;</p><p style="white-space:pre-wrap">${esc(msg.message)}</p>`,
  })
}
