import { createDoomAdapter } from '../../../../../packages/doom-adapter/src/index.js'
import type { SessionBootstrap } from '../../session/bootstrap.js'

export async function renderPlayPage(
  root: HTMLDivElement,
  route: {
    type: 'play'
    session: SessionBootstrap
  },
) {
  const launchUrl = `${window.location.origin}/doom/play?session=${encodeURIComponent(route.session.sessionToken)}`

  root.innerHTML = `
    <main class="play-shell">
      <header class="play-meta">
        <span class="play-line">Session: ${route.session.sessionToken}</span>
        <span class="play-line">${launchUrl}</span>
      </header>

      <div class="play-status" id="runtime-status">Booting runtime…</div>

      <div class="play-actions">
        <button id="focus-button" class="button button-primary" type="button">Capture keyboard</button>
        <button id="pause-button" class="button button-secondary" type="button">Pause input</button>
        <button id="fullscreen-button" class="button button-secondary" type="button">Fullscreen</button>
      </div>

      <section class="play-stage" id="stage-frame">
        <div class="focus-overlay" id="focus-overlay">
          <p>Click the canvas or Capture Keyboard to route input into DOOM.</p>
        </div>
        <canvas id="canvas" class="doom-canvas" tabindex="0"></canvas>
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
