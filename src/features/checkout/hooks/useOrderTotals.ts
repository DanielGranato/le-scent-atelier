import { useCart } from '../../cart/useCart'
import { getShippingCost } from '../../shipping/rates'

/** Subtotal, shipping and total of what is in the cart (all from the product data, see CartProvider). */
export function useOrderTotals() {
  const { subtotal, lines } = useCart()
  const shipping = lines.length > 0 ? getShippingCost(subtotal) : 0
  return { subtotal, shipping, total: subtotal + shipping }
}
