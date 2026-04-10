import { createHmac, timingSafeEqual } from 'node:crypto'

import type { DoomSessionClaims } from './types.js'

interface TokenHeader {
  alg: 'HS256'
  typ: 'DOOM_SESSION'
}

function toBase64Url(value: Buffer | string) {
  return Buffer.from(value)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '')
}

function fromBase64Url(value: string) {
  const normalized = value.replace(/-/g, '+').replace(/_/g, '/')
  const padded = normalized + '='.repeat((4 - (normalized.length % 4 || 4)) % 4)
  return Buffer.from(padded, 'base64')
}

function signInput(secret: string, input: string) {
  return createHmac('sha256', secret).update(input).digest()
}

export function createSignedSessionToken(secret: string, claims: DoomSessionClaims) {
  const header: TokenHeader = {
    alg: 'HS256',
    typ: 'DOOM_SESSION',
  }

  const encodedHeader = toBase64Url(JSON.stringify(header))
  const encodedPayload = toBase64Url(JSON.stringify(claims))
  const signingInput = `${encodedHeader}.${encodedPayload}`
  const signature = toBase64Url(signInput(secret, signingInput))

  return `${signingInput}.${signature}`
}

export function decodeSignedSessionToken(token: string) {
  const parts = token.split('.')

  if (parts.length !== 3) {
    throw new Error('Malformed session token')
  }

  const payload = JSON.parse(fromBase64Url(parts[1]).toString('utf8')) as DoomSessionClaims
  return payload
}

export function verifySignedSessionToken(secret: string, token: string, now = new Date()) {
  const parts = token.split('.')

  if (parts.length !== 3) {
    throw new Error('Malformed session token')
  }

  const [encodedHeader, encodedPayload, encodedSignature] = parts
  const expectedSignature = signInput(secret, `${encodedHeader}.${encodedPayload}`)
  const actualSignature = fromBase64Url(encodedSignature)

  if (expectedSignature.length !== actualSignature.length || !timingSafeEqual(expectedSignature, actualSignature)) {
    throw new Error('Invalid session token signature')
  }

  const header = JSON.parse(fromBase64Url(encodedHeader).toString('utf8')) as TokenHeader
  if (header.alg !== 'HS256' || header.typ !== 'DOOM_SESSION') {
    throw new Error('Unsupported session token header')
  }

  const claims = JSON.parse(fromBase64Url(encodedPayload).toString('utf8')) as DoomSessionClaims

  if (Number.isNaN(Date.parse(claims.expiresAt)) || Date.parse(claims.expiresAt) <= now.getTime()) {
    throw new Error('Session token has expired')
  }

  return claims
}
