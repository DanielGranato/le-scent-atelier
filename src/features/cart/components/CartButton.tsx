import { useCart } from '../useCart'

function BagIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M3.5 6.5h13l-1 11h-11Z" />
      <path d="M7 6.5V5a3 3 0 0 1 6 0v1.5" />
    </svg>
  )
}

/** The cart icon of the Header, with a count badge when there is something in the cart. */
export default function CartButton() {
  const { itemCount, isOpen, openCart } = useCart()
  const label = itemCount > 0 ? `Cart, ${itemCount} ${itemCount === 1 ? 'item' : 'items'}` : 'Cart, empty'

  return (
    <button
      type="button"
      onClick={openCart}
      aria-label={label}
      aria-expanded={isOpen}
      aria-controls="cart-drawer"
      className="relative flex cursor-pointer items-center py-2"
    >
      <BagIcon />
      {itemCount > 0 ? (
        <span
          aria-hidden="true"
          className="absolute -right-2 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-ink px-1 text-[10px] font-semibold leading-none text-paper"
        >
          {itemCount}
        </span>
      ) : null}
    </button>
  )
}
