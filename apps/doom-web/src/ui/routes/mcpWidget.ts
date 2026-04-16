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

function ensureWidgetShell() {
  document.body.innerHTML = ''
  document.documentElement.style.width = '100%'
  document.documentElement.style.height = '100%'
  document.body.style.margin = '0'
  document.body.style.width = '100%'
  document.body.style.height = '100%'
  document.body.style.overflow = 'hidden'
  document.body.style.background = '#000'
  document.body.style.color = '#e5e7eb'
  document.body.style.fontFamily = 'system-ui, sans-serif'

  const root = document.createElement('main')
  root.style.width = '100%'
  root.style.height = '100%'
  root.style.position = 'relative'
  root.style.display = 'grid'
  root.style.gridTemplateRows = 'auto 1fr'
  root.style.background = '#000'

  const stage = document.createElement('section')
  stage.style.position = 'relative'
  stage.style.width = '100%'
  stage.style.aspectRatio = '4 / 3'
  stage.style.background = '#000'
  stage.style.justifySelf = 'center'

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

  canvas.style.position = 'absolute'
  canvas.style.inset = '0'

  stage.append(canvas)
  root.append(stage)
  document.body.append(root)

  const reportSize = () => {
    const rect = stage.getBoundingClientRect()
    sendWidgetSizeChanged(Math.round(rect.width), Math.round(rect.height))
  }

  const resizeObserver = new ResizeObserver(reportSize)
  resizeObserver.observe(stage)
  queueMicrotask(reportSize)

  return { canvas, reportSize }
}

async function bootWidget(launchUrl: string) {
  const { canvas } = ensureWidgetShell()
  const assetBaseUrl = new URL('/doom/', launchUrl).toString()
  window.__doomAssetBaseUrl__ = assetBaseUrl

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

    await adapter.start()
    canvas.focus()

    canvas.addEventListener('pointerdown', () => {
      adapter.resume()
      canvas.focus()
    })
  } catch (error) {
    document.body.style.background = '#000'
    document.body.textContent = `Failed to start: ${String(error instanceof Error ? error.message : error)}`
  }
}

const launchUrl = window.__doomWidgetLaunchUrl__
if (launchUrl) {
  void bootWidget(launchUrl)
} else {
  document.body.style.background = '#000'
}
