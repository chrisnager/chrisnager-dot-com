import { bootstrapSessionFromLocation } from '../session/bootstrap.js'
import type { SessionBootstrap } from '../session/bootstrap.js'

export type AppRoute =
  | {
      type: 'landing'
    }
  | {
      type: 'play'
      session: SessionBootstrap
    }

export function createRouter() {
  return {
    async getCurrentRoute(): Promise<AppRoute> {
      const normalizedPathname =
        window.location.pathname.length > 1 ? window.location.pathname.replace(/\/+$/, '') : window.location.pathname

      if (normalizedPathname === '/play' || normalizedPathname === '/doom/play') {
        return {
          type: 'play',
          session: await bootstrapSessionFromLocation(window.location),
        }
      }

      return {
        type: 'landing',
      }
    },
  }
}
