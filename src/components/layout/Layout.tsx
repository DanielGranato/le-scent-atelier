import { Outlet, useLocation } from 'react-router-dom'
import Footer from './Footer'
import Header from './Header'
import ScrollToTop from './ScrollToTop'

// Pages that start with a full-screen photo: transparent header, and no space reserved above the page.
const TRANSPARENT_HEADER_PATHS = ['/about']

export default function Layout() {
  const { pathname } = useLocation()
  const transparentHeader = TRANSPARENT_HEADER_PATHS.includes(pathname)

  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <Header transparent={transparentHeader} />
      <div className={`flex flex-1 flex-col ${transparentHeader ? '' : 'pt-[70px]'}`}>
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}
