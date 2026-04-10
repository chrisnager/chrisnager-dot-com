import type { DoomSaveSnapshot } from '../../../../packages/doom-adapter/src/types.js'

export interface SaveApi {
  save(snapshot: DoomSaveSnapshot): Promise<void>
  load(slot: string): Promise<DoomSaveSnapshot | null>
}

export function createBrowserSaveApi(sessionToken: string): SaveApi {
  const prefix = `doom-mcp-session:${sessionToken}:slot:`

  return {
    async save(snapshot) {
      window.localStorage.setItem(`${prefix}${snapshot.slot}`, JSON.stringify(snapshot))
    },
    async load(slot) {
      const rawValue = window.localStorage.getItem(`${prefix}${slot}`)

      if (!rawValue) {
        return null
      }

      return JSON.parse(rawValue) as DoomSaveSnapshot
    },
  }
}
