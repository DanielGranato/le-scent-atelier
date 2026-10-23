import type { ReactNode } from 'react'
import AuthProvider from '../features/auth/AuthProvider'

// CartProvider will be added here later.
export default function Providers({ children }: { children: ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>
}
