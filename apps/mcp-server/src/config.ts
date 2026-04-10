export interface DoomMcpConfig {
  host: string
  port: number
  publicBaseUrl: string
  tokenSecret: string
  defaultWebOrigin?: string
  defaultSessionTtlSeconds: number
  issuer: string
}

export function getDoomMcpConfig(env: NodeJS.ProcessEnv = process.env): DoomMcpConfig {
  return {
    host: env.DOOM_MCP_HOST || '127.0.0.1',
    port: Number(env.DOOM_MCP_PORT || 8787),
    publicBaseUrl: env.DOOM_MCP_PUBLIC_BASE_URL || `http://${env.DOOM_MCP_HOST || '127.0.0.1'}:${env.DOOM_MCP_PORT || 8787}`,
    tokenSecret: env.DOOM_TOKEN_SECRET || 'local-dev-doom-token-secret',
    defaultWebOrigin: env.DOOM_WEB_ORIGIN,
    defaultSessionTtlSeconds: Number(env.DOOM_DEFAULT_SESSION_TTL_SECONDS || 3600),
    issuer: env.DOOM_MCP_ISSUER || 'doom-mcp-server',
  }
}
