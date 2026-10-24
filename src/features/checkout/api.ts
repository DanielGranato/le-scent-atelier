export interface CepAddress {
  street: string
  neighborhood: string
  city: string
  state: string
}

export type CepResult =
  | { ok: true; address: CepAddress }
  | { ok: false; reason: 'notFound' | 'error' | 'aborted'; message: string }

const text = (value: unknown) => (typeof value === 'string' ? value : '')

/**
 * Looks up a Brazilian postal code (8 digits) on the public ViaCEP service. It never throws: every problem
 * comes back as { ok: false }, so the person can always fill the address in by hand.
 */
export async function lookupCep(cep: string, signal?: AbortSignal): Promise<CepResult> {
  try {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`, { signal })
    if (!response.ok) throw new Error(`ViaCEP answered ${response.status}`)
    const data: unknown = await response.json()
    if (typeof data !== 'object' || data === null) throw new Error('Unexpected answer')

    const body = data as Record<string, unknown>
    // ViaCEP answers 200 with { "erro": true } when the CEP does not exist
    if (body.erro === true || body.erro === 'true') {
      return { ok: false, reason: 'notFound', message: 'CEP not found' }
    }
    return {
      ok: true,
      address: {
        street: text(body.logradouro),
        neighborhood: text(body.bairro),
        city: text(body.localidade),
        state: text(body.uf),
      },
    }
  } catch (error) {
    if (signal?.aborted || (error instanceof DOMException && error.name === 'AbortError')) {
      return { ok: false, reason: 'aborted', message: 'Search cancelled' }
    }
    return { ok: false, reason: 'error', message: 'Could not search the CEP. Fill the address manually.' }
  }
}
