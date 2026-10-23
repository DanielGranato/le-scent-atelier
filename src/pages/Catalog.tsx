import CatalogBrowser from '../features/products/components/CatalogBrowser'

export default function Catalog() {
  return (
    <main className="flex flex-1 flex-col gap-12 md:gap-8 py-(--section-y)">
      <header className="mx-auto w-full max-w-[1440px] px-(--gutter)">
        <h1>Perfume</h1>
      </header>
      <CatalogBrowser />
    </main>
  )
}
