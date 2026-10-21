import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Header from './Header'

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1 flex-col pt-[70px]">
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}
