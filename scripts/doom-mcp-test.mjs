import { spawnSync } from 'node:child_process'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDir = fileURLToPath(new URL('..', import.meta.url))
const tscPath = join(rootDir, 'node_modules', 'typescript', 'bin', 'tsc')
const runtimeEnv = { ...process.env }

delete runtimeEnv.NODE_OPTIONS

const compileResult = spawnSync(process.execPath, [tscPath, '-p', 'tsconfig.doom.json'], {
  cwd: rootDir,
  stdio: 'inherit',
  env: runtimeEnv,
})

if (compileResult.status !== 0) {
  process.exit(compileResult.status ?? 1)
}

const testResult = spawnSync(
  process.execPath,
  [
    '--experimental-default-type=module',
    '--test',
    join(rootDir, '.doom-build', 'apps', 'mcp-server', 'src', 'tests', 'token.test.js'),
    join(rootDir, '.doom-build', 'apps', 'mcp-server', 'src', 'tests', 'tools.test.js'),
  ],
  {
    cwd: rootDir,
    stdio: 'inherit',
    env: runtimeEnv,
  },
)

process.exit(testResult.status ?? 1)
