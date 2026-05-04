#!/usr/bin/env node

const readline = require('readline')

const { stdin, stdout } = process

if (!stdout.isTTY || !stdin.isTTY) {
  console.error('This script needs an interactive terminal.')
  process.exit(1)
}

if (typeof stdin.setRawMode !== 'function') {
  console.error('Raw mode is not supported on this terminal.')
  process.exit(1)
}

readline.emitKeypressEvents(stdin)

const CLEAR_DELAY_MS = 700
const MAX_HISTORY = 8

let cursorHidden = false
let clearTimer = null
const keyHistory = []

const metaKeyLabel = process.platform === 'darwin' ? 'Option' : 'Alt'

function hideCursor() {
  if (cursorHidden) return
  stdout.write('\x1b[?25l')
  cursorHidden = true
}

function showCursor() {
  if (!cursorHidden) return
  stdout.write('\x1b[?25h')
  cursorHidden = false
}

function clearScreen() {
  stdout.write('\x1b[2J')
  stdout.write('\x1b[H')
}

function formatKeypress(str, key) {
  if (!key) {
    return str && str.length ? str : 'Unknown'
  }

  const parts = []

  if (key.ctrl) parts.push('Ctrl')
  if (key.meta) parts.push(metaKeyLabel)
  if (key.shift) parts.push('Shift')

  const mappedName = mapKeyName(key, str)
  if (mappedName) {
    parts.push(mappedName)
  }

  return parts.length ? parts.join(' + ') : 'Unknown'
}

function recordKey(label) {
  if (!label) return
  keyHistory.unshift(label)
  if (keyHistory.length > MAX_HISTORY) {
    keyHistory.length = MAX_HISTORY
  }
}

function mapKeyName(key, str) {
  const mappedMetaChar = extractMetaModifiedChar(key)
  if (mappedMetaChar) {
    return mappedMetaChar
  }

  if (key.name) {
    const lower = key.name.toLowerCase()
    switch (lower) {
      case 'return':
        return 'Enter'
      case 'backspace':
        return 'Backspace'
      case 'left':
        return '←'
      case 'right':
        return '→'
      case 'up':
        return '↑'
      case 'down':
        return '↓'
      case 'tab':
        return 'Tab'
      case 'space':
        return 'Space'
      case 'pageup':
        return 'Page↑'
      case 'pagedown':
        return 'Page↓'
      case 'escape':
        return 'Esc'
      case 'home':
        return 'Home'
      case 'end':
        return 'End'
      case 'insert':
        return 'Insert'
      case 'delete':
        return 'Delete'
      case 'comma':
        return ','
      case 'period':
        return '.'
      case 'slash':
        return '/'
      case 'backslash':
        return '\\'
      case 'semicolon':
        return ';'
      case 'quote':
      case 'apostrophe':
        return "'"
      case 'minus':
        return '-'
      case 'equal':
        return '='
      case 'leftbrace':
      case 'bracketleft':
        return '['
      case 'rightbrace':
      case 'bracketright':
        return ']'
      case 'grave':
      case 'backquote':
        return '`'
      default:
        if (key.name.length === 1) {
          return key.name.toLowerCase()
        }
        return titleCaseWord(key.name)
    }
  }

  if (str && str.length === 1) {
    const code = str.codePointAt(0)
    if (code >= 32 && code !== 127) {
      return str.toLowerCase()
    }
  }

  if (key.sequence && key.sequence.length === 1) {
    const code = key.sequence.codePointAt(0)
    if (code >= 32 && code !== 127) {
      return key.sequence
    }
  }

  return key.name || null
}

function draw() {
  clearScreen()
  // stdout.write('Press any key to see it here. Ctrl+C exits.\n\n')
  if (keyHistory.length) {
    stdout.write(`${renderBoxes(keyHistory)}\n`)
  }
}

function renderBoxes(labels) {
  if (!labels.length) return ''
  const boxes = labels.map(createBox)
  const maxHeight = Math.max(...boxes.map((box) => box.lines.length))

  const normalized = boxes.map((box) => {
    if (box.lines.length === maxHeight) return box.lines
    const padLine = `│ ${' '.repeat(box.innerWidth)} │`
    const adjusted = box.lines.slice()
    while (adjusted.length < maxHeight) {
      adjusted.splice(adjusted.length - 1, 0, padLine)
    }
    return adjusted
  })

  const rows = []
  for (let row = 0; row < maxHeight; row += 1) {
    rows.push(normalized.map((lines) => lines[row]).join(' '))
  }

  return rows.join('\n')
}

function createBox(label) {
  const text = typeof label === 'string' ? label : String(label ?? '')
  const contentLines = text.split('\n')
  const innerWidth = Math.max(1, ...contentLines.map((line) => line.length))
  const horizontal = '─'.repeat(innerWidth + 2)
  const top = `┌${horizontal}┐`
  const bottom = `└${horizontal}┘`
  const middle = contentLines.map((line) => {
    const padded = line.padEnd(innerWidth, ' ')
    return `│ ${padded} │`
  })

  return {
    innerWidth,
    lines: [top, ...middle, bottom],
  }
}

function cleanupAndExit(code = 0) {
  showCursor()
  if (clearTimer) {
    clearTimeout(clearTimer)
    clearTimer = null
  }
  try {
    stdin.setRawMode(false)
  } catch {
    // no-op if raw mode cannot be disabled
  }
  stdin.pause()
  process.exit(code)
}

stdin.setRawMode(true)
stdin.resume()
hideCursor()
draw()

stdin.on('keypress', (str, key) => {
  if (!key) return

  if (key.ctrl && key.name === 'c') {
    cleanupAndExit(0)
    return
  }

  const label = formatKeypress(str, key)
  recordKey(label)
  draw()
  resetClearTimer()
})

process.on('SIGINT', () => {
  cleanupAndExit(0)
})

process.on('exit', () => {
  showCursor()
})

function resetClearTimer() {
  if (clearTimer) {
    clearTimeout(clearTimer)
  }
  clearTimer = setTimeout(() => {
    clearTimer = null
    keyHistory.length = 0
    draw()
  }, CLEAR_DELAY_MS)
}

function extractMetaModifiedChar(key) {
  if (!key.meta || !key.sequence || key.sequence.length < 2) return null
  if (!key.sequence.startsWith('\u001b')) return null
  const remainder = key.sequence.slice(1)
  if (remainder.length !== 1) return null
  const char = remainder
  const code = char.codePointAt(0)
  if (code < 32 || code === 127) return null
  return char.toLowerCase()
}

function titleCaseWord(input) {
  const lower = input.toLowerCase()
  return lower.charAt(0).toUpperCase() + lower.slice(1)
}
