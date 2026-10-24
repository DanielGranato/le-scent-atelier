import ButtonLink from '../../../components/ui/ButtonLink'
import { formatPrice } from '../../../lib/formatPrice'
import { useCart } from '../useCart'

/** Subtotal and the Checkout button, which leads to the (fictional) checkout. */
export default function CartSummary() {
  const { subtotal, closeCart } = useCart()

  return (
    <section aria-label="Order summary" className="flex flex-col gap-4 border-t border-ink pt-6">
      <div className="flex items-baseline justify-between gap-4">
        <h2 className="text-xs font-medium uppercase tracking-(--tracking-label) text-olive">Subtotal</h2>
        <p className="text-2xl font-medium">{formatPrice(subtotal)}</p>
      </div>
      <p className="text-sm text-olive">Shipping and taxes calculated at checkout.</p>
      {/* closes the drawer when it is used from there; on the cart page closeCart changes nothing */}
      <ButtonLink to="/checkout" onClick={closeCart} className="w-full">
        Checkout
      </ButtonLink>
    </section>
  )
}
