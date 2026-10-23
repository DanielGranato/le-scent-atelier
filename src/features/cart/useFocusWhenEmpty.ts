import { useEffect, useRef, type RefObject } from 'react'
import { useCart } from './useCart'

/**
 * When the last line is removed the list disappears, and with it the focused "Remove" button.
 * This moves focus to the "Your cart is empty." message so keyboard and screen reader users are not left behind.
 * It does nothing when the cart simply starts empty.
 */
export function useFocusWhenEmpty(target: RefObject<HTMLElement | null>) {
  const { itemCount } = useCart()
  const previous = useRef(itemCount)

  useEffect(() => {
    if (previous.current > 0 && itemCount === 0) target.current?.focus()
    previous.current = itemCount
  }, [itemCount, target])
}
