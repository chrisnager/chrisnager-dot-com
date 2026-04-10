import { MemoryDoomPersistence } from './memoryPersistence.js'
import { NetlifyBlobsDoomPersistence } from './netlifyBlobsPersistence.js'

export function createDoomPersistence(env: NodeJS.ProcessEnv = process.env) {
  const configuredBackend = env.DOOM_PERSISTENCE_BACKEND?.trim()

  if (configuredBackend === 'memory') {
    return new MemoryDoomPersistence()
  }

  if (configuredBackend === 'netlify-blobs') {
    return new NetlifyBlobsDoomPersistence()
  }

  if (env.NETLIFY || env.NETLIFY_LOCAL || env.BRANCH || env.CONTEXT) {
    return new NetlifyBlobsDoomPersistence()
  }

  return new MemoryDoomPersistence()
}
