import type { DoomLaunchUrlOptions } from './types.js'

export function buildSignedDoomLaunchUrl(options: DoomLaunchUrlOptions) {
  const url = new URL('/play', options.origin)
  url.searchParams.set('token', options.token)
  return url.toString()
}
