import { z } from 'zod'
import { lineKey, MAX_QUANTITY, MIN_QUANTITY, type StoredCartItem } from './types'

const storedItemSchema = z.object({
  productId: z.string().min(1),
  sizeMl: z.union([z.literal(10), z.literal(50), z.literal(100)]),
  quantity: z.number().int().min(MIN_QUANTITY).max(MAX_QUANTITY),
})

/** What localStorage may hold: a list of items with no repeated perfume + size. */
const storedCartSchema = z
  .array(storedItemSchema)
  .refine((items) => new Set(items.map((item) => lineKey(item.productId, item.sizeMl))).size === items.length, {
    error: 'Repeated cart line',
  })

/** Checks data read from localStorage. Anything that does not fit gives an empty cart, never an error. */
export function parseStoredCart(raw: unknown): StoredCartItem[] {
  const result = storedCartSchema.safeParse(raw)
  return result.success ? result.data : []
}
