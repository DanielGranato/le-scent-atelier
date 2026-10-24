import { readLocalStorage } from '../../hooks/useLocalStorage'
import { lastOrderSchema, type LastOrder } from './schemas'

export const LAST_ORDER_KEY = 'lsa:last-order'

// no 0, O, 1, I: easy to read out loud
const ORDER_CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'

/** A fake order number like LSA-7K3QXD. It means nothing: no order exists. */
export function createOrderNumber(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(6))
  return `LSA-${[...bytes].map((byte) => ORDER_CHARS[byte % ORDER_CHARS.length]).join('')}`
}

/** The saved "last order", or null if there is none or the stored data is not valid. */
export function readLastOrder(): LastOrder | null {
  const result = lastOrderSchema.safeParse(readLocalStorage<unknown>(LAST_ORDER_KEY, null))
  return result.success ? result.data : null
}
