import { useId } from 'react'
import { formatPrice } from '../../../lib/formatPrice'
import type { ProductSize, SizeMl } from '../types'

interface SizeSelectorProps {
  sizes: ProductSize[]
  value: SizeMl
  onChange: (size: SizeMl) => void
}

/**
 * Three square buttons (10 / 50 / 100 mL). Built as radio buttons, so the arrow keys move between
 * sizes and screen readers know it is one choice. A size that is out of stock is disabled and crossed out.
 */
export default function SizeSelector({ sizes, value, onChange }: SizeSelectorProps) {
  const name = useId()

  return (
    <fieldset>
      <legend className="mb-3 text-xs font-medium uppercase tracking-label">Size</legend>
      <div className="grid grid-cols-3 gap-2">
        {sizes.map((size) => (
          <label key={size.ml} className="block">
            <input
              type="radio"
              name={name}
              value={size.ml}
              checked={size.ml === value}
              disabled={!size.inStock}
              onChange={() => onChange(size.ml)}
              className="peer sr-only"
            />
            <span className="flex cursor-pointer flex-col items-center gap-0.5 border border-ink px-2 py-3 text-center uppercase tracking-label transition-colors duration-150 hover:bg-ink/5 peer-checked:bg-ink peer-checked:text-paper peer-checked:hover:bg-ink peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ink peer-disabled:cursor-not-allowed peer-disabled:line-through peer-disabled:opacity-40 peer-disabled:hover:bg-transparent">
              <span className="text-base">{size.ml} mL</span>
              <span className="text-xs">{formatPrice(size.price)}</span>
              {size.inStock ? null : <span className="sr-only">(sold out)</span>}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  )
}
