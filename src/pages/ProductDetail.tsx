import { useParams } from 'react-router-dom'
import ProductDetailView from '../features/products/components/ProductDetail'

export default function ProductDetail() {
  const { slug } = useParams()
  return <ProductDetailView slug={slug} />
}
