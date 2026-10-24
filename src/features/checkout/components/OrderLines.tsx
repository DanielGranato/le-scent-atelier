import type { CartLine } from '../../cart/types'
import { formatPrice } from '../../../lib/formatPrice'

/** Read-only list of the lines of an order: thumbnail, name, size, quantity and line total. */
export default function OrderLines({ lines }: { lines: CartLine[] }) {
  return (
    <ul className="flex flex-col">
      {lines.map((line) => (
        <li
          key={`${line.productId}:${line.sizeMl}`}
          className="grid grid-cols-[4rem_1fr_auto] items-center gap-4 border-t border-ink/15 py-4 first:border-t-0 first:pt-0"
        >
          <div className="aspect-[4/5] overflow-hidden bg-bottle">
            <img src={`${import.meta.env.BASE_URL}${line.image}`} alt="" className="size-full object-cover" />
          </div>
          <div className="flex min-w-0 flex-col gap-1">
            <p className="text-base font-medium uppercase tracking-(--tracking-label)">{line.name}</p>
            <p className="text-sm text-olive">
              {line.sizeMl} mL &middot; Qty {line.quantity}
            </p>
          </div>
          <p className="text-base">{formatPrice(line.unitPrice * line.quantity)}</p>
        </li>
      ))}
    </ul>
  )
}
