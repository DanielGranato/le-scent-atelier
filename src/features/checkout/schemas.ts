import { z } from 'zod'

export const PAYMENT_METHODS = [
  { value: 'pix', label: 'Pix', hint: 'Instant transfer. You would get a QR code.' },
  { value: 'card-on-delivery', label: 'Card on delivery', hint: 'Pay with a card when the order arrives.' },
  { value: 'bank-slip', label: 'Bank slip', hint: 'A slip you would pay at a bank or in your banking app.' },
] as const

export const onlyDigits = (value: string) => value.replace(/\D/g, '')

/** "12345678" -> "12345-678" while the person types (at most 8 digits). */
export function maskCep(value: string): string {
  const digits = onlyDigits(value).slice(0, 8)
  return digits.length > 5 ? `${digits.slice(0, 5)}-${digits.slice(5)}` : digits
}

const required = (message: string) => z.string().trim().min(1, message)

export const checkoutSchema = z.object({
  email: z.string().trim().min(1, 'Please enter your email.').pipe(z.email('This email does not look right.')),
  fullName: z.string().trim().min(2, 'Please enter your full name (at least 2 letters).'),
  // "12345-678" or "12345678"; the value that comes out has the 8 digits only
  cep: z
    .string()
    .trim()
    .regex(/^\d{5}-?\d{3}$/, 'Enter a valid CEP, like 12345-678.')
    .transform(onlyDigits),
  street: required('Please enter the street.'),
  number: required('Please enter the number.'),
  complement: z.string().trim().optional(),
  neighborhood: required('Please enter the neighborhood.'),
  city: required('Please enter the city.'),
  state: z
    .string()
    .trim()
    .regex(/^[A-Za-z]{2}$/, 'Use the 2 letters of the state, like SP.')
    .transform((value) => value.toUpperCase()),
  paymentMethod: z.enum(['pix', 'card-on-delivery', 'bank-slip'], { error: 'Please choose a payment method.' }),
})

/** What the form holds while it is being filled in (the CEP may have a dash). */
export type CheckoutInput = z.input<typeof checkoutSchema>
/** What the submit handler gets (the CEP is 8 digits, the state is upper case). */
export type CheckoutValues = z.output<typeof checkoutSchema>

/** The order kept for the confirmation page: only these four things, nothing about the person. */
export const lastOrderSchema = z.object({
  orderNumber: z.string().min(1),
  lines: z.array(
    z.object({
      productId: z.string(),
      slug: z.string(),
      name: z.string(),
      sizeMl: z.union([z.literal(10), z.literal(50), z.literal(100)]),
      unitPrice: z.number(),
      quantity: z.number().int().positive(),
      image: z.string(),
    }),
  ),
  total: z.number(),
  city: z.string(),
})

export type LastOrder = z.infer<typeof lastOrderSchema>
