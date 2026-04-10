# DOOM MCP App

This repo now includes:

- a lean browser app that runs `cloudflare/doom-wasm` with Freedoom Phase 1 as the default content
- a host-neutral MCP server in TypeScript for session creation, launch URLs, status, save/load, and screenshot retrieval
- a Netlify-ready hosting path that serves `/doom/mcp`, `/doom/api/doom-session-bootstrap`, `/doom/api/doom-health`, and the playable `/doom/play` shell from one deployment

## Structure

```text
apps/
  web/                 iframe-friendly browser shell
  mcp-server/          MCP tool/domain logic reused by local Node and Netlify Functions
packages/
  doom-adapter/        stable runtime wrapper around cloudflare/doom-wasm
  doom-session/        signed token and launch URL helpers
netlify/
  functions/           deployed MCP and bootstrap entrypoints
```

## Local development

```bash
yarn doom:dev
```

That command:

1. Compiles the TypeScript sources into `.doom-build/`
2. Watches for changes
3. Serves the Phase 1 app at `http://127.0.0.1:4321`

Open:

- `/` for the landing page
- `/play?session=demo123` to launch the playable demo shell

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
DOOM_SESSION_BOOTSTRAP_PATH=/doom/api/doom-session-bootstrap \
yarn doom:mcp:dev
```

Then test:

- `http://127.0.0.1:4173/doom/`
- `http://127.0.0.1:4173/doom/play?session=demo123`
- `http://127.0.0.1:8787/health`
- `http://127.0.0.1:8787/mcp`

Netlify CLI currently mis-identifies the workspace packages as standalone sites in local monorepo mode, so the most reliable local test path today is `gatsby build` + static `public/` serving + `yarn doom:mcp:dev`.

## Build for deployment

```bash
yarn doom:build
yarn doom:mcp:build
yarn doom:netlify:prepare
```

- The production-ready DOOM web output is written to `apps/web/dist`.
- `yarn doom:netlify:prepare` copies the DOOM app into the root `public/doom/` output so Netlify can publish `/doom/*` on the same site as Gatsby.
- The deployed MCP and bootstrap endpoints live in `netlify/functions/`.
- `netlify.toml` configures the build command, publish directory, and functions directory.

## MCP server

```bash
yarn doom:mcp:dev
```

Useful commands:

- `yarn doom:mcp:start`
- `yarn doom:mcp:test`

Default local endpoints:

- `http://127.0.0.1:8787/health`
- `http://127.0.0.1:8787/mcp`

Deployed Netlify endpoints:

- `/doom/mcp`
- `/doom/api/doom-session-bootstrap`
- `/doom/api/doom-health`

## Notes

- The existing Gatsby site remains in the repo and its scripts are untouched.
- Phase 1 defaults to Freedoom content and does not bundle commercial DOOM IWADs.
- The app self-hosts the `cloudflare/doom-wasm` runtime assets and a local `freedoom1.wad` extracted from the official Freedoom 0.13.0 release.
- The MCP server returns signed launch URLs pointing at the hosted `/doom/play` page with a `token` query param.
- On Netlify, persistence now uses Netlify Blobs. Outside Netlify, the local Node server still falls back to in-memory persistence for development.
- The browser shell now prefers a verified bootstrap fetch to `/doom/api/doom-session-bootstrap` and only falls back to local token decoding when that endpoint is unavailable.

See [LEGAL.md](/Users/chrisnager/Dropbox/Chris/Projects/chrisnager-dot-com/doom/LEGAL.md), [NEXT_STEPS.md](/Users/chrisnager/Dropbox/Chris/Projects/chrisnager-dot-com/doom/NEXT_STEPS.md), and [apps/mcp-server/README.md](/Users/chrisnager/Dropbox/Chris/Projects/chrisnager-dot-com/apps/mcp-server/README.md) for legal notes and host integration details.
