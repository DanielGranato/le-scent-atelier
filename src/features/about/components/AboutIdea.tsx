import { IDEA, MOCK_IMAGES } from '../content'
import AboutSection from './AboutSection'

export default function AboutIdea() {
  return (
    <AboutSection title={IDEA.title}>
      <div className="flex max-w-[60ch] flex-col gap-4 text-lg">
        {IDEA.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      {/* MOCK images (our current bottles), to be replaced */}
      <ul className="grid grid-cols-3 gap-x-(--gutter) gap-y-6">
        {MOCK_IMAGES.moments.map((moment) => (
          <li key={moment.slug} className="flex flex-col gap-3">
            <div className="aspect-[4/5] overflow-hidden bg-bottle">
              <img
                src={`${import.meta.env.BASE_URL}${moment.image}`}
                alt={`${moment.name} perfume bottle`}
                loading="lazy"
                className="size-full object-cover"
              />
            </div>
            <div className="flex flex-col gap-1 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.04em]">{moment.name}</p>
              <p className="text-sm text-olive">{moment.caption}</p>
            </div>
          </li>
        ))}
      </ul>
    </AboutSection>
  )
}
