import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js'
import { toFetchResponse, toReqRes } from 'fetch-to-node'

import { getDoomMcpConfig } from '../../apps/mcp-server/src/config.js'
import { createDoomPersistence } from '../../apps/mcp-server/src/domain/createPersistence.js'
import { createDoomMcpServer } from '../../apps/mcp-server/src/mcp/server.js'

function corsHeaders() {
  return {
    'access-control-allow-headers': 'content-type, authorization',
    'access-control-allow-methods': 'POST, OPTIONS',
    'access-control-allow-origin': '*',
  }
}

export default async function handler(request: Request) {
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: corsHeaders(),
    })
  }

  if (request.method !== 'POST') {
    return new Response('Method not allowed', {
      status: 405,
      headers: corsHeaders(),
    })
  }

  try {
    const { req: nodeRequest, res: nodeResponse } = toReqRes(request)
    const responseHandle = nodeResponse as {
      on(event: 'close', callback: () => void): void
    }
    const transport = new StreamableHTTPServerTransport({
      sessionIdGenerator: undefined,
    })
    const config = getDoomMcpConfig()
    const persistence = createDoomPersistence(process.env)
    const server = createDoomMcpServer(persistence, config)
    const body = (await request.json()) as unknown

    await server.connect(transport)
    await transport.handleRequest(nodeRequest, nodeResponse, body)

    responseHandle.on('close', () => {
      void transport.close()
      void server.close()
    })

    const response = await toFetchResponse(nodeResponse)
    Object.entries(corsHeaders()).forEach(([key, value]) => {
      response.headers.set(key, value)
    })
    response.headers.set('cache-control', 'no-store')
    return response
  } catch (error) {
    return new Response(
      JSON.stringify({
        jsonrpc: '2.0',
        id: null,
        error: {
          code: -32603,
          message: error instanceof Error ? error.message : 'Internal server error',
        },
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders(),
          'cache-control': 'no-store',
          'content-type': 'application/json; charset=utf-8',
        },
      },
    )
  }
}

export const config = {
  path: '/doom/mcp',
}
