import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '../../../lib/cn'
import { getProducts } from '../api'
import { FAMILIES } from '../families'
import type { ScentFamily } from '../types'

type FamilyCounts = Record<ScentFamily, number>

export default function FamilyShowcase() {
  const [index, setIndex] = useState(0)
  const [counts, setCounts] = useState<FamilyCounts | null>(null)

  useEffect(() => {
    let cancelled = false
    getProducts()
      .then((products) => {
        if (cancelled) return
        const next: FamilyCounts = { fresh: 0, floral: 0, woody: 0, amber: 0 }
        for (const product of products) next[product.family] += 1
        setCounts(next)
      })
      .catch(() => {
        /* the count is optional: the link still works without it */
      })
    return () => {
      cancelled = true
    }
  }, [])

  const family = FAMILIES[index]
  const count = counts?.[family.id]

  return (
    <section aria-label="Fragrance families" className="relative">
      {/* Photos are stacked; only the active one is visible (300 ms fade). On mobile the photo sits on top. */}
      <div className="relative aspect-[4/5] bg-bottle sm:aspect-[4/3] md:absolute md:inset-0 md:aspect-auto">
        {FAMILIES.map((item, i) => (
          <img
            key={item.id}
            src={`${import.meta.env.BASE_URL}${item.image}`}
            alt=""
            loading="lazy"
            className={cn(
              'absolute inset-0 size-full object-cover transition-opacity duration-300 ease-out motion-reduce:transition-none',
              i === index ? 'opacity-100' : 'opacity-0',
            )}
          />
        ))}
      </div>

      <div className="relative mx-auto flex w-full max-w-[1440px] md:min-h-[720px] md:items-center md:justify-end md:px-(--gutter)">
        <div
          aria-live="polite"
          aria-atomic="true"
          className="-mt-12 mx-(--gutter) flex w-full flex-col items-start gap-5 bg-paper p-6 md:mx-0 md:mt-0 md:max-w-[540px] md:gap-6 md:p-12"
        >
          <p className="text-xs font-medium uppercase tracking-(--tracking-label) text-olive">
            Fragrance family
          </p>
          <h2>{family.title}</h2>

          <ul className="flex flex-wrap gap-2">
            {family.notes.map((note) => (
              <li
                key={note}
                className="border border-ink px-2.5 py-1.5 text-xs font-medium uppercase leading-none tracking-(--tracking-label)"
              >
                {note}
              </li>
            ))}
          </ul>

          <p className="text-base md:text-lg">{family.blurb}</p>

          <button
            type="button"
            onClick={() => setIndex((current) => (current + 1) % FAMILIES.length)}
            className="cursor-pointer border border-ink bg-ink px-5 py-2.5 text-base uppercase tracking-(--tracking-label) text-paper transition-colors duration-150 hover:bg-paper hover:text-ink"
          >
            Explore other families
          </button>

          <Link
            to={`/catalog?family=${family.id}`}
            className="text-xs font-semibold uppercase tracking-(--tracking-label) underline underline-offset-4"
          >
            Shop {family.title}
            {count === undefined ? '' : ` (${count})`}
          </Link>

          {/* four clickable dashes instead of tabs */}
          <div role="group" aria-label="Choose a fragrance family" className="flex gap-2 pt-1">
            {FAMILIES.map((item, i) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Show ${item.title}`}
                aria-current={i === index ? 'true' : undefined}
                className="group flex h-6 w-10 cursor-pointer items-center"
              >
                <span
                  className={cn(
                    'h-0.5 w-full transition-colors duration-150',
                    i === index ? 'bg-ink' : 'bg-ink/20 group-hover:bg-ink/50',
                  )}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
