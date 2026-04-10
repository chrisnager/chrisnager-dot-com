declare module '@modelcontextprotocol/sdk/server/mcp.js' {
  export class McpServer {
    constructor(serverInfo: unknown, options?: unknown)
    registerTool(name: string, config: unknown, callback: (args: any) => Promise<unknown> | unknown): void
    connect(transport: unknown): Promise<void>
    close(): Promise<void>
  }
}

declare module '@modelcontextprotocol/sdk/server/streamableHttp.js' {
  export class StreamableHTTPServerTransport {
    constructor(options?: unknown)
    close(): Promise<void>
    handleRequest(request: unknown, response: unknown, body?: unknown): Promise<void>
  }
}

declare module '@netlify/blobs' {
  export interface Store {
    get(key: string, options?: unknown): Promise<any>
    setJSON(key: string, data: unknown, options?: unknown): Promise<unknown>
  }

  export function getStore(name: string): Store
}

declare module 'fetch-to-node' {
  export function toReqRes(request: Request): { req: unknown; res: unknown }
  export function toFetchResponse(response: unknown): Promise<Response>
}

declare module 'zod' {
  export const z: any
}
