import type { DoomContentMode } from '../types.js'
import { extractZipEntry } from './zip.js'

async function fetchBytes(url: string) {
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status}`)
  }

  return new Uint8Array(await response.arrayBuffer())
}

function resolveBaseUrl(contentBaseUrl?: string) {
  if (!contentBaseUrl) {
    return undefined
  }

  return contentBaseUrl.endsWith('/') ? contentBaseUrl : `${contentBaseUrl}/`
}

function normalizeDefaultContentPath(contentPath?: string) {
  if (!contentPath) {
    return 'content/freedoom/freedoom1.wad'
  }

  if (contentPath.endsWith('.wad') || contentPath.endsWith('.zip') || contentPath.startsWith('http://') || contentPath.startsWith('https://') || contentPath.startsWith('/')) {
    return contentPath
  }

  return 'content/freedoom/freedoom1.wad'
}

export async function resolveContentBytes(contentMode: DoomContentMode, contentPath?: string, contentBaseUrl?: string) {
  const baseUrl = resolveBaseUrl(contentBaseUrl)

  if (contentMode === 'custom-url') {
    if (!contentPath) {
      throw new Error('custom-url mode requires a contentPath')
    }

    const sourceUrl = new URL(contentPath, baseUrl || `${window.location.origin}/doom/`).toString()

    if (sourceUrl.endsWith('.zip')) {
      return extractZipEntry(await fetchBytes(sourceUrl), 'freedoom1.wad')
    }

    return fetchBytes(sourceUrl)
  }

  const sourceUrl = baseUrl
    ? new URL(normalizeDefaultContentPath(contentPath), baseUrl).toString()
    : new URL(normalizeDefaultContentPath(contentPath) || '/doom/content/freedoom/freedoom1.wad', `${window.location.origin}/`).toString()

  if (sourceUrl.endsWith('.zip')) {
    return extractZipEntry(await fetchBytes(sourceUrl), 'freedoom1.wad')
  }

  return fetchBytes(sourceUrl)
}
