#!/usr/bin/env node

const stdout = process.stdout
const isTTY = stdout.isTTY

const FALLBACK_COLUMNS = 80
const FALLBACK_ROWS = 24
const RESET = '\x1b[0m'

function getTerminalSize() {
  if (isTTY) {
    const { columns, rows } = stdout
    return [Math.max(columns, 1), Math.max(rows, 1)]
  }

  return [FALLBACK_COLUMNS, FALLBACK_ROWS]
}

function hslToRgb(h, s, l) {
  const hue = h % 360
  const saturation = Math.max(0, Math.min(100, s)) / 100
  const lightness = Math.max(0, Math.min(100, l)) / 100

  const chroma = (1 - Math.abs(2 * lightness - 1)) * saturation
  const segment = hue / 60
  const x = chroma * (1 - Math.abs((segment % 2) - 1))

  let r = 0
  let g = 0
  let b = 0

  if (segment >= 0 && segment < 1) {
    r = chroma
    g = x
  } else if (segment >= 1 && segment < 2) {
    r = x
    g = chroma
  } else if (segment >= 2 && segment < 3) {
    g = chroma
    b = x
  } else if (segment >= 3 && segment < 4) {
    g = x
    b = chroma
  } else if (segment >= 4 && segment < 5) {
    r = x
    b = chroma
  } else if (segment >= 5 && segment < 6) {
    r = chroma
    b = x
  }

  const match = lightness - chroma / 2

  return [
    Math.round((r + match) * 255),
    Math.round((g + match) * 255),
    Math.round((b + match) * 255),
  ]
}

function cleanup() {
  if (isTTY) {
    stdout.write(`${RESET}\x1b[?25h`)
  } else {
    stdout.write(RESET)
  }
}

function renderGradient() {
  const [width, height] = getTerminalSize()

  if (isTTY) {
    stdout.write('\x1b[?25l') // Hide cursor
    stdout.write('\x1b[2J\x1b[H') // Clear screen and move cursor home
  }

  const horizontalDenominator = Math.max(width - 1, 1)
  const verticalDenominator = Math.max(height - 1, 1)

  for (let y = 0; y < height; y += 1) {
    let line = ''

    for (let x = 0; x < width; x += 1) {
      const horizontalFactor = x / horizontalDenominator
      const verticalFactor = y / verticalDenominator

      // Blend the horizontal and vertical position to keep the gradient dynamic.
      const mix = (horizontalFactor + verticalFactor) / 2
      const hue = (mix * 360) % 360
      const [r, g, b] = hslToRgb(hue, 75, 50)

      line += `\x1b[48;2;${r};${g};${b}m `
    }

    line += RESET

    if (y < height - 1) {
      line += '\n'
    }

    stdout.write(line)
  }

  if (!isTTY) {
    stdout.write('\n')
  }
}

process.on('SIGINT', () => {
  cleanup()
  process.exit(0)
})

process.on('exit', cleanup)

renderGradient()
