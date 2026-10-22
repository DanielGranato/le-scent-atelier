import { PROMISES } from '../content'

/**
 * Mirror of AboutIdea: the text is on the left (aligned to the right, next to the photo) and the
 * photo is on the right. The margin is the height of the header on top, bottom and left; on the
 * right it is the normal side margin (--gutter). On phones the photo goes above the text.
 */
export default function AboutPromises() {
  return (
    <section className="mx-auto w-full max-w-[1440px] px-(--gutter) py-(--header-h) md:pl-(--header-h)">
      <div className="grid items-center gap-8 md:grid-cols-2 md:gap-(--header-h)">
        <img
          src={`${import.meta.env.BASE_URL}${PROMISES.image.src}`}
          alt={PROMISES.image.alt}
          loading="lazy"
          className="order-first aspect-[4/5] w-full object-cover md:order-last"
        />

        <div className="flex flex-col items-end gap-8 text-right">
          <h2>{PROMISES.title}</h2>
          <ul className="flex w-full max-w-[44ch] flex-col gap-6">
            {PROMISES.items.map((promise) => (
              <li key={promise.lead} className="flex flex-col gap-2 border-t border-ink pt-5">
                <h3>{promise.lead}</h3>
                <p className="text-base">{promise.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
