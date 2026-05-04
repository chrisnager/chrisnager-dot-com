import { spawn, spawnSync } from 'node:child_process'
import { createReadStream, existsSync } from 'node:fs'
import { stat } from 'node:fs/promises'
import http from 'node:http'
import { extname, join, normalize } from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDir = fileURLToPath(new URL('../..', import.meta.url))
const buildDir = join(rootDir, '.doom-build')
const staticDir = join(rootDir, 'static')
const webDir = join(rootDir, 'apps', 'doom-web')
const publicDir = join(webDir, 'public')
const host = process.env.HOST || '127.0.0.1'
const port = Number(process.env.PORT || 4321)

const mimeTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.map': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.ttf': 'font/ttf',
  '.wasm': 'application/wasm',
}

function writeBuildPackage() {
  spawnSync(process.execPath, [join(rootDir, 'doom', 'scripts', 'doom-write-build-package.mjs')], {
    cwd: rootDir,
    stdio: 'inherit',
  })
}

function runInitialCompile() {
  const result = spawnSync('yarn', ['tsc', '-p', 'doom/tsconfig.json'], {
    cwd: rootDir,
    stdio: 'inherit',
  })

  if (result.status !== 0) {
    process.exit(result.status ?? 1)
  }

  writeBuildPackage()
}

function startWatcher() {
  return spawn('yarn', ['tsc', '-p', 'doom/tsconfig.json', '--watch', '--preserveWatchOutput'], {
    cwd: rootDir,
    stdio: 'inherit',
  })
}

function mapRequestToFile(pathname) {
  if (pathname === '/' || pathname === '/play' || pathname === '/index.html') {
    return join(webDir, 'index.html')
  }

  const publicFile = join(publicDir, pathname)
  if (existsSync(publicFile)) {
    return publicFile
  }

  if (pathname === '/src/styles.css') {
    return join(webDir, 'src', 'styles.css')
  }

  if (pathname.startsWith('/doom/fonts/')) {
    return join(staticDir, 'fonts', decodeURIComponent(pathname.replace('/doom/fonts/', '')))
  }

  if (pathname.startsWith('/src/')) {
    return join(buildDir, 'apps', 'doom-web', pathname)
  }

  if (pathname.startsWith('/packages/')) {
    return join(buildDir, pathname)
  }

  if (!extname(pathname)) {
    return join(webDir, 'index.html')
  }

  return null
}

async function serveFile(filePath, response) {
  const normalized = normalize(filePath)
  const allowedRoots = [buildDir, webDir, publicDir, staticDir]

  if (!allowedRoots.some((root) => normalized.startsWith(root))) {
    response.writeHead(403, { 'content-type': 'text/plain; charset=utf-8' })
    response.end('Forbidden')
    return
  }

  if (!existsSync(normalized)) {
    response.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' })
    response.end('Not Found')
    return
  }

  const fileStats = await stat(normalized)
  if (!fileStats.isFile()) {
    response.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' })
    response.end('Not Found')
    return
  }

  response.writeHead(200, {
    'cache-control': 'no-store',
    'content-type': mimeTypes[extname(normalized)] || 'application/octet-stream',
  })

  createReadStream(normalized).pipe(response)
}

runInitialCompile()
const watcher = startWatcher()

const server = http.createServer(async (request, response) => {
  try {
    const url = new URL(request.url || '/', `http://${request.headers.host || `${host}:${port}`}`)
    const filePath = mapRequestToFile(url.pathname)

    if (!filePath) {
      response.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' })
      response.end('Not Found')
      return
    }

    await serveFile(filePath, response)
  } catch (error) {
    response.writeHead(500, { 'content-type': 'text/plain; charset=utf-8' })
    response.end(String(error))
  }
})

server.listen(port, host, () => {
  console.log(`doom phase 1 dev server running at http://${host}:${port}`)
  console.log(`open http://${host}:${port}/play?session=demo123`)
})

function shutdown() {
  watcher.kill('SIGTERM')
  server.close(() => process.exit(0))
}

process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)
