import { Route, Routes } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import About from '../pages/About'
import Cart from '../pages/Cart'
import Catalog from '../pages/Catalog'
import Checkout from '../pages/Checkout'
import Contact from '../pages/Contact'
import Home from '../pages/Home'
import Legal from '../pages/Legal'
import Login from '../pages/Login'
import NotFound from '../pages/NotFound'
import Notes from '../pages/Notes'
import OrderConfirmation from '../pages/OrderConfirmation'
import ProductDetail from '../pages/ProductDetail'
import Register from '../pages/Register'
import Shipping from '../pages/Shipping'
import SpecialEditions from '../pages/SpecialEditions'

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/checkout/success" element={<OrderConfirmation />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/legal/:section?" element={<Legal />} />
        <Route path="/login" element={<Login />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/product/:slug" element={<ProductDetail />} />
        <Route path="/register" element={<Register />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/special-editions" element={<SpecialEditions />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
