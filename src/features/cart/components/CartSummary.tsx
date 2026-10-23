import { useState } from 'react'
import Button from '../../../components/ui/Button'
import { formatPrice } from '../../../lib/formatPrice'
import { useCart } from '../useCart'

/** Subtotal and the Checkout button. There is no back end, so Checkout only says so. */
export default function CartSummary() {
  const { subtotal } = useCart()
  const [message, setMessage] = useState('')

  return (
    <section aria-label="Order summary" className="flex flex-col gap-4 border-t border-ink pt-6">
      <div className="flex items-baseline justify-between gap-4">
        <h2 className="text-xs font-medium uppercase tracking-(--tracking-label) text-olive">Subtotal</h2>
        <p className="text-2xl font-medium">{formatPrice(subtotal)}</p>
      </div>
      <p className="text-sm text-olive">Shipping and taxes calculated at checkout.</p>
      <Button onClick={() => setMessage('This is a demo: checkout is not available.')} className="w-full">
        Checkout
      </Button>
      {/* always in the page, so the text is announced when it appears */}
      <p role="status" className="text-sm text-olive">
        {message}
      </p>
    </section>
  )
}
