import { cn } from '../../../lib/cn'
import { FAMILIES } from '../families'
import type { ScentFamily } from '../types'

interface FiltersProps {
  value: ScentFamily | null
  onChange: (family: ScentFamily | null) => void
}

const options: { id: ScentFamily | null; label: string }[] = [
  { id: null, label: 'All' },
  ...FAMILIES.map((family) => ({ id: family.id, label: family.title })),
]

/** Scent family filter, as uppercase text links. */
export default function Filters({ value, onChange }: FiltersProps) {
  return (
    <nav aria-label="Scent family">
      <ul className="flex flex-wrap gap-x-6 gap-y-2">
        {options.map(({ id, label }) => {
          const active = id === value
          return (
            <li key={label}>
              <button
                type="button"
                onClick={() => onChange(id)}
                aria-pressed={active}
                className={cn(
                  'cursor-pointer py-1 text-xs font-semibold uppercase tracking-(--tracking-label) underline-offset-4 hover:underline',
                  active ? 'underline' : 'text-ink/60 hover:text-ink',
                )}
              >
                {label}
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
