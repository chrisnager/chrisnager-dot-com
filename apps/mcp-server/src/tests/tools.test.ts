import test from 'node:test'
import assert from 'node:assert/strict'

import { MemoryDoomPersistence } from '../domain/memoryPersistence.js'
import { handleDoomToolCall } from '../mcp/tools.js'
import { resolveVerifiedSessionBootstrap } from '../session/bootstrap.js'

const config = {
  host: '127.0.0.1',
  port: 8787,
  publicBaseUrl: 'https://mcp.example.com',
  tokenSecret: 'test-secret',
  defaultWebOrigin: 'https://doom.example.com',
  playPath: '/play',
  bootstrapPath: '/api/doom-session-bootstrap',
  defaultSessionTtlSeconds: 3600,
  issuer: 'test-suite',
}

test('create_doom_session returns a signed launch URL', async () => {
  const persistence = new MemoryDoomPersistence()
  const result = await handleDoomToolCall(
    'create_doom_session',
    {
      host_origin: 'https://doom.example.com',
    },
    persistence,
    config,
  )

  const structured = result.structuredContent as Record<string, unknown>
  assert.equal(typeof structured.session_id, 'string')
  assert.match(structured.launch_url as string, /^https:\/\/doom\.example\.com\/play\?token=/)
  assert.equal(structured.persistence, 'memory-stub')
})

test('verified bootstrap loads the persisted session after token verification', async () => {
  const persistence = new MemoryDoomPersistence()
  const createResult = await handleDoomToolCall(
    'create_doom_session',
    {
      host_origin: 'https://doom.example.com',
    },
    persistence,
    config,
  )

  const structured = createResult.structuredContent as Record<string, string>
  const bootstrap = await resolveVerifiedSessionBootstrap(structured.signed_token, persistence, config)

  assert.equal(bootstrap.sessionToken, structured.session_id)
  assert.equal(bootstrap.bootstrapSource, 'verified-api')
})

test('save and load round-trip through stub persistence', async () => {
  const persistence = new MemoryDoomPersistence()
  const createResult = await handleDoomToolCall(
    'create_doom_session',
    {
      host_origin: 'https://doom.example.com',
    },
    persistence,
    config,
  )

  const sessionId = (createResult.structuredContent as Record<string, string>).session_id

  await handleDoomToolCall(
    'save_doom_game',
    {
      session_id: sessionId,
      slot: 'slot-a',
      save_data_base64: 'c2F2ZS1ieXRlcw==',
      screenshot_data_url: 'data:image/png;base64,abc123',
    },
    persistence,
    config,
  )

  const loadResult = await handleDoomToolCall(
    'load_doom_game',
    {
      session_id: sessionId,
      slot: 'slot-a',
    },
    persistence,
    config,
  )

  const structured = loadResult.structuredContent as Record<string, unknown>
  assert.equal(structured.found, true)
  assert.equal(structured.save_data_base64, 'c2F2ZS1ieXRlcw==')
})

test('invalid tool input is rejected', async () => {
  const persistence = new MemoryDoomPersistence()

  await assert.rejects(
    () =>
      handleDoomToolCall(
        'create_doom_session',
        {
          host_origin: 'not-a-url',
        },
        persistence,
        config,
      ),
    /Invalid arguments/,
  )
})
