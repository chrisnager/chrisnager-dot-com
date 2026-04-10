import type { DoomContentMode } from '../../doom-adapter/src/types.js'

export interface DoomSessionClaims {
  sessionId: string
  contentMode: DoomContentMode
  contentPath?: string
  saveNamespace: string
  issuedAt: string
  expiresAt: string
  issuer: string
}

export interface DoomLaunchUrlOptions {
  origin: string
  token: string
}
