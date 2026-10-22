import { Route, Routes } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import Catalog from '../pages/Catalog'
import Contact from '../pages/Contact'
import Home from '../pages/Home'
import NotFound from '../pages/NotFound'

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
