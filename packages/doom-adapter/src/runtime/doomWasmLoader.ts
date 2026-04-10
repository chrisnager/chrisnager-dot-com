import { getDoomWasmBaseUrl, getDoomWasmScriptUrl } from './assetUrls.js'

interface DoomFileSystem {
  analyzePath(path: string): { exists: boolean }
  createPreloadedFile(
    parent: string,
    name: string,
    url: string,
    canRead: boolean,
    canWrite: boolean,
    onload?: () => void,
    onerror?: () => void,
  ): void
  readFile(path: string, options?: { encoding?: string }): Uint8Array
  writeFile(path: string, data: Uint8Array | string): void
}

export interface DoomModule {
  FS: DoomFileSystem
  canvas: HTMLCanvasElement
  noInitialRun: boolean
  locateFile?: (path: string) => string
  onRuntimeInitialized?: () => void
  preRun?: Array<() => void>
  print?: (text: string) => void
  printErr?: (text: string) => void
  setStatus?: (text: string) => void
}

export type DoomModuleConfig = Omit<DoomModule, 'FS'>

declare global {
  interface Window {
    Module?: DoomModule
    callMain?: (args: string[]) => void
    __doomWasmLoadPromise__?: Promise<void>
  }
}

export async function loadDoomWasmModule(moduleConfig: DoomModuleConfig) {
  window.Module = moduleConfig as DoomModule

  if (!window.__doomWasmLoadPromise__) {
    window.__doomWasmLoadPromise__ = new Promise<void>((resolve, reject) => {
      const script = document.createElement('script')
      script.src = getDoomWasmScriptUrl()
      script.async = true
      script.onload = () => resolve()
      script.onerror = () => reject(new Error(`Failed to load ${getDoomWasmScriptUrl()}`))
      document.head.append(script)
    })
  }

  moduleConfig.locateFile = (path) => `${getDoomWasmBaseUrl()}${path}`
  await window.__doomWasmLoadPromise__
}
