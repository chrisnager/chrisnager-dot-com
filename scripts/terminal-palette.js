#!/usr/bin/env node

const stdout = process.stdout
const isTTY = stdout.isTTY

const RESET = '\x1b[0m'
const CLEAR = '\x1b[2J\x1b[H'
const HIDE_CURSOR = '\x1b[?25l'
const SHOW_CURSOR = '\x1b[?25h'

const ANSI_PALETTE = [
  { name: 'Black', fg: '30', bg: '40' },
  { name: 'Red', fg: '31', bg: '41' },
  { name: 'Yellow', fg: '33', bg: '43' },
  { name: 'Green', fg: '32', bg: '42' },
  { name: 'Cyan', fg: '36', bg: '46' },
  { name: 'Blue', fg: '34', bg: '44' },
  { name: 'Magenta', fg: '35', bg: '45' },
  { name: 'White', fg: '37', bg: '47' },
  { name: 'Bright Black', fg: '90', bg: '100' },
  { name: 'Bright Red', fg: '91', bg: '101' },
  { name: 'Bright Green', fg: '92', bg: '102' },
  { name: 'Bright Yellow', fg: '93', bg: '103' },
  { name: 'Bright Blue', fg: '94', bg: '104' },
  { name: 'Bright Magenta', fg: '95', bg: '105' },
  { name: 'Bright Cyan', fg: '96', bg: '106' },
  { name: 'Bright White', fg: '97', bg: '107' },
]

const SHADES = [
  { label: 'Light', char: '░', styles: ['2'] },
  { label: 'Mid', char: '▒', styles: [] },
  { label: 'Bold', char: '▓', styles: [] },
  { label: 'Solid', char: '█', styles: ['1'] },
]

function formatSGR(background, foreground, extras = []) {
  const codes = []

  if (background) {
    codes.push(background)
  }

  if (foreground) {
    codes.push(foreground)
  }

  if (extras.length) {
    codes.push(...extras)
  }

  return `\x1b[${codes.join(';')}m`
}

function cleanup() {
  if (isTTY) {
    stdout.write(`${RESET}${SHOW_CURSOR}`)
  } else {
    stdout.write(RESET)
  }
}

function pad(text, width) {
  if (text.length >= width) {
    return text
  }

  return `${text}${' '.repeat(width - text.length)}`
}

function abbreviate(name, length) {
  const words = name.split(/\s+/)
  let result = ''

  for (const word of words) {
    if (word.length === 0) continue
    result += word[0].toUpperCase()
    if (result.length >= length) {
      return result.slice(0, length)
    }
  }

  if (words.length > 1) {
    const lastWord = words[words.length - 1].toUpperCase()
    if (lastWord.length > 0) {
      result += lastWord[lastWord.length - 1]
      if (result.length >= length) {
        return result.slice(0, length)
      }
    }
  }

  const condensed = name.replace(/\s+/g, '')
  if (condensed.length >= length) {
    return condensed.slice(0, length)
  }

  return pad(condensed, length)
}

function renderPalette() {
  if (isTTY) {
    stdout.write(HIDE_CURSOR)
    stdout.write(CLEAR)
  }

  const pattern = [
    '⡀⡁⡂⡃⡄⡅⡆⡇⡈⡉⡊⡋⡌⡍⡎⡏',
    '⡐⡑⡒⡓⡔⡕⡖⡗⡘⡙⡚⡛⡜⡝⡞⡟',
    '⡠⡡⡢⡣⡤⡥⡦⡧⡨⡩⡪⡫⡬⡭⡮⡯',
    '⡰⡱⡲⡳⡴⡵⡶⡷⡸⡹⡺⡻⡼⡽⡾⡿',
    '⢀⢁⢂⢃⢄⢅⢆⢇⢈⢉⢊⢋⢌⢍⢎⢏',
    '⢐⢑⢒⢓⢔⢕⢖⢗⢘⢙⢚⢛⢜⢝⢞⢟',
    '⢠⢡⢢⢣⢤⢥⢦⢧⢨⢩⢪⢫⢬⢭⢮⢯',
    '⢰⢱⢲⢳⢴⢵⢶⢷⢸⢹⢺⢻⢼⢽⢾⢿',
    '⣀⣁⣂⣃⣄⣅⣆⣇⣈⣉⣊⣋⣌⣍⣎⣏',
    '⣐⣑⣒⣓⣔⣕⣖⣗⣘⣙⣚⣛⣜⣝⣞⣟',
    '⣠⣡⣢⣣⣤⣥⣦⣧⣨⣩⣪⣫⣬⣭⣮⣯',
    '⣰⣱⣲⣳⣴⣵⣶⣷⣸⣹⣺⣻⣼⣽⣾⣿',
  ]

  stdout.write(`${formatSGR('43', '31', [])}\n`)
  pattern.forEach((line) => {
    stdout.write(`${line}\n`)
  })
  stdout.write(`${RESET}\n\n`)

  const nameColumnWidth = Math.max(...ANSI_PALETTE.map(({ name }) => name.length)) + 2
  const shadeColumnWidth = Math.max(...SHADES.map(({ label }) => label.length)) + 2
  const cellWidth = 3
  const spacing = '  '
  const fgHeaders = ANSI_PALETTE.map(({ name }) => abbreviate(name, cellWidth))

  const header =
    pad('Background', nameColumnWidth) +
    spacing +
    pad('Shade', shadeColumnWidth) +
    spacing +
    fgHeaders.map((label) => pad(label, cellWidth)).join(spacing)
  const divider = '-'.repeat(header.length)

  stdout.write(`${header}\n`)
  stdout.write(`${divider}\n`)

  ANSI_PALETTE.forEach((background) => {
    SHADES.forEach((shade, index) => {
      const bgLabel = index === 0 ? pad(background.name, nameColumnWidth) : ' '.repeat(nameColumnWidth)
      const shadeLabel = pad(shade.label, shadeColumnWidth)

      const combinationCells = ANSI_PALETTE.map((foreground) => {
        const symbol = `${shade.char}${shade.char} `
        return `${formatSGR(background.bg, foreground.fg, shade.styles)}${symbol}${RESET}`
      }).join(spacing)

      stdout.write(`${bgLabel}${spacing}${shadeLabel}${spacing}${combinationCells}\n`)
    })

    stdout.write('\n')
  })
}

process.on('SIGINT', () => {
  cleanup()
  process.exit(0)
})

process.on('exit', cleanup)

renderPalette()
