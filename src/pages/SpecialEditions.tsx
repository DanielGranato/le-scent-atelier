import SpecialEditionTeaser from '../features/special-edition/components/SpecialEditionTeaser'
import StoryInvite from '../features/special-edition/components/StoryInvite'
import { SPECIAL_META } from '../features/special-edition/content'
import { useDocumentMeta } from '../hooks/useDocumentMeta'

export default function SpecialEditions() {
  useDocumentMeta(SPECIAL_META)

  return (
    <main className="flex flex-1 flex-col">
      <SpecialEditionTeaser />
      <StoryInvite />
    </main>
  )
}
