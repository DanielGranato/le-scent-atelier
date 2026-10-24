import { useEffect, useState } from 'react'
import { lookupCep, type CepAddress } from '../api'

export type CepStatus = 'idle' | 'loading' | 'found' | 'notFound' | 'error'

interface Settled {
  cep: string
  status: 'found' | 'notFound' | 'error'
  address: CepAddress | null
}

/**
 * Searches the address of a CEP as soon as it has 8 digits. If the CEP changes while a search is running,
 * that search is cancelled and its answer is ignored.
 * `status` is worked out from the CEP and the last answer, so nothing is set synchronously inside the effect.
 */
export function useCepLookup(digits: string): { status: CepStatus; address: CepAddress | null } {
  const [settled, setSettled] = useState<Settled | null>(null)

  useEffect(() => {
    if (digits.length !== 8) return undefined
    const controller = new AbortController()
    void lookupCep(digits, controller.signal).then((result) => {
      if (controller.signal.aborted) return // a newer CEP took over
      setSettled(
        result.ok
          ? { cep: digits, status: 'found', address: result.address }
          : { cep: digits, status: result.reason === 'notFound' ? 'notFound' : 'error', address: null },
      )
    })
    return () => controller.abort()
  }, [digits])

  if (digits.length !== 8) return { status: 'idle', address: null }
  if (settled?.cep !== digits) return { status: 'loading', address: null }
  return { status: settled.status, address: settled.address }
}
