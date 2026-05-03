import type { DoomContentMode } from '../../../../packages/doom-adapter/src/types.js'
import { decodeSessionClaims } from '../../../../packages/doom-session/src/decode.js'

export interface SessionBootstrap {
  bootstrapSource: 'query-string-fallback' | 'signed-token-local'
  sessionToken: string
  contentMode: DoomContentMode
  contentPath?: string
  signedToken?: string
}

export async function bootstrapSessionFromLaunchUrl(launchUrl: string): Promise<SessionBootstrap> {
  const url = new URL(launchUrl)
  const signedToken = url.searchParams.get('token')?.trim()

  if (!signedToken) {
    throw new Error('launch_url is missing a signed token')
  }

  const claims = decodeSessionClaims(signedToken)
  return {
    sessionToken: claims.sessionId,
    contentMode: claims.contentMode,
    contentPath: claims.contentPath,
    signedToken,
    bootstrapSource: 'signed-token-local',
  }
}

export async function bootstrapSessionFromLocation(locationLike: Location): Promise<SessionBootstrap> {
  const url = new URL(locationLike.href)
  const signedToken = url.searchParams.get('token')?.trim()

  if (signedToken) {
    return bootstrapSessionFromLaunchUrl(url.href)
  }

  const sessionToken = url.searchParams.get('session')?.trim() || 'demo123'
  const contentPath = url.searchParams.get('content')?.trim() || undefined
  const contentMode = (url.searchParams.get('mode')?.trim() as DoomContentMode | null) || 'freedoom-phase1'

  return {
    sessionToken,
    contentMode,
    contentPath,
    bootstrapSource: 'query-string-fallback',
  }
}
