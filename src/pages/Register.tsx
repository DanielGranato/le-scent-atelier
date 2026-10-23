import AuthCard from '../features/auth/components/AuthCard'
import AuthRedirect from '../features/auth/components/AuthRedirect'
import RegisterForm from '../features/auth/components/RegisterForm'
import { useDocumentMeta } from '../hooks/useDocumentMeta'

export default function Register() {
  useDocumentMeta({
    title: 'Create an account | Le Scent Atelier',
    description: 'Create an account at Le Scent Atelier, a fictional brand created for a portfolio project.',
  })

  return (
    <AuthRedirect>
      <AuthCard
        title="Create an account"
        intro="It takes a minute. Nothing leaves your browser."
        alternate={{ to: '/login', text: 'Already have an account?', label: 'Sign in' }}
      >
        <RegisterForm />
      </AuthCard>
    </AuthRedirect>
  )
}
