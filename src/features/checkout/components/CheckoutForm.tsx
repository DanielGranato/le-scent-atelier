import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import Button from '../../../components/ui/Button'
import Input from '../../../components/ui/Input'
import { useLocalStorage } from '../../../hooks/useLocalStorage'
import { useAuth } from '../../auth/useAuth'
import { useCart } from '../../cart/useCart'
import { useCepLookup } from '../hooks/useCepLookup'
import { useOrderTotals } from '../hooks/useOrderTotals'
import { createOrderNumber, LAST_ORDER_KEY } from '../lastOrder'
import {
  checkoutSchema,
  maskCep,
  onlyDigits,
  PAYMENT_METHODS,
  type CheckoutInput,
  type CheckoutValues,
  type LastOrder,
} from '../schemas'

const SIMULATED_DELAY_MS = 1500
const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const sectionTitle = 'text-xs font-medium uppercase tracking-(--tracking-label) text-olive'

interface CheckoutFormProps {
  /** Called right before the cart is cleared, so the page does not mistake the empty cart for "nothing to buy". */
  onPlaced: () => void
}

/** The fictional checkout form. Nothing is sent anywhere: the "order" is only kept in localStorage for the confirmation page. */
export default function CheckoutForm({ onPlaced }: CheckoutFormProps) {
  const { user } = useAuth()
  const { lines, clear } = useCart()
  const { total } = useOrderTotals()
  const navigate = useNavigate()
  const [, setLastOrder] = useLocalStorage<LastOrder | null>(LAST_ORDER_KEY, null)
  const [formError, setFormError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    control,
    setValue,
    setFocus,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutInput, unknown, CheckoutValues>({
    resolver: zodResolver(checkoutSchema),
    mode: 'onTouched',
    defaultValues: {
      email: user?.email ?? '',
      fullName: user?.name ?? '',
      cep: '',
      street: '',
      number: '',
      complement: '',
      neighborhood: '',
      city: '',
      state: '',
      paymentMethod: 'pix',
    },
  })

  const cep = useWatch({ control, name: 'cep' })
  const lookup = useCepLookup(onlyDigits(cep ?? ''))
  const searching = lookup.status === 'loading'

  // address found: fill the fields (they stay editable) and go on to the number
  useEffect(() => {
    if (lookup.status !== 'found' || !lookup.address) return
    const { street, neighborhood, city, state } = lookup.address
    const options = { shouldValidate: true, shouldDirty: true }
    setValue('street', street, options)
    setValue('neighborhood', neighborhood, options)
    setValue('city', city, options)
    setValue('state', state, options)
    setFocus('number')
  }, [lookup.status, lookup.address, setValue, setFocus])

  const onSubmit = async (values: CheckoutValues) => {
    setFormError(null)
    if (lines.length === 0) {
      setFormError('Your cart is empty, so there is nothing to order.')
      return
    }
    await wait(SIMULATED_DELAY_MS) // a pretend request

    // only this is kept: no name, email, address or payment choice
    setLastOrder({ orderNumber: createOrderNumber(), lines, total, city: values.city })
    onPlaced()
    clear()
    navigate('/checkout/success')
  }

  const cepMessage = {
    idle: '',
    loading: 'Searching address...',
    found: 'Address found. Please check it.',
    notFound: 'CEP not found',
    error: 'Could not search the CEP. Fill the address manually.',
  }[lookup.status]

  return (
    <form
      onSubmit={handleSubmit(onSubmit, () => setFormError('Please check the highlighted fields.'))}
      noValidate
      aria-busy={isSubmitting}
    >
      <fieldset disabled={isSubmitting} className="m-0 flex min-w-0 flex-col gap-10 border-0 p-0">
        <section aria-labelledby="checkout-contact" className="flex flex-col gap-4">
          <h2 id="checkout-contact" className={sectionTitle}>
            Contact
          </h2>
          <Input label="Email" type="email" autoComplete="email" error={errors.email?.message} {...register('email')} />
          <Input label="Full name" autoComplete="name" error={errors.fullName?.message} {...register('fullName')} />
        </section>

        <section aria-labelledby="checkout-delivery" className="flex flex-col gap-4">
          <h2 id="checkout-delivery" className={sectionTitle}>
            Delivery
          </h2>

          <div className="flex flex-col gap-2">
            <Input
              label="CEP"
              placeholder="00000-000"
              inputMode="numeric"
              autoComplete="postal-code"
              maxLength={9}
              error={errors.cep?.message}
              {...register('cep', { onChange: (event) => setValue('cep', maskCep(event.target.value)) })}
            />
            {/* the search state is a message, not a field error: always in the page so it is read out when it changes */}
            <p aria-live="polite" className="min-h-[1.25rem] text-sm text-olive">
              {cepMessage}
            </p>
          </div>

          <Input
            label="Street"
            autoComplete="address-line1"
            disabled={searching}
            error={errors.street?.message}
            {...register('street')}
          />
          <div className="grid grid-cols-[1fr_2fr] items-start gap-4">
            <Input label="Number" error={errors.number?.message} {...register('number')} />
            <Input
              label="Complement (optional)"
              autoComplete="address-line2"
              disabled={searching}
              error={errors.complement?.message}
              {...register('complement')}
            />
          </div>
          <Input
            label="Neighborhood"
            disabled={searching}
            error={errors.neighborhood?.message}
            {...register('neighborhood')}
          />
          <div className="grid grid-cols-[2fr_1fr] items-start gap-4">
            <Input
              label="City"
              autoComplete="address-level2"
              disabled={searching}
              error={errors.city?.message}
              {...register('city')}
            />
            <Input
              label="State"
              autoComplete="address-level1"
              autoCapitalize="characters"
              maxLength={2}
              placeholder="SP"
              disabled={searching}
              className="uppercase"
              error={errors.state?.message}
              {...register('state')}
            />
          </div>
        </section>

        <fieldset className="m-0 flex min-w-0 flex-col gap-3 border-0 p-0">
          <legend className={`${sectionTitle} mb-4`}>Payment</legend>
          {PAYMENT_METHODS.map((method) => (
            <label
              key={method.value}
              className="flex min-h-11 cursor-pointer items-start gap-3 border border-ink/15 bg-(--surface) p-4 has-checked:border-amber"
            >
              <input
                type="radio"
                value={method.value}
                className="mt-0.5 size-5 shrink-0 cursor-pointer accent-amber"
                {...register('paymentMethod')}
              />
              <span className="flex flex-col gap-1">
                <span className="text-base font-medium uppercase tracking-(--tracking-label)">{method.label}</span>
                <span className="text-sm text-olive">{method.hint}</span>
              </span>
            </label>
          ))}
          {errors.paymentMethod ? <p className="text-sm">{errors.paymentMethod.message}</p> : null}
          <p className="text-sm text-olive">Demo only: no payment is processed.</p>
        </fieldset>

        <div className="flex flex-col gap-4">
          {formError ? (
            <p role="alert" className="border border-(color:--gold) px-4 py-3 text-sm">
              {formError}
            </p>
          ) : null}
          <Button type="submit" disabled={isSubmitting || searching || lines.length === 0} className="w-full">
            {isSubmitting ? 'Placing order...' : 'Place order'}
          </Button>
        </div>
      </fieldset>
    </form>
  )
}
