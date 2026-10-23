import { useRef } from 'react'
import { Link } from 'react-router-dom'
import Drawer from '../../../components/ui/Drawer'
import ButtonLink from '../../../components/ui/ButtonLink'
import { useCart } from '../useCart'
import { useFocusWhenEmpty } from '../useFocusWhenEmpty'
import CartLines from './CartLines'
import CartSummary from './CartSummary'

/** The cart as a side panel (same Drawer as the contact form). Rendered once, in the Layout. */
export default function CartDrawer() {
  const { lines, itemCount, isOpen, closeCart, announcement } = useCart()
  const emptyRef = useRef<HTMLParagraphElement>(null)
  useFocusWhenEmpty(emptyRef)

  return (
    <Drawer id="cart-drawer" open={isOpen} onClose={closeCart} title="Cart" closeLabel="Close cart">
      {/* "Added Small Hours, 50 mL": read out when the drawer opens after adding a perfume */}
      <p aria-live="polite" className="sr-only">
        {announcement}
      </p>

      {itemCount === 0 ? (
        <div className="flex flex-col items-start gap-4">
          <p ref={emptyRef} tabIndex={-1} className="text-lg focus:outline-none">
            Your cart is empty.
          </p>
          <ButtonLink to="/catalog" onClick={closeCart}>
            See all perfumes
          </ButtonLink>
        </div>
      ) : (
        <div className="flex min-h-full flex-col gap-8">
          <CartLines lines={lines} onNavigate={closeCart} />

          {lines.length > 0 ? (
            <div className="mt-auto flex flex-col gap-6">
              <CartSummary />
              <div className="flex flex-col items-start gap-1">
                <Link
                  to="/cart"
                  onClick={closeCart}
                  className="flex min-h-11 items-center text-xs font-semibold uppercase tracking-(--tracking-label) underline underline-offset-4"
                >
                  View cart
                </Link>
                <button
                  type="button"
                  onClick={closeCart}
                  className="flex min-h-11 cursor-pointer items-center text-xs font-semibold uppercase tracking-(--tracking-label) underline underline-offset-4"
                >
                  Continue shopping
                </button>
              </div>
            </div>
          ) : null}
        </div>
      )}
    </Drawer>
  )
}
