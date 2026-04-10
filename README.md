# DOOM MCP App Phase 1

Phase 1 adds a lean browser app that runs `cloudflare/doom-wasm` with Freedoom Phase 1 as the default free content source. The app is structured for later MCP-driven session orchestration, but Phase 1 intentionally stops short of implementing an MCP server.

## Structure

```text
apps/
  web/                 iframe-friendly browser shell
packages/
  doom-adapter/        stable runtime wrapper around cloudflare/doom-wasm
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
```

The production-ready static output is written to `apps/web/dist`.

## Notes

- The existing Gatsby site remains in the repo and its scripts are untouched.
- Phase 1 defaults to Freedoom content and does not bundle commercial DOOM IWADs.
- The app self-hosts the `cloudflare/doom-wasm` runtime assets and a local `freedoom1.wad` extracted from the official Freedoom 0.13.0 release.

See [LEGAL.md](/Users/chrisnager/Dropbox/Chris/Projects/chrisnager-dot-com/LEGAL.md) and [NEXT_STEPS.md](/Users/chrisnager/Dropbox/Chris/Projects/chrisnager-dot-com/NEXT_STEPS.md) for the legal boundary and MCP follow-up work.
