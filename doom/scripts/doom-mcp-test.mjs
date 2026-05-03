import { spawnSync } from 'node:child_process'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDir = fileURLToPath(new URL('../..', import.meta.url))
const runtimeEnv = { ...process.env }

delete runtimeEnv.NODE_OPTIONS

const compileResult = spawnSync('yarn', ['tsc', '-p', 'doom/tsconfig.json'], {
  cwd: rootDir,
  stdio: 'inherit',
  env: runtimeEnv,
})

if (compileResult.status !== 0) {
  process.exit(compileResult.status ?? 1)
}

const buildPackage = spawnSync(process.execPath, [join(rootDir, 'doom', 'scripts', 'doom-write-build-package.mjs')], {
  cwd: rootDir,
  stdio: 'inherit',
  env: runtimeEnv,
})

if (buildPackage.status !== 0) {
  process.exit(buildPackage.status ?? 1)
}

const testResult = spawnSync(
  process.execPath,
  [
    '--experimental-default-type=module',
    '--test',
    join(rootDir, '.doom-build', 'apps', 'doom-mcp-server', 'src', 'tests', 'token.test.js'),
    join(rootDir, '.doom-build', 'apps', 'doom-mcp-server', 'src', 'tests', 'tools.test.js'),
  ],
  {
    cwd: rootDir,
    stdio: 'inherit',
    env: runtimeEnv,
  },
)

process.exit(testResult.status ?? 1)
