import { z } from 'zod'

export const newsletterSchema = z.object({
  email: z.string().trim().min(1, 'Please enter your email.').pipe(z.email('This email does not look right.')),
})

export type NewsletterValues = z.infer<typeof newsletterSchema>
