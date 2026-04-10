import { z } from 'zod'

export const createDoomSessionInputSchema = z.object({
  host_origin: z.string().url(),
  content_mode: z.enum(['freedoom-phase1', 'custom-url']).optional(),
  content_path: z.string().min(1).optional(),
  session_ttl_seconds: z.number().int().min(60).max(86400).optional(),
  metadata: z.record(z.string(), z.string()).optional(),
})

export const getDoomLaunchUrlInputSchema = z.object({
  session_id: z.string().min(1),
  host_origin: z.string().url().optional(),
})

export const getDoomStatusInputSchema = z.object({
  session_id: z.string().min(1),
})

export const saveDoomGameInputSchema = z.object({
  session_id: z.string().min(1),
  slot: z.string().min(1),
  save_data_base64: z.string().optional(),
  screenshot_data_url: z.string().optional(),
  metadata: z.record(z.string(), z.string()).optional(),
})

export const loadDoomGameInputSchema = z.object({
  session_id: z.string().min(1),
  slot: z.string().min(1),
})

export const captureDoomScreenshotInputSchema = z.object({
  session_id: z.string().min(1),
})
