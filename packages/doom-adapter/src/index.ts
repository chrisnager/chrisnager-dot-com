import { resolveContentBytes } from './runtime/content.js'
import { DEFAULT_CFG_TEXT } from './runtime/assetUrls.js'
import { loadDoomWasmModule } from './runtime/doomWasmLoader.js'
import type { DoomAdapter, DoomInitializeOptions } from './types.js'

export function createDoomAdapter(): DoomAdapter {
  let initialized = false
  let started = false
  let bootPromise: Promise<void> | null = null
  let canvas: HTMLCanvasElement | null = null

  return {
    async initialize(options: DoomInitializeOptions) {
      if (initialized) {
        throw new Error('DOOM adapter is already initialized for this page load')
      }

      initialized = true
      canvas = options.canvas

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
  }
}

export type { DoomAdapter, DoomContentMode, DoomInitializeOptions } from './types.js'
