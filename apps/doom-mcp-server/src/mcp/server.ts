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

function buildWidgetHtml() {
  const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="16" height="16">
  <title>"C" logo of Chris Nager</title>
  <style>
    svg {
      background-color: red;
    }

    path {
      fill: none;
      stroke: #fff;
      stroke-linejoin: round;
      stroke-width: 10px;
    }
  </style>
  <path d="M21,100A78.06,78.06,0,0,1,52.25,37.48h0v125h0a78.17,78.17,0,0,0,118.52-31.26l-43-18.76.15-.33a31.26,31.26,0,0,1-44.43,14.9" />
  <path d="M82,176.18,82,23.42a95.41,95.41,0,0,1,17.19-1.56,78.16,78.16,0,0,1,72,47.72l-43.2,18.25h0A31.26,31.26,0,0,0,81.67,74.08" />
</svg>`
  const faviconHref = `data:image/svg+xml,${encodeURIComponent(faviconSvg)}`

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>DOOM</title>
    <link rel="icon" href="${faviconHref}" type="image/svg+xml" />
    <style>
      :root { color-scheme: dark; }
      html, body { margin: 0; width: 100%; height: 100%; background: #050505; color: #e5e7eb; font: 14px/1.4 system-ui, sans-serif; overflow: hidden; }
      body { position: relative; }
      .shell { width: 100%; height: 100%; display: grid; place-items: center; }
      .status { position: absolute; left: 12px; top: 12px; margin: 0; padding: .35rem .5rem; border-radius: .4rem; background: rgba(0,0,0,.65); color: #f3f4f6; font-size: 12px; line-height: 1.2; max-width: calc(100% - 24px); z-index: 2; }
      .fallback { position: absolute; right: 12px; bottom: 12px; margin: 0; font-size: 12px; opacity: .8; z-index: 2; }
      a { color: #93c5fd; }
    </style>
  </head>
  <body>
    <main class="shell" id="shell">
      <p class="status" id="status">Waiting for DOOM session…</p>
      <p class="fallback">
        <a id="launch-link" href="#" target="_blank" rel="noreferrer">Open in a new tab</a>
      </p>
    </main>
    <script>
      const status = document.getElementById('status');
      const launchLink = document.getElementById('launch-link');
      let initialized = false;
      let widgetLoaded = false;

      function extractLaunchUrl(result) {
        if (!result || typeof result !== 'object') return undefined;

        if (result.structuredContent && typeof result.structuredContent === 'object') {
          const structuredLaunchUrl = result.structuredContent.launch_url || result.structuredContent.launchUrl;
          if (typeof structuredLaunchUrl === 'string' && structuredLaunchUrl.length > 0) return structuredLaunchUrl;
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

      function send(method, params, id) {
        window.parent.postMessage(
          id === undefined ? { jsonrpc: '2.0', method, params } : { jsonrpc: '2.0', id, method, params },
          '*',
        );
      }

      function loadWidget(launchUrl) {
        if (widgetLoaded) return;
        widgetLoaded = true;
        launchLink.href = launchUrl;
        launchLink.textContent = 'Open in a new tab';
        window.__doomWidgetLaunchUrl__ = launchUrl;

        const assetOrigin = new URL(launchUrl).origin;
        const script = document.createElement('script');
        script.type = 'module';
        script.src = assetOrigin + '/doom/src/ui/routes/mcpWidget.js';
        script.onerror = () => {
          widgetLoaded = false;
          status.textContent = 'Failed to load the DOOM widget module.';
        };
        document.head.append(script);
      }

      window.addEventListener('message', (event) => {
        const message = event.data;
        if (!message || message.jsonrpc !== '2.0') return;

        if (message.id === 1 && message.result && !initialized) {
          initialized = true;
          send('ui/notifications/initialized', {});
          return;
        }

        if (message.method === 'ui/notifications/tool-result') {
          const launchUrl = extractLaunchUrl(message.params);
          if (launchUrl) {
            status.textContent = 'Loading DOOM canvas…';
            loadWidget(launchUrl);
          } else {
            status.textContent = 'No launch URL was provided by the tool result.';
          }
        }
      });

      send('ui/initialize', {
        appInfo: { name: 'DOOM Play Widget', version: '1.0.0' },
        appCapabilities: {},
        protocolVersion: '2026-01-26',
      }, 1);
    </script>
  </body>
</html>`
}

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
          text: buildWidgetHtml(),
          _meta: {
            ui: {
              csp: {
                resourceDomains: [
                  'https://*.netlify.app',
                  'https://chrisnager.com',
                  'https://*.chrisnager.com',
                  'blob:',
                  'http://localhost:*',
                  'http://127.0.0.1:*',
                ],
                connectDomains: [
                  'https://*.netlify.app',
                  'https://chrisnager.com',
                  'https://*.chrisnager.com',
                  'blob:',
                  'http://localhost:*',
                  'http://127.0.0.1:*',
                ],
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
