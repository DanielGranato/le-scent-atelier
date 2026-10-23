import type { LegalSection } from '../content'

/**
 * One half of the Legal page. It is as tall as the screen below the header, so a link that points
 * to it shows only this half. `scroll-mt` leaves room for the fixed header when scrolling to it.
 */
export default function LegalHalf({ section }: { section: LegalSection }) {
  return (
    <section
      id={section.id}
      aria-labelledby={`${section.id}-title`}
      className="min-h-[calc(100svh-var(--header-h))] scroll-mt-(--header-h) border-t border-ink/15 first:border-t-0"
    >
      <div className="mx-auto grid w-full max-w-[1440px] gap-10 px-(--gutter) py-(--section-y) lg:grid-cols-[1fr_2fr] lg:gap-(--header-h) lg:py-[calc(var(--section-y)*1.25)]">
        <div className="flex flex-col gap-3">
          <h2 id={`${section.id}-title`}>{section.title}</h2>
          <p className="text-xs font-medium uppercase tracking-label text-olive">{section.updated}</p>
        </div>

        <div className="flex flex-col gap-8">
          <p className="max-w-[60ch] text-lg">{section.intro}</p>
          <ol className="flex max-w-[60ch] flex-col gap-6">
            {section.items.map((item, index) => (
              <li key={item.heading} className="flex flex-col gap-2 border-t border-ink pt-4">
                <h3 className="text-[1.25rem] md:text-[1.375rem]">
                  <span aria-hidden="true" className="mr-3 text-sm font-medium tracking-label text-olive">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  {item.heading}
                </h3>
                <p className="text-base">{item.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
