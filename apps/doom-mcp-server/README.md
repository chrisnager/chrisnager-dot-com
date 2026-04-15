# DOOM MCP Server

This package owns the lean MCP server for the DOOM project.

Its current job is simple:

- expose `create_doom_session`
- expose `get_doom_launch_url` as a plain-text fallback for clients that cannot render the inline app
- sign a launch token
- return a `launch_url` for `/doom/play`
- advertise an inline MCP app view for hosts that support MCP Apps

## Tool surface

- `create_doom_session`
- `get_doom_launch_url`

The returned payload includes:

- `session_id`
- `launch_url`
- `signed_token`
- `expires_at`
- `content_mode`
- `content_path`

## Local development

```bash
yarn doom:mcp:dev
```

The standalone Node server listens on:

- `http://127.0.0.1:8787/mcp`
- `http://127.0.0.1:8787/health`

## Build and test

```bash
yarn doom:mcp:build
yarn doom:mcp:test
```

## Production path

Netlify serves:

- `/doom/mcp`
- `/doom/api/doom-health`

The session launch path is intentionally self-contained. The browser reads the signed token directly from the `launch_url` and does not depend on server-side session persistence.
