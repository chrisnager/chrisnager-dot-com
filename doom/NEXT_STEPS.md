# DOOM MCP Next Steps

The current project scope is intentionally lean:

- two tools: `create_doom_session` and `get_doom_launch_url`
- one standalone play route: `/doom/play`
- one inline MCP app path for hosts that support it

If the project grows again later, the next additions should be evaluated from that smaller baseline instead of restoring every removed feature by default.

Possible future work:

- durable persistence for long-lived sessions
- host-specific polish for ChatGPT and Claude
- stronger auth and abuse controls on `/doom/mcp`
