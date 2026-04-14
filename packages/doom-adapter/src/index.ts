import { resolveContentBytes } from './runtime/content.js'
import { DEFAULT_CFG_TEXT } from './runtime/assetUrls.js'
import { loadDoomWasmModule } from './runtime/doomWasmLoader.js'
import type { DoomAdapter, DoomInitializeOptions, DoomSaveSnapshot } from './types.js'

const SAVE_FILE_TEMPLATE = 'doomsav%s.dsg'

function encodeBase64(bytes: Uint8Array) {
  let binary = ''

  for (const byte of bytes) {
    binary += String.fromCharCode(byte)
  }

  return window.btoa(binary)
}

function decodeBase64(value: string) {
  const binary = window.atob(value)
  const bytes = new Uint8Array(binary.length)

  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index)
  }

  return bytes
}

function getSavePath(slot: string) {
  return SAVE_FILE_TEMPLATE.replace('%s', slot)
}

export function createDoomAdapter(): DoomAdapter {
  let initialized = false
  let started = false
  let bootPromise: Promise<void> | null = null
  let canvas: HTMLCanvasElement | null = null
  let sessionToken: string | undefined

  const getModule = () => {
    if (!window.Module) {
      throw new Error('DOOM runtime is not available')
    }

    return window.Module
  }

  return {
    async initialize(options: DoomInitializeOptions) {
      if (initialized) {
        throw new Error('DOOM adapter is already initialized for this page load')
      }

      initialized = true
      canvas = options.canvas
      sessionToken = options.sessionToken

      canvas.width = 800
      canvas.height = 600

      const contentBytes = await resolveContentBytes(options.contentMode, options.contentPath, options.contentBaseUrl)
      const configBytes = new TextEncoder().encode(DEFAULT_CFG_TEXT)

      bootPromise = new Promise<void>((resolve, reject) => {
        const moduleConfig = {
          canvas: options.canvas,
          noInitialRun: true,
          onRuntimeInitialized: () => resolve(),
          preRun: [
            () => {
              // Write the runtime assets directly into the virtual filesystem to avoid blob-backed preload URLs.
              window.Module?.FS.writeFile('doom1.wad', contentBytes)
              window.Module?.FS.writeFile('default.cfg', configBytes)
            },
          ],
          print: (text: string) => console.log(text),
          printErr: (text: string) => console.error(text),
          setStatus: (text: string) => console.log(text),
        }

        void loadDoomWasmModule(moduleConfig).catch(reject)
      })

      await bootPromise
    },

    async start() {
      if (!bootPromise) {
        throw new Error('initialize() must complete before start()')
      }

      if (started) {
        return
      }

      await bootPromise

      if (!window.callMain) {
        throw new Error('cloudflare/doom-wasm did not expose callMain')
      }

      window.callMain([
        '-iwad',
        'doom1.wad',
        '-window',
        '-nogui',
        '-nomusic',
        '-config',
        'default.cfg',
        '-servername',
        'doomflare',
        '-nodes',
        '4',
      ])
      started = true
    },

    pause() {
      canvas?.blur()
    },

    resume() {
      canvas?.focus()
    },

    destroy() {
      this.pause()

      if (canvas) {
        const context = canvas.getContext('2d')
        context?.clearRect(0, 0, canvas.width, canvas.height)
      }
    },

    async save(slot: string) {
      const module = getModule()
      const savePath = getSavePath(slot)
      const screenshotDataUrl = this.screenshot()
      const snapshot: DoomSaveSnapshot = {
        slot,
        savedAt: new Date().toISOString(),
        sessionToken,
        screenshotDataUrl,
      }

      if (module.FS.analyzePath(savePath).exists) {
        snapshot.saveFileBase64 = encodeBase64(module.FS.readFile(savePath))
      }

      return snapshot
    },

    async load(slot: string, snapshot?: DoomSaveSnapshot) {
      const module = getModule()

      if (!snapshot) {
        return null
      }

      if (snapshot.saveFileBase64) {
        module.FS.writeFile(getSavePath(slot), decodeBase64(snapshot.saveFileBase64))
      }

      return snapshot
    },

    screenshot() {
      if (!canvas) {
        throw new Error('Canvas is not initialized')
      }

      return canvas.toDataURL('image/png')
    },
  }
}

export type { DoomAdapter, DoomContentMode, DoomInitializeOptions, DoomSaveSnapshot } from './types.js'
