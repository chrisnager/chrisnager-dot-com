# MCP Integration Next Steps

Phase 1 stops at a browser-playable shell plus seams for later orchestration. The next phase should connect those seams to an MCP-aware backend.

## Session bootstrap

- Replace the fake `session` query parsing with a real session bootstrap endpoint.
- Validate session intent, requested content mode, expiration, and iframe embedding policy.
- Return signed, time-limited launch metadata instead of trusting raw query params.

## Launch URLs

- Move launch URL creation into a server-side signer.
- Include session id, content descriptor, expiry, and optional save namespace.
- Sign the payload so the browser shell can verify it before boot.

## Save/load

- Swap the browser-local placeholder store for a session-aware save API.
- Persist save snapshots, thumbnails, and metadata per session/user/model conversation.
- Decide whether actual savegame bytes live in object storage, a database, or both.

## MCP server responsibilities

- Create playable sessions on demand.
- Map model/tool requests to signed launch URLs.
- Enforce content policy and entitlement checks.
- Expose save, load, screenshot, and lifecycle operations in a way that works for ChatGPT and Claude clients.

## Engine/runtime hardening

- Vendor or self-host pinned `doom-wasm` assets instead of relying on a CDN.
- Add runtime health telemetry and better teardown semantics.
- Decide whether multiplayer/session routing should stay on top of the original Cloudflare websocket approach or move to a different orchestration layer.
