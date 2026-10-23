import { useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import LegalHalf from '../features/legal/components/LegalHalf'
import { isLegalSectionId, LEGAL_META, LEGAL_SECTIONS } from '../features/legal/content'
import { useDocumentMeta } from '../hooks/useDocumentMeta'

/**
 * Terms and Privacy on one page, one half each. /legal/terms and /legal/privacy open the page
 * already scrolled to that half (a hash like #terms would clash with the HashRouter).
 */
export default function Legal() {
  useDocumentMeta(LEGAL_META)

  const { section } = useParams()
  const { key } = useLocation()

  // Runs on every navigation to this page, also when the same link is clicked again.
  useEffect(() => {
    if (isLegalSectionId(section)) document.getElementById(section)?.scrollIntoView()
  }, [section, key])

  return (
    <main className="flex flex-1 flex-col">
      <h1 className="sr-only">Legal</h1>
      {LEGAL_SECTIONS.map((item) => (
        <LegalHalf key={item.id} section={item} />
      ))}
    </main>
  )
}
