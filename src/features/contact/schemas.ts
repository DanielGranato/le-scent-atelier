import { z } from 'zod'

export const MESSAGE_MAX = 500

/** The topics of the select, in the order they are shown. */
export const CONTACT_TOPICS = [
  { value: 'order', label: 'Order' },
  { value: 'product', label: 'Product question' },
  { value: 'press', label: 'Press' },
  { value: 'other', label: 'Other' },
] as const

export const contactSchema = z.object({
  name: z.string().trim().min(2, 'Please enter your name (at least 2 letters).'),
  email: z.string().trim().min(1, 'Please enter your email.').pipe(z.email('This email does not look right.')),
  topic: z.enum(['order', 'product', 'press', 'other'], { error: 'Please choose a topic.' }),
  message: z
    .string()
    .trim()
    .min(10, 'Tell us a bit more (at least 10 characters).')
    .max(MESSAGE_MAX, `Please keep it under ${MESSAGE_MAX} characters.`),
})

export type ContactValues = z.infer<typeof contactSchema>
