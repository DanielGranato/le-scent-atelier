import type { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { getReturnPath } from '../returnPath'
import { useAuth } from '../useAuth'

/**
 * Shows its children only to people who are not signed in. A signed-in person is sent to the page
 * they came from (or Home). That also covers the moment right after a successful login or
 * sign-up, because `user` is set at that point.
 */
export default function AuthRedirect({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const location = useLocation()

  if (user) return <Navigate to={getReturnPath(location.state)} replace />
  return <>{children}</>
}
