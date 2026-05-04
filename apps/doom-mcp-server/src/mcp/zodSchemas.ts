import { z } from 'zod'

export const createDoomSessionInputSchema = z.object({
  host_origin: z.string().url(),
  content_mode: z.enum(['freedoom-phase1', 'custom-url']).optional(),
  content_path: z.string().min(1).optional(),
  session_ttl_seconds: z.number().int().min(60).max(86400).optional(),
  metadata: z.record(z.string(), z.string()).optional(),
})
