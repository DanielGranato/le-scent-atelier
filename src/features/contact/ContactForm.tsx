import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import Input from '../../components/ui/Input'
import { contactSchema, type ContactFormValues } from './schemas'

export default function ContactForm() {
  const [sentTo, setSentTo] = useState<string | null>(null)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: '', email: '', message: '' },
  })

  // Front-end only: there is no back end, so we just simulate a short delay.
  const onSubmit = async (values: ContactFormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 600))
    setSentTo(values.name)
    reset()
  }

  if (sentTo) {
    return (
      <div role="status" className="flex flex-col items-start gap-4">
        <h2 className="text-[clamp(1.5rem,2.5vw,2rem)] leading-none">Thank you, {sentTo}.</h2>
        <p className="text-lg">
          This is a portfolio project, so your message was not really sent. Nice try, though.
        </p>
        <button
          type="button"
          onClick={() => setSentTo(null)}
          className="cursor-pointer text-xs font-medium uppercase tracking-(--tracking-label) underline underline-offset-4"
        >
          Write another message
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
      <Input label="Name" autoComplete="name" error={errors.name?.message} {...register('name')} />
      <Input
        label="Email"
        type="email"
        autoComplete="email"
        error={errors.email?.message}
        {...register('email')}
      />
      <Input label="Message" multiline error={errors.message?.message} {...register('message')} />

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-2 cursor-pointer border border-ink bg-ink px-5 py-2.5 text-base uppercase tracking-(--tracking-label) text-paper transition-colors duration-150 hover:bg-paper hover:text-ink disabled:cursor-wait disabled:opacity-60"
      >
        {isSubmitting ? 'Sending…' : 'Send message'}
      </button>
    </form>
  )
}
