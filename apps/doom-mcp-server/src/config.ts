export interface DoomMcpConfig {
  host: string
  port: number
  publicBaseUrl: string
  tokenSecret: string
  defaultWebOrigin?: string
  deploymentOrigin?: string
  playPath: string
  bootstrapPath: string
  defaultSessionTtlSeconds: number
  issuer: string
}

export function getDoomMcpConfig(env: NodeJS.ProcessEnv = process.env, deploymentOrigin?: string): DoomMcpConfig {
  const isProduction = env.NODE_ENV === 'production' || env.CONTEXT === 'production'
  const tokenSecret = env.DOOM_TOKEN_SECRET || (isProduction ? '' : 'local-dev-doom-token-secret')

  if (!tokenSecret) {
    throw new Error('DOOM_TOKEN_SECRET must be configured in production')
  }

  return {
    host: env.DOOM_MCP_HOST || '127.0.0.1',
    port: Number(env.DOOM_MCP_PORT || 8787),
    publicBaseUrl: env.DOOM_MCP_PUBLIC_BASE_URL || `http://${env.DOOM_MCP_HOST || '127.0.0.1'}:${env.DOOM_MCP_PORT || 8787}`,
    tokenSecret,
    defaultWebOrigin: env.DOOM_WEB_ORIGIN,
    deploymentOrigin,
    playPath: env.DOOM_WEB_PLAY_PATH || '/doom/play',
    bootstrapPath: env.DOOM_SESSION_BOOTSTRAP_PATH || '/doom/api/doom-session-bootstrap',
    defaultSessionTtlSeconds: Number(env.DOOM_DEFAULT_SESSION_TTL_SECONDS || 3600),
    issuer: env.DOOM_MCP_ISSUER || 'doom-mcp-server',
  }
}
