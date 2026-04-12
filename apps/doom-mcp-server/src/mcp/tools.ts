import { randomUUID } from 'node:crypto'

import { buildSignedDoomLaunchUrl, createSignedSessionToken } from '../../../../packages/doom-session/src/index.js'
import type { DoomSessionClaims } from '../../../../packages/doom-session/src/index.js'
import type { DoomPersistence } from '../domain/persistence.js'
import type { DoomSaveRecord, DoomSessionRecord } from '../domain/model.js'
import type { DoomMcpConfig } from '../config.js'
import {
  captureDoomScreenshotSchema,
  createDoomSessionSchema,
  getDoomLaunchUrlSchema,
  getDoomStatusSchema,
  loadDoomGameSchema,
  saveDoomGameSchema,
} from './schemas.js'
import { validateInput } from './validator.js'

function toIsoInSeconds(secondsFromNow: number) {
  return new Date(Date.now() + secondsFromNow * 1000).toISOString()
}

function asMetadata(input: unknown) {
  return (input && typeof input === 'object' ? (input as Record<string, string>) : {}) || {}
}

export function getDoomToolDefinitions() {
  return [
    {
      name: 'create_doom_session',
      description: 'Create a DOOM session and return a signed launch URL for the hosted /play page.',
      inputSchema: createDoomSessionSchema,
    },
    {
      name: 'get_doom_launch_url',
      description: 'Refresh or fetch the signed launch URL for an existing DOOM session.',
      inputSchema: getDoomLaunchUrlSchema,
    },
    {
      name: 'get_doom_status',
      description: 'Inspect session metadata and stub persistence status.',
      inputSchema: getDoomStatusSchema,
    },
    {
      name: 'save_doom_game',
      description: 'Persist a save payload and optional screenshot for a DOOM session.',
      inputSchema: saveDoomGameSchema,
    },
    {
      name: 'load_doom_game',
      description: 'Load a previously saved DOOM slot if one exists.',
      inputSchema: loadDoomGameSchema,
    },
    {
      name: 'capture_doom_screenshot',
      description: 'Return the latest persisted screenshot for a session. Live capture is stubbed until a runtime bridge exists.',
      inputSchema: captureDoomScreenshotSchema,
    },
  ]
}

function formatToolResult(data: unknown, meta?: Record<string, unknown>) {
  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify(data, null, 2),
      },
    ],
    structuredContent: data,
    ...(meta ? { _meta: meta } : {}),
  }
}

function buildWidgetOutputTemplate(launchUrl: string) {
  return `ui://widget/doom-play.html?launch_url=${encodeURIComponent(launchUrl)}`
}

function buildClaims(config: DoomMcpConfig, session: DoomSessionRecord): DoomSessionClaims {
  return {
    sessionId: session.id,
    contentMode: session.contentMode,
    contentPath: session.contentPath,
    saveNamespace: session.saveNamespace,
    issuedAt: new Date().toISOString(),
    expiresAt: session.expiresAt,
    issuer: config.issuer,
  }
}

function isHostedChatOrigin(origin: string) {
  try {
    const host = new URL(origin).hostname.toLowerCase()
    return host === 'chatgpt.com' || host.endsWith('.chatgpt.com') || host === 'chat.openai.com' || host.endsWith('.chat.openai.com')
  } catch {
    return false
  }
}

function getDeploymentOrigin(config: DoomMcpConfig) {
  if (config.deploymentOrigin) {
    return config.deploymentOrigin
  }

  try {
    const origin = new URL(config.publicBaseUrl).origin
    const { hostname } = new URL(origin)

    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return undefined
    }

    return origin
  } catch {
    return undefined
  }
}

function resolveHostOrigin(config: DoomMcpConfig, requestedOrigin?: string) {
  if (config.defaultWebOrigin) {
    return config.defaultWebOrigin
  }

  const deploymentOrigin = getDeploymentOrigin(config)
  if (deploymentOrigin) {
    return deploymentOrigin
  }

  if (requestedOrigin && !isHostedChatOrigin(requestedOrigin)) {
    return requestedOrigin
  }

  if (!requestedOrigin) {
    throw new Error('host_origin is required unless DOOM_WEB_ORIGIN is configured')
  }

  throw new Error('host_origin must not be a ChatGPT or OpenAI origin; configure DOOM_WEB_ORIGIN for hosted launches')
}

function buildWidgetMeta(launchUrl: string) {
  return {
    'openai/outputTemplate': buildWidgetOutputTemplate(launchUrl),
    'openai/resultCanProduceWidget': true,
    'openai/widgetAccessible': true,
  }
}

export async function handleDoomToolCall(
  name: string,
  input: unknown,
  persistence: DoomPersistence,
  config: DoomMcpConfig,
) {
  const tool = getDoomToolDefinitions().find((candidate) => candidate.name === name)

  if (!tool) {
    throw new Error(`Unknown tool: ${name}`)
  }

  const errors = validateInput(tool.inputSchema, input)
  if (errors.length > 0) {
    throw new Error(`Invalid arguments: ${errors.join('; ')}`)
  }

  const args = input as Record<string, unknown>

  if (name === 'create_doom_session') {
    const ttlSeconds = (args.session_ttl_seconds as number | undefined) || config.defaultSessionTtlSeconds
    const session: DoomSessionRecord = {
      id: randomUUID(),
      contentMode: (args.content_mode as DoomSessionRecord['contentMode'] | undefined) || 'freedoom-phase1',
      contentPath: args.content_path as string | undefined,
      createdAt: new Date().toISOString(),
      expiresAt: toIsoInSeconds(ttlSeconds),
      saveNamespace: randomUUID(),
      metadata: asMetadata(args.metadata),
    }

    await persistence.createSession(session)
    const token = createSignedSessionToken(config.tokenSecret, buildClaims(config, session))
    const launchUrl = buildSignedDoomLaunchUrl({
      origin: resolveHostOrigin(config, args.host_origin as string | undefined),
      playPath: config.playPath,
      token,
    })

    return formatToolResult(
      {
        session_id: session.id,
        launch_url: launchUrl,
        signed_token: token,
        expires_at: session.expiresAt,
        content_mode: session.contentMode,
        content_path: session.contentPath,
        persistence: persistence.kind,
      },
      buildWidgetMeta(launchUrl),
    )
  }

  if (name === 'get_doom_launch_url') {
    const session = await persistence.getSession(args.session_id as string)
    if (!session) {
      throw new Error(`Session not found: ${args.session_id as string}`)
    }

    const token = createSignedSessionToken(config.tokenSecret, buildClaims(config, session))
    const launchUrl = buildSignedDoomLaunchUrl({
      origin: resolveHostOrigin(config, args.host_origin as string | undefined),
      playPath: config.playPath,
      token,
    })

    return formatToolResult(
      {
        session_id: session.id,
        launch_url: launchUrl,
        signed_token: token,
        expires_at: session.expiresAt,
        persistence: persistence.kind,
      },
      buildWidgetMeta(launchUrl),
    )
  }

  if (name === 'get_doom_status') {
    const session = await persistence.getSession(args.session_id as string)
    if (!session) {
      throw new Error(`Session not found: ${args.session_id as string}`)
    }

    const latestScreenshot = await persistence.getLatestScreenshot(session.id)

    return formatToolResult({
      session_id: session.id,
      status: Date.parse(session.expiresAt) > Date.now() ? 'ready' : 'expired',
      created_at: session.createdAt,
      expires_at: session.expiresAt,
      content_mode: session.contentMode,
      content_path: session.contentPath,
      save_namespace: session.saveNamespace,
      metadata: session.metadata,
      has_screenshot: Boolean(latestScreenshot?.screenshotDataUrl),
      persistence: persistence.kind,
    })
  }

  if (name === 'save_doom_game') {
    const session = await persistence.getSession(args.session_id as string)
    if (!session) {
      throw new Error(`Session not found: ${args.session_id as string}`)
    }

    if (!args.save_data_base64 && !args.screenshot_data_url) {
      throw new Error('save_doom_game requires save_data_base64 or screenshot_data_url')
    }

    const save: DoomSaveRecord = {
      sessionId: session.id,
      slot: args.slot as string,
      savedAt: new Date().toISOString(),
      saveDataBase64: args.save_data_base64 as string | undefined,
      screenshotDataUrl: args.screenshot_data_url as string | undefined,
      metadata: asMetadata(args.metadata),
    }

    await persistence.saveGame(save)

    return formatToolResult({
      session_id: save.sessionId,
      slot: save.slot,
      saved_at: save.savedAt,
      has_save_data: Boolean(save.saveDataBase64),
      has_screenshot: Boolean(save.screenshotDataUrl),
      persistence: persistence.kind,
    })
  }

  if (name === 'load_doom_game') {
    const session = await persistence.getSession(args.session_id as string)
    if (!session) {
      throw new Error(`Session not found: ${args.session_id as string}`)
    }

    const save = await persistence.loadGame(session.id, args.slot as string)

    return formatToolResult({
      found: Boolean(save),
      session_id: session.id,
      slot: args.slot as string,
      saved_at: save?.savedAt,
      save_data_base64: save?.saveDataBase64,
      screenshot_data_url: save?.screenshotDataUrl,
      metadata: save?.metadata || {},
      persistence: persistence.kind,
    })
  }

  if (name === 'capture_doom_screenshot') {
    const session = await persistence.getSession(args.session_id as string)
    if (!session) {
      throw new Error(`Session not found: ${args.session_id as string}`)
    }

    const latestScreenshot = await persistence.getLatestScreenshot(session.id)

    return formatToolResult({
      found: Boolean(latestScreenshot?.screenshotDataUrl),
      session_id: session.id,
      screenshot_data_url: latestScreenshot?.screenshotDataUrl,
      captured_at: latestScreenshot?.savedAt,
      message: latestScreenshot?.screenshotDataUrl
        ? 'Returning the latest persisted screenshot. Live capture will plug into a browser session bridge later.'
        : 'No persisted screenshot is available yet. Live capture is deferred until the browser session bridge exists.',
      persistence: persistence.kind,
    })
  }

  throw new Error(`Unhandled tool: ${name}`)
}
