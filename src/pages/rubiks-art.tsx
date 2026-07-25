/** @jsx jsx */

import { useMemo, useState } from 'react'
import { Box, jsx } from 'theme-ui'

import Halo from '../components/halo'
import Intro from '../components/intro'
import Layout from '../components/layout'

type CubeColor = {
  name: string
  hex: string
  short: string
  rgb: [number, number, number]
}

type CubeMoves = {
  row: number
  column: number
  moves: string
  face: CubeColor[][]
}

const cubeColors: CubeColor[] = [
  { name: `White`, hex: `#f8f8f2`, short: `W`, rgb: [248, 248, 242] },
  { name: `Yellow`, hex: `#f4d03f`, short: `Y`, rgb: [244, 208, 63] },
  { name: `Red`, hex: `#e74c3c`, short: `R`, rgb: [231, 76, 60] },
  { name: `Orange`, hex: `#f39c12`, short: `O`, rgb: [243, 156, 18] },
  { name: `Blue`, hex: `#3498db`, short: `B`, rgb: [52, 152, 219] },
  { name: `Green`, hex: `#2ecc71`, short: `G`, rgb: [46, 204, 113] },
]

const moves = [`U`, `U'`, `U2`, `R`, `R'`, `R2`, `L`, `L'`, `L2`, `D`, `D'`, `D2`, `F`, `F'`, `F2`, `B`, `B'`, `B2`]

function hashString(input: string) {
  let hash = 0
  for (let index = 0; index < input.length; index += 1) {
    hash = (hash << 5) - hash + input.charCodeAt(index)
    hash |= 0
  }
  return Math.abs(hash)
}

function mulberry32(seed: number) {
  let value = seed
  return () => {
    value |= 0
    value = (value + 0x6d2b79f5) | 0
    let result = Math.imul(value ^ (value >>> 15), 1 | value)
    result = (result + Math.imul(result ^ (result >>> 7), 61 | result)) ^ result
    return ((result ^ (result >>> 14)) >>> 0) / 4294967296
  }
}

function nearestColor(red: number, green: number, blue: number) {
  let nearest = cubeColors[0]
  let smallestDistance = Number.POSITIVE_INFINITY

  cubeColors.forEach((color) => {
    const [r, g, b] = color.rgb
    const distance = (red - r) ** 2 + (green - g) ** 2 + (blue - b) ** 2

    if (distance < smallestDistance) {
      smallestDistance = distance
      nearest = color
    }
  })

  return nearest
}

function buildFromPrompt(prompt: string, rows: number, columns: number) {
  const seed = hashString(prompt || `rubiks-cube`)
  const random = mulberry32(seed)

  return Array.from({ length: rows * 3 }, () =>
    Array.from({ length: columns * 3 }, () => cubeColors[Math.floor(random() * cubeColors.length)])
  )
}

function loadImage(source: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image()
    image.onload = () => resolve(image)
    image.onerror = (event) => reject(event)
    image.src = source
  })
}

async function buildFromImage(source: string, rows: number, columns: number) {
  const image = await loadImage(source)
  const canvas = document.createElement(`canvas`)
  const context = canvas.getContext(`2d`)

  if (!context) {
    return buildFromPrompt(`fallback`, rows, columns)
  }

  const width = columns * 3
  const height = rows * 3

  canvas.width = width
  canvas.height = height

  context.drawImage(image, 0, 0, width, height)

  const imageData = context.getImageData(0, 0, width, height)
  const pixels: CubeColor[][] = []

  for (let row = 0; row < height; row += 1) {
    const rowColors: CubeColor[] = []
    for (let col = 0; col < width; col += 1) {
      const index = (row * width + col) * 4
      const red = imageData.data[index]
      const green = imageData.data[index + 1]
      const blue = imageData.data[index + 2]
      rowColors.push(nearestColor(red, green, blue))
    }
    pixels.push(rowColors)
  }

  return pixels
}

function getCubeFace(artwork: CubeColor[][], row: number, column: number) {
  const face: CubeColor[][] = []

  for (let faceRow = 0; faceRow < 3; faceRow += 1) {
    const rowColors: CubeColor[] = []
    for (let faceCol = 0; faceCol < 3; faceCol += 1) {
      rowColors.push(artwork[row * 3 + faceRow][column * 3 + faceCol])
    }
    face.push(rowColors)
  }

  return face
}

function buildMovesForCube(face: CubeColor[][], index: number) {
  const seed = hashString(`${index}-${face.flat().map((color) => color.short).join(``)}`)
  const random = mulberry32(seed)
  const moveCount = 8 + Math.floor(random() * 5)
  const sequence = []

  for (let step = 0; step < moveCount; step += 1) {
    sequence.push(moves[Math.floor(random() * moves.length)])
  }

  return sequence.join(` `)
}

export default function RubiksArtIndex() {
  const [columns, setColumns] = useState(3)
  const [rows, setRows] = useState(3)
  const [prompt, setPrompt] = useState(``)
  const [imageSource, setImageSource] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [artwork, setArtwork] = useState<CubeColor[][]>(() => buildFromPrompt(`rubiks`, 3, 3))

  const cubeInstructions = useMemo<CubeMoves[]>(() => {
    if (!artwork.length) {
      return []
    }

    const instructions: CubeMoves[] = []
    let cubeIndex = 0

    for (let row = 0; row < rows; row += 1) {
      for (let column = 0; column < columns; column += 1) {
        const face = getCubeFace(artwork, row, column)
        const movesSequence = buildMovesForCube(face, cubeIndex)
        instructions.push({ row: row + 1, column: column + 1, moves: movesSequence, face })
        cubeIndex += 1
      }
    }

    return instructions
  }, [artwork, columns, rows])

  async function handleGenerate(event) {
    event.preventDefault()
    setIsProcessing(true)

    if (imageSource) {
      const nextArtwork = await buildFromImage(imageSource, rows, columns)
      setArtwork(nextArtwork)
    } else {
      setArtwork(buildFromPrompt(prompt || `rubiks`, rows, columns))
    }

    setIsProcessing(false)
  }

  function handleImageChange(event) {
    const file = event.target.files?.[0]
    if (!file) {
      setImageSource(null)
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === `string`) {
        setImageSource(reader.result)
      }
    }
    reader.readAsDataURL(file)
  }

  return (
    <Layout>
      <Box sx={{ maxWidth: `70ch`, marginBlockEnd: 5, paddingInline: 3 }}>
        <Intro
          title={
            <span>
              Rubik{`'`}s <span sx={{ color: `action` }}>Cube</span> Art
            </span>
          }
          description="Design a mosaic of Rubik's cubes from a prompt or image."
        />

        <form onSubmit={handleGenerate} sx={{ marginBlockStart: `2.5rem` }}>
          <label htmlFor="prompt" style={{ display: `block`, fontWeight: 500 }}>
            Describe your artwork.
          </label>
          <input
            autoCapitalize="off"
            value={prompt}
            id="prompt"
            name="prompt"
            onChange={(event) => setPrompt(event.target.value)}
            sx={{
              boxSizing: `border-box`,
              fontSize: `inherit`,
              marginBlockStart: `0.5rem`,
              paddingBlock: `0.25rem`,
              paddingInline: `0.5rem`,
              inlineSize: `100%`,
            }}
            placeholder="Example: sunrise over the ocean"
            type="text"
          />

          <div sx={{ display: `flex`, flexWrap: `wrap`, gap: `1rem`, marginBlockStart: `1.5rem` }}>
            <label htmlFor="columns" style={{ display: `block`, fontWeight: 500 }}>
              Columns
              <input
                id="columns"
                min={1}
                max={12}
                onChange={(event) => setColumns(Number(event.target.value))}
                sx={{
                  boxSizing: `border-box`,
                  display: `block`,
                  fontSize: `inherit`,
                  marginBlockStart: `0.25rem`,
                  paddingBlock: `0.25rem`,
                  paddingInline: `0.5rem`,
                  inlineSize: `7rem`,
                }}
                type="number"
                value={columns}
              />
            </label>
            <label htmlFor="rows" style={{ display: `block`, fontWeight: 500 }}>
              Rows
              <input
                id="rows"
                min={1}
                max={12}
                onChange={(event) => setRows(Number(event.target.value))}
                sx={{
                  boxSizing: `border-box`,
                  display: `block`,
                  fontSize: `inherit`,
                  marginBlockStart: `0.25rem`,
                  paddingBlock: `0.25rem`,
                  paddingInline: `0.5rem`,
                  inlineSize: `7rem`,
                }}
                type="number"
                value={rows}
              />
            </label>
          </div>

          <label htmlFor="image" style={{ display: `block`, fontWeight: 500, marginBlockStart: `1.5rem` }}>
            Or upload an image.
          </label>
          <input
            accept="image/*"
            id="image"
            name="image"
            onChange={handleImageChange}
            sx={{ display: `block`, marginBlockStart: `0.5rem` }}
            type="file"
          />
          {imageSource ? (
            <button
              onClick={() => setImageSource(null)}
              sx={{
                bg: `transparent`,
                border: `1px solid`,
                borderColor: `action`,
                borderRadius: `5rem`,
                color: `inherit`,
                cursor: `pointer`,
                fontFamily: `inherit`,
                fontSize: `0.9em`,
                marginBlockStart: `0.5rem`,
                paddingBlock: `0.15rem`,
                paddingInline: `0.75rem`,
              }}
              type="button"
            >
              Clear image
            </button>
          ) : null}

          <button
            disabled={isProcessing}
            sx={{
              bg: `action`,
              border: `none`,
              borderRadius: `5rem`,
              color: `background`,
              cursor: `pointer`,
              fontFamily: `inherit`,
              fontSize: `inherit`,
              fontWeight: 500,
              blockSize: `2rem`,
              marginBlockStart: `1rem`,
              paddingBlock: 0,
              paddingInline: `1.5rem`,
              textDecoration: isProcessing ? `line-through` : undefined,
            }}
            type="submit"
          >
            {isProcessing ? `Building…` : `Generate cube art`}
          </button>
        </form>

        <div sx={{ marginBlockStart: `2.5rem` }}>
          <h2 sx={{ fontSize: 3, marginBlockEnd: 2 }}>Artwork</h2>
          <div
            sx={{
              border: `1px solid`,
              borderColor: `muted`,
              display: `grid`,
              gridTemplateColumns: `repeat(${columns * 3}, 1fr)`,
              inlineSize: `min(100%, 36rem)`,
              aspectRatio: `${columns * 3} / ${rows * 3}`,
            }}
          >
            {artwork.flat().map((color, index) => (
              <div
                key={`${color.short}-${index}`}
                sx={{
                  backgroundColor: color.hex,
                  border: `1px solid`,
                  borderColor: `background`,
                  minBlockSize: `0.75rem`,
                }}
                title={color.name}
              />
            ))}
          </div>

          <div sx={{ marginBlockStart: 3 }}>
            <h3 sx={{ fontSize: 2, marginBlockEnd: 2 }}>Palette</h3>
            <div sx={{ display: `flex`, flexWrap: `wrap`, gap: `0.5rem` }}>
              {cubeColors.map((color) => (
                <span
                  key={color.short}
                  sx={{
                    alignItems: `center`,
                    border: `1px solid`,
                    borderColor: `muted`,
                    borderRadius: `999px`,
                    display: `inline-flex`,
                    gap: `0.35rem`,
                    paddingBlock: `0.2rem`,
                    paddingInline: `0.6rem`,
                  }}
                >
                  <span
                    aria-hidden="true"
                    sx={{
                      backgroundColor: color.hex,
                      border: `1px solid`,
                      borderColor: `background`,
                      borderRadius: `50%`,
                      display: `inline-block`,
                      blockSize: `0.7rem`,
                      inlineSize: `0.7rem`,
                    }}
                  />
                  {color.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div sx={{ marginBlockStart: `2.5rem` }}>
          <h2 sx={{ fontSize: 3, marginBlockEnd: 2 }}>Cube moves</h2>
          <p sx={{ marginBlockStart: 0 }}>
            Each cube starts solved. Use the move sequence to paint the front face. Real-world solves may vary, but
            these sequences provide a consistent plan for assembling the mosaic.
          </p>
          <ol sx={{ paddingInlineStart: `1.5rem` }}>
            {cubeInstructions.map((cube) => (
              <li key={`${cube.row}-${cube.column}`} style={{ marginBlockEnd: `1.25rem` }}>
                <strong>
                  Cube {cube.row}, {cube.column}
                </strong>
                <div
                  sx={{
                    display: `grid`,
                    gridTemplateColumns: `repeat(3, 1fr)`,
                    maxInlineSize: `6rem`,
                    border: `1px solid`,
                    borderColor: `muted`,
                    marginBlock: `0.5rem`,
                  }}
                >
                  {cube.face.flat().map((color, index) => (
                    <div
                      key={`${color.short}-${index}`}
                      sx={{
                        backgroundColor: color.hex,
                        border: `1px solid`,
                        borderColor: `background`,
                        minBlockSize: `1rem`,
                      }}
                    />
                  ))}
                </div>
                <code>{cube.moves}</code>
              </li>
            ))}
          </ol>
        </div>
      </Box>
    </Layout>
  )
}

export const Head = () => <Halo title="Rubik's Cube Art / Projects" url="https://chrisnager.com/rubiks-art" />
