# DOOM MCP Server

This app exposes the host-neutral MCP tool and session logic for DOOM orchestration. In Phase 3, the deployed transport lives in Netlify Functions while this package continues to own the reusable domain logic.

## Tools

- `create_doom_session`
- `get_doom_launch_url`
- `get_doom_status`
- `save_doom_game`
- `load_doom_game`
- `capture_doom_screenshot`

## Local development

```bash
yarn doom:mcp:dev
```

The standalone Node server listens on `http://127.0.0.1:8787/mcp` by default and uses in-memory persistence.

For the Netlify-shaped local environment, use:

```bash
GATSBY_TELEMETRY_DISABLED=1 yarn gatsby build
yarn doom:netlify:prepare
python3 -m http.server 4173 --directory public
```

In another terminal:

```bash
DOOM_WEB_ORIGIN=http://127.0.0.1:4173 \
DOOM_WEB_PLAY_PATH=/doom/play \
DOOM_SESSION_BOOTSTRAP_PATH=/doom/api/doom-session-bootstrap \
yarn doom:mcp:dev
```

That gives you:

- `http://127.0.0.1:4173/doom/play`
- `http://127.0.0.1:8787/mcp`
- `http://127.0.0.1:8787/health`

Netlify CLI currently selects the workspace packages instead of the root Gatsby site in local monorepo mode, so `netlify dev` is not the primary local test path yet.

## Build and test

```bash
yarn doom:mcp:build
yarn doom:mcp:test
```

## Production / HTTPS

The deployed production path is Netlify-native:

- `netlify/functions/doom-mcp.mts` serves the public MCP endpoint at `/doom/mcp`
- `netlify/functions/doom-session-bootstrap.mts` verifies signed launch tokens at `/doom/api/doom-session-bootstrap`
- `netlify/functions/doom-health.mts` provides a lightweight health endpoint at `/doom/api/doom-health`
- `apps/mcp-server/src/domain/netlifyBlobsPersistence.ts` stores sessions and saves in Netlify Blobs

The local Node server still exists for focused MCP development, but Netlify Functions are now the intended public HTTPS deployment path.

## ChatGPT Apps SDK integration

Later, a ChatGPT Apps SDK layer can call this MCP server as the session authority:

1. Apps SDK action requests `create_doom_session`
2. The server returns a signed `launch_url`
3. ChatGPT can embed that URL in an iframe when available
4. The gameplay URL remains standard web content and does not require iframe support to be useful

This keeps ChatGPT iframe embedding as an enhancement, not a dependency.

## Claude MCP integration

Claude can connect to the same public HTTPS MCP endpoint and call the exact same tools. No ChatGPT-specific fields are required in the tool contracts; the tool names, schemas, and results stay transport-neutral.

Netlify’s recommended compatibility path is to point Claude or MCP Inspector at:

```bash
npx mcp-remote@next https://<your-domain>/doom/mcp
```

## Persistence

Phase 3 uses Netlify Blobs in deployed environments and in-memory persistence locally. That keeps the tool surface stable while giving the hosted Netlify deployment durable session and save storage.
