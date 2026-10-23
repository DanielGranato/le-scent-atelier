import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from './useAuth'

/** Signs the person out and sends them to the Home page. */
export function useSignOut(): () => void {
  const { logout } = useAuth()
  const navigate = useNavigate()

  return useCallback(() => {
    logout()
    navigate('/')
  }, [logout, navigate])
}
