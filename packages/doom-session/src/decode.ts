import type { DoomSessionClaims } from './types.js'

function decodeBase64Url(value: string) {
  const normalized = value.replace(/-/g, '+').replace(/_/g, '/')
  const padded = normalized + '='.repeat((4 - (normalized.length % 4 || 4)) % 4)

  if (typeof window !== 'undefined' && typeof window.atob === 'function') {
    return window.atob(padded)
  }

  return Buffer.from(padded, 'base64').toString('binary')
}

export function decodeSessionClaims(token: string) {
  const parts = token.split('.')

  if (parts.length !== 3) {
    throw new Error('Malformed session token')
  }

  const payload = decodeBase64Url(parts[1])
  const bytes = Uint8Array.from(payload, (character) => character.charCodeAt(0))

  return JSON.parse(new TextDecoder().decode(bytes)) as DoomSessionClaims
}
