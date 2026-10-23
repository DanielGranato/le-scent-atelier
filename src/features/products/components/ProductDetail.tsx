import ButtonLink from '../../../components/ui/ButtonLink'
import { useProduct } from '../hooks/useProduct'
import ProductView from './ProductView'

/** Loads the perfume for a slug and shows it, or says it could not be found. */
export default function ProductDetail({ slug }: { slug: string | undefined }) {
  const state = useProduct(slug)

  if (state.status === 'loading') return <main className="flex-1" aria-busy="true" />

  if (state.status === 'ready') {
    // key: another perfume starts with a fresh size and no leftover messages
    return <ProductView key={state.product.id} product={state.product} />
  }

  return (
    <main className="mx-auto flex w-full max-w-[480px] flex-1 flex-col items-start justify-center gap-6 px-(--gutter) py-(--section-y)">
      <h1>{state.status === 'error' ? 'Something went wrong' : 'We could not find this perfume'}</h1>
      <p className="text-lg">
        {state.status === 'error'
          ? 'The perfume could not be loaded. Please try again.'
          : 'Maybe it was a limited run. The others are all in the catalog.'}
      </p>
      <ButtonLink to="/catalog">See all perfumes</ButtonLink>
    </main>
  )
}
