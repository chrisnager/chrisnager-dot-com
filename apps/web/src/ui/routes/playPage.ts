import { createDoomAdapter } from '../../../../../packages/doom-adapter/src/index.js'
import { buildLaunchUrl } from '../../session/launchUrl.js'
import { createBrowserSaveApi } from '../../session/saveApi.js'
import type { SessionBootstrap } from '../../session/bootstrap.js'

export async function renderPlayPage(
  root: HTMLDivElement,
  route: {
    type: 'play'
    session: SessionBootstrap
  },
) {
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
            Fake bootstrap from the URL for Phase 1. Later phases should replace this with a signed session bootstrap.
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
              <button id="save-button" class="button button-secondary" type="button">Save Slot 1</button>
              <button id="load-button" class="button button-secondary" type="button">Load Slot 1</button>
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

        <aside class="controls-drawer panel">
          <p class="eyebrow">Controls Drawer</p>
          <h2>Defaults</h2>
          <dl class="controls-list">
            <div><dt>Move</dt><dd>Arrow keys</dd></div>
            <div><dt>Fire</dt><dd>Ctrl</dd></div>
            <div><dt>Use</dt><dd>Space</dd></div>
            <div><dt>Run</dt><dd>Shift</dd></div>
            <div><dt>Fullscreen</dt><dd>Toolbar button</dd></div>
          </dl>

          <div class="panel callout-panel">
            <p class="eyebrow">MCP Hooks</p>
            <p class="meta-copy">
              Session bootstrap, launch URL creation, and save/load transport all live behind small modules so an MCP server can replace the Phase 1 browser-local placeholders.
            </p>
          </div>
        </aside>
      </section>
    </main>
  `

  const canvas = root.querySelector<HTMLCanvasElement>('#canvas')
  const status = root.querySelector<HTMLElement>('#runtime-status')
  const focusOverlay = root.querySelector<HTMLElement>('#focus-overlay')
  const stageFrame = root.querySelector<HTMLElement>('#stage-frame')
  const focusButton = root.querySelector<HTMLButtonElement>('#focus-button')
  const pauseButton = root.querySelector<HTMLButtonElement>('#pause-button')
  const saveButton = root.querySelector<HTMLButtonElement>('#save-button')
  const loadButton = root.querySelector<HTMLButtonElement>('#load-button')
  const fullscreenButton = root.querySelector<HTMLButtonElement>('#fullscreen-button')

  if (!canvas || !status || !focusOverlay || !stageFrame || !focusButton || !pauseButton || !saveButton || !loadButton || !fullscreenButton) {
    throw new Error('Play page elements were not rendered correctly')
  }

  const adapter = createDoomAdapter()
  const saveApi = createBrowserSaveApi(route.session.sessionToken)

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

  saveButton.addEventListener('click', async () => {
    const snapshot = await adapter.save('1')
    await saveApi.save(snapshot)
    updateStatus(`Saved slot 1 at ${new Date(snapshot.savedAt).toLocaleTimeString()}`)
  })

  loadButton.addEventListener('click', async () => {
    const snapshot = await saveApi.load('1')
    const restored = await adapter.load('1', snapshot ?? undefined)

    updateStatus(restored ? `Loaded slot 1 from ${new Date(restored.savedAt).toLocaleTimeString()}` : 'No saved slot found')
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
