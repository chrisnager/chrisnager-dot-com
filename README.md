# DOOM MCP App

This repo now includes:

- a lean browser app that runs `cloudflare/doom-wasm` with Freedoom Phase 1 as the default content
- a host-neutral HTTP MCP server in TypeScript for session creation, launch URLs, status, save/load, and screenshot retrieval

## Structure

```text
apps/
  web/                 iframe-friendly browser shell
  mcp-server/          public HTTPS-ready MCP server
packages/
  doom-adapter/        stable runtime wrapper around cloudflare/doom-wasm
  doom-session/        signed token and launch URL helpers
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

## Build for deployment

```bash
yarn doom:build
yarn doom:mcp:build
```

- The production-ready static web output is written to `apps/web/dist`.
- The compiled MCP server output is written to `.doom-build/apps/mcp-server/src/`.

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

## Notes

- The existing Gatsby site remains in the repo and its scripts are untouched.
- Phase 1 defaults to Freedoom content and does not bundle commercial DOOM IWADs.
- The app self-hosts the `cloudflare/doom-wasm` runtime assets and a local `freedoom1.wad` extracted from the official Freedoom 0.13.0 release.
- The MCP server returns signed launch URLs pointing at the hosted `/play` page with a `token` query param.
- Persistence is intentionally stubbed behind an interface so database/object-storage wiring can replace the in-memory implementation later.

See [LEGAL.md](/Users/chrisnager/Dropbox/Chris/Projects/chrisnager-dot-com/LEGAL.md), [NEXT_STEPS.md](/Users/chrisnager/Dropbox/Chris/Projects/chrisnager-dot-com/NEXT_STEPS.md), and [apps/mcp-server/README.md](/Users/chrisnager/Dropbox/Chris/Projects/chrisnager-dot-com/apps/mcp-server/README.md) for legal notes and host integration details.
