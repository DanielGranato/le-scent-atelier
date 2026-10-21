import type { ReactNode } from 'react'

// AuthProvider and CartProvider will be composed here.
export default function Providers({ children }: { children: ReactNode }) {
  return <>{children}</>
}
