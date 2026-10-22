import { useEffect, useState } from 'react'
import { getProducts } from '../api'
import { FAMILIES } from '../families'
import type { Product } from '../types'
import FamilyNotesBlock from './FamilyNotesBlock'

/** The four scent families with their notes. Photos alternate between left and right. */
export default function NotesList() {
  const [products, setProducts] = useState<Product[] | null>(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    let cancelled = false
    getProducts()
      .then((items) => {
        if (!cancelled) setProducts(items)
      })
      .catch(() => {
        if (!cancelled) setFailed(true)
      })
    return () => {
      cancelled = true
    }
  }, [])

  if (failed) {
    return <p className="px-(--gutter)">We could not load the notes. Please try again.</p>
  }
  if (!products) return null

  return (
    <div>
      {FAMILIES.map((family, index) => (
        <FamilyNotesBlock key={family.id} family={family} products={products} reverse={index % 2 === 1} />
      ))}
    </div>
  )
}
