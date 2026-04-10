import type { DoomPersistence } from './persistence.js'
import type { DoomSaveRecord, DoomSessionRecord } from './model.js'

export class MemoryDoomPersistence implements DoomPersistence {
  private readonly sessions = new Map<string, DoomSessionRecord>()
  private readonly saves = new Map<string, DoomSaveRecord>()

  async createSession(session: DoomSessionRecord) {
    this.sessions.set(session.id, session)
  }

  async getSession(sessionId: string) {
    return this.sessions.get(sessionId) ?? null
  }

  async saveGame(save: DoomSaveRecord) {
    this.saves.set(`${save.sessionId}:${save.slot}`, save)
  }

  async loadGame(sessionId: string, slot: string) {
    return this.saves.get(`${sessionId}:${slot}`) ?? null
  }

  async getLatestScreenshot(sessionId: string) {
    const candidates = [...this.saves.values()]
      .filter((save) => save.sessionId === sessionId && save.screenshotDataUrl)
      .sort((left, right) => right.savedAt.localeCompare(left.savedAt))

    return candidates[0] ?? null
  }
}
