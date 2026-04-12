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
      mimeType: 'text/html;profile=mcp-app',
      _meta: {
        'openai/widgetAccessible': true,
        'openai/widgetDescription': 'Embeds the current DOOM session inline inside ChatGPT.',
      },
    },
    async (uri: URL) => ({
      contents: [
        {
          uri: uri.toString(),
          mimeType: 'text/html;profile=mcp-app',
          text: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>DOOM</title>
    <style>
      :root { color-scheme: dark; }
      html, body { margin: 0; width: 100%; min-height: 100%; background: #050505; color: #e5e7eb; font: 14px/1.4 system-ui, sans-serif; }
      body { display: grid; place-items: center; padding: 1rem; box-sizing: border-box; }
      .panel { width: min(100vw, 1280px); min-height: min(100vh, 800px); border-radius: 1rem; overflow: hidden; background: #050505; box-shadow: 0 0 0 1px rgba(255,255,255,.08), 0 24px 72px rgba(0,0,0,.35); }
      .hint { padding: 1rem 1.25rem; background: rgba(255,255,255,.04); border-bottom: 1px solid rgba(255,255,255,.08); }
      .hint strong { display: block; margin-bottom: .25rem; }
      .content { padding: 1rem 1.25rem; }
      a { color: #93c5fd; }
    </style>
  </head>
  <body>
    <div class="panel">
      <div class="hint">
        <strong>DOOM</strong>
        <span id="status">Waiting for tool output…</span>
      </div>
      <div class="content">
        <p>The session will open inline in this MCP App view.</p>
        <p><a id="launch-link" href="#" target="_blank" rel="noreferrer">Open in a new tab</a></p>
      </div>
    </div>
    <script>
      const status = document.getElementById('status');
      const launchLink = document.getElementById('launch-link');
      const resourceUrl = new URL(window.location.href);
      const toolOutput = window.openai?.toolOutput;
      const launchUrl = resourceUrl.searchParams.get('launch_url') || toolOutput?.launch_url || toolOutput?.launchUrl;
      if (launchUrl) {
        launchLink.href = launchUrl;
        status.textContent = 'Launching session inline.';
        window.location.replace(launchUrl);
      } else {
        status.textContent = 'No launch URL was provided by the tool result.';
      }
    </script>
  </body>
</html>`,
          _meta: {
            ui: {
              csp: {
                frameDomains: uri.searchParams.get('launch_url') ? [new URL(uri.searchParams.get('launch_url') as string).origin] : [],
              },
            },
          },
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
