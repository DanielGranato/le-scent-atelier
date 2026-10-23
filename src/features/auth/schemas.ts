import { z } from 'zod'

const email = z.string().trim().min(1, 'Please enter your email.').pipe(z.email('This email does not look right.'))

export const loginSchema = z.object({
  email,
  password: z.string().min(1, 'Please enter your password.'),
})

export const registerSchema = z
  .object({
    name: z.string().trim().min(2, 'Please enter your name (at least 2 letters).'),
    email,
    password: z
      .string()
      .min(8, 'Use at least 8 characters.')
      .regex(/[A-Za-z]/, 'Add at least one letter.')
      .regex(/\d/, 'Add at least one number.'),
    confirmPassword: z.string().min(1, 'Please repeat your password.'),
  })
  .refine((values) => values.password === values.confirmPassword, {
    path: ['confirmPassword'],
    error: 'Passwords do not match',
    // Only compare when each password field is fine on its own. Otherwise someone typing a short
    // password would see "do not match" together with "use at least 8 characters".
    when: ({ issues }) => !issues.some((issue) => issue.path?.[0] === 'password' || issue.path?.[0] === 'confirmPassword'),
  })

export type LoginValues = z.infer<typeof loginSchema>
export type RegisterValues = z.infer<typeof registerSchema>
