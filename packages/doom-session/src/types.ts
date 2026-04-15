import type { DoomContentMode } from '../../doom-adapter/src/types.js'

export interface DoomSessionClaims {
  sessionId: string
  contentMode: DoomContentMode
  contentPath?: string
  issuedAt: string
  expiresAt: string
  issuer: string
}

export interface DoomLaunchUrlOptions {
  origin: string
  playPath?: string
  token: string
}
