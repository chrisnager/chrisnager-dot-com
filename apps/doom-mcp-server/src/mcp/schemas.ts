export interface JsonSchema {
  type: 'object'
  properties: Record<string, SchemaProperty>
  required?: string[]
  additionalProperties?: boolean
}

type SchemaProperty =
  | {
      type: 'string'
      description?: string
      enum?: string[]
      format?: 'uri'
      minLength?: number
    }
  | {
      type: 'integer'
      description?: string
      minimum?: number
      maximum?: number
    }
  | {
      type: 'object'
      description?: string
      additionalProperties?: {
        type: 'string'
      }
    }

export const createDoomSessionSchema: JsonSchema = {
  type: 'object',
  additionalProperties: false,
  required: ['host_origin'],
  properties: {
    host_origin: { type: 'string', format: 'uri', description: 'Public web origin hosting the /play route.' },
    content_mode: { type: 'string', enum: ['freedoom-phase1', 'custom-url'], description: 'Playable content mode.' },
    content_path: { type: 'string', description: 'Optional custom content URL or path. Used only when content_mode is custom-url.' },
    session_ttl_seconds: { type: 'integer', minimum: 60, maximum: 86400, description: 'Requested session lifetime in seconds.' },
    metadata: { type: 'object', additionalProperties: { type: 'string' }, description: 'Optional host-neutral metadata labels.' },
  },
}
