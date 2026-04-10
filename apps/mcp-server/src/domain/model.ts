import type { DoomContentMode } from '../../../../packages/doom-adapter/src/types.js'

export interface DoomSessionRecord {
  id: string
  contentMode: DoomContentMode
  contentPath?: string
  createdAt: string
  expiresAt: string
  saveNamespace: string
  metadata: Record<string, string>
}

export interface DoomSaveRecord {
  sessionId: string
  slot: string
  savedAt: string
  saveDataBase64?: string
  screenshotDataUrl?: string
  metadata: Record<string, string>
}
