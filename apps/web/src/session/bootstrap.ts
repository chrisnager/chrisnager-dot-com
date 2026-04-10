import type { DoomContentMode } from '../../../../packages/doom-adapter/src/types.js'

export interface SessionBootstrap {
  sessionToken: string
  contentMode: DoomContentMode
  contentPath?: string
}

export function bootstrapSessionFromLocation(locationLike: Location): SessionBootstrap {
  const url = new URL(locationLike.href)
  const sessionToken = url.searchParams.get('session')?.trim() || 'demo123'
  const contentPath = url.searchParams.get('content')?.trim() || undefined
  const contentMode = (url.searchParams.get('mode')?.trim() as DoomContentMode | null) || 'freedoom-phase1'

  return {
    sessionToken,
    contentMode,
    contentPath,
  }
}
