import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { formatPrice } from '../../../lib/formatPrice'
import { useCart } from '../useCart'
import { lineKey, MAX_QUANTITY, MIN_QUANTITY, type CartLine } from '../types'

const stepperButton =
  'flex size-11 cursor-pointer items-center justify-center transition-colors duration-150 hover:bg-ink hover:text-paper disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-ink motion-reduce:transition-none'

interface CartLinesProps {
  lines: CartLine[]
  /** Called when a link inside the list is followed (the drawer uses it to close itself). */
  onNavigate?: () => void
}

/** The list of cart lines. Shared by the drawer and the cart page. */
export default function CartLines({ lines, onNavigate }: CartLinesProps) {
  const { setQuantity, removeItem } = useCart()
  const [message, setMessage] = useState('')
  // stays in the page when a line is removed, so keyboard focus has somewhere to go
  const rootRef = useRef<HTMLDivElement>(null)

  const change = (line: CartLine, quantity: number) => {
    setQuantity(lineKey(line.productId, line.sizeMl), quantity)
    setMessage(`${line.name}, ${line.sizeMl} mL: quantity ${quantity}`)
  }

  const remove = (line: CartLine) => {
    removeItem(lineKey(line.productId, line.sizeMl))
    setMessage(`Removed ${line.name}, ${line.sizeMl} mL`)
    rootRef.current?.focus()
  }

  return (
    <div ref={rootRef} tabIndex={-1} className="focus:outline-none">
      <p aria-live="polite" className="sr-only">
        {message}
      </p>

      <ul className="flex flex-col">
        {lines.map((line) => {
          const key = lineKey(line.productId, line.sizeMl)
          return (
            <li key={key} className="grid grid-cols-[5rem_1fr] gap-4 border-t border-ink/15 py-6 first:border-t-0 first:pt-0">
              <Link
                to={`/product/${line.slug}`}
                onClick={onNavigate}
                aria-label={line.name}
                tabIndex={-1}
                className="block aspect-[4/5] overflow-hidden bg-bottle"
              >
                <img
                  src={`${import.meta.env.BASE_URL}${line.image}`}
                  alt=""
                  loading="lazy"
                  className="size-full object-cover"
                />
              </Link>

              <div className="flex min-w-0 flex-col gap-1">
                <Link
                  to={`/product/${line.slug}`}
                  onClick={onNavigate}
                  className="text-base font-medium uppercase tracking-(--tracking-label)"
                >
                  {line.name}
                </Link>
                <p className="text-sm text-olive">
                  {line.sizeMl} mL &middot; {formatPrice(line.unitPrice)}
                </p>

                <div className="mt-3 flex items-center justify-between gap-3">
                  <div role="group" aria-label={`Quantity of ${line.name}, ${line.sizeMl} mL`} className="flex items-center border border-ink">
                    <button
                      type="button"
                      onClick={() => change(line, line.quantity - 1)}
                      disabled={line.quantity <= MIN_QUANTITY}
                      aria-label={`Decrease quantity of ${line.name}, ${line.sizeMl} mL`}
                      className={stepperButton}
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                        <path d="M2 7h10" />
                      </svg>
                    </button>
                    <span className="w-9 text-center text-base">{line.quantity}</span>
                    <button
                      type="button"
                      onClick={() => change(line, line.quantity + 1)}
                      disabled={line.quantity >= MAX_QUANTITY}
                      aria-label={`Increase quantity of ${line.name}, ${line.sizeMl} mL`}
                      className={stepperButton}
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                        <path d="M2 7h10M7 2v10" />
                      </svg>
                    </button>
                  </div>
                  <p className="text-base font-medium">{formatPrice(line.unitPrice * line.quantity)}</p>
                </div>

                <button
                  type="button"
                  onClick={() => remove(line)}
                  aria-label={`Remove ${line.name}, ${line.sizeMl} mL`}
                  className="mt-1 flex min-h-11 w-fit cursor-pointer items-center text-xs font-semibold uppercase tracking-(--tracking-label) underline underline-offset-4"
                >
                  Remove
                </button>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
