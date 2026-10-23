import type { ReactNode } from 'react'
import AuthProvider from '../features/auth/AuthProvider'
import CartProvider from '../features/cart/CartProvider'

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <CartProvider>{children}</CartProvider>
    </AuthProvider>
  )
}
