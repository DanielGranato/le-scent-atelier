import AuthCard from '../features/auth/components/AuthCard'
import AuthRedirect from '../features/auth/components/AuthRedirect'
import LoginForm from '../features/auth/components/LoginForm'
import { useDocumentMeta } from '../hooks/useDocumentMeta'

export default function Login() {
  useDocumentMeta({
    title: 'Sign in | Le Scent Atelier',
    description: 'Sign in to Le Scent Atelier, a fictional brand created for a portfolio project.',
  })

  return (
    <AuthRedirect>
      <AuthCard
        title="Sign in"
        intro="Welcome back."
        alternate={{ to: '/register', label: 'Create an account' }}
      >
        <LoginForm />
      </AuthCard>
    </AuthRedirect>
  )
}
