import { mkdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDir = fileURLToPath(new URL('..', import.meta.url))
const buildRoot = join(rootDir, '.doom-build')

await mkdir(buildRoot, { recursive: true })
await writeFile(
  join(buildRoot, 'package.json'),
  JSON.stringify(
    {
      type: 'module',
    },
    null,
    2,
  ),
)
