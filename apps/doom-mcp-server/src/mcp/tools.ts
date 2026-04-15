import { randomUUID } from 'node:crypto'

import { buildSignedDoomLaunchUrl, createSignedSessionToken } from '../../../../packages/doom-session/src/index.js'
import type { DoomSessionClaims } from '../../../../packages/doom-session/src/index.js'
import type { DoomMcpConfig } from '../config.js'
import { createDoomSessionSchema } from './schemas.js'
import { validateInput } from './validator.js'

type DoomContentMode = 'freedoom-phase1' | 'custom-url'

interface CreateSessionArgs {
  host_origin?: string
  content_mode?: DoomContentMode
  content_path?: string
  session_ttl_seconds?: number
  metadata?: Record<string, string>
}

function toIsoInSeconds(secondsFromNow: number) {
  return new Date(Date.now() + secondsFromNow * 1000).toISOString()
}

function normalizeContentPath(contentMode: DoomContentMode, contentPath?: string) {
  if (!contentPath || contentMode !== 'custom-url') {
    return undefined
  }

  const trimmed = contentPath.trim()
  return trimmed || undefined
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
      description: 'Return a signed DOOM launch URL for clients that cannot render the inline session view.',
      inputSchema: createDoomSessionSchema,
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

const DOOM_WIDGET_RESOURCE_URI = 'ui://doom/play.html'

function buildClaims(config: DoomMcpConfig, session: { id: string; contentMode: DoomContentMode; contentPath?: string; expiresAt: string }): DoomSessionClaims {
  return {
    sessionId: session.id,
    contentMode: session.contentMode,
    contentPath: session.contentPath,
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

function buildWidgetMeta() {
  return {
    'openai/outputTemplate': DOOM_WIDGET_RESOURCE_URI,
    'openai/resultCanProduceWidget': true,
    'openai/widgetAccessible': true,
  }
}

function buildLaunchResult(config: DoomMcpConfig, args: CreateSessionArgs, includeWidgetMeta: boolean) {
  const contentMode = args.content_mode || 'freedoom-phase1'
  const session = {
    id: randomUUID(),
    contentMode,
    contentPath: normalizeContentPath(contentMode, args.content_path),
    expiresAt: toIsoInSeconds(args.session_ttl_seconds || config.defaultSessionTtlSeconds),
  }

  const token = createSignedSessionToken(config.tokenSecret, buildClaims(config, session))
  const launchUrl = buildSignedDoomLaunchUrl({
    origin: resolveHostOrigin(config, args.host_origin),
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
    },
    includeWidgetMeta ? buildWidgetMeta() : undefined,
  )
}

export async function handleDoomToolCall(name: string, input: unknown, config: DoomMcpConfig) {
  if (name !== 'create_doom_session' && name !== 'get_doom_launch_url') {
    throw new Error(`Unknown tool: ${name}`)
  }

  const errors = validateInput(createDoomSessionSchema, input)
  if (errors.length > 0) {
    throw new Error(`Invalid arguments: ${errors.join('; ')}`)
  }

  const args = (input || {}) as CreateSessionArgs
  return buildLaunchResult(config, args, name === 'create_doom_session')
}
