import { createDoomAdapter } from '../../../../../packages/doom-adapter/src/index.js'
import { bootstrapSessionFromLaunchUrl } from '../../session/bootstrap.js'

declare global {
  interface Window {
    __doomAssetBaseUrl__?: string
    __doomWidgetLaunchUrl__?: string
  }
}

function sendWidgetSizeChanged(width: number, height: number) {
  window.parent.postMessage(
    {
      jsonrpc: '2.0',
      method: 'ui/notifications/size-changed',
      params: {
        width,
        height,
      },
    },
    '*',
  )
}

function requestWidgetSize(width: number, height: number) {
  sendWidgetSizeChanged(width, height)
}

function ensureWidgetShell() {
  document.body.innerHTML = ''
  document.documentElement.style.width = '100%'
  document.documentElement.style.height = '100%'
  document.body.style.margin = '0'
  document.body.style.width = '100%'
  document.body.style.height = '100%'
  document.body.style.overflow = 'hidden'
  document.body.style.background = '#050505'
  document.body.style.color = '#e5e7eb'
  document.body.style.fontFamily = 'system-ui, sans-serif'

  const root = document.createElement('main')
  root.style.width = '100%'
  root.style.height = '100%'
  root.style.position = 'relative'
  root.style.display = 'grid'
  root.style.placeItems = 'center'
  root.style.background = 'linear-gradient(180deg, rgba(255,255,255,0.04), rgba(0,0,0,0.14))'
  root.style.padding = '12px'

  const canvas = document.createElement('canvas')
  canvas.id = 'canvas'
  canvas.tabIndex = 0
  canvas.width = 800
  canvas.height = 600
  canvas.style.display = 'block'
  canvas.style.width = '100%'
  canvas.style.height = '100%'
  canvas.style.background = '#000'
  canvas.style.outline = 'none'

  const stage = document.createElement('section')
  stage.style.position = 'relative'
  stage.style.width = '100%'
  stage.style.maxWidth = 'min(100%, calc((100vh - 24px) * 4 / 3))'
  stage.style.aspectRatio = '4 / 3'
  stage.style.borderRadius = '20px'
  stage.style.overflow = 'hidden'
  stage.style.border = '1px solid rgba(255, 255, 255, 0.08)'
  stage.style.background = '#000'
  stage.style.display = 'block'

  const status = document.createElement('p')
  status.id = 'doom-widget-status'
  status.style.position = 'absolute'
  status.style.left = '12px'
  status.style.top = '12px'
  status.style.margin = '0'
  status.style.padding = '0.35rem 0.5rem'
  status.style.borderRadius = '0.4rem'
  status.style.background = 'rgba(0, 0, 0, 0.65)'
  status.style.color = '#f3f4f6'
  status.style.fontSize = '12px'
  status.style.lineHeight = '1.2'
  status.style.maxWidth = 'calc(100% - 24px)'

  canvas.style.position = 'absolute'
  canvas.style.inset = '0'

  stage.append(canvas, status)
  root.append(stage)
  document.body.append(root)

  const reportSize = () => {
    requestWidgetSize(800, 600)
  }

  const resizeObserver = new ResizeObserver(reportSize)
  resizeObserver.observe(root)
  queueMicrotask(reportSize)

  return { canvas, status }
}

async function bootWidget(launchUrl: string) {
  const { canvas, status } = ensureWidgetShell()
  const assetBaseUrl = new URL('/doom/', launchUrl).toString()
  window.__doomAssetBaseUrl__ = assetBaseUrl

  status.textContent = 'Loading DOOM runtime…'
  const session = await bootstrapSessionFromLaunchUrl(launchUrl)

  const adapter = createDoomAdapter()

  try {
    await adapter.initialize({
      canvas,
      contentMode: session.contentMode,
      contentPath: session.contentPath,
      sessionToken: session.sessionToken,
      contentBaseUrl: assetBaseUrl,
    })

    status.textContent = 'Starting engine…'
    await adapter.start()
    status.textContent = 'Ready for input'
    canvas.focus()

    canvas.addEventListener('pointerdown', () => {
      adapter.resume()
      canvas.focus()
      status.textContent = 'Running'
    })

    window.addEventListener('blur', () => {
      status.textContent = 'Click the canvas to capture keyboard'
    })
  } catch (error) {
    status.textContent = `Failed to start: ${String(error instanceof Error ? error.message : error)}`
  }
}

const launchUrl = window.__doomWidgetLaunchUrl__
if (launchUrl) {
  void bootWidget(launchUrl)
} else {
  document.body.textContent = 'Waiting for DOOM session launch URL…'
}
