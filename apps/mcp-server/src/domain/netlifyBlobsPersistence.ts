import { getStore, type Store } from '@netlify/blobs'

import type { DoomSaveRecord, DoomSessionRecord } from './model.js'
import type { DoomPersistence } from './persistence.js'

interface DoomStoreSet {
  screenshots: Store
  saves: Store
  sessions: Store
}

function createStores(): DoomStoreSet {
  return {
    sessions: getStore('doom-sessions'),
    saves: getStore('doom-saves'),
    screenshots: getStore('doom-screenshots'),
  }
}

export class NetlifyBlobsDoomPersistence implements DoomPersistence {
  readonly kind = 'netlify-blobs' as const

  constructor(private readonly stores: DoomStoreSet = createStores()) {}

  async createSession(session: DoomSessionRecord) {
    await this.stores.sessions.setJSON(this.sessionKey(session.id), session)
  }

  async getSession(sessionId: string) {
    return (await this.stores.sessions.get(this.sessionKey(sessionId), { type: 'json' })) as DoomSessionRecord | null
  }

  async saveGame(save: DoomSaveRecord) {
    await this.stores.saves.setJSON(this.saveKey(save.sessionId, save.slot), save)

    if (save.screenshotDataUrl) {
      await this.stores.screenshots.setJSON(this.latestScreenshotKey(save.sessionId), save)
    }
  }

  async loadGame(sessionId: string, slot: string) {
    return (await this.stores.saves.get(this.saveKey(sessionId, slot), { type: 'json' })) as DoomSaveRecord | null
  }

  async getLatestScreenshot(sessionId: string) {
    return (await this.stores.screenshots.get(this.latestScreenshotKey(sessionId), {
      type: 'json',
    })) as DoomSaveRecord | null
  }

  private latestScreenshotKey(sessionId: string) {
    return `screenshots/${sessionId}/latest.json`
  }

  private saveKey(sessionId: string, slot: string) {
    return `saves/${sessionId}/${slot}.json`
  }

  private sessionKey(sessionId: string) {
    return `sessions/${sessionId}.json`
  }
}
