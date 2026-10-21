import products from '../mocks/products.json'

// Mock "server": each resource maps to a local JSON file.
// To use a real API later, replace the body of `get` with a fetch call; callers stay the same.
const mocks: Record<string, unknown> = {
  '/products': products,
}

export async function get<T>(resource: string): Promise<T> {
  if (!(resource in mocks)) throw new Error(`Unknown resource: ${resource}`)
  return structuredClone(mocks[resource]) as T
}
