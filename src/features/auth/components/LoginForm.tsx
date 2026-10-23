import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import Button from '../../../components/ui/Button'
import Input from '../../../components/ui/Input'
import PasswordInput from '../../../components/ui/PasswordInput'
import { loginSchema, type LoginValues } from '../schemas'
import { useAuth } from '../useAuth'

export default function LoginForm() {
  const { login } = useAuth()
  const [formError, setFormError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    mode: 'onTouched',
    defaultValues: { email: '', password: '' },
  })

  // On success `user` is set and the page (AuthRedirect) sends the person away, so there is nothing to do here.
  const onSubmit = async ({ email, password }: LoginValues) => {
    setFormError(null)
    const result = await login(email, password)
    if (!result.ok) setFormError(result.error)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
      <Input label="Email" type="email" autoComplete="email" error={errors.email?.message} {...register('email')} />
      <PasswordInput
        label="Password"
        autoComplete="current-password"
        error={errors.password?.message}
        {...register('password')}
      />

      {formError ? (
        <p role="alert" className="border border-ink px-4 py-3 text-sm">
          {formError}
        </p>
      ) : null}

      <Button type="submit" disabled={isSubmitting} className="mt-2">
        {isSubmitting ? 'Signing in…' : 'Sign in'}
      </Button>

      <p className="text-sm text-olive">Demo account: demo@lescentatelier.test / scent1234</p>
    </form>
  )
}
