# MCP Integration Next Steps

Phase 3 moves the DOOM stack onto a Netlify-ready deployment path:

- `/doom/mcp` is ready to run as a Netlify Function
- `/doom/api/doom-session-bootstrap` verifies signed launch tokens server-side
- `/doom/play` is copied into the site publish output
- persistence uses Netlify Blobs on Netlify and memory locally

The next phase should harden auth, connect the browser runtime back to the server for real save/load exchange, and add host-specific integration layers.

## Authentication and ownership

- Add authenticated session ownership so `session_id` values belong to a real user or workspace.
- Enforce authorization on `get_doom_status`, `save_doom_game`, `load_doom_game`, and `capture_doom_screenshot`.
- Add rate limiting and abuse controls to the public `/doom/mcp` endpoint.

## Browser/runtime bridge

- Replace browser-local save/load storage with calls to the MCP-backed persistence layer.
- Add a runtime bridge so `capture_doom_screenshot` can ask the live browser session for a fresh screenshot instead of only returning the latest persisted one.
- Add session heartbeat / liveness tracking so `get_doom_status` can distinguish `ready` from truly active gameplay.

## Token and bootstrap hardening

- Rotate signing keys cleanly and support key versioning.
- Add token revocation and explicit reissue flows.
- Enforce iframe embedding policy and origin checks in the bootstrap endpoint.

## Host integrations

- Add a ChatGPT Apps SDK wrapper that calls the same MCP tools and embeds `/doom/play?token=...` when iframe support is available.
- Add Claude connection docs and tested `mcp-remote@next` examples for local and deployed Netlify URLs.
- Keep the MCP tool contracts host-neutral even as host-specific auth metadata is added around them.

## Netlify deployment polish

- Add deploy-preview validation for `/doom/mcp`, `/doom/api/doom-session-bootstrap`, and `/doom/play`.
- Decide whether saves and screenshots should stay in Netlify Blobs or move to a database/object-store combination as payload sizes grow.
- Teach local `netlify dev` how to target the root Gatsby site in this monorepo without the workspace-package prompt.
