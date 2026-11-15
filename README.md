# Vinod Chauhan — Portfolio v2

React + Tailwind + Framer Motion frontend, Express backend (contact form, admin inbox, visit counter).

## Run locally
```bash
npm run install:all
cp server/.env.example server/.env     # then edit ADMIN_PASSWORD etc.
npm run dev:server                      # terminal 1 → http://localhost:5000
npm run dev:client                      # terminal 2 → http://localhost:5173
```
Admin inbox: `http://localhost:5173/admin` (password = `ADMIN_PASSWORD`).

## Edit content
Everything (about, skills, experience, projects, certifications, links) lives in
`client/src/data/content.js`. Replace the photo at `client/src/assets/vinod.jpg`
and the resume at `client/public/Vinod_Chauhan_Resume.pdf`.
Set a project's `github` / `demo` to `null` to hide that button.

## Deploy (single service, e.g. Render)
- Build command: `npm run install:all && npm run build`
- Start command: `npm start`
- Env vars: `ADMIN_PASSWORD`, `TOKEN_SECRET`, `MONGO_URI` (MongoDB Atlas), `SMTP_USER`, `SMTP_PASS`, `NOTIFY_TO`

Without `MONGO_URI`, messages go to `server/data/db.json` (fine locally, but most hosts wipe the disk, so use MongoDB in production).

If the frontend is on Vercel/Netlify and the backend elsewhere: set `VITE_API_URL=https://your-backend` for the client and `CORS_ORIGIN=https://your-site` for the server.
