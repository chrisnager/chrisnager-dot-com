import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDir = fileURLToPath(new URL('../..', import.meta.url))
const doomDistDir = join(rootDir, 'apps', 'doom-web', 'dist')
const publicDir = join(rootDir, 'public')
const headersPath = join(publicDir, '_headers')
const doomFrameAncestors = "frame-ancestors 'self' https: http://localhost:* http://127.0.0.1:*"

const targets = [join(publicDir, 'doom')]

for (const target of targets) {
  await rm(target, { force: true, recursive: true })
}

await mkdir(join(publicDir, 'doom', 'play'), { recursive: true })
await mkdir(join(publicDir, 'doom', 'vendor'), { recursive: true })
await mkdir(join(publicDir, 'doom', 'content'), { recursive: true })

await cp(join(doomDistDir, 'index.html'), join(publicDir, 'doom', 'index.html'))
await cp(join(doomDistDir, 'index.html'), join(publicDir, 'doom', 'play', 'index.html'))
await cp(join(doomDistDir, 'src'), join(publicDir, 'doom', 'src'), { recursive: true })
await cp(join(doomDistDir, 'packages'), join(publicDir, 'doom', 'packages'), { recursive: true })
await cp(join(doomDistDir, 'vendor', 'doom'), join(publicDir, 'doom', 'vendor', 'doom'), { recursive: true })
await cp(join(doomDistDir, 'content', 'freedoom'), join(publicDir, 'doom', 'content', 'freedoom'), { recursive: true })

try {
  const currentHeaders = await readFile(headersPath, 'utf8')
  const sanitizedHeaders = currentHeaders.replace(/^\s*x-frame-options:\s*DENY\s*\n/gim, '')
  const doomHeaders = [
    '/doom',
    `  content-security-policy: ${doomFrameAncestors}`,
    '/doom/*',
    `  content-security-policy: ${doomFrameAncestors}`,
    '',
  ].join('\n')

  await writeFile(headersPath, `${sanitizedHeaders.trimEnd()}\n\n${doomHeaders}`)
} catch (error) {
  console.warn(`skipping DOOM header patch: ${String(error)}`)
}

console.log(`synced DOOM web app into ${publicDir}`)
