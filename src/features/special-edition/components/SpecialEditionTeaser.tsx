import NewsletterForm from '../../newsletter/NewsletterForm'
import { NEWS, TEASER } from '../content'

/**
 * The upcoming perfume: photo on the left, then the text, its notes and the news sign-up.
 * Margin: the normal side margin (--gutter) on the left, the header height on the right.
 */
export default function SpecialEditionTeaser() {
  return (
    <section className="mx-auto w-full max-w-[1440px] px-(--gutter) py-(--section-y) md:pr-(--header-h)">
      <div className="grid items-center gap-8 md:grid-cols-2 md:gap-(--header-h)">
        <img
          src={`${import.meta.env.BASE_URL}${TEASER.image.src}`}
          alt={TEASER.image.alt}
          fetchPriority="high"
          className="aspect-[3/4] w-full object-cover"
        />

        <div className="flex flex-col items-start gap-6">
          <p className="text-xs font-medium uppercase tracking-label text-olive">{TEASER.label}</p>
          <h1>{TEASER.title}</h1>
          <p className="max-w-[44ch] text-lg">{TEASER.text}</p>

          <div className="flex flex-col gap-3">
            <p className="text-xs font-medium uppercase tracking-label text-olive">{TEASER.notesLabel}</p>
            <ul className="flex flex-wrap gap-2">
              {TEASER.notes.map((note) => (
                <li
                  key={note}
                  className="border border-ink px-2.5 py-1.5 text-xs font-medium uppercase leading-none tracking-label"
                >
                  {note}
                </li>
              ))}
            </ul>
          </div>

          {/* news sign-up */}
          <section aria-labelledby="special-news-title" className="flex w-full max-w-[44ch] flex-col gap-3 border-t border-ink pt-6">
            <h2 id="special-news-title" className="text-[clamp(1.5rem,2.5vw,2rem)]">
              {NEWS.title}
            </h2>
            <p className="text-base">{NEWS.text}</p>
            <NewsletterForm />
          </section>
        </div>
      </div>
    </section>
  )
}
