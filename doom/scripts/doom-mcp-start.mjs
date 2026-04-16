import { spawn } from 'node:child_process'
import { spawnSync } from 'node:child_process'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDir = fileURLToPath(new URL('../..', import.meta.url))
const env = { ...process.env }

delete env.NODE_OPTIONS

const buildPackage = spawnSync(process.execPath, [join(rootDir, 'doom', 'scripts', 'doom-write-build-package.mjs')], {
  cwd: rootDir,
  stdio: 'inherit',
})

if (buildPackage.status !== 0) {
  process.exit(buildPackage.status ?? 1)
}

const child = spawn('yarn', ['node', join(rootDir, '.doom-build', 'apps', 'doom-mcp-server', 'src', 'server.js')], {
  cwd: rootDir,
  stdio: 'inherit',
  env,
})

child.on('exit', (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal)
    return
  }

  process.exit(code ?? 0)
})
