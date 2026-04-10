import type { DoomPersistence } from '../domain/persistence.js'
import type { DoomMcpConfig } from '../config.js'
import { getDoomToolDefinitions, handleDoomToolCall } from '../mcp/tools.js'

interface JsonRpcRequest {
  id?: string | number | null
  jsonrpc: '2.0'
  method: string
  params?: Record<string, unknown>
}

function success(id: JsonRpcRequest['id'], result: unknown) {
  return {
    jsonrpc: '2.0' as const,
    id: id ?? null,
    result,
  }
}

function failure(id: JsonRpcRequest['id'], code: number, message: string) {
  return {
    jsonrpc: '2.0' as const,
    id: id ?? null,
    error: {
      code,
      message,
    },
  }
}

export async function handleJsonRpcRequest(body: unknown, persistence: DoomPersistence, config: DoomMcpConfig) {
  if (!body || typeof body !== 'object') {
    return failure(null, -32600, 'Invalid JSON-RPC request')
  }

  const request = body as JsonRpcRequest

  if (request.jsonrpc !== '2.0' || typeof request.method !== 'string') {
    return failure(request.id ?? null, -32600, 'Invalid JSON-RPC envelope')
  }

  try {
    if (request.method === 'initialize') {
      return success(request.id, {
        protocolVersion: '2024-11-05',
        serverInfo: {
          name: 'doom-mcp-server',
          version: '0.2.0',
        },
        capabilities: {
          tools: {},
        },
      })
    }

    if (request.method === 'tools/list') {
      return success(request.id, {
        tools: getDoomToolDefinitions(),
      })
    }

    if (request.method === 'tools/call') {
      const name = request.params?.name
      if (typeof name !== 'string') {
        return failure(request.id, -32602, 'tools/call requires a tool name')
      }

      const result = await handleDoomToolCall(name, request.params?.arguments || {}, persistence, config)
      return success(request.id, result)
    }

    if (request.method === 'notifications/initialized') {
      return success(request.id, {})
    }

    return failure(request.id, -32601, `Method not found: ${request.method}`)
  } catch (error) {
    return failure(request.id, -32000, error instanceof Error ? error.message : String(error))
  }
}
