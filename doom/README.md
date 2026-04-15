# DOOM MCP App

This repo includes a lean DOOM project with two supported paths:

- an MCP tool that creates a signed DOOM session
- a playable browser fallback at `/doom/play?token=...`

The current scope is intentionally small. The project is focused on starting a new session and playing DOOM, either inline in an MCP app host or in a standalone browser page.

## Structure

```text
apps/
  doom-web/            browser shell and MCP widget entry
  doom-mcp-server/     MCP server logic and tool registration
packages/
  doom-adapter/        runtime wrapper around cloudflare/doom-wasm
  doom-session/        signed token and launch URL helpers
netlify/
  functions/           deployed MCP and health endpoints
```

## What is included

- `create_doom_session` as the only MCP tool
- signed launch URLs for `/doom/play`
- inline MCP app rendering for hosts that support MCP Apps
- Freedoom Phase 1 as the default bundled content

## What is intentionally not included

Anything beyond session creation, inline rendering, and browser launch fallback has been removed from the current scope.

## Local development

```bash
yarn doom:dev
```

That compiles the DOOM app into `.doom-build/` and serves it locally at `http://127.0.0.1:4321`.

Useful routes:

- `http://127.0.0.1:4321/`
- `http://127.0.0.1:4321/play?session=demo123`

## Local MCP testing

Start the local MCP server:

```bash
yarn doom:mcp:dev
```

Default endpoints:

- `http://127.0.0.1:8787/health`
- `http://127.0.0.1:8787/mcp`

## Netlify-shaped local testing

```bash
GATSBY_TELEMETRY_DISABLED=1 yarn gatsby build
yarn doom:netlify:prepare
python3 -m http.server 4173 --directory public
```

In another terminal:

```bash
DOOM_WEB_ORIGIN=http://127.0.0.1:4173 \
DOOM_WEB_PLAY_PATH=/doom/play \
yarn doom:mcp:dev
```

Then test:

- `http://127.0.0.1:4173/doom/`
- `http://127.0.0.1:4173/doom/play?session=demo123`
- `http://127.0.0.1:8787/health`
- `http://127.0.0.1:8787/mcp`

## Build and test

```bash
yarn doom:typecheck
yarn doom:mcp:test
yarn doom:netlify:prepare
```

## Deployment

Netlify publishes:

- `/doom/play`
- `/doom/mcp`
- `/doom/api/doom-health`

The browser launch path is self-contained: the signed token in the URL is enough to boot the game.

See [LEGAL.md](/Users/chrisnager/Dropbox/Chris/Projects/chrisnager-dot-com/doom/LEGAL.md) for content and licensing notes.
