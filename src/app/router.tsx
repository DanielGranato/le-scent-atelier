import { Route, Routes } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import About from '../pages/About'
import Catalog from '../pages/Catalog'
import Contact from '../pages/Contact'
import Home from '../pages/Home'
import NotFound from '../pages/NotFound'
import Notes from '../pages/Notes'
import SpecialEditions from '../pages/SpecialEditions'

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/special-editions" element={<SpecialEditions />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
