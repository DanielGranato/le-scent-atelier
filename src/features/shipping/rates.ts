// The shipping prices, in numbers. The Shipping page text and the checkout both read them from here.

export const STANDARD_SHIPPING = { cost: 6, freeOver: 120 }
export const EXPRESS_SHIPPING = { cost: 14 }

/** What the standard delivery costs for an order of this subtotal (USD). */
export function getShippingCost(subtotal: number): number {
  return subtotal > STANDARD_SHIPPING.freeOver ? 0 : STANDARD_SHIPPING.cost
}
