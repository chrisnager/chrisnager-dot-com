import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'

import type { DoomMcpConfig } from '../config.js'
import type { DoomPersistence } from '../domain/persistence.js'
import { handleDoomToolCall } from './tools.js'
import {
  captureDoomScreenshotInputSchema,
  createDoomSessionInputSchema,
  getDoomLaunchUrlInputSchema,
  getDoomStatusInputSchema,
  loadDoomGameInputSchema,
  saveDoomGameInputSchema,
} from './zodSchemas.js'

export function createDoomMcpServer(persistence: DoomPersistence, config: DoomMcpConfig) {
  const server = new McpServer(
    {
      name: 'doom-mcp-server',
      version: '0.3.0',
    },
    {
      capabilities: {
        logging: {},
      },
    },
  )

  server.registerTool(
    'create_doom_session',
    {
      description: 'Create a DOOM session and return a signed launch URL for the hosted /play page.',
      inputSchema: createDoomSessionInputSchema,
    },
    async (args) => handleDoomToolCall('create_doom_session', args, persistence, config),
  )

  server.registerTool(
    'get_doom_launch_url',
    {
      description: 'Refresh or fetch the signed launch URL for an existing DOOM session.',
      inputSchema: getDoomLaunchUrlInputSchema,
    },
    async (args) => handleDoomToolCall('get_doom_launch_url', args, persistence, config),
  )

  server.registerTool(
    'get_doom_status',
    {
      description: 'Inspect session metadata and persistence status.',
      inputSchema: getDoomStatusInputSchema,
    },
    async (args) => handleDoomToolCall('get_doom_status', args, persistence, config),
  )

  server.registerTool(
    'save_doom_game',
    {
      description: 'Persist a save payload and optional screenshot for a DOOM session.',
      inputSchema: saveDoomGameInputSchema,
    },
    async (args) => handleDoomToolCall('save_doom_game', args, persistence, config),
  )

  server.registerTool(
    'load_doom_game',
    {
      description: 'Load a previously saved DOOM slot if one exists.',
      inputSchema: loadDoomGameInputSchema,
    },
    async (args) => handleDoomToolCall('load_doom_game', args, persistence, config),
  )

  server.registerTool(
    'capture_doom_screenshot',
    {
      description: 'Return the latest persisted screenshot for a session. Live capture is stubbed until a runtime bridge exists.',
      inputSchema: captureDoomScreenshotInputSchema,
    },
    async (args) => handleDoomToolCall('capture_doom_screenshot', args, persistence, config),
  )

  return server
}
