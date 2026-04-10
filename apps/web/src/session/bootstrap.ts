import type { DoomContentMode } from '../../../../packages/doom-adapter/src/types.js'
import { decodeSessionClaims } from '../../../../packages/doom-session/src/decode.js'

export interface SessionBootstrap {
  sessionToken: string
  contentMode: DoomContentMode
  contentPath?: string
  signedToken?: string
}

export function bootstrapSessionFromLocation(locationLike: Location): SessionBootstrap {
  const url = new URL(locationLike.href)
  const signedToken = url.searchParams.get('token')?.trim()

  if (signedToken) {
    const claims = decodeSessionClaims(signedToken)

    // The static browser shell only decodes claims for client bootstrapping.
    // Server-side APIs must verify signatures before trusting the token.
    return {
      sessionToken: claims.sessionId,
      contentMode: claims.contentMode,
      contentPath: claims.contentPath,
      signedToken,
    }
  }

  const sessionToken = url.searchParams.get('session')?.trim() || 'demo123'
  const contentPath = url.searchParams.get('content')?.trim() || undefined
  const contentMode = (url.searchParams.get('mode')?.trim() as DoomContentMode | null) || 'freedoom-phase1'

  return {
    sessionToken,
    contentMode,
    contentPath,
  }
}
