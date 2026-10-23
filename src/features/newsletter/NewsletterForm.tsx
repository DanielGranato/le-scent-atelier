import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import Input from '../../components/ui/Input'
import { newsletterSchema, type NewsletterValues } from './schemas'

export default function NewsletterForm() {
  const [done, setDone] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NewsletterValues>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: { email: '' },
  })

  // Front-end only: nothing is stored or sent.
  const onSubmit = async () => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    setDone(true)
    reset()
  }

  if (done) {
    return (
      <p role="status" className="text-sm">
        You are on the list. (Not really: this is a portfolio project, so nothing was saved.)
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="flex items-start gap-2">
        <div className="flex-1">
          <Input
            label="Email"
            hideLabel
            type="email"
            placeholder="Your email"
            autoComplete="email"
            error={errors.email?.message}
            {...register('email')}
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="cursor-pointer border border-ink bg-ink px-5 py-[0.65rem] text-base uppercase tracking-(--tracking-label) text-paper transition-colors duration-150 hover:bg-paper hover:text-ink disabled:cursor-wait disabled:opacity-60"
        >
          {isSubmitting ? '…' : 'Join'}
        </button>
      </div>
    </form>
  )
}
