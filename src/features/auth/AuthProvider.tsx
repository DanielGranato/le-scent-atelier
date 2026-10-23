import { useCallback, useEffect, useMemo, useRef, type ReactNode } from 'react'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { AuthContext } from './authContext'
import { hashPassword } from './passwordHash'
import type { AuthContextValue, AuthResult, RegisterInput, SessionUser, StoredUser } from './types'

/**
 * MOCK authentication, kept in localStorage. There is no server and NOT real security: see passwordHash.ts.
 * "lsa:users" is the list of accounts (with hashed passwords), "lsa:session" is who is signed in (name and email only).
 */
const USERS_KEY = 'lsa:users'
const SESSION_KEY = 'lsa:session'

// A fictional demo account, shown as a hint under the login form.
const DEMO = { name: 'Demo Customer', email: 'demo@lescentatelier.test', password: 'scent1234' }

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
const normalizeEmail = (email: string) => email.trim().toLowerCase()

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [, setUsers, readUsers] = useLocalStorage<StoredUser[]>(USERS_KEY, [])
  const [user, setUser] = useLocalStorage<SessionUser | null>(SESSION_KEY, null)
  const seeding = useRef<Promise<void> | null>(null)

  // Adds the demo account once (hashing is async, so it cannot be a plain initial value).
  const ensureDemoAccount = useCallback((): Promise<void> => {
    seeding.current ??= (async () => {
      if (readUsers().some((account) => account.email === DEMO.email)) return
      const passwordHash = await hashPassword(DEMO.email, DEMO.password)
      setUsers((previous) =>
        previous.some((account) => account.email === DEMO.email)
          ? previous
          : [...previous, { name: DEMO.name, email: DEMO.email, passwordHash }],
      )
    })()
    return seeding.current
  }, [readUsers, setUsers])

  useEffect(() => {
    void ensureDemoAccount()
  }, [ensureDemoAccount])

  const login = useCallback(
    async (email: string, password: string): Promise<AuthResult> => {
      await wait(500) // short simulated delay, like a real request
      await ensureDemoAccount()
      const address = normalizeEmail(email)
      const account = readUsers().find((candidate) => candidate.email === address)
      const passwordHash = await hashPassword(address, password) // hashed even if the email is unknown

      if (!account || account.passwordHash !== passwordHash) {
        return { ok: false, error: 'Email or password is incorrect' }
      }
      setUser({ name: account.name, email: account.email })
      return { ok: true }
    },
    [ensureDemoAccount, readUsers, setUser],
  )

  const register = useCallback(
    async ({ name, email, password }: RegisterInput): Promise<AuthResult> => {
      await wait(500)
      await ensureDemoAccount()
      const address = normalizeEmail(email)

      if (readUsers().some((account) => account.email === address)) {
        return { ok: false, error: 'This email is already registered' }
      }
      const passwordHash = await hashPassword(address, password)
      const person = { name: name.trim(), email: address }
      setUsers((previous) => [...previous, { ...person, passwordHash }])
      setUser(person)
      return { ok: true }
    },
    [ensureDemoAccount, readUsers, setUser, setUsers],
  )

  const logout = useCallback(() => setUser(null), [setUser])

  const value = useMemo<AuthContextValue>(
    () => ({ user, login, register, logout }),
    [user, login, register, logout],
  )

  return <AuthContext value={value}>{children}</AuthContext>
}
