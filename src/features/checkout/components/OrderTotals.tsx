import { formatPrice } from '../../../lib/formatPrice'

interface OrderTotalsProps {
  subtotal: number
  shipping: number
  total: number
}

/** Subtotal, shipping and the total, which is the soft gold highlight of the page. */
export default function OrderTotals({ subtotal, shipping, total }: OrderTotalsProps) {
  return (
    <dl className="flex flex-col gap-3 border-t border-ink/15 pt-4 text-base">
      <div className="flex justify-between gap-4">
        <dt className="text-olive">Subtotal</dt>
        <dd>{formatPrice(subtotal)}</dd>
      </div>
      <div className="flex justify-between gap-4">
        <dt className="text-olive">Shipping</dt>
        <dd>{shipping === 0 ? 'Free' : formatPrice(shipping)}</dd>
      </div>
      <div className="flex items-baseline justify-between gap-4 border-t border-ink/15 pt-4">
        <dt className="text-xs font-medium uppercase tracking-(--tracking-label)">Total</dt>
        <dd className="text-3xl font-medium text-(color:--gold)">{formatPrice(total)}</dd>
      </div>
    </dl>
  )
}
