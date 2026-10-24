import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useCart } from '../../cart/useCart'
import CheckoutForm from './CheckoutForm'
import OrderSummary from './OrderSummary'

/** The checkout page: the form on the left, the summary on the right (on top and folded on phones). */
export default function CheckoutView() {
  const { itemCount } = useCart()
  // set just before the cart is cleared by a finished order: an empty cart is then expected
  const [placed, setPlaced] = useState(false)

  if (itemCount === 0 && !placed) return <Navigate to="/catalog" replace />

  return (
    <main className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col gap-10 px-(--gutter) py-(--section-y)">
      <h1 className="text-[clamp(3rem,10vw,7.5rem)] leading-[0.9] tracking-(--tracking-display)">Checkout</h1>

      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,28rem)] lg:items-start lg:gap-(--header-h)">
        <OrderSummary collapsible className="lg:hidden" />
        <CheckoutForm onPlaced={() => setPlaced(true)} />
        <OrderSummary className="hidden lg:sticky lg:top-[calc(var(--header-h)+1.5rem)] lg:block" />
      </div>
    </main>
  )
}
