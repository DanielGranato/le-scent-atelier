import { useMemo } from 'react'
import { Navigate } from 'react-router-dom'
import ButtonLink from '../../../components/ui/ButtonLink'
import { getShippingCost } from '../../shipping/rates'
import { readLastOrder } from '../lastOrder'
import OrderLines from './OrderLines'
import OrderTotals from './OrderTotals'

/** The confirmation of the fake order that CheckoutForm saved. Without one, there is nothing to show. */
export default function OrderConfirmationView() {
  const order = useMemo(() => readLastOrder(), [])
  if (!order) return <Navigate to="/" replace />

  // the saved total includes shipping; split it again for the list
  const subtotal = order.lines.reduce((sum, line) => sum + line.unitPrice * line.quantity, 0)
  const shipping = getShippingCost(subtotal)

  return (
    <main className="mx-auto flex w-full max-w-[720px] flex-1 flex-col gap-10 px-(--gutter) py-(--section-y)">
      <header className="flex flex-col gap-6">
        <p className="text-xs font-medium uppercase tracking-(--tracking-label) text-olive">Order confirmed</p>
        <h1 className="text-[clamp(3rem,10vw,7.5rem)] leading-[0.9] tracking-(--tracking-display)">Thank you</h1>
        <p className="text-lg">
          Order number{' '}
          <strong className="font-medium tracking-(--tracking-label) text-(color:--gold)">{order.orderNumber}</strong>
          {order.city ? `, for delivery in ${order.city}.` : '.'}
        </p>
        <p role="status" className="border border-ink/15 bg-(--surface) px-4 py-3 text-base">
          This is a demo: no order was placed and nothing will be shipped.
        </p>
      </header>

      <section aria-label="Order summary" className="flex flex-col gap-6 border border-ink/15 bg-(--surface) p-6">
        <OrderLines lines={order.lines} />
        <OrderTotals subtotal={subtotal} shipping={shipping} total={order.total} />
      </section>

      <div>
        <ButtonLink to="/catalog">Continue shopping</ButtonLink>
      </div>
    </main>
  )
}
