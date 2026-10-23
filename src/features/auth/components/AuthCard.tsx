import type { ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import NavItem from '../../../components/ui/NavItem'

interface AuthCardProps {
  title: string
  intro: string
  children: ReactNode
  /** The link to the other page: "Create an account" or "Already have an account? Sign in". */
  alternate: { to: string; text?: string; label: string }
}

/** Centered column (max 480px) used by the Login and Register pages. */
export default function AuthCard({ title, intro, children, alternate }: AuthCardProps) {
  const location = useLocation()

  return (
    <main className="mx-auto flex w-full max-w-[480px] flex-1 flex-col gap-8 px-(--gutter) py-(--section-y)">
      <header className="flex flex-col gap-3">
        <h1>{title}</h1>
        <p className="text-lg">{intro}</p>
      </header>

      {children}

      <p className="flex flex-wrap items-center gap-x-2 text-sm">
        {alternate.text ? <span>{alternate.text}</span> : null}
        {/* keeps "where the person came from" when switching between the two pages */}
        <NavItem to={alternate.to} state={location.state}>
          {alternate.label}
        </NavItem>
      </p>
    </main>
  )
}
