/** What is kept about the signed-in person. Never the password. */
export interface SessionUser {
  name: string
  email: string
}

/** A mock account in the "users" list. The password is a hash, never plain text (mock only). */
export interface StoredUser extends SessionUser {
  passwordHash: string
}

export type AuthResult = { ok: true } | { ok: false; error: string }

export interface RegisterInput {
  name: string
  email: string
  password: string
}

export interface AuthContextValue {
  user: SessionUser | null
  login: (email: string, password: string) => Promise<AuthResult>
  register: (input: RegisterInput) => Promise<AuthResult>
  logout: () => void
}
