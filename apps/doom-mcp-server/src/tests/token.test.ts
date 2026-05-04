import test from 'node:test'
import assert from 'node:assert/strict'

import {
  buildSignedDoomLaunchUrl,
  createSignedSessionToken,
  decodeSignedSessionToken,
  verifySignedSessionToken,
} from '../../../../packages/doom-session/src/index.js'

test('signed token round-trips and verifies', () => {
  const token = createSignedSessionToken('secret', {
    sessionId: 'session-123',
    contentMode: 'freedoom-phase1',
    issuedAt: '2026-04-10T00:00:00.000Z',
    expiresAt: '2099-04-10T01:00:00.000Z',
    issuer: 'test-suite',
  })

  assert.equal(decodeSignedSessionToken(token).sessionId, 'session-123')
  assert.equal(verifySignedSessionToken('secret', token).sessionId, 'session-123')
})

test('expired token is rejected', () => {
  const token = createSignedSessionToken('secret', {
    sessionId: 'expired-session',
    contentMode: 'freedoom-phase1',
    issuedAt: '2026-04-10T00:00:00.000Z',
    expiresAt: '2026-04-10T00:00:01.000Z',
    issuer: 'test-suite',
  })

  assert.throws(() => verifySignedSessionToken('secret', token, new Date('2026-04-10T00:00:02.000Z')), /expired/)
})

test('launch URL supports a custom play path', () => {
  const launchUrl = buildSignedDoomLaunchUrl({
    origin: 'https://doom.example.com',
    playPath: '/play',
    token: 'abc123',
  })

  assert.equal(launchUrl, 'https://doom.example.com/play?token=abc123')
})
