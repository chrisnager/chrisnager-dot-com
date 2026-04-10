import { spawn, spawnSync } from 'node:child_process'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDir = fileURLToPath(new URL('..', import.meta.url))
const tscPath = join(rootDir, 'node_modules', 'typescript', 'bin', 'tsc')
const runtimeEnv = { ...process.env }
let serverProcess = null
let hasObservedInitialWatchReady = false

delete runtimeEnv.NODE_OPTIONS

function runInitialCompile() {
  const result = spawnSync(process.execPath, [tscPath, '-p', 'tsconfig.doom.json'], {
    cwd: rootDir,
    stdio: 'inherit',
  })

  if (result.status !== 0) {
    process.exit(result.status ?? 1)
  }
}

function spawnServer() {
  serverProcess = spawn(
    process.execPath,
    ['--experimental-default-type=module', join(rootDir, '.doom-build', 'apps', 'mcp-server', 'src', 'server.js')],
    {
      cwd: rootDir,
      stdio: 'inherit',
      env: runtimeEnv,
    },
  )

  serverProcess.on('exit', () => {
    serverProcess = null
  })
}

function restartServer() {
  if (!serverProcess) {
    spawnServer()
    return
  }

  const exitingProcess = serverProcess
  exitingProcess.once('exit', () => {
    spawnServer()
  })
  exitingProcess.kill('SIGTERM')
}

runInitialCompile()
spawnServer()

const watcher = spawn(process.execPath, [tscPath, '-p', 'tsconfig.doom.json', '--watch', '--preserveWatchOutput'], {
  cwd: rootDir,
  stdio: ['ignore', 'pipe', 'inherit'],
})

watcher.stdout.setEncoding('utf8')
watcher.stdout.on('data', (chunk) => {
  process.stdout.write(chunk)

  if (chunk.includes('Found 0 errors. Watching for file changes.')) {
    if (!hasObservedInitialWatchReady) {
      hasObservedInitialWatchReady = true
      return
    }

    restartServer()
  }
})

function shutdown() {
  watcher.kill('SIGTERM')

  if (serverProcess) {
    serverProcess.kill('SIGTERM')
  }

  process.exit(0)
}

process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)
