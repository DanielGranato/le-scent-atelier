import { cn } from '../../../lib/cn'
import { responsiveImage } from '../../../lib/responsiveImage'
import NavItem from '../../../components/ui/NavItem'
import type { FamilyInfo } from '../families'
import { getFamilyNotes } from '../notes'
import type { Product } from '../types'

interface FamilyNotesBlockProps {
  family: FamilyInfo
  products: Product[]
  /** Photo on the right instead of the left (desktop). */
  reverse?: boolean
}

const levels = [
  { key: 'top', label: 'Top' },
  { key: 'heart', label: 'Heart' },
  { key: 'base', label: 'Base' },
] as const

/** One scent family: photo, short text, its notes by level, and a link to its perfumes. */
export default function FamilyNotesBlock({ family, products, reverse = false }: FamilyNotesBlockProps) {
  const notes = getFamilyNotes(products, family.id)
  const count = products.filter((product) => product.family === family.id).length

  return (
    <section aria-labelledby={`notes-${family.id}`} className="border-t border-ink/15">
      <div className="mx-auto grid w-full max-w-[1440px] items-center gap-8 px-(--gutter) py-(--section-y) md:grid-cols-2 md:gap-(--header-h) lg:py-[calc(var(--section-y)*1.25)]">
        <img
          {...responsiveImage(family.image, 1920)}
          sizes="(min-width: 768px) 50vw, 100vw"
          width={1920}
          height={917}
          alt=""
          loading="lazy"
          className={cn('aspect-[4/3] w-full object-cover', reverse && 'md:order-last')}
        />

        <div className="flex flex-col items-start gap-6">
          <h2 id={`notes-${family.id}`}>{family.title}</h2>
          <p className="max-w-[44ch] text-lg">{family.blurb}</p>

          <dl className="flex w-full max-w-[44ch] flex-col gap-4">
            {levels.map(({ key, label }) => (
              <div key={key} className="flex flex-col gap-1 border-t border-ink pt-3">
                <dt className="text-xs font-medium uppercase tracking-label text-olive">{label}</dt>
                <dd className="text-base">{notes[key].join(', ')}</dd>
              </div>
            ))}
          </dl>

          <NavItem to={`/catalog?family=${family.id}`}>
            Shop {family.title} ({count})
          </NavItem>
        </div>
      </div>
    </section>
  )
}
