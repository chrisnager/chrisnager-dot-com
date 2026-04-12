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

  ;(server as any).resource(
    'doom-play-widget',
    'ui://widget/doom-play.html',
    {
      title: 'DOOM Play Widget',
      description: 'Inline iframe widget for the currently created DOOM session.',
      mimeType: 'text/html',
      _meta: {
        'openai/widgetAccessible': true,
        'openai/widgetDescription': 'Embeds the current DOOM session inline inside ChatGPT.',
      },
    },
    async (uri: URL) => ({
      contents: [
        {
          uri: uri.toString(),
          mimeType: 'text/html',
          text: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>DOOM</title>
    <style>
      :root { color-scheme: dark; }
      html, body { margin: 0; width: 100%; height: 100%; background: #050505; color: #e5e7eb; font: 14px/1.4 system-ui, sans-serif; }
      body { display: grid; place-items: center; }
      .frame { width: min(100vw, 1280px); height: min(100vh, 800px); border: 0; background: #050505; }
      .hint { position: fixed; inset: auto 1rem 1rem 1rem; max-width: 32rem; padding: .75rem 1rem; border-radius: .75rem; background: rgba(0,0,0,.68); backdrop-filter: blur(10px); }
      .hint strong { display: block; margin-bottom: .25rem; }
    </style>
  </head>
  <body>
    <iframe id="doom-frame" class="frame" allow="fullscreen" referrerpolicy="no-referrer"></iframe>
    <div class="hint">
      <strong>DOOM</strong>
      <span id="status">Waiting for tool output…</span>
    </div>
    <script>
      const status = document.getElementById('status');
      const frame = document.getElementById('doom-frame');
      const resourceUrl = new URL(window.location.href);
      const toolOutput = window.openai?.toolOutput;
      const launchUrl = resourceUrl.searchParams.get('launch_url') || toolOutput?.launch_url || toolOutput?.launchUrl;
      if (launchUrl) {
        frame.src = launchUrl;
        status.textContent = 'Launching session in the iframe.';
      } else {
        status.textContent = 'No launch URL was provided by the tool result.';
      }
    </script>
  </body>
</html>`,
        },
      ],
    }),
  )

  server.registerTool(
    'create_doom_session',
    {
      description: 'Create a DOOM session and return a signed launch URL for the hosted /play page.',
      inputSchema: createDoomSessionInputSchema,
      _meta: {
        'openai/outputTemplate': 'ui://widget/doom-play.html',
        'openai/resultCanProduceWidget': true,
        'openai/widgetAccessible': true,
      },
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
