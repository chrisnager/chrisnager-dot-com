import { getDoomMcpConfig } from '../../apps/mcp-server/src/config.js'
import { createDoomPersistence } from '../../apps/mcp-server/src/domain/createPersistence.js'
import { resolveVerifiedSessionBootstrap } from '../../apps/mcp-server/src/session/bootstrap.js'

function jsonResponse(status: number, body: unknown) {
  return new Response(JSON.stringify(body, null, 2), {
    status,
    headers: {
      'cache-control': 'no-store',
      'content-type': 'application/json; charset=utf-8',
    },
  })
}

export default async function handler(request: Request) {
  if (request.method !== 'GET') {
    return jsonResponse(405, {
      error: 'Method not allowed',
    })
  }

  try {
    const url = new URL(request.url)
    const token = url.searchParams.get('token')?.trim()

    if (!token) {
      return jsonResponse(400, {
        error: 'token is required',
      })
    }

    const config = getDoomMcpConfig()
    const persistence = createDoomPersistence(process.env)
    const bootstrap = await resolveVerifiedSessionBootstrap(token, persistence, config)

    return jsonResponse(200, bootstrap)
  } catch (error) {
    return jsonResponse(400, {
      error: error instanceof Error ? error.message : 'Invalid session bootstrap request',
    })
  }
}

export const config = {
  path: '/doom/api/doom-session-bootstrap',
}
