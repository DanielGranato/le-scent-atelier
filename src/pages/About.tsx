import AboutFamilies from '../features/about/components/AboutFamilies'
import AboutIdea from '../features/about/components/AboutIdea'
import AboutIntro from '../features/about/components/AboutIntro'
import AboutProcess from '../features/about/components/AboutProcess'
import AboutPromises from '../features/about/components/AboutPromises'
import { ABOUT_META, DISCLAIMER } from '../features/about/content'
import { useDocumentMeta } from '../hooks/useDocumentMeta'

export default function About() {
  useDocumentMeta(ABOUT_META)

  return (
    <main className="flex flex-1 flex-col">
      <AboutIntro />
      <AboutIdea />
      <AboutProcess />
      <AboutPromises />
      <AboutFamilies />

      <p className="mx-auto w-full max-w-[1440px] px-(--gutter) pb-(--section-y) text-xs text-olive">
        {DISCLAIMER}
      </p>
    </main>
  )
}
