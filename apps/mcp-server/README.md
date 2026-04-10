# DOOM MCP Server

This app exposes a host-neutral HTTP MCP server for DOOM session orchestration.

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

The server listens on `http://127.0.0.1:8787/mcp` by default.

## Build and test

```bash
yarn doom:mcp:build
yarn doom:mcp:test
```

## Production / HTTPS

The local server uses plain HTTP. For public deployment, run the compiled server behind HTTPS using a reverse proxy, load balancer, or serverless edge adapter. The MCP endpoint is designed to be stateless and compatible with a public HTTPS origin.

## ChatGPT Apps SDK integration

Later, a ChatGPT Apps SDK layer can call this MCP server as the session authority:

1. Apps SDK action requests `create_doom_session`
2. The server returns a signed `launch_url`
3. ChatGPT can embed that URL in an iframe when available
4. The gameplay URL remains standard web content and does not require iframe support to be useful

This keeps ChatGPT iframe embedding as an enhancement, not a dependency.

## Claude MCP integration

Claude can connect to the same public HTTPS MCP endpoint and call the exact same tools. No ChatGPT-specific fields are required in the tool contracts; the tool names, schemas, and results stay transport-neutral.

## Persistence

Phase 2 uses an in-memory persistence adapter with clean interfaces. Replace it later with database and object-storage backed implementations without changing the tool surface.
