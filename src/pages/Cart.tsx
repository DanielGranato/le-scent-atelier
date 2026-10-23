import { useRef } from 'react'
import ButtonLink from '../components/ui/ButtonLink'
import NavItem from '../components/ui/NavItem'
import CartLines from '../features/cart/components/CartLines'
import CartSummary from '../features/cart/components/CartSummary'
import { useCart } from '../features/cart/useCart'
import { useFocusWhenEmpty } from '../features/cart/useFocusWhenEmpty'
import { useDocumentMeta } from '../hooks/useDocumentMeta'

export default function Cart() {
  const { lines, itemCount } = useCart()
  const emptyRef = useRef<HTMLParagraphElement>(null)
  useFocusWhenEmpty(emptyRef)
  useDocumentMeta({ title: 'Cart | Le Scent Atelier', description: 'The perfumes in your cart.' })

  return (
    <main className="mx-auto flex w-full max-w-[720px] flex-1 flex-col gap-8 px-(--gutter) py-(--section-y)">
      <h1>Cart</h1>

      {itemCount === 0 ? (
        <div className="flex flex-col items-start gap-4">
          <p ref={emptyRef} tabIndex={-1} className="text-lg focus:outline-none">
            Your cart is empty.
          </p>
          <ButtonLink to="/catalog">See all perfumes</ButtonLink>
        </div>
      ) : (
        <>
          <CartLines lines={lines} />
          {lines.length > 0 ? <CartSummary /> : null}
          <NavItem to="/catalog">&larr; Continue shopping</NavItem>
        </>
      )}
    </main>
  )
}
