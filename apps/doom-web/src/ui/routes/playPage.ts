import { createDoomAdapter } from '../../../../../packages/doom-adapter/src/index.js'
import { buildLaunchUrl } from '../../session/launchUrl.js'
import type { SessionBootstrap } from '../../session/bootstrap.js'

export async function renderPlayPage(
  root: HTMLDivElement,
  route: {
    type: 'play'
    session: SessionBootstrap
  },
) {
  const bootstrapCopy =
    route.session.bootstrapSource === 'signed-token-local'
      ? 'This launch is driven directly by a signed session token.'
      : 'Legacy query-string bootstrap is active for local demo sessions.'

  const launchUrl = buildLaunchUrl({
    sessionToken: route.session.sessionToken,
    contentMode: route.session.contentMode,
    contentPath: route.session.contentPath,
  })

  root.innerHTML = `
    <main class="play-shell">
      <header class="play-header panel">
        <div>
          <p class="eyebrow">Session</p>
          <h1>${route.session.sessionToken}</h1>
          <p class="meta-copy">
            ${bootstrapCopy}
          </p>
        </div>
        <div class="session-metadata">
          <span class="session-chip">Mode: ${route.session.contentMode}</span>
          <span class="session-chip">Launch: ${launchUrl}</span>
        </div>
      </header>

      <section class="play-layout">
        <div class="play-stage panel">
          <div class="stage-toolbar">
            <div class="status-stack">
              <p class="eyebrow">Runtime</p>
              <strong id="runtime-status">Booting runtime…</strong>
            </div>
            <div class="toolbar-actions">
              <button id="focus-button" class="button button-primary" type="button">Capture Keyboard</button>
              <button id="pause-button" class="button button-secondary" type="button">Pause Input</button>
              <button id="fullscreen-button" class="button button-secondary" type="button">Fullscreen</button>
            </div>
          </div>

          <div class="stage-frame" id="stage-frame">
            <div class="focus-overlay" id="focus-overlay">
              <p>Click the canvas or use Capture Keyboard to route keys into DOOM.</p>
            </div>
            <canvas id="canvas" class="doom-canvas" tabindex="0"></canvas>
          </div>

          <p class="stage-footnote">
            The shell avoids top-level navigation assumptions so it can live inside an iframe. Focus is explicit to prevent stealing parent-page keyboard input.
          </p>
        </div>
      </section>
    </main>
  `

  const canvas = root.querySelector<HTMLCanvasElement>('#canvas')
  const status = root.querySelector<HTMLElement>('#runtime-status')
  const focusOverlay = root.querySelector<HTMLElement>('#focus-overlay')
  const stageFrame = root.querySelector<HTMLElement>('#stage-frame')
  const focusButton = root.querySelector<HTMLButtonElement>('#focus-button')
  const pauseButton = root.querySelector<HTMLButtonElement>('#pause-button')
  const fullscreenButton = root.querySelector<HTMLButtonElement>('#fullscreen-button')

  if (!canvas || !status || !focusOverlay || !stageFrame || !focusButton || !pauseButton || !fullscreenButton) {
    throw new Error('Play page elements were not rendered correctly')
  }

  const adapter = createDoomAdapter()

  const updateStatus = (message: string) => {
    status.textContent = message
  }

  const captureInput = () => {
    adapter.resume()
    canvas.focus()
    focusOverlay.dataset.visible = 'false'
    updateStatus('Running')
  }

  canvas.addEventListener('pointerdown', captureInput)
  canvas.addEventListener('focus', () => {
    focusOverlay.dataset.visible = 'false'
  })

  window.addEventListener('blur', () => {
    focusOverlay.dataset.visible = 'true'
  })

  focusButton.addEventListener('click', captureInput)
  pauseButton.addEventListener('click', () => {
    adapter.pause()
    focusOverlay.dataset.visible = 'true'
    updateStatus('Input paused')
  })

  fullscreenButton.addEventListener('click', async () => {
    if (document.fullscreenElement) {
      await document.exitFullscreen()
      return
    }

    await stageFrame.requestFullscreen()
  })

  try {
    updateStatus('Loading Freedoom content…')
    await adapter.initialize({
      canvas,
      contentMode: route.session.contentMode,
      contentPath: route.session.contentPath,
      sessionToken: route.session.sessionToken,
    })

    updateStatus('Starting engine…')
    await adapter.start()
    updateStatus('Ready for input')
  } catch (error) {
    updateStatus('Failed to start')
    focusOverlay.dataset.visible = 'true'
    focusOverlay.innerHTML = `<p>${String(error instanceof Error ? error.message : error)}</p>`
  }
}
