import type { Product, SizeMl } from '../products/types'

/** One row of the cart, as the pages show it. Everything but `quantity` comes from the product data. */
export interface CartLine {
  productId: string
  slug: string
  name: string
  sizeMl: SizeMl
  unitPrice: number
  quantity: number
  image: string
}

/** The only part of a line that is kept in localStorage: which perfume, which size, how many. */
export interface StoredCartItem {
  productId: string
  sizeMl: SizeMl
  quantity: number
}

export const MIN_QUANTITY = 1
export const MAX_QUANTITY = 10

/** The key of a line: the same perfume in another size is another line. */
export const lineKey = (productId: string, sizeMl: SizeMl): string => `${productId}:${sizeMl}`

export interface CartContextValue {
  lines: CartLine[]
  itemCount: number
  subtotal: number
  /** Adds one bottle. Gives false (and changes nothing) if that size does not exist or is out of stock. */
  addItem: (product: Product, sizeMl: SizeMl) => boolean
  setQuantity: (key: string, quantity: number) => void
  removeItem: (key: string) => void
  clear: () => void
  isOpen: boolean
  /** "Added Small Hours, 50 mL" after an add; cleared when the cart closes. For a screen reader live region. */
  announcement: string
  openCart: () => void
  closeCart: () => void
}
