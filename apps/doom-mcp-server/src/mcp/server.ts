import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { registerAppResource, registerAppTool, RESOURCE_MIME_TYPE } from '@modelcontextprotocol/ext-apps/server'

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

  const resourceUri = 'ui://doom/play.html'

  registerAppResource(
    server as unknown as { registerResource: (...args: unknown[]) => unknown },
    'DOOM Play Widget',
    resourceUri,
    {
      _meta: {
        ui: {
          prefersBorder: true,
        },
      },
    },
    async (uri: URL) => ({
      contents: [
        {
          uri: uri.toString(),
          mimeType: RESOURCE_MIME_TYPE,
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
      let nextId = 1;
      let initialized = false;

      function extractLaunchUrl(result) {
        if (!result || typeof result !== 'object') {
          return undefined;
        }

        if (result.structuredContent && typeof result.structuredContent === 'object') {
          const structuredLaunchUrl = result.structuredContent.launch_url || result.structuredContent.launchUrl;
          if (typeof structuredLaunchUrl === 'string' && structuredLaunchUrl.length > 0) {
            return structuredLaunchUrl;
          }
        }

        if (Array.isArray(result.content)) {
          for (const item of result.content) {
            if (item && item.type === 'text' && typeof item.text === 'string') {
              try {
                const parsed = JSON.parse(item.text);
                if (parsed && typeof parsed.launch_url === 'string' && parsed.launch_url.length > 0) {
                  return parsed.launch_url;
                }
              } catch {}
            }
          }
        }

        return undefined;
      }

      function launch(launchUrl) {
        launchLink.href = launchUrl;
        status.textContent = 'Launching session inline.';
        window.location.replace(launchUrl);
      }

      function send(method, params, id) {
        window.parent.postMessage(
          id === undefined ? { jsonrpc: '2.0', method, params } : { jsonrpc: '2.0', id, method, params },
          '*',
        );
      }

      window.addEventListener('message', (event) => {
        const message = event.data;
        if (!message || message.jsonrpc !== '2.0') {
          return;
        }

        if (message.id === 1 && message.result && !initialized) {
          initialized = true;
          send('ui/notifications/initialized', {});
          return;
        }

        if (message.method === 'ui/notifications/tool-result') {
          const launchUrl = extractLaunchUrl(message.params);
          if (launchUrl) {
            launch(launchUrl);
          } else {
            status.textContent = 'No launch URL was provided by the tool result.';
          }
        }
      });

      send('ui/initialize', {
        appInfo: { name: 'DOOM Play Widget', version: '1.0.0' },
        appCapabilities: {},
        protocolVersion: '2026-01-26',
      }, nextId++);
    </script>
  </body>
</html>`,
          _meta: {
            ui: {
              csp: {
                frameDomains: [],
              },
            },
          },
        },
      ],
    }),
  )

  registerAppTool(
    server as unknown as { registerTool: (...args: unknown[]) => unknown },
    'create_doom_session',
    {
      description: 'Create a DOOM session and return a signed launch URL for the hosted /play page.',
      inputSchema: createDoomSessionInputSchema,
      _meta: {
        ui: {
          resourceUri,
        },
      },
    },
    async (args: Record<string, unknown>) => handleDoomToolCall('create_doom_session', args, persistence, config),
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
