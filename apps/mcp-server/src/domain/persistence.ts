import type { DoomSaveRecord, DoomSessionRecord } from './model.js'

export interface DoomPersistence {
  createSession(session: DoomSessionRecord): Promise<void>
  getSession(sessionId: string): Promise<DoomSessionRecord | null>
  saveGame(save: DoomSaveRecord): Promise<void>
  loadGame(sessionId: string, slot: string): Promise<DoomSaveRecord | null>
  getLatestScreenshot(sessionId: string): Promise<DoomSaveRecord | null>
}
