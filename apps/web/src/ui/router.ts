import { bootstrapSessionFromLocation } from '../session/bootstrap.js'

export type AppRoute =
  | {
      type: 'landing'
    }
  | {
      type: 'play'
      session: ReturnType<typeof bootstrapSessionFromLocation>
    }

export function createRouter() {
  return {
    getCurrentRoute(): AppRoute {
      if (window.location.pathname === '/play') {
        return {
          type: 'play',
          session: bootstrapSessionFromLocation(window.location),
        }
      }

      return {
        type: 'landing',
      }
    },
  }
}
