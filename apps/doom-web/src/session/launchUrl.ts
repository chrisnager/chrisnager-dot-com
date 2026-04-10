import type { DoomContentMode } from '../../../../packages/doom-adapter/src/types.js'
import { buildDoomPath } from './basePath.js'

interface LaunchUrlOptions {
  origin?: string
  sessionToken: string
  contentMode?: DoomContentMode
  contentPath?: string
}

export function buildLaunchUrl(options: LaunchUrlOptions): string {
  const url = new URL(buildDoomPath('/play'), options.origin || window.location.origin)

  url.searchParams.set('session', options.sessionToken)

  if (options.contentMode) {
    url.searchParams.set('mode', options.contentMode)
  }

  if (options.contentPath) {
    url.searchParams.set('content', options.contentPath)
  }

  return `${url.pathname}${url.search}`
}
