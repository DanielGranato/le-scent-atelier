/**
 * Where to go after signing in: the page the person came from (`location.state.from`, a path like
 * "/catalog?family=woody"), or the Home page. Login and register themselves never count as "from".
 */
export function getReturnPath(state: unknown): string {
  if (typeof state === 'object' && state !== null && 'from' in state) {
    const from = (state as { from: unknown }).from
    if (typeof from === 'string' && from.startsWith('/') && !/^\/(login|register)(\/|\?|$)/.test(from)) {
      return from
    }
  }
  return '/'
}
