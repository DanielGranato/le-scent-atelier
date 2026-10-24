import OrderConfirmationView from '../features/checkout/components/OrderConfirmationView'
import { useDocumentMeta } from '../hooks/useDocumentMeta'

export default function OrderConfirmation() {
  useDocumentMeta({ title: 'Order confirmed | Le Scent Atelier', description: 'A fictional order confirmation.' })
  return <OrderConfirmationView />
}
