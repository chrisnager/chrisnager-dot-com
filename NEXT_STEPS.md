# MCP Integration Next Steps

Phase 2 adds a public MCP server, signed session tokens, and stub persistence. The next phase should wire the browser runtime back to those server contracts.

## Session bootstrap

- Replace browser-side unsigned fallbacks with a verified bootstrap flow.
- Let the `/play` shell fetch verified session metadata from the server instead of only decoding token claims.
- Enforce iframe embedding policy server-side while keeping plain browser launch support intact.

## Launch URLs

- Rotate signing keys cleanly and support secret management outside local env files.
- Add explicit token refresh and revocation flows.
- Decide whether browser boot should rely on opaque tokens plus a bootstrap fetch instead of carrying all claims in the URL token.

## Save/load

- Replace the in-memory persistence adapter with durable storage.
- Add upload/download flows from the browser runtime to the server save API.
- Persist save snapshots, thumbnails, and metadata per session/user/model conversation.

## MCP server responsibilities

- Add authenticated multi-tenant session ownership and authorization.
- Attach per-host audit metadata without changing the host-neutral tool contracts.
- Add a runtime bridge so screenshot capture and save/load can operate against live browser sessions instead of stub persistence alone.

## Engine/runtime hardening

- Vendor or self-host pinned `doom-wasm` assets instead of relying on a CDN.
- Add runtime health telemetry and better teardown semantics.
- Decide whether multiplayer/session routing should stay on top of the original Cloudflare websocket approach or move to a different orchestration layer.
- Consider replacing ad hoc browser boot assumptions with a server-backed session control channel.
