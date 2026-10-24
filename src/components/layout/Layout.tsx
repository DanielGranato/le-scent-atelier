import { Outlet, useLocation } from 'react-router-dom'
import CartDrawer from '../../features/cart/components/CartDrawer'
import Footer from './Footer'
import Header from './Header'
import ScrollToTop from './ScrollToTop'

// Pages that start with a full-screen photo: transparent header, and no space reserved above the page.
const TRANSPARENT_HEADER_PATHS = ['/about']

export default function Layout() {
  const { pathname } = useLocation()
  const transparentHeader = TRANSPARENT_HEADER_PATHS.includes(pathname)
  // the checkout has its own dark theme (see "cinematic" in styles/index.css)
  const dark = pathname === '/checkout' || pathname.startsWith('/checkout/')

  return (
    <div
      data-theme={dark ? 'cinematic' : undefined}
      className={`flex min-h-screen flex-col ${dark ? 'bg-paper text-ink' : ''}`}
    >
      <ScrollToTop />
      <Header transparent={transparentHeader} dark={dark} />
      <div className={`flex flex-1 flex-col ${transparentHeader ? '' : 'pt-[70px]'}`}>
        <Outlet />
      </div>
      <Footer />
      <CartDrawer />
    </div>
  )
}
