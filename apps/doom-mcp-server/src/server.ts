import http from 'node:http'

import { getDoomMcpConfig } from './config.js'
import { handleJsonRpcRequest } from './protocol/jsonRpc.js'

const config = getDoomMcpConfig()

function sendJson(response: http.ServerResponse, statusCode: number, body: unknown) {
  response.writeHead(statusCode, {
    'access-control-allow-headers': 'content-type, authorization',
    'access-control-allow-methods': 'GET, POST, OPTIONS',
    'access-control-allow-origin': '*',
    'content-type': 'application/json; charset=utf-8',
  })
  response.end(JSON.stringify(body, null, 2))
}

const server = http.createServer(async (request, response) => {
  const url = new URL(request.url || '/', config.publicBaseUrl)

  if (request.method === 'OPTIONS') {
    response.writeHead(204, {
      'access-control-allow-headers': 'content-type, authorization',
      'access-control-allow-methods': 'GET, POST, OPTIONS',
      'access-control-allow-origin': '*',
    })
    response.end()
    return
  }

  if (request.method === 'POST' && url.pathname === '/mcp') {
    const chunks: Buffer[] = []
    request.on('data', (chunk) => chunks.push(Buffer.from(chunk)))
    request.on('end', async () => {
      try {
        const body = JSON.parse(Buffer.concat(chunks).toString('utf8')) as unknown
        const result = await handleJsonRpcRequest(body, config)
        sendJson(response, 200, result)
      } catch (error) {
        sendJson(response, 400, {
          jsonrpc: '2.0',
          id: null,
          error: {
            code: -32700,
            message: error instanceof Error ? error.message : 'Invalid JSON',
          },
        })
      }
    })
    return
  }

  sendJson(response, 404, {
    error: 'Not Found',
    endpoints: ['/mcp'],
  })
})

server.listen(config.port, config.host, () => {
  console.log(`doom MCP server listening on http://${config.host}:${config.port}/mcp`)
})
