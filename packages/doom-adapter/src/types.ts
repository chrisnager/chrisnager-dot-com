export type DoomContentMode = 'freedoom-phase1' | 'custom-url'

export interface DoomInitializeOptions {
  canvas: HTMLCanvasElement
  contentMode: DoomContentMode
  contentPath?: string
  sessionToken?: string
  contentBaseUrl?: string
}

export interface DoomAdapter {
  initialize(options: DoomInitializeOptions): Promise<void>
  start(): Promise<void>
  pause(): void
  resume(): void
  destroy(): void
}
