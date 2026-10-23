import { NOTES } from '../content'

/** Six short notes about shipping, numbered, in two columns on wide screens. */
export default function ShippingNotes() {
  return (
    <section aria-labelledby="shipping-notes-title" className="border-t border-ink/15">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-8 px-(--gutter) py-(--section-y) lg:py-[calc(var(--section-y)*1.25)]">
        <h2 id="shipping-notes-title">{NOTES.title}</h2>

        <ol className="grid gap-6 md:grid-cols-2 md:gap-x-(--header-h)">
          {NOTES.items.map((item, index) => (
            <li key={item.heading} className="flex max-w-[60ch] flex-col gap-2 border-t border-ink pt-4">
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
    </section>
  )
}
