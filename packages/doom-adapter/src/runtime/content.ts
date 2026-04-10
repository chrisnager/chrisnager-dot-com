import type { DoomContentMode } from '../types.js'
import { FREEDOOM_PHASE1_CONTENT_URL } from './assetUrls.js'
import { extractZipEntry } from './zip.js'

async function fetchBytes(url: string) {
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status}`)
  }

  return new Uint8Array(await response.arrayBuffer())
}

export async function resolveContentBytes(contentMode: DoomContentMode, contentPath?: string) {
  if (contentMode === 'custom-url') {
    if (!contentPath) {
      throw new Error('custom-url mode requires a contentPath')
    }

    if (contentPath.endsWith('.zip')) {
      return extractZipEntry(await fetchBytes(contentPath), 'freedoom1.wad')
    }

    return fetchBytes(contentPath)
  }

  const sourceUrl = contentPath || FREEDOOM_PHASE1_CONTENT_URL

  if (sourceUrl.endsWith('.zip')) {
    return extractZipEntry(await fetchBytes(sourceUrl), 'freedoom1.wad')
  }

  return fetchBytes(sourceUrl)
}
