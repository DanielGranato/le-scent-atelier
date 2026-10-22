import NotesList from '../features/products/components/NotesList'
import { useDocumentMeta } from '../hooks/useDocumentMeta'

const META = {
  title: 'Notes | Le Scent Atelier',
  description:
    'The notes behind every Le Scent Atelier perfume, family by family: fresh, floral, woody and amber. A fictional brand for a portfolio project.',
}

export default function Notes() {
  useDocumentMeta(META)

  return (
    <main className="flex flex-1 flex-col">
      <header className="mx-auto flex w-full max-w-[1440px] flex-col gap-5 px-(--gutter) py-(--section-y)">
        <h1>Notes</h1>
        <p className="max-w-[60ch] text-lg">
          Every scent starts with a few honest notes. Here is what we use, family by family, from the first
          spray to what is left on your sleeve at night.
        </p>
      </header>

      <NotesList />
    </main>
  )
}
