import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4">
      <h1 className="text-2xl">Page not found</h1>
      <Link to="/" className="text-amber underline">
        Back to home
      </Link>
    </main>
  )
}
