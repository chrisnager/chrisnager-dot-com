import type { DoomContentMode } from '../../../../packages/doom-adapter/src/types.js'
import { decodeSessionClaims } from '../../../../packages/doom-session/src/decode.js'
import { buildDoomPath } from './basePath.js'

export interface SessionBootstrap {
  bootstrapSource: 'query-string-fallback' | 'signed-token-local' | 'verified-api'
  sessionToken: string
  contentMode: DoomContentMode
  contentPath?: string
  signedToken?: string
}

interface LaunchBootstrapOptions {
  preferVerifiedBootstrap?: boolean
}

async function fetchVerifiedBootstrap(locationLike: Location, signedToken: string): Promise<SessionBootstrap | null> {
  try {
    const url = new URL(buildDoomPath('/api/doom-session-bootstrap', locationLike.pathname), locationLike.origin)
    url.searchParams.set('token', signedToken)

    const response = await fetch(url, {
      headers: {
        accept: 'application/json',
      },
    })

    if (!response.ok) {
      return null
    }

    const payload = (await response.json()) as {
      contentMode: DoomContentMode
      contentPath?: string
      sessionToken: string
      signedToken: string
    }

    return {
      sessionToken: payload.sessionToken,
      contentMode: payload.contentMode,
      contentPath: payload.contentPath,
      signedToken: payload.signedToken,
      bootstrapSource: 'verified-api',
    }
  } catch {
    return null
  }
}

export async function bootstrapSessionFromLaunchUrl(launchUrl: string, options: LaunchBootstrapOptions = {}): Promise<SessionBootstrap> {
  const url = new URL(launchUrl)
  const signedToken = url.searchParams.get('token')?.trim()

  if (!signedToken) {
    throw new Error('launch_url is missing a signed token')
  }

  const claims = decodeSessionClaims(signedToken)
  const localBootstrap: SessionBootstrap = {
    sessionToken: claims.sessionId,
    contentMode: claims.contentMode,
    contentPath: claims.contentPath,
    signedToken,
    bootstrapSource: 'signed-token-local',
  }

  if (!options.preferVerifiedBootstrap) {
    return localBootstrap
  }

  const fakeLocation = {
    href: url.href,
    origin: url.origin,
    pathname: url.pathname,
  } as Location

  const verifiedBootstrap = await fetchVerifiedBootstrap(fakeLocation, signedToken)
  return verifiedBootstrap || localBootstrap
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
