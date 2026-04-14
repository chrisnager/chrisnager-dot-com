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
      type: 'boolean'
      description?: string
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
    session_ttl_seconds: { type: 'integer', minimum: 60, maximum: 86400, description: 'Requested session lifetime.' },
    metadata: { type: 'object', additionalProperties: { type: 'string' }, description: 'Host-neutral metadata labels.' },
  },
}

export const getDoomLaunchUrlSchema: JsonSchema = {
  type: 'object',
  additionalProperties: false,
  required: ['session_id'],
  properties: {
    session_id: { type: 'string', minLength: 1, description: 'Existing DOOM session id.' },
    host_origin: { type: 'string', format: 'uri', description: 'Optional override for the hosted web origin.' },
  },
}

export const getDoomStatusSchema: JsonSchema = {
  type: 'object',
  additionalProperties: false,
  required: ['session_id'],
  properties: {
    session_id: { type: 'string', minLength: 1, description: 'Existing DOOM session id.' },
  },
}

export const saveDoomGameSchema: JsonSchema = {
  type: 'object',
  additionalProperties: false,
  required: ['session_id', 'slot'],
  properties: {
    session_id: { type: 'string', minLength: 1, description: 'Existing DOOM session id.' },
    slot: { type: 'string', minLength: 1, description: 'Logical save slot.' },
    save_data_base64: { type: 'string', description: 'Optional serialized save bytes.' },
    screenshot_data_url: { type: 'string', description: 'Optional screenshot data URL.' },
    metadata: { type: 'object', additionalProperties: { type: 'string' }, description: 'Optional save metadata.' },
  },
}

export const loadDoomGameSchema: JsonSchema = {
  type: 'object',
  additionalProperties: false,
  required: ['session_id', 'slot'],
  properties: {
    session_id: { type: 'string', minLength: 1, description: 'Existing DOOM session id.' },
    slot: { type: 'string', minLength: 1, description: 'Logical save slot.' },
  },
}

export const captureDoomScreenshotSchema: JsonSchema = {
  type: 'object',
  additionalProperties: false,
  required: ['session_id'],
  properties: {
    session_id: { type: 'string', minLength: 1, description: 'Existing DOOM session id.' },
  },
}
