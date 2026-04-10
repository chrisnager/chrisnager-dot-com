import { verifySignedSessionToken } from '../../../../packages/doom-session/src/token.js'
import type { DoomContentMode } from '../../../../packages/doom-adapter/src/types.js'
import type { DoomPersistence } from '../domain/persistence.js'
import type { DoomMcpConfig } from '../config.js'

export interface VerifiedSessionBootstrap {
  bootstrapSource: 'verified-api'
  contentMode: DoomContentMode
  contentPath?: string
  expiresAt: string
  saveNamespace: string
  sessionToken: string
  signedToken: string
}

export async function resolveVerifiedSessionBootstrap(
  token: string,
  persistence: DoomPersistence,
  config: DoomMcpConfig,
): Promise<VerifiedSessionBootstrap> {
  const claims = verifySignedSessionToken(config.tokenSecret, token)
  const session = await persistence.getSession(claims.sessionId)

  if (!session) {
    throw new Error(`Session not found: ${claims.sessionId}`)
  }

  if (Date.parse(session.expiresAt) <= Date.now()) {
    throw new Error(`Session expired: ${claims.sessionId}`)
  }

  return {
    sessionToken: session.id,
    contentMode: session.contentMode,
    contentPath: session.contentPath,
    signedToken: token,
    saveNamespace: session.saveNamespace,
    expiresAt: session.expiresAt,
    bootstrapSource: 'verified-api',
  }
}
