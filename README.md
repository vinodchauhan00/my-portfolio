<div align="center">

# ⚡ Vinod Chauhan — Portfolio v2

**Software Engineer · DevOps Engineer**
Full-stack portfolio with animations, dark/light mode, a contact backend and a private admin inbox.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white&style=flat-square)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white&style=flat-square)
![Tailwind](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss&logoColor=white&style=flat-square)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-0055FF?logo=framer&logoColor=white&style=flat-square)
![Node](https://img.shields.io/badge/Node.js-Express-339933?logo=nodedotjs&logoColor=white&style=flat-square)
![MongoDB](https://img.shields.io/badge/MongoDB-optional-47A248?logo=mongodb&logoColor=white&style=flat-square)

[Live Demo](https://your-site.vercel.app) · [LinkedIn](https://linkedin.com/in/vinodchauhan00) · [GitHub](https://github.com/vinodchauhan00)

</div>

---

## 📑 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Quick Start](#-quick-start)
- [Environment Variables](#-environment-variables)
- [Customising Content](#-customising-content)
- [API Reference](#-api-reference)
- [Deployment](#-deployment)
- [CI/CD Roadmap](#-cicd-roadmap)
- [Author](#-author)

---

## ✨ Features

**Frontend**
- Dark and light theme with a toggle. The choice is saved and applied before first paint, so there is no flash.
- Smooth animations: typing roles, scroll reveals, animated counters, 3D card tilt, skills marquee, scroll progress bar and a cursor glow. Reduced-motion settings are respected.
- Fully responsive for mobile, tablet and desktop.
- Sections: Hero, About, Skills, Experience & Education, Projects, Certifications, Contact.
- All content lives in a single data file, so editing never means touching components.

**Backend**
- Contact form that saves every message and can send an email notification.
- Private admin inbox at `/admin`: read, mark as read, reply and delete.
- Visit counter shown on the admin dashboard.
- Spam protection: rate limiting, honeypot field, input validation and size limits.
- Storage: MongoDB when `MONGO_URI` is set, otherwise a local JSON file.

---

## 🧰 Tech Stack

| Layer | Technology |
|---|---|
| UI | React 19, Vite 7, Tailwind CSS 4, Framer Motion, React Router |
| API | Node.js, Express 4, Helmet, CORS, express-rate-limit |
| Data | MongoDB (Mongoose) or JSON file fallback |
| Email | Nodemailer (SMTP) |
| Hosting | Vercel / Netlify (frontend), Render (backend), MongoDB Atlas |

---

## 📁 Project Structure

```
vinod-portfolio-v2/
├── package.json                 # root shortcut scripts
├── client/                      # Frontend (Vite + React)
│   ├── public/
│   │   └── Vinod_Chauhan_Resume.pdf
│   └── src/
│       ├── data/content.js      # ← all text, links, projects, skills
│       ├── components/          # Hero, About, Skills, Experience, Projects, ...
│       ├── pages/               # Home.jsx, Admin.jsx
│       ├── hooks/               # useTheme, useTyped
│       ├── assets/              # photo, screenshots, certificates
│       └── index.css            # theme colours + animations
└── server/                      # Backend (Express)
    ├── index.js                 # routes + middleware
    ├── store.js                 # MongoDB / JSON storage
    ├── mailer.js                # email notifications
    ├── auth.js                  # admin login + tokens
    └── .env.example
```

---

## 🚀 Quick Start

**Requirements:** Node.js 18+ and npm.

```bash
# 1. Install dependencies for client and server
npm run install:all

# 2. Create the server config
cp server/.env.example server/.env        # Windows: copy server\.env.example server\.env

# 3. Start the backend (terminal 1)  → http://localhost:5000
npm run dev:server

# 4. Start the frontend (terminal 2) → http://localhost:5173
npm run dev:client
```

Admin inbox: **http://localhost:5173/admin** (password = `ADMIN_PASSWORD` from `.env`).

> Restart the backend after editing `.env`. It is only read at startup.

---

## 🔐 Environment Variables

Create `server/.env` from `server/.env.example`. **Never commit this file.**

| Variable | Required | Description |
|---|:---:|---|
| `ADMIN_PASSWORD` | ✅ | Password for the `/admin` login. Use a long one. |
| `TOKEN_SECRET` | ✅ | Secret used to sign admin tokens (any long random string). |
| `PORT` | – | Server port (default `5000`). |
| `MONGO_URI` | – | MongoDB connection string. If empty, messages go to `server/data/db.json`. |
| `SMTP_HOST` / `SMTP_PORT` | – | Mail server (default `smtp.gmail.com` / `465`). |
| `SMTP_USER` / `SMTP_PASS` | – | Gmail address and **App Password** (not your normal password). |
| `NOTIFY_TO` | – | Where notification emails are sent. |
| `CORS_ORIGIN` | – | Allowed frontend URL(s), comma-separated, when hosted separately. |

Frontend (set on Vercel/Netlify): `VITE_API_URL=https://your-backend-url`

---

## 🎨 Customising Content

Almost everything is edited in **`client/src/data/content.js`**:

| What | Where |
|---|---|
| Name, email, location, social links | `profile` |
| About text and highlights | `about` |
| Counters (e.g. 1000+ buses) | `stats` |
| Skills | `skillGroups` |
| Work history and education | `experience`, `education` |
| Projects (set `github` / `demo` to `null` to hide a button) | `projects` |
| Certifications | `certifications` |

Other files to replace:

| What | File |
|---|---|
| Profile photo | `client/src/assets/vinod.jpg` |
| Resume | `client/public/Vinod_Chauhan_Resume.pdf` |
| Theme colours | top of `client/src/index.css` |

---

## 🔌 API Reference

| Method | Endpoint | Auth | Purpose |
|---|---|:---:|---|
| `GET` | `/api/health` | – | Health check and active storage type |
| `POST` | `/api/contact` | – | Submit a message (`name`, `email`, `subject`, `message`) |
| `POST` | `/api/visit` | – | Count one visit |
| `POST` | `/api/admin/login` | – | Exchange the password for a token |
| `GET` | `/api/admin/messages` | 🔒 | List messages |
| `GET` | `/api/admin/stats` | 🔒 | Visits, total and unread messages |
| `PATCH` | `/api/admin/messages/:id/read` | 🔒 | Mark as read |
| `DELETE` | `/api/admin/messages/:id` | 🔒 | Delete a message |

🔒 = send `Authorization: Bearer <token>`.

---

## 🌐 Deployment

### Frontend: Vercel or Netlify

| Setting | Value |
|---|---|
| Root / Base directory | `client` |
| Build command | `npm run build` |
| Output directory | `dist` |
| Env var | `VITE_API_URL` (after the backend is live) |

`client/vercel.json`, `client/netlify.toml` and `client/public/_redirects` make `/admin` work on refresh.

### Backend: Render + MongoDB Atlas

| Setting | Value |
|---|---|
| Root directory | `server` |
| Build command | `npm install` |
| Start command | `npm start` |
| Env vars | `ADMIN_PASSWORD`, `TOKEN_SECRET`, `MONGO_URI`, `CORS_ORIGIN` |

> ⚠️ **Free-tier notes**
> - Render free services sleep after 15 minutes of inactivity, so the first request can take about a minute.
> - Render free services block outbound SMTP ports (25, 465, 587), so Gmail notifications will not send there. Messages are still saved and visible in `/admin`. Use an HTTPS email API (e.g. Resend) or a paid instance for email.
> - The JSON-file fallback is wiped on most hosts. Use MongoDB Atlas in production.

### Single-service mode
After `npm run build`, the Express server also serves `client/dist`, so one service can host everything:
`npm run install:all && npm run build` then `npm start`.

---

## 🛣️ CI/CD Roadmap

- [ ] GitHub Actions: install, build and lint on every push
- [ ] Auto-deploy frontend and backend on merge to `main`
- [ ] Dockerfiles for client and server
- [ ] Build and push images to GitHub Container Registry
- [ ] Docker Compose setup, then optional AWS EC2 + Nginx deployment
- [ ] HTTPS email API instead of SMTP

---

## 👤 Author

**Vinod Chauhan**: Software Engineer & DevOps Engineer, Delhi NCR, India
📧 vinodchauhan3809@gmail.com · 💼 [LinkedIn](https://linkedin.com/in/vinodchauhan00) · 🐙 [GitHub](https://github.com/vinodchauhan00)

<div align="center">

⭐ If you like this project, give it a star.

</div>
$text = @"

---

## Contributing

Suggestions and fixes are welcome. Please read [CONTRIBUTING.md](CONTRIBUTING.md) for setup steps and pull request guidelines.

---

## Security

If you find a security problem, please do not open a public issue. See [SECURITY.md](SECURITY.md) for how to report it privately.
"@
[System.IO.File]::AppendAllText("$PWD\README.md", $text, (New-Object System.Text.UTF8Encoding($false)))