import CheckoutView from '../features/checkout/components/CheckoutView'
import { useDocumentMeta } from '../hooks/useDocumentMeta'

export default function Checkout() {
  useDocumentMeta({ title: 'Checkout | Le Scent Atelier', description: 'A fictional checkout. Nothing is sold or shipped.' })
  return <CheckoutView />
}
