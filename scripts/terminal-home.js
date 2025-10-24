#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const Module = require('module')
const { spawn } = require('child_process')

const stdout = process.stdout
const stdin = process.stdin
const isTTY = stdout.isTTY
const supportsInteraction = isTTY && stdin.isTTY

const RESET = '\x1b[0m'
const CLEAR = '\x1b[2J\x1b[H'
const HIDE_CURSOR = '\x1b[?25l'
const SHOW_CURSOR = '\x1b[?25h'

const BASE_URL = 'https://chrisnager.com'
const THEME_FILE = path.join(__dirname, '../src/gatsby-plugin-theme-ui/index.ts')

const namedColors = {
  black: '#000000',
  white: '#ffffff',
  gold: '#ffd700',
  rebeccapurple: '#663399',
}

const useColor = isTTY

const sections = [
  { id: 'home', label: 'Home', display: '[1] Home', hotkeys: ['1'] },
  { id: 'profile', label: 'Profile', display: '[2] Profile', hotkeys: ['2'] },
  { id: 'projects', label: 'Projects', display: '[3] Projects', hotkeys: ['3'] },
  { id: 'speaking', label: 'Speaking', display: '[4] Speaking', hotkeys: ['4'] },
  { id: 'blog', label: 'Blog', display: '[5] Blog', hotkeys: ['5'] },
]

const navHotkeys = new Map()
sections.forEach((section, index) => {
  section.hotkeys.forEach((key) => {
    const lower = key.toLowerCase()
    navHotkeys.set(lower, index)
  })
})

function findSectionIndexFromArg(value) {
  if (!value) return -1
  const trimmed = value.trim()
  if (!trimmed) return -1

  const numeric = Number(trimmed)
  if (!Number.isNaN(numeric) && Number.isFinite(numeric)) {
    const index = Math.floor(numeric) - 1
    if (index >= 0 && index < sections.length) {
      return index
    }
  }

  const normalized = trimmed.toLowerCase()
  return sections.findIndex((section) => {
    if (section.id === normalized) return true
    if (section.label.toLowerCase() === normalized) return true
    const displayNormalized = section.display.replace(/\[|\]|\d+/g, '').trim().toLowerCase()
    if (displayNormalized === normalized) return true
    return section.hotkeys.some((key) => key.toLowerCase() === normalized)
  })
}

const args = process.argv.slice(2)
let requestedThemeId = null
let requestedPageId = null
let requestedSelectedId = null
for (let i = 0; i < args.length; i += 1) {
  const arg = args[i]
  if (arg === '--theme' || arg === '-t') {
    requestedThemeId = args[i + 1]
    i += 1
  } else if (arg.startsWith('--theme=')) {
    requestedThemeId = arg.slice('--theme='.length)
  } else if (arg === '--page' || arg === '-p') {
    requestedPageId = args[i + 1]
    i += 1
  } else if (arg.startsWith('--page=')) {
    requestedPageId = arg.slice('--page='.length)
  } else if (arg === '--selected' || arg === '-s') {
    requestedSelectedId = args[i + 1]
    i += 1
  } else if (arg.startsWith('--selected=')) {
    requestedSelectedId = arg.slice('--selected='.length)
  }
}
if (requestedThemeId) {
  requestedThemeId = requestedThemeId.trim().toLowerCase()
}
if (requestedPageId) {
  requestedPageId = requestedPageId.trim()
}
if (requestedSelectedId) {
  requestedSelectedId = requestedSelectedId.trim()
}

let styles = {
  base: '',
  heading: '',
  italic: '',
  link: '',
  tag: '',
  selectedTag: '',
  selectedLink: '',
  instruction: '',
  status: '',
  nav: '',
  navActive: '',
}

let initialStatusMessage = null

function appendStatusMessage(message) {
  if (!message) return
  initialStatusMessage = initialStatusMessage ? `${initialStatusMessage} ${message}` : message
}

const themeModes = loadThemeModes()
let currentThemeIndex = 0

if (requestedThemeId) {
  const directIndex = themeModes.findIndex((mode) => mode.id.toLowerCase() === requestedThemeId)
  const labeledIndex = themeModes.findIndex((mode) => mode.label.toLowerCase() === requestedThemeId)
  const chosenIndex = directIndex >= 0 ? directIndex : labeledIndex
  if (chosenIndex >= 0) {
    currentThemeIndex = chosenIndex
  } else {
    initialStatusMessage = `Unknown theme "${requestedThemeId}". Using ${themeModes[0].label}.`
  }
}

let currentColors = themeModes[currentThemeIndex].colors
styles = createStyles(currentColors)

if (useColor) {
  clearScreen()
}

let cursorHidden = false
let inputActive = false
let removeInputListener = null
let removeResizeListener = null

if (supportsInteraction) {
  stdout.write(HIDE_CURSOR)
  cursorHidden = true
}

let cleanedUp = false

function cleanup() {
  if (cleanedUp) return
  cleanedUp = true

  if (supportsInteraction) {
    if (removeInputListener) {
      removeInputListener()
      removeInputListener = null
    }

    if (removeResizeListener) {
      removeResizeListener()
      removeResizeListener = null
    }

    if (inputActive) {
      try {
        stdin.setRawMode(false)
      } catch {
        // ignore inability to reset raw mode
      }
      stdin.pause()
      inputActive = false
    }
  }

  stdout.write(RESET)

  if (cursorHidden) {
    stdout.write(SHOW_CURSOR)
    cursorHidden = false
  }
}

process.on('SIGINT', () => {
  cleanup()
  process.exit(0)
})

process.on('exit', cleanup)

function loadThemeModes() {
  const fallback = [
    {
      id: 'default',
      label: 'Default',
      colors: {
        text: '#1d2021',
        background: '#dfeff3',
        action: '#9e0d0d',
        tag: 'rgb(0 0 0 / 3.75%)',
      },
    },
  ]

  try {
    const source = fs.readFileSync(THEME_FILE, 'utf8')
    const transformed = source.replace(/export\s+default/, 'module.exports =')
    const themeModule = new Module(THEME_FILE)
    themeModule.filename = THEME_FILE
    themeModule.paths = Module._nodeModulePaths(path.dirname(THEME_FILE))
    themeModule._compile(transformed, THEME_FILE)
    const theme = themeModule.exports

    if (!theme || !theme.colors) {
      return fallback
    }

    const { modes = {}, ...rootColors } = theme.colors
    const baseColors = cloneColors(rootColors)
    delete baseColors.modes

    const normalized = [
      {
        id: 'default',
        label: 'Default',
        colors: baseColors,
      },
    ]

    Object.entries(modes).forEach(([modeName, modeValues]) => {
      const merged = cloneColors({ ...baseColors, ...modeValues })
      normalized.push({
        id: modeName,
        label: titleCase(modeName),
        colors: merged,
      })
    })

    return normalized.length ? normalized : fallback
  } catch (_error) {
    return fallback
  }
}

function createStyles(colors) {
  if (!useColor) {
    return {
      base: '',
      heading: '',
      italic: '',
      link: '',
      tag: '',
      selectedTag: '',
      selectedLink: '',
      instruction: '',
      status: '',
      nav: '',
      navActive: '',
    }
  }

  const background = resolveColor(colors.background, [0, 0, 0])
  const text = resolveColor(colors.text, [255, 255, 255], background)
  const action = resolveColor(colors.action, text, background)
  const tagBackground = resolveColor(colors.tag, background, background)
  const highlightBg = action
  const highlightFg = pickReadableForeground(highlightBg, text, background)
  const instruction = mixRgb(text, background, 0.6)
  const status = action

  return {
    base: makeStyle({ fg: text, bg: background }),
    heading: makeStyle({ fg: text, bg: background, bold: true }),
    italic: makeStyle({ fg: text, bg: background, italic: true }),
    link: makeStyle({ fg: action, bg: background, underline: true }),
    tag: makeStyle({ fg: text, bg: tagBackground, bold: true }),
    selectedTag: makeStyle({ fg: highlightFg, bg: highlightBg, bold: true }),
    selectedLink: makeStyle({ fg: highlightFg, bg: highlightBg, underline: true, bold: true }),
    instruction: makeStyle({ fg: instruction, bg: background, dim: true }),
    status: makeStyle({ fg: status, bg: background, bold: true }),
    nav: makeStyle({ fg: instruction, bg: background, bold: true }),
    navActive: makeStyle({ fg: highlightFg, bg: highlightBg, bold: true }),
  }
}

function makeStyle({ fg, bg, bold, italic, underline, dim }) {
  if (!useColor) {
    return ''
  }

  const codes = []

  if (bold) codes.push('1')
  if (dim) codes.push('2')
  if (italic) codes.push('3')
  if (underline) codes.push('4')
  if (fg) codes.push(`38;2;${fg[0]};${fg[1]};${fg[2]}`)
  if (bg) codes.push(`48;2;${bg[0]};${bg[1]};${bg[2]}`)

  if (!codes.length) {
    return ''
  }

  return `\x1b[${codes.join(';')}m`
}

function styleText(text, style, reset = '') {
  if (!useColor || !style) {
    return text
  }

  return `${style}${text}${reset}`
}

function readHomeData() {
  const file = path.join(__dirname, '../src/data/home.yml')
  const contents = fs.readFileSync(file, 'utf8')
  const result = {}

  contents
    .split(/\r?\n/)
    .map((line) => line.trim())
    .forEach((line) => {
      if (!line || line.startsWith('#')) return
      const match = line.match(/^([^:]+):\s*(.*)$/)
      if (!match) return
      const key = match[1].trim()
      let value = match[2].trim()

      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1)
      }

      result[key] = value
    })

  return result
}

function readYamlListFile(filePath) {
  const contents = fs.readFileSync(filePath, 'utf8')
  const lines = contents.split(/\r?\n/)
  const items = []
  let current = null

  const flush = () => {
    if (current && Object.keys(current).length) {
      items.push(current)
    }
    current = null
  }

  const assign = (line) => {
    const match = line.match(/^([^:]+):\s*(.*)$/)
    if (!match) return
    const key = match[1].trim()
    let value = match[2].trim()

    if (!current) {
      current = {}
    }

    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1)
    }

    if (value.startsWith('[') && value.endsWith(']')) {
      const entries = value
        .slice(1, -1)
        .split(',')
        .map((entry) => entry.trim())
        .filter((entry) => entry.length)
        .map((entry) => {
          if (
            (entry.startsWith('"') && entry.endsWith('"')) ||
            (entry.startsWith("'") && entry.endsWith("'"))
          ) {
            return entry.slice(1, -1)
          }
          return entry
        })
      current[key] = entries
      return
    }

    current[key] = value
  }

  for (const raw of lines) {
    const line = raw.trim()
    if (!line || line.startsWith('#')) continue

    if (line.startsWith('- ')) {
      flush()
      current = {}
      const rest = line.slice(2).trim()
      if (rest) {
        assign(rest)
      }
    } else {
      assign(line)
    }
  }

  flush()
  return items
}

function readFeaturesData() {
  const file = path.join(__dirname, '../src/data/features.yml')
  return readYamlListFile(file).map((item) => ({
    category: item.category || '',
    title: item.title || '',
    link: item.link || '',
  }))
}

function readProjectsData() {
  const file = path.join(__dirname, '../src/data/projects.yml')
  return readYamlListFile(file).map((item) => ({
    url: item.url || item.link,
    name: item.name || item.title || item.url,
    summary: item.summary || '',
    tags: Array.isArray(item.tags) ? item.tags : undefined,
  }))
}

function readPostsData() {
  const file = path.join(__dirname, '../src/data/posts.yml')
  return readYamlListFile(file).map((item) => ({
    title: item.title || item.name || 'Untitled',
    slug: item.slug || '',
    url: item.url || '',
    date: item.date || '',
    tags: Array.isArray(item.tags) ? item.tags : undefined,
  }))
}

function readSpeakingData() {
  const file = path.join(__dirname, '../src/data/speaking.yml')
  return readYamlListFile(file).map((item) => ({
    name: item.name || item.title || 'Speaking engagement',
    summary: item.summary || '',
    url: item.url || '',
    date: item.date || '',
  }))
}

function readProfileEntries() {
  const file = path.join(__dirname, '../src/pages/profile.mdx')
  let contents = fs.readFileSync(file, 'utf8')
  const boxMatch = contents.match(/<Box[^>]*>([\s\S]*?)<\/Box>/)

  const referenceMatches = Array.from(contents.matchAll(/^\[([^\]]+)\]:\s*(.+)$/gm))
  const references = new Map(referenceMatches.map(([, label, url]) => [label.trim(), url.trim()]))

  if (!boxMatch) {
    return []
  }

  let body = boxMatch[1]

  body = body.replace(/<Intro[^>]*\/>/g, '')
  body = body.replace(/![^\n]*\n?/g, '')

  body = body.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, text, url) => `${text} (${url})`)
  body = body.replace(/\[([^\]]+)\]/g, (match, label) => {
    if (references.has(label)) {
      return `${label} (${references.get(label)})`
    }
    return label
  })

  const paragraphs = body
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.replace(/\s+/g, ' ').trim())
    .filter((paragraph) => paragraph.length)

  const titles = ['Introduction', 'Experience', 'Highlights', 'Community', 'Personal', 'Values', 'Focus']

  return paragraphs.map((summary, index) => ({
    category: 'Profile',
    title: titles[index] || `Profile ${index + 1}`,
    link: '/profile',
    summary,
  }))
}

function prepareSectionEntries(home, features, projects, posts, speakingEntries, profileEntries) {
  const clone = (items) => items.map((item) => ({ ...item }))

  const postsList = posts
    .slice()
    .sort((a, b) => {
      const dateA = Date.parse(a.date || '') || 0
      const dateB = Date.parse(b.date || '') || 0
      return dateB - dateA
    })
    .map((post) => {
      const dateLabel = formatDateDisplay(post.date)
      const summaryParts = []
      if (dateLabel) {
        summaryParts.push(`Published ${dateLabel}`)
      }
      if (post.tags && post.tags.length) {
        summaryParts.push(`Tags: ${post.tags.join(', ')}`)
      }

      return {
        category: 'Blog',
        title: post.title,
        link: post.url || `/blog/${post.slug || ''}`,
        summary: summaryParts.join(' · ') || undefined,
        tags: undefined,
      }
    })

  const speakingList = speakingEntries.map((talk) => {
    const dateLabel = formatDateDisplay(talk.date)
    const summaryParts = []
    if (dateLabel) {
      summaryParts.push(dateLabel)
    }
    if (talk.summary) {
      summaryParts.push(talk.summary)
    }

    return {
      category: 'Speaking',
      title: talk.name,
      link: talk.url || '',
      summary: summaryParts.join(' — ') || undefined,
    }
  })

  const profileList = profileEntries.length
    ? profileEntries
    : [
      {
        category: 'Profile',
        title: 'Profile overview',
        link: '/profile',
        summary: home.description || undefined,
      },
    ]

  const grouped = {
    home: clone(features),
    profile: profileList.map((item) => ({ ...item })),
    projects: projects.map((project) => ({
      category: 'Projects',
      title: project.name || project.title || project.url,
      link: project.url || project.link,
      summary: project.summary || undefined,
      tags: Array.isArray(project.tags) ? project.tags : undefined,
    })),
    speaking: speakingList.map((item) => ({ ...item })),
    blog: postsList.map((item) => ({ ...item })),
  }

  return grouped
}

function wrapText(text, width) {
  if (width <= 0) return [text]
  const words = text.split(/\s+/).filter(Boolean)
  const lines = []
  let current = ''

  for (const word of words) {
    if (word.length > width) {
      if (current) {
        lines.push(current)
        current = ''
      }

      const chunks = chunkWord(word, width)
      lines.push(...chunks.slice(0, -1))
      current = chunks[chunks.length - 1]
      continue
    }

    if (!current.length) {
      current = word
      continue
    }

    if (`${current} ${word}`.length <= width) {
      current = `${current} ${word}`
    } else {
      lines.push(current)
      current = word
    }
  }

  if (current) {
    lines.push(current)
  }

  return lines.length ? lines : ['']
}

function chunkWord(word, width) {
  const pieces = []
  for (let i = 0; i < word.length; i += width) {
    pieces.push(word.slice(i, i + width))
  }
  return pieces
}

function hyperlink(text, url) {
  if (!useColor || !url) {
    return text
  }

  return `\x1b]8;;${url}\x07${text}\x1b]8;;\x07`
}

function absoluteLink(href) {
  if (!href) return ''
  if (href.startsWith('http://') || href.startsWith('https://')) {
    return href
  }
  return `${BASE_URL}${href}`
}

function renderLinkLines(text, url, width, styleOverride) {
  const lines = wrapText(text, width)
  if (!useColor) {
    if (url) {
      lines[0] = `${lines[0]} (${url})`
    }
    return lines
  }

  const style = styleOverride || styles.link
  const baseReset = styles.base || ''
  return lines.map((line) => {
    const linked = hyperlink(line, url)
    return `${style || ''}${linked}${baseReset}`
  })
}

function computeLayout() {
  const terminalWidth = useColor && stdout.columns ? stdout.columns : 80
  const maxContentWidth = Math.min(76, terminalWidth - 4)
  const margin = Math.max(2, Math.floor((terminalWidth - maxContentWidth) / 2))
  const contentWidth = Math.max(32, terminalWidth - margin * 2)
  return { terminalWidth, contentWidth, margin }
}

function clearScreen() {
  if (!isTTY) {
    return
  }

  stdout.write(`${RESET}${CLEAR}`)

  if (!useColor) {
    return
  }

  const cols = stdout.columns && stdout.columns > 0 ? stdout.columns : 80
  const rows = stdout.rows && stdout.rows > 0 ? stdout.rows : 24
  const blankLine = `${styles.base}${' '.repeat(cols)}${RESET}`

  for (let row = 0; row < rows; row += 1) {
    stdout.write(blankLine)
    if (row < rows - 1) {
      stdout.write('\n')
    }
  }

  stdout.write('\x1b[H')
  stdout.write(styles.base)
}

function buildLine(textSegments, margin) {
  const indent = ' '.repeat(margin)
  if (useColor) {
    return `${styles.base}${indent}${textSegments.join('')}${RESET}`
  }
  return `${indent}${textSegments.join('')}`
}

function renderNavigation(layout, activeSectionIndex) {
  const segments = sections.map((section, index) => {
    const style = index === activeSectionIndex ? styles.navActive : styles.nav
    return styleText(section.display, style, styles.base)
  })

  const spacer = Array.from({ length: 3 }, () => buildLine([''], layout.margin))
  return [...spacer, buildLine([segments.join('   ')], layout.margin), buildLine([''], layout.margin)]
}

function buildHeroLines(home, layout) {
  const lines = []
  lines.push(buildLine([styleText(home.title, styles.heading, styles.base)], layout.margin))
  lines.push(buildLine([''], layout.margin))

  const descriptionLines = wrapText(home.description, layout.contentWidth)
  descriptionLines.forEach((line) => {
    lines.push(buildLine([styleText(line, styles.italic, styles.base)], layout.margin))
  })

  const linkLines = renderLinkLines('Find out more', `${BASE_URL}/profile`, layout.contentWidth)
  linkLines.forEach((line) => {
    lines.push(buildLine([line], layout.margin))
  })

  lines.push(buildLine([''], layout.margin))

  return lines
}

function buildSectionHeadingLines(section, home, layout) {
  const heading = `${home.title} • ${section.label}`
  const lines = [buildLine([styleText(heading, styles.heading, styles.base)], layout.margin)]
  lines.push(buildLine([''], layout.margin))

  const intro = getSectionIntro(section.id, home)
  if (intro) {
    const introLines = wrapText(intro, layout.contentWidth)
    introLines.forEach((line) => {
      lines.push(buildLine([styleText(line, styles.italic, styles.base)], layout.margin))
    })
  }

  lines.push(buildLine([''], layout.margin))

  return lines
}

function renderSectionContent(section, home, layout, entries, selectedIndex) {
  if (section.id === 'home') {
    const headerLines = buildHeroLines(home, layout)
    const features = buildFeaturesLines(entries, layout, selectedIndex, 'No features available right now.', {
      showCategoryTag: true,
    })
    return { headerLines, bodyLines: features.lines, spans: features.spans }
  }

  const headerLines = buildSectionHeadingLines(section, home, layout)
  const features = buildFeaturesLines(entries, layout, selectedIndex, getEmptyMessage(section.id), {
    showCategoryTag: false,
  })

  return { headerLines, bodyLines: features.lines, spans: features.spans }
}

function buildFeaturesLines(features, layout, selectedIndex, emptyMessage, options = {}) {
  const showCategoryTag = options.showCategoryTag !== false
  const lines = [buildLine([''], layout.margin)]
  const spans = []

  if (!features.length) {
    const message = emptyMessage || 'No features available right now.'
    lines.push(buildLine([message], layout.margin))
    return { lines, spans }
  }

  const maxCategory = showCategoryTag && features.length
    ? Math.max(...features.map((feature) => (feature.category || '').length))
    : 0
  const tagInnerWidth = showCategoryTag ? maxCategory : 0
  const tagWidth = showCategoryTag ? tagInnerWidth + 2 : 0
  const spacing = showCategoryTag ? 1 : 0
  const bullet = showCategoryTag ? '' : '• '
  const indentString = showCategoryTag ? ' '.repeat(tagWidth + spacing) : ' '.repeat(bullet.length)
  const available = Math.max(12, layout.contentWidth - (showCategoryTag ? tagWidth + spacing : 0))

  features.forEach((feature, featureIndex) => {
    const isSelected = featureIndex === selectedIndex
    const url = absoluteLink(feature.link)
    const tagText = showCategoryTag ? ` ${feature.category.padEnd(tagInnerWidth, ' ')} ` : ''
    const tagStyle = isSelected ? styles.selectedTag : styles.tag
    const tagSegment = showCategoryTag ? styleText(tagText, tagStyle, styles.base) : null
    const linkLines = renderLinkLines(feature.title, url, available, isSelected ? styles.selectedLink : null)
    const startLine = lines.length

    linkLines.forEach((line, index) => {
      if (index === 0) {
        const segments = []
        if (showCategoryTag && tagSegment) {
          segments.push(tagSegment, ' '.repeat(spacing))
        } else if (bullet) {
          segments.push(bullet)
        }
        segments.push(line)
        lines.push(buildLine(segments, layout.margin))
      } else {
        const segments = []
        if (indentString) {
          segments.push(indentString)
        }
        segments.push(line)
        lines.push(buildLine(segments, layout.margin))
      }
    })

    if (feature.summary) {
      const summaryLines = wrapText(feature.summary, available)
      summaryLines.forEach((summaryLine) => {
        const segments = []
        if (indentString) {
          segments.push(indentString)
        }
        segments.push(styleText(summaryLine, styles.italic, styles.base))
        lines.push(buildLine(segments, layout.margin))
      })
    }

    if (feature.tags && feature.tags.length) {
      const tagsLabel = feature.tags.join(', ')
      const tagLines = wrapText(tagsLabel, available)
      tagLines.forEach((tagLine) => {
        const segments = []
        if (indentString) {
          segments.push(indentString)
        }
        segments.push(styleText(tagLine, styles.instruction, styles.base))
        lines.push(buildLine(segments, layout.margin))
      })
    }

    spans.push({ index: featureIndex, start: startLine, end: lines.length - 1 })
    lines.push(buildLine([''], layout.margin))
  })

  return { lines, spans }
}

function renderFooter(layout, state, options) {
  const lines = [buildLine([''], layout.margin)]

  // const themeLabel = `Theme • ${themeModes[state.themeIndex].label}`
  // lines.push(buildLine([styleText(themeLabel, styles.instruction, styles.base)], layout.margin))

  // const sectionLabel = `Section • ${sections[state.sectionIndex].label}`
  // lines.push(buildLine([styleText(sectionLabel, styles.instruction, styles.base)], layout.margin))

  if (options.interactive) {
    const instructions = []
    if (options.itemsCount > 0) {
      instructions.push('[↑/↓ or J/K] Select')
      instructions.push('[Enter] Open')
    }
    if (themeModes.length > 1) {
      instructions.push('[←/→ or H/L/T] Theme')
    }
    instructions.push('[Q] Quit')

    lines.push(buildLine([styleText(instructions.join('  '), styles.instruction, styles.base)], layout.margin))
  }

  // const themeLabel = `--theme=${themeModes[state.themeIndex].label.toLowerCase()}, ${themeModes.map(t => t.label.toLowerCase()).join(' | ')}`
  // lines.push(buildLine([styleText(themeLabel, styles.instruction, styles.base)], layout.margin))

  if (state.statusMessage) {
    lines.push(buildLine([styleText(state.statusMessage, styles.status, styles.base)], layout.margin))
  }

  return lines
}

function getSectionIntro(sectionId, home) {
  switch (sectionId) {
    case 'profile':
      return home.description || 'Explore the profile to learn more about Chris.'
    case 'projects':
      return 'Selected projects, experiments, and client work.'
    case 'speaking':
      return 'Talks, interviews, and appearances.'
    case 'blog':
      return 'Writing on design engineering, systems, and experimentation.'
    default:
      return ''
  }
}

function getEmptyMessage(sectionId) {
  switch (sectionId) {
    case 'profile':
      return 'Profile details are on the way.'
    case 'projects':
      return 'No projects listed at the moment.'
    case 'speaking':
      return 'No speaking engagements listed yet.'
    case 'blog':
      return 'No blog posts published yet.'
    default:
      return 'No features available right now.'
  }
}

function sectionStatus(theme, section, entries, selectedIndex) {
  if (entries.length && selectedIndex >= 0) {
    return `--theme=${theme.toLowerCase()} --page=${section.label.toLowerCase()} --selected="${entries[selectedIndex].title}"`
    // Shorthand: -t ${theme.toLowerCase()} -p ${section.label.toLowerCase()} -s "${entries[selectedIndex].title}"
  }
  return `--theme=${theme.toLowerCase()} --page=${section.label.toLowerCase()}`
}

function formatDateDisplay(value) {
  if (!value) return ''
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    const date = new Date(value)
    if (!Number.isNaN(date.getTime())) {
      return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
    }
  }

  return value
}

function normalizeIdentifier(value) {
  if (!value) return ''
  return value
    .toString()
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function findEntryIndex(entries, value) {
  const target = normalizeIdentifier(value)
  if (!target) return -1

  const primaryFields = ['title', 'name', 'slug']
  const secondaryFields = ['link', 'url']

  for (let i = 0; i < entries.length; i += 1) {
    const entry = entries[i]

    for (const field of primaryFields) {
      const normalized = normalizeIdentifier(entry[field])
      if (!normalized) continue
      if (normalized === target) {
        return i
      }
    }

    for (const field of secondaryFields) {
      const normalized = normalizeIdentifier(entry[field])
      if (!normalized) continue
      if (normalized === target) {
        return i
      }
    }
  }

  for (let i = 0; i < entries.length; i += 1) {
    const entry = entries[i]
    const candidates = [entry.title, entry.name, entry.summary, entry.link, entry.url, entry.slug]
    if (entry.tags && Array.isArray(entry.tags)) {
      candidates.push(...entry.tags)
    }

    for (const candidate of candidates) {
      const normalized = normalizeIdentifier(candidate)
      if (!normalized) continue
      if (normalized.includes(target) || target.includes(normalized)) {
        return i
      }
    }
  }

  return -1
}

function findEntryInAnySection(sectionEntries, value) {
  for (let index = 0; index < sections.length; index += 1) {
    const section = sections[index]
    const entries = sectionEntries[section.id] || []
    const matchIndex = findEntryIndex(entries, value)
    if (matchIndex >= 0) {
      return { sectionId: section.id, sectionIndex: index, entryIndex: matchIndex }
    }
  }

  return null
}

function getOpenCommand(url) {
  switch (process.platform) {
    case 'darwin':
      return { command: 'open', args: [url] }
    case 'win32':
      return { command: 'cmd', args: ['/c', 'start', '', url] }
    default:
      return { command: 'xdg-open', args: [url] }
  }
}

function setTheme(index) {
  if (!themeModes.length) return
  const normalized = ((index % themeModes.length) + themeModes.length) % themeModes.length
  currentThemeIndex = normalized
  currentColors = themeModes[currentThemeIndex].colors
  styles = createStyles(currentColors)
}

function interactiveLoop(home, sectionEntries, options = {}) {
  const selectionBySection = {}
  sections.forEach((section) => {
    const entries = sectionEntries[section.id] || []
    selectionBySection[section.id] = entries.length ? 0 : -1
  })

  const providedSelections = options.initialSelectionBySection || {}
  Object.keys(providedSelections).forEach((sectionId) => {
    const desiredIndex = providedSelections[sectionId]
    const entries = sectionEntries[sectionId] || []
    if (entries.length && desiredIndex >= 0 && desiredIndex < entries.length) {
      selectionBySection[sectionId] = desiredIndex
    }
  })

  let initialSectionIndex =
    typeof options.initialSectionIndex === 'number' &&
      options.initialSectionIndex >= 0 &&
      options.initialSectionIndex < sections.length
      ? options.initialSectionIndex
      : 0

  if (!sections[initialSectionIndex]) {
    initialSectionIndex = 0
  }

  const initialSection = sections[initialSectionIndex]
  const initialEntries = sectionEntries[initialSection.id] || []
  const initialSelected = selectionBySection[initialSection.id]
  const initialStatus =
    initialStatusMessage || sectionStatus('default', initialSection, initialEntries, initialSelected)

  const state = {
    sectionIndex: initialSectionIndex,
    selectionBySection,
    scrollBySection: sections.reduce((acc, section) => {
      acc[section.id] = 0
      return acc
    }, {}),
    statusMessage: initialStatus,
    themeIndex: currentThemeIndex,
  }

  function normalizeSelection(sectionId) {
    const entries = sectionEntries[sectionId] || []
    let selected = state.selectionBySection[sectionId]
    if (selected === undefined) {
      selected = entries.length ? 0 : -1
    }
    if (!entries.length) {
      selected = -1
    } else if (selected < 0 || selected >= entries.length) {
      selected = Math.max(0, Math.min(entries.length - 1, selected))
    }
    state.selectionBySection[sectionId] = selected
    return selected
  }

  const draw = () => {
    const layout = computeLayout()
    const navLines = renderNavigation(layout, state.sectionIndex)
    const section = sections[state.sectionIndex]
    const entries = sectionEntries[section.id] || []
    const selectedIndex = normalizeSelection(section.id)
    const sectionContent = renderSectionContent(section, home, layout, entries, selectedIndex)
    const footerLines = renderFooter(layout, state, { interactive: true, itemsCount: entries.length })

    const headerLines = sectionContent.headerLines
    const bodyLines = sectionContent.bodyLines

    const hasViewport = stdout.rows && stdout.rows > 0
    const totalRows = hasViewport
      ? stdout.rows
      : navLines.length + headerLines.length + bodyLines.length + footerLines.length
    const headerHeight = navLines.length + headerLines.length
    const footerHeight = footerLines.length
    const availableRows = hasViewport
      ? Math.max(1, totalRows - headerHeight - footerHeight)
      : bodyLines.length

    let scrollOffset = state.scrollBySection[section.id] || 0
    const maxScroll = Math.max(0, bodyLines.length - availableRows)
    if (scrollOffset > maxScroll) scrollOffset = maxScroll
    if (scrollOffset < 0) scrollOffset = 0

    if (selectedIndex === 0) {
      scrollOffset = 0
    } else if (selectedIndex > 0) {
      const span = sectionContent.spans.find((item) => item.index === selectedIndex)
      if (span) {
        if (span.start < scrollOffset) {
          scrollOffset = span.start
        } else if (span.end >= scrollOffset + availableRows) {
          scrollOffset = Math.max(0, span.end - availableRows + 1)
        }
      }
    }

    state.scrollBySection[section.id] = scrollOffset

    const visibleBodyLines = bodyLines.slice(scrollOffset, scrollOffset + availableRows)
    const paddedBodyLines =
      visibleBodyLines.length < availableRows && hasViewport
        ? [
          ...visibleBodyLines,
          ...Array.from({ length: availableRows - visibleBodyLines.length }, () =>
            buildLine([''], layout.margin),
          ),
        ]
        : visibleBodyLines

    clearScreen()
    const writeLines = (lines) => {
      lines.forEach((line) => {
        stdout.write(`${line}\n`)
      })
    }

    writeLines(navLines)
    writeLines(headerLines)
    writeLines(paddedBodyLines)
    writeLines(footerLines)
  }

  const select = (delta) => {
    const theme = themeModes[state.themeIndex].label
    const section = sections[state.sectionIndex]
    const entries = sectionEntries[section.id] || []
    if (!entries.length) return
    const current = normalizeSelection(section.id)
    const next = (current + delta + entries.length) % entries.length
    state.selectionBySection[section.id] = next
    state.statusMessage = sectionStatus(theme, section, entries, next)
    draw()
  }

  const changeSection = (nextIndex) => {
    const theme = themeModes[state.themeIndex].label
    const normalized = ((nextIndex % sections.length) + sections.length) % sections.length
    state.sectionIndex = normalized
    const section = sections[state.sectionIndex]
    const entries = sectionEntries[section.id] || []
    const selectedIndex = normalizeSelection(section.id)
    state.statusMessage = sectionStatus(theme, section, entries, selectedIndex)
    draw()
  }

  const changeTheme = (delta) => {
    if (themeModes.length <= 1) return
    setTheme(state.themeIndex + delta)
    state.themeIndex = currentThemeIndex
    // state.statusMessage = `Theme: ${themeModes[state.themeIndex].label}`
    const theme = themeModes[state.themeIndex].label
    const section = sections[state.sectionIndex]
    const entries = sectionEntries[section.id] || []
    const selectedIndex = normalizeSelection(section.id)
    state.statusMessage = sectionStatus(theme, section, entries, selectedIndex)
    draw()
  }

  const launchLink = () => {
    const section = sections[state.sectionIndex]
    const entries = sectionEntries[section.id] || []
    const selectedIndex = normalizeSelection(section.id)
    if (!entries.length || selectedIndex < 0) {
      state.statusMessage = `Section: ${section.label} • Nothing to open.`
      draw()
      return
    }

    const feature = entries[selectedIndex]
    const url = absoluteLink(feature.link)
    if (!url) {
      state.statusMessage = `Nothing to open for "${feature.title}".`
      draw()
      return
    }

    const openCommand = getOpenCommand(url)
    state.statusMessage = `Opening ${url}...`
    draw()

    try {
      const child = spawn(openCommand.command, openCommand.args, { detached: true, stdio: 'ignore' })
      child.on('error', () => {
        state.statusMessage = `Unable to launch. Copy link: ${url}`
        draw()
      })
      child.unref()
    } catch (_error) {
      state.statusMessage = `Unable to launch. Copy link: ${url}`
      draw()
    }
  }

  const handleInput = (buffer) => {
    let index = 0
    while (index < buffer.length) {
      const byte = buffer[index]

      if (byte === 0x03) {
        cleanup()
        process.exit(0)
        return
      }

      if (byte === 0x1b && index + 2 < buffer.length) {
        const next = buffer[index + 1]
        const third = buffer[index + 2]

        if (next === 0x5b && third === 0x41) {
          select(-1)
          index += 3
          continue
        }

        if (next === 0x5b && third === 0x42) {
          select(1)
          index += 3
          continue
        }

        if (next === 0x5b && third === 0x44) {
          changeTheme(-1)
          index += 3
          continue
        }

        if (next === 0x5b && third === 0x43) {
          changeTheme(1)
          index += 3
          continue
        }
      }

      if (byte === 0x0d || byte === 0x0a) {
        launchLink()
        index += 1
        continue
      }

      if (byte === 0x71 || byte === 0x51) {
        cleanup()
        process.exit(0)
        return
      }

      if (byte >= 0x20 && byte <= 0x7e) {
        const char = String.fromCharCode(byte)
        const lower = char.toLowerCase()

        if (navHotkeys.has(lower)) {
          changeSection(navHotkeys.get(lower))
          index += 1
          continue
        }

        if (lower === 'j') {
          select(1)
          index += 1
          continue
        }

        if (lower === 'k') {
          select(-1)
          index += 1
          continue
        }

        if (lower === 'h') {
          changeTheme(-1)
          index += 1
          continue
        }

        if (lower === 'l') {
          changeTheme(1)
          index += 1
          continue
        }

        if (lower === 't') {
          changeTheme(1)
          index += 1
          continue
        }
      }

      index += 1
    }
  }

  inputActive = true
  stdin.setRawMode(true)
  stdin.resume()
  stdin.on('data', handleInput)
  removeInputListener = () => stdin.off('data', handleInput)

  const resizeHandler = () => draw()
  stdout.on('resize', resizeHandler)
  removeResizeListener = () => stdout.off('resize', resizeHandler)

  draw()
}

function renderStatic(home, sectionEntries, options = {}) {
  if (useColor) {
    clearScreen()
  }

  const layout = computeLayout()
  let sectionIndex =
    typeof options.initialSectionIndex === 'number' &&
      options.initialSectionIndex >= 0 &&
      options.initialSectionIndex < sections.length
      ? options.initialSectionIndex
      : 0

  if (!sections[sectionIndex]) {
    sectionIndex = 0
  }

  const section = sections[sectionIndex]
  const entries = sectionEntries[section.id] || []
  let selectedIndex = entries.length ? 0 : -1

  if (options.initialSelectionBySection && section.id in options.initialSelectionBySection) {
    const desired = options.initialSelectionBySection[section.id]
    if (desired >= 0 && desired < entries.length) {
      selectedIndex = desired
    }
  }

  const navLines = renderNavigation(layout, sectionIndex)
  const sectionContent = renderSectionContent(section, home, layout, entries, selectedIndex)
  const status = initialStatusMessage || sectionStatus('default', section, entries, selectedIndex)
  const footerLines = renderFooter(
    layout,
    { sectionIndex, themeIndex: currentThemeIndex, statusMessage: status },
    { interactive: false, itemsCount: entries.length },
  )

  const lines = [...navLines, ...sectionContent.headerLines, ...sectionContent.bodyLines, ...footerLines]
  lines.forEach((line) => {
    stdout.write(`${line}\n`)
  })
}

function main() {
  const home = readHomeData()
  const features = readFeaturesData()
  const projects = readProjectsData()
  const posts = readPostsData()
  const speaking = readSpeakingData()
  const profileEntries = readProfileEntries()
  const sectionEntries = prepareSectionEntries(home, features, projects, posts, speaking, profileEntries)

  let initialSectionIndex = 0
  if (requestedPageId) {
    const pageIndex = findSectionIndexFromArg(requestedPageId)
    if (pageIndex >= 0) {
      initialSectionIndex = pageIndex
    } else {
      appendStatusMessage(`Unknown page "${requestedPageId}". Showing Home.`)
    }
  }

  const initialSelectionBySection = {}

  if (requestedSelectedId) {
    let targetSectionIndex = initialSectionIndex
    let matchIndex = -1

    if (sections[targetSectionIndex]) {
      const sectionId = sections[targetSectionIndex].id
      matchIndex = findEntryIndex(sectionEntries[sectionId] || [], requestedSelectedId)
    }

    if (matchIndex < 0) {
      const anyMatch = findEntryInAnySection(sectionEntries, requestedSelectedId)
      if (anyMatch) {
        targetSectionIndex = anyMatch.sectionIndex
        matchIndex = anyMatch.entryIndex
        initialSectionIndex = targetSectionIndex
      }
    }

    if (matchIndex >= 0 && sections[targetSectionIndex]) {
      const sectionId = sections[targetSectionIndex].id
      initialSelectionBySection[sectionId] = matchIndex
    } else {
      const sectionLabel = sections[initialSectionIndex]?.label || 'Home'
      appendStatusMessage(`Could not find "${requestedSelectedId}" in ${sectionLabel}.`)
    }
  }

  if (supportsInteraction) {
    interactiveLoop(home, sectionEntries, {
      initialSectionIndex,
      initialSelectionBySection,
    })
  } else {
    renderStatic(home, sectionEntries, {
      initialSectionIndex,
      initialSelectionBySection,
    })
  }
}

main()

function cloneColors(colors) {
  return JSON.parse(JSON.stringify(colors))
}

function titleCase(value) {
  return value
    .split(/[\s_-]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

function resolveColor(value, fallback, base) {
  const parsed = parseColor(value)
  if (!parsed) {
    return fallback
  }

  const baseColor = base || fallback || [0, 0, 0]
  if (parsed.alpha !== null && parsed.alpha !== undefined && parsed.alpha < 1) {
    return blendRgb(baseColor, parsed.rgb, parsed.alpha)
  }

  return parsed.rgb
}

function parseColor(value) {
  if (!value) return null
  let normalized = value.trim().toLowerCase()

  if (namedColors[normalized]) {
    normalized = namedColors[normalized]
  }

  if (normalized.startsWith('#')) {
    const hex = normalized.slice(1)
    if (hex.length === 3) {
      const r = parseInt(hex[0] + hex[0], 16)
      const g = parseInt(hex[1] + hex[1], 16)
      const b = parseInt(hex[2] + hex[2], 16)
      return { rgb: [r, g, b], alpha: 1 }
    }

    if (hex.length === 6) {
      const r = parseInt(hex.slice(0, 2), 16)
      const g = parseInt(hex.slice(2, 4), 16)
      const b = parseInt(hex.slice(4, 6), 16)
      return { rgb: [r, g, b], alpha: 1 }
    }

    if (hex.length === 8) {
      const r = parseInt(hex.slice(0, 2), 16)
      const g = parseInt(hex.slice(2, 4), 16)
      const b = parseInt(hex.slice(4, 6), 16)
      const a = parseInt(hex.slice(6, 8), 16) / 255
      return { rgb: [r, g, b], alpha: a }
    }

    return null
  }

  const rgbMatch = normalized.match(
    /^rgb\(\s*([0-9]+(?:\.[0-9]+)?)\s+([0-9]+(?:\.[0-9]+)?)\s+([0-9]+(?:\.[0-9]+)?)(?:\s*\/\s*([0-9.]+%?))?\s*\)$/,
  )

  if (rgbMatch) {
    const r = clamp255(parseFloat(rgbMatch[1]))
    const g = clamp255(parseFloat(rgbMatch[2]))
    const b = clamp255(parseFloat(rgbMatch[3]))
    let alpha = 1

    if (rgbMatch[4]) {
      const alphaValue = rgbMatch[4].trim()
      alpha = alphaValue.endsWith('%') ? clamp01(parseFloat(alphaValue) / 100) : clamp01(parseFloat(alphaValue))
    }

    return { rgb: [r, g, b], alpha }
  }

  return null
}

function clamp255(value) {
  if (Number.isNaN(value)) return 0
  return Math.max(0, Math.min(255, Math.round(value)))
}

function clamp01(value) {
  if (Number.isNaN(value)) return 1
  return Math.max(0, Math.min(1, value))
}

function blendRgb(base, overlay, alpha) {
  const inverse = 1 - alpha
  return [
    Math.round(overlay[0] * alpha + base[0] * inverse),
    Math.round(overlay[1] * alpha + base[1] * inverse),
    Math.round(overlay[2] * alpha + base[2] * inverse),
  ]
}

function mixRgb(a, b, ratio) {
  const clamped = Math.max(0, Math.min(1, ratio))
  return [
    Math.round(a[0] * (1 - clamped) + b[0] * clamped),
    Math.round(a[1] * (1 - clamped) + b[1] * clamped),
    Math.round(a[2] * (1 - clamped) + b[2] * clamped),
  ]
}

function pickReadableForeground(background, textCandidate, baseCandidate) {
  const fallback = [255, 255, 255]
  const bg = background || [0, 0, 0]
  const text = textCandidate || fallback
  const base = baseCandidate || [0, 0, 0]

  const contrastWithText = contrastRatio(bg, text)
  const contrastWithBase = contrastRatio(bg, base)

  if (contrastWithText >= contrastWithBase) {
    return text
  }

  return base
}

function contrastRatio(a, b) {
  const lumA = relativeLuminance(a)
  const lumB = relativeLuminance(b)
  const lighter = Math.max(lumA, lumB)
  const darker = Math.min(lumA, lumB)
  return (lighter + 0.05) / (darker + 0.05)
}

function relativeLuminance(rgb) {
  const [r, g, b] = rgb.map((value) => {
    const channel = value / 255
    return channel <= 0.03928 ? channel / 12.92 : Math.pow((channel + 0.055) / 1.055, 2.4)
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}
