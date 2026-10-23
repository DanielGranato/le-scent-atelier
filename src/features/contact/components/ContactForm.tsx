import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import Button from '../../../components/ui/Button'
import Input from '../../../components/ui/Input'
import Select from '../../../components/ui/Select'
import { CONTACT_TOPICS, contactSchema, MESSAGE_MAX, type ContactValues } from '../schemas'

const emptyForm: ContactValues = { name: '', email: '', topic: 'order', message: '' }

export default function ContactForm() {
  const [sent, setSent] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    mode: 'onTouched',
    defaultValues: emptyForm,
  })

  // live character count for the message
  const message = useWatch({ control, name: 'message' })

  // Front-end only: there is no back end, so we just wait a moment.
  const onSubmit = async () => {
    await new Promise((resolve) => setTimeout(resolve, 600))
    setSent(true)
  }

  const sendAnother = () => {
    reset(emptyForm)
    setSent(false)
  }

  if (sent) {
    return (
      <div role="status" className="flex flex-col items-start gap-3">
        <h2 className="text-[clamp(1.5rem,2.5vw,2rem)] leading-tight">Thanks. We&apos;ll reply within 2 days.</h2>
        <p className="text-sm text-olive">This is a demo: nothing was sent.</p>
        <button
          type="button"
          onClick={sendAnother}
          className="mt-2 cursor-pointer text-xs font-semibold uppercase tracking-(--tracking-label) underline underline-offset-4"
        >
          Send another message
        </button>
      </div>
    )
  }

  const length = message.length

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
      <Input label="Name" autoComplete="name" error={errors.name?.message} {...register('name')} />
      <Input label="Email" type="email" autoComplete="email" error={errors.email?.message} {...register('email')} />
      <Select label="Topic" error={errors.topic?.message} {...register('topic')}>
        {CONTACT_TOPICS.map((topic) => (
          <option key={topic.value} value={topic.value}>
            {topic.label}
          </option>
        ))}
      </Select>
      <Input
        label="Message"
        multiline
        maxLength={MESSAGE_MAX}
        error={errors.message?.message}
        hint={`${length} / ${MESSAGE_MAX}`}
        {...register('message')}
      />

      <Button type="submit" disabled={isSubmitting} className="mt-2">
        {isSubmitting ? 'Sending…' : 'Send message'}
      </Button>
    </form>
  )
}
