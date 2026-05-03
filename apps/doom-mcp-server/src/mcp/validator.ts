import type { JsonSchema } from './schemas.js'

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function isValidUri(value: string) {
  try {
    new URL(value)
    return true
  } catch {
    return false
  }
}

export function validateInput(schema: JsonSchema, value: unknown) {
  const errors: string[] = []

  if (!isRecord(value)) {
    return ['Expected an object']
  }

  for (const requiredField of schema.required || []) {
    if (!(requiredField in value)) {
      errors.push(`Missing required field: ${requiredField}`)
    }
  }

  if (schema.additionalProperties === false) {
    for (const key of Object.keys(value)) {
      if (!(key in schema.properties)) {
        errors.push(`Unexpected field: ${key}`)
      }
    }
  }

  for (const [key, property] of Object.entries(schema.properties)) {
    const fieldValue = value[key]

    if (fieldValue === undefined) {
      continue
    }

    if (property.type === 'string') {
      if (typeof fieldValue !== 'string') {
        errors.push(`Field ${key} must be a string`)
        continue
      }

      if (property.minLength !== undefined && fieldValue.length < property.minLength) {
        errors.push(`Field ${key} must be at least ${property.minLength} characters`)
      }

      if (property.enum && !property.enum.includes(fieldValue)) {
        errors.push(`Field ${key} must be one of: ${property.enum.join(', ')}`)
      }

      if (property.format === 'uri' && !isValidUri(fieldValue)) {
        errors.push(`Field ${key} must be a valid URI`)
      }
    }

    if (property.type === 'integer') {
      if (typeof fieldValue !== 'number' || !Number.isInteger(fieldValue)) {
        errors.push(`Field ${key} must be an integer`)
        continue
      }

      if (property.minimum !== undefined && fieldValue < property.minimum) {
        errors.push(`Field ${key} must be >= ${property.minimum}`)
      }

      if (property.maximum !== undefined && fieldValue > property.maximum) {
        errors.push(`Field ${key} must be <= ${property.maximum}`)
      }
    }

    if (property.type === 'object') {
      if (!isRecord(fieldValue)) {
        errors.push(`Field ${key} must be an object`)
        continue
      }

      if (property.additionalProperties?.type === 'string') {
        for (const [entryKey, entryValue] of Object.entries(fieldValue)) {
          if (typeof entryValue !== 'string') {
            errors.push(`Field ${key}.${entryKey} must be a string`)
          }
        }
      }
    }
  }

  return errors
}
