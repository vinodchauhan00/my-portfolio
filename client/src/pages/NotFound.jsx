import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="text-6xl font-extrabold">404</h1>
      <p className="text-lg opacity-80">This page could not be found.</p>
      <Link to="/" className="rounded-lg bg-indigo-500 px-5 py-2 text-white transition hover:bg-indigo-600">
        Back to home
      </Link>
    </main>
  )
}