import { responsiveImage } from '../../../lib/responsiveImage'
import { IDEA } from '../content'

/**
 * Photo on the left, text on the right (left-aligned). The margin is the height of the header on
 * top, right and bottom; on the left it is the normal side margin (--gutter), so the photo lines up
 * with the rest of the page. On phones the photo goes above the text.
 */
export default function AboutIdea() {
  return (
    <section className="mx-auto w-full max-w-[1440px] px-(--gutter) py-(--header-h) md:pr-(--header-h)">
      <div className="grid items-center gap-8 md:grid-cols-2 md:gap-(--header-h)">
        <img
          {...responsiveImage(IDEA.image.src, 1400)}
          sizes="(min-width: 768px) 50vw, 100vw"
          width={1400}
          height={1873}
          alt={IDEA.image.alt}
          loading="lazy"
          className="aspect-[3/4] w-full object-cover"
        />

        <div className="flex flex-col items-start gap-6 text-left">
          <h2>{IDEA.title}</h2>
          <p className="max-w-[44ch] text-lg">{IDEA.text}</p>
        </div>
      </div>
    </section>
  )
}
