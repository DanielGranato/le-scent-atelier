import { z } from 'zod'

export const contactSchema = z.object({
  name: z.string().trim().min(1, 'Please enter your name.'),
  email: z.string().trim().min(1, 'Please enter your email.').pipe(z.email('This email does not look right.')),
  message: z.string().trim().min(10, 'Tell us a bit more (at least 10 characters).').max(1000, 'Please keep it under 1000 characters.'),
})

export type ContactFormValues = z.infer<typeof contactSchema>
