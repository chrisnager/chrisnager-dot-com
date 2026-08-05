#!/usr/bin/env node

const stdout = process.stdout
const isTTY = stdout.isTTY

const FALLBACK_COLUMNS = 80
const FALLBACK_ROWS = 24
const RESET = '\x1b[0m'
const CLEAR = '\x1b[2J\x1b[H'
const HIDE_CURSOR = '\x1b[?25l'
const SHOW_CURSOR = '\x1b[?25h'

// Standard ANSI 16-color palette as exposed by the macOS Terminal.
// Using SGR codes (30-37, 90-97 for foreground; 40-47, 100-107 for background)
// allows the script to respect any custom profile the user has applied.
const ANSI_PALETTE = [
  { fg: '30', bg: '40' }, // black
  { fg: '31', bg: '41' }, // red
  { fg: '33', bg: '43' }, // yellow
  { fg: '32', bg: '42' }, // green
  { fg: '36', bg: '46' }, // cyan
  { fg: '34', bg: '44' }, // blue
  { fg: '35', bg: '45' }, // magenta
  { fg: '37', bg: '47' }, // white
  { fg: '90', bg: '100' }, // bright black (gray)
  { fg: '91', bg: '101' }, // bright red
  { fg: '92', bg: '102' }, // bright green
  { fg: '93', bg: '103' }, // bright yellow
  { fg: '94', bg: '104' }, // bright blue
  { fg: '95', bg: '105' }, // bright magenta
  { fg: '96', bg: '106' }, // bright cyan
  { fg: '97', bg: '107' }, // bright white
]

// Light-to-dark Unicode block characters chosen to mimic tints & shades.
const SHADE_CHARACTERS = ['░', '▒', '▓', '█']

function getTerminalSize() {
  if (isTTY) {
    const { columns, rows } = stdout
    return [Math.max(columns, 1), Math.max(rows, 1)]
  }

  return [FALLBACK_COLUMNS, FALLBACK_ROWS]
}

function formatSGR(background, foreground, extras = []) {
  const codes = []

  if (background) {
    codes.push(background)
  }

  if (foreground) {
    codes.push(foreground)
  }

  if (extras.length > 0) {
    codes.push(...extras)
  }

  return `\x1b[${codes.join(';')}m`
}

function getPaletteColor(index) {
  return ANSI_PALETTE[(index + ANSI_PALETTE.length) % ANSI_PALETTE.length]
}

function cleanup() {
  if (isTTY) {
    stdout.write(`${RESET}${SHOW_CURSOR}`)
  } else {
    stdout.write(RESET)
  }
}

function renderGradient() {
  const [width, height] = getTerminalSize()
  const usableHeight = Math.max(height, 1)

  if (isTTY) {
    stdout.write(HIDE_CURSOR)
    stdout.write(CLEAR)
  }

  const horizontalDenominator = Math.max(width - 1, 1)
  const verticalDenominator = Math.max(usableHeight - 1, 1)

  for (let y = 0; y < usableHeight; y += 1) {
    const verticalFactor = y / verticalDenominator
    let line = ''

    for (let x = 0; x < width; x += 1) {
      const horizontalMix = x / horizontalDenominator
      const baseIndex = Math.round(
        (verticalFactor * 0.55 + horizontalMix * 0.45) * (ANSI_PALETTE.length - 1),
      )
      const accentIndex = Math.round(
        (verticalFactor * 0.35 + horizontalMix * 0.65 + Math.sin(horizontalMix * Math.PI)) *
          (ANSI_PALETTE.length - 1),
      )

      const baseColor = getPaletteColor(baseIndex)
      const accentColor = getPaletteColor(accentIndex)

      const colorDifference = Math.abs(baseIndex - accentIndex)
      const shadeStrength = Math.max(
        0,
        Math.min(
          1,
          (verticalFactor * 0.6 + horizontalMix * 0.4 + Math.sin((horizontalMix + verticalFactor) * Math.PI)) /
            2,
        ),
      )

      const styleCodes = []
      if (shadeStrength > 0.7) {
        styleCodes.push('1')
      } else if (shadeStrength < 0.25) {
        styleCodes.push('2')
      }

      if (colorDifference >= 2 && shadeStrength > 0.4) {
        line += `${formatSGR(baseColor.bg, accentColor.fg, styleCodes)}▀`
        continue
      }

      const shadeIndex = Math.min(
        SHADE_CHARACTERS.length - 1,
        Math.floor(shadeStrength * SHADE_CHARACTERS.length),
      )
      const shadeChar = SHADE_CHARACTERS[shadeIndex]

      line += `${formatSGR(baseColor.bg, baseColor.fg, styleCodes)}${shadeChar}`
    }

    line += RESET

    if (y < usableHeight - 1) {
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
