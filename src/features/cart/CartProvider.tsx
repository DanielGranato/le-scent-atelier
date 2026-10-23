import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { getProducts } from '../products/api'
import type { Product, SizeMl } from '../products/types'
import { CartContext } from './cartContext'
import { parseStoredCart } from './schemas'
import {
  lineKey,
  MAX_QUANTITY,
  MIN_QUANTITY,
  type CartContextValue,
  type CartLine,
  type StoredCartItem,
} from './types'

const STORAGE_KEY = 'lsa:cart'

const clampQuantity = (quantity: number) => Math.min(MAX_QUANTITY, Math.max(MIN_QUANTITY, Math.round(quantity)))

/**
 * The cart. Only product id, size and quantity are kept in localStorage ("lsa:cart"). Names, images and
 * prices are read again from the product data every time, so a changed price in storage has no effect.
 */
export default function CartProvider({ children }: { children: ReactNode }) {
  // stored as unknown on purpose: it is checked with Zod on every read
  const [raw, setRaw] = useLocalStorage<unknown>(STORAGE_KEY, [])
  const [catalog, setCatalog] = useState<Product[] | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [announcement, setAnnouncement] = useState('')
  const items = useMemo(() => parseStoredCart(raw), [raw])

  // the latest catalog for addItem, which should not change identity when the catalog arrives
  const catalogRef = useRef<Product[] | null>(null)

  const update = useCallback(
    (change: (items: StoredCartItem[]) => StoredCartItem[]) => setRaw((previous: unknown) => change(parseStoredCart(previous))),
    [setRaw],
  )

  useEffect(() => {
    let cancelled = false
    getProducts()
      .then((products) => {
        if (cancelled) return
        catalogRef.current = products
        setCatalog(products)
        // forget lines for a perfume or size that no longer exists
        update((current) => {
          const kept = current.filter((item) =>
            products.some((p) => p.id === item.productId && p.sizes.some((size) => size.ml === item.sizeMl)),
          )
          return kept.length === current.length ? current : kept
        })
      })
      .catch(() => {
        /* without the catalog the count still works; the lines appear once it loads */
      })
    return () => {
      cancelled = true
    }
  }, [update])

  const lines = useMemo<CartLine[]>(() => {
    if (!catalog) return []
    const result: CartLine[] = []
    for (const item of items) {
      const product = catalog.find((p) => p.id === item.productId)
      const size = product?.sizes.find((candidate) => candidate.ml === item.sizeMl)
      if (!product || !size) continue
      result.push({
        productId: product.id,
        slug: product.slug,
        name: product.name,
        sizeMl: item.sizeMl,
        unitPrice: size.price,
        quantity: item.quantity,
        image: product.image,
      })
    }
    return result
  }, [catalog, items])

  const itemCount = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items])
  const subtotal = useMemo(
    () => Math.round(lines.reduce((sum, line) => sum + line.unitPrice * line.quantity, 0) * 100) / 100,
    [lines],
  )

  const addItem = useCallback(
    (product: Product, sizeMl: SizeMl): boolean => {
      // prefer the loaded catalog over the object that came from the page
      const source = catalogRef.current?.find((p) => p.id === product.id) ?? product
      const size = source.sizes.find((candidate) => candidate.ml === sizeMl)
      if (!size || !size.inStock) return false

      update((current) => {
        const found = current.find((item) => item.productId === source.id && item.sizeMl === sizeMl)
        if (!found) return [...current, { productId: source.id, sizeMl, quantity: 1 }]
        return current.map((item) => (item === found ? { ...item, quantity: clampQuantity(item.quantity + 1) } : item))
      })
      setAnnouncement(`Added ${source.name}, ${sizeMl} mL`)
      return true
    },
    [update],
  )

  const setQuantity = useCallback(
    (key: string, quantity: number) => {
      if (!Number.isFinite(quantity)) return
      update((current) =>
        current.map((item) =>
          lineKey(item.productId, item.sizeMl) === key ? { ...item, quantity: clampQuantity(quantity) } : item,
        ),
      )
    },
    [update],
  )

  const removeItem = useCallback(
    (key: string) => update((current) => current.filter((item) => lineKey(item.productId, item.sizeMl) !== key)),
    [update],
  )

  const clear = useCallback(() => setRaw([]), [setRaw])
  const openCart = useCallback(() => setIsOpen(true), [])
  const closeCart = useCallback(() => {
    setIsOpen(false)
    setAnnouncement('')
  }, [])

  const value = useMemo<CartContextValue>(
    () => ({
      lines,
      itemCount,
      subtotal,
      addItem,
      setQuantity,
      removeItem,
      clear,
      isOpen,
      announcement,
      openCart,
      closeCart,
    }),
    [lines, itemCount, subtotal, addItem, setQuantity, removeItem, clear, isOpen, announcement, openCart, closeCart],
  )

  return <CartContext value={value}>{children}</CartContext>
}
