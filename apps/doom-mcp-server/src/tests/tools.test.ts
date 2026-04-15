import test from 'node:test'
import assert from 'node:assert/strict'

import { handleDoomToolCall } from '../mcp/tools.js'
import { decodeSignedSessionToken } from '../../../../packages/doom-session/src/token.js'

const config = {
  host: '127.0.0.1',
  port: 8787,
  publicBaseUrl: 'https://mcp.example.com',
  tokenSecret: 'test-secret',
  defaultWebOrigin: 'https://doom.example.com',
  playPath: '/play',
  defaultSessionTtlSeconds: 3600,
  issuer: 'test-suite',
}

test('create_doom_session returns a signed launch URL', async () => {
  const result = await handleDoomToolCall(
    'create_doom_session',
    {
      host_origin: 'https://doom.example.com',
    },
    config,
  )

  const structured = result.structuredContent as Record<string, unknown>
  assert.equal(typeof structured.session_id, 'string')
  assert.match(structured.launch_url as string, /^https:\/\/doom\.example\.com\/play\?token=/)
})

test('get_doom_launch_url returns a signed launch URL without widget metadata', async () => {
  const result = await handleDoomToolCall(
    'get_doom_launch_url',
    {
      host_origin: 'https://doom.example.com',
    },
    config,
  )

  const structured = result.structuredContent as Record<string, unknown>
  assert.equal(typeof structured.session_id, 'string')
  assert.match(structured.launch_url as string, /^https:\/\/doom\.example\.com\/play\?token=/)
  assert.equal((result as { _meta?: Record<string, unknown> })._meta, undefined)
})

test('create_doom_session ignores chatgpt host_origin when default origin is configured', async () => {
  const result = await handleDoomToolCall(
    'create_doom_session',
    {
      host_origin: 'https://chatgpt.com',
    },
    config,
  )

  const structured = result.structuredContent as Record<string, unknown>
  assert.match(structured.launch_url as string, /^https:\/\/doom\.example\.com\/play\?token=/)
})

test('create_doom_session prefers deployment origin over caller host_origin', async () => {
  const previewConfig = {
    ...config,
    defaultWebOrigin: undefined,
    publicBaseUrl: 'http://127.0.0.1:8787',
    deploymentOrigin: 'https://deploy-preview-54--chrisnager.netlify.app',
    playPath: '/doom/play',
  }

  const result = await handleDoomToolCall(
    'create_doom_session',
    {
      host_origin: 'https://example.com',
    },
    previewConfig,
  )

  const structured = result.structuredContent as Record<string, unknown>
  assert.match(structured.launch_url as string, /^https:\/\/deploy-preview-54--chrisnager\.netlify\.app\/doom\/play\?token=/)
})

test('create_doom_session ignores content_path for freedoom-phase1', async () => {
  const result = await handleDoomToolCall(
    'create_doom_session',
    {
      host_origin: 'https://doom.example.com',
      content_mode: 'freedoom-phase1',
      content_path: 'doom.wad',
    },
    config,
  )

  const structured = result.structuredContent as Record<string, string | undefined>
  assert.equal(structured.content_path, undefined)

  const claims = decodeSignedSessionToken(structured.signed_token as string)
  assert.equal(claims.contentPath, undefined)
})

test('invalid tool input is rejected', async () => {
  await assert.rejects(
    () =>
      handleDoomToolCall(
        'create_doom_session',
        {
          host_origin: 'not-a-url',
        },
        config,
      ),
    /Invalid arguments/,
  )
})
