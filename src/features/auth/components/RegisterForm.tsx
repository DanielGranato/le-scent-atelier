import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import Button from '../../../components/ui/Button'
import Input from '../../../components/ui/Input'
import PasswordInput from '../../../components/ui/PasswordInput'
import { registerSchema, type RegisterValues } from '../schemas'
import { useAuth } from '../useAuth'

export default function RegisterForm() {
  const { register: signUp } = useAuth()
  const [formError, setFormError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors, isSubmitting, touchedFields },
  } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    mode: 'onTouched',
    defaultValues: { name: '', email: '', password: '', confirmPassword: '' },
  })

  // On success `user` is set and the page (AuthRedirect) sends the person away.
  const onSubmit = async ({ name, email, password }: RegisterValues) => {
    setFormError(null)
    const result = await signUp({ name, email, password })
    if (!result.ok) setFormError(result.error)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
      <Input label="Name" autoComplete="name" error={errors.name?.message} {...register('name')} />
      <Input label="Email" type="email" autoComplete="email" error={errors.email?.message} {...register('email')} />
      <PasswordInput
        label="Password"
        autoComplete="new-password"
        error={errors.password?.message}
        {...register('password', {
          // if the confirmation was already filled in, check it again when the password changes
          onChange: () => {
            if (touchedFields.confirmPassword) void trigger('confirmPassword')
          },
        })}
      />
      <PasswordInput
        label="Confirm password"
        autoComplete="new-password"
        error={errors.confirmPassword?.message}
        {...register('confirmPassword')}
      />

      {formError ? (
        <p role="alert" className="border border-ink px-4 py-3 text-sm">
          {formError}
        </p>
      ) : null}

      <Button type="submit" disabled={isSubmitting} className="mt-2">
        {isSubmitting ? 'Creating account…' : 'Create account'}
      </Button>
    </form>
  )
}
