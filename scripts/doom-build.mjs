import { spawnSync } from 'node:child_process'
import { cp, mkdir, rm, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDir = fileURLToPath(new URL('..', import.meta.url))
const buildRoot = join(rootDir, '.doom-build')
const webDir = join(rootDir, 'apps', 'web')
const distDir = join(webDir, 'dist')

const tscResult = spawnSync(
  process.execPath,
  [join(rootDir, 'node_modules', 'typescript', 'bin', 'tsc'), '-p', 'tsconfig.doom.json'],
  {
    cwd: rootDir,
    stdio: 'inherit',
  },
)

if (tscResult.status !== 0) {
  process.exit(tscResult.status ?? 1)
}

await rm(distDir, { force: true, recursive: true })
await mkdir(join(distDir, 'src'), { recursive: true })

await cp(join(webDir, 'index.html'), join(distDir, 'index.html'))
await cp(join(webDir, 'public'), distDir, { recursive: true })
await cp(join(webDir, 'src', 'styles.css'), join(distDir, 'src', 'styles.css'))
await cp(join(buildRoot, 'apps', 'web', 'src'), join(distDir, 'src'), { recursive: true })
await cp(join(buildRoot, 'packages'), join(distDir, 'packages'), { recursive: true })
await cp(join(distDir, 'index.html'), join(distDir, '404.html'))
await writeFile(join(distDir, '_redirects'), '/* /index.html 200\n')

console.log(`doom phase 1 build written to ${distDir}`)
