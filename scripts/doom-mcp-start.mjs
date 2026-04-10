import { spawn } from 'node:child_process'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDir = fileURLToPath(new URL('..', import.meta.url))
const env = { ...process.env }

delete env.NODE_OPTIONS

const child = spawn(
  process.execPath,
  ['--experimental-default-type=module', join(rootDir, '.doom-build', 'apps', 'mcp-server', 'src', 'server.js')],
  {
    cwd: rootDir,
    stdio: 'inherit',
    env,
  },
)

child.on('exit', (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal)
    return
  }

  process.exit(code ?? 0)
})
