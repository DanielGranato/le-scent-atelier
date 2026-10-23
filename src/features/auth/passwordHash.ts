/**
 * SHA-256 of "email:password", as hex (Web Crypto).
 *
 * MOCK ONLY, NOT REAL SECURITY. A fast hash with no secret, stored in the browser, protects nothing:
 * anyone with access to the browser can read and try it. It is here only so the demo never keeps a
 * password as plain text. A real site must hash passwords on a server with a slow algorithm
 * (bcrypt, scrypt or Argon2), with a random salt per user.
 */
export async function hashPassword(email: string, password: string): Promise<string> {
  const bytes = new TextEncoder().encode(`${email}:${password}`)
  const digest = await crypto.subtle.digest('SHA-256', bytes)
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, '0')).join('')
}
