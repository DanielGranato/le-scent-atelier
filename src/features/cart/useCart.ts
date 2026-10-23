import { useContext } from 'react'
import { CartContext } from './cartContext'
import type { CartContextValue } from './types'

export function useCart(): CartContextValue {
  const value = useContext(CartContext)
  if (!value) throw new Error('useCart must be used inside <CartProvider>')
  return value
}
