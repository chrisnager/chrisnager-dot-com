/** @jsx jsx */
import { Global } from '@emotion/react'
import { FC, useMemo, useState } from 'react'
import { Box, Input, jsx, Label, Text } from 'theme-ui'

import Halo from '../../components/halo'
import Intro from '../../components/intro'
import Layout from '../../components/layout'

const DEFAULT_VALUE = `590123412345`
const QUIET_ZONE_MODULES = 11
const BARCODE_HEIGHT = `20rem`

const LEFT_ENCODINGS = {
  L: {
    0: `0001101`,
    1: `0011001`,
    2: `0010011`,
    3: `0111101`,
    4: `0100011`,
    5: `0110001`,
    6: `0101111`,
    7: `0111011`,
    8: `0110111`,
    9: `0001011`,
  },
  G: {
    0: `0100111`,
    1: `0110011`,
    2: `0011011`,
    3: `0100001`,
    4: `0011101`,
    5: `0111001`,
    6: `0000101`,
    7: `0010001`,
    8: `0001001`,
    9: `0010111`,
  },
  R: {
    0: `1110010`,
    1: `1100110`,
    2: `1101100`,
    3: `1000010`,
    4: `1011100`,
    5: `1001110`,
    6: `1010000`,
    7: `1000100`,
    8: `1001000`,
    9: `1110100`,
  },
}

const PARITY_BY_FIRST_DIGIT = {
  0: `LLLLLL`,
  1: `LLGLGG`,
  2: `LLGGLG`,
  3: `LLGGGL`,
  4: `LGLLGG`,
  5: `LGGLLG`,
  6: `LGGGLL`,
  7: `LGLGLG`,
  8: `LGLGGL`,
  9: `LGGLGL`,
}

function sanitizeValue(value) {
  return value.replace(/\D/g, ``)
}

function computeChecksum(firstTwelveDigits) {
  const digits = firstTwelveDigits.split(``).map(Number)

  const total = digits.reduce((sum, digit, index) => {
    return sum + digit * (index % 2 === 0 ? 1 : 3)
  }, 0)

  return `${(10 - (total % 10)) % 10}`
}

function normalizeBarcodeInput(rawValue) {
  const digits = sanitizeValue(rawValue)

  if (!digits.length) {
    return {
      error: `Enter 12 digits to calculate a checksum, or 13 digits to validate a full EAN-13 barcode.`,
    }
  }

  if (digits.length < 12 || digits.length > 13) {
    return {
      error: `EAN-13 uses 12 data digits plus 1 checksum digit. Spaces and hyphens are ignored.`,
    }
  }

  if (digits.length === 12) {
    const checksum = computeChecksum(digits)

    return {
      checksum,
      completed: `${digits}${checksum}`,
      sourceDigits: digits,
      wasCompleted: true,
    }
  }

  const sourceDigits = digits.slice(0, 12)
  const checksum = computeChecksum(sourceDigits)

  if (checksum !== digits[12]) {
    return {
      error: `Checksum mismatch. The final digit should be ${checksum} for ${sourceDigits}.`,
    }
  }

  return {
    checksum,
    completed: digits,
    sourceDigits,
    wasCompleted: false,
  }
}

function encodeEan13Pattern(fullCode) {
  const digits = fullCode.split(``)
  const parity = PARITY_BY_FIRST_DIGIT[digits[0]]
  const leftDigits = digits.slice(1, 7)
  const rightDigits = digits.slice(7)

  const leftPattern = leftDigits
    .map((digit, index) => {
      const encodingSet = parity[index]
      return LEFT_ENCODINGS[encodingSet][digit]
    })
    .join(``)

  const rightPattern = rightDigits.map((digit) => LEFT_ENCODINGS.R[digit]).join(``)

  return `${`0`.repeat(QUIET_ZONE_MODULES)}101${leftPattern}01010${rightPattern}101${`0`.repeat(QUIET_ZONE_MODULES)}`
}

function createBarcodeGradient(pattern) {
  const stops = []
  let runStart = 0
  let current = pattern[0]

  for (let index = 1; index <= pattern.length; index += 1) {
    if (pattern[index] === current) {
      continue
    }

    const start = ((runStart / pattern.length) * 100).toFixed(4)
    const end = ((index / pattern.length) * 100).toFixed(4)
    const color = current === `1` ? `var(--on)` : `var(--off)`

    stops.push(`${color} ${start}% ${end}%`)
    runStart = index
    current = pattern[index]
  }

  return `linear-gradient(90deg, ${stops.join(`, `)})`
}

function formatVisibleDigits(fullCode) {
  return {
    lead: fullCode[0],
    left: fullCode.slice(1, 7),
    right: fullCode.slice(7),
  }
}

const BarcodePage: FC = () => {
  const [value, setValue] = useState(DEFAULT_VALUE)

  const barcode = useMemo(() => {
    const normalized = normalizeBarcodeInput(value)

    if (normalized.error) {
      return normalized
    }

    const pattern = encodeEan13Pattern(normalized.completed)

    return {
      ...normalized,
      digits: formatVisibleDigits(normalized.completed),
      gradient: createBarcodeGradient(pattern),
    }
  }, [value])

  return (
    <Layout>
      <Global
        styles={`
          :root {
            --barcode-ink: currentcolor;
            --barcode-paper: rgba(255, 255, 255, 0);
            --barcode-shadow: rgba(17, 17, 17, 0.08);
            --barcode-frame: rgba(17, 17, 17, 0.14);
          }
        `}
      />

      <Box sx={{
        marginBlockEnd: 5,
        paddingInline: 3,
        display: `grid`,
        gap: [3, 4],
      }}>
        <div>
          <Intro
            title="CSS-only barcodes"
            description="Type 12 digits to generate a correct checksum automatically, or paste all 13 digits to validate an existing EAN-13 code."
          />

          <p sx={{ marginBlock: 0, fontFamily: `Georgia, serif` }}>The barcode itself is drawn entirely with a single CSS linear gradient.</p>
        </div>

        <Box
          as="form"
          onSubmit={(event) => event.preventDefault()}
          sx={{
            display: `grid`,
            gap: 3,
          }}
        >
          <div>
            <Label htmlFor="barcode-input" sx={{ fontWeight: 600 }}>
              Digits
            </Label>
            <Input
              autoCapitalize="off"
              autoComplete="off"
              autoCorrect="off"
              id="barcode-input"
              inputMode="numeric"
              onChange={(event) => setValue(event.target.value)}
              pattern="[0-9 -]*"
              spellCheck={false}
              sx={{
                fontFamily: `monospace`,
                fontSize: `1.05rem`,
                marginBlockStart: 2,
              }}
              type="text"
              value={value}
            />
          </div>

          {barcode.error ? (
            <Text as="p" sx={{ color: `action`, fontFamily: `Georgia, serif`, marginBlock: 0 }}>
              {barcode.error}
            </Text>
          ) : (
            <table sx={{ fontSize: [1, 3] }}>
              <thead>
                <tr>
                  <th sx={{ textAlign: `left`, fontWeight: 600 }}>Symbology</th>
                  <th sx={{ textAlign: `right`, fontWeight: 600 }}>Full code</th>
                  <th sx={{ textAlign: `right`, fontWeight: 600, minInlineSize: `13ch` }}>Check digit</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th sx={{ textAlign: `left`, fontFamily: `monospace`, fontWeight: `400` }}>EAN-13</th>
                  <th sx={{ textAlign: `right`, fontFamily: `monospace`, fontWeight: `400` }}>{barcode.completed}</th>
                  <th sx={{ textAlign: `right`, fontFamily: `monospace`, fontWeight: `400` }}>{barcode.wasCompleted ? `(computed)` : `(validated)`} {barcode.checksum}</th>
                </tr>
              </tbody>
            </table>
          )}
        </Box>

        <Box
          sx={{
            display: `grid`,
            gap: 3,
          }}
        >
          <Box>
            {barcode.error ? (
              <Box
                sx={{
                  minBlockSize: BARCODE_HEIGHT,
                  display: `grid`,
                  placeItems: `center`,
                  background: `repeating-linear-gradient(
                        -45deg,
                        rgb(17 17 17 / 0.03),
                        rgb(17 17 17 / 0.03) 0.75rem,
                        transparent 0.75rem,
                        transparent 1.5rem
                      )`,
                  borderRadius: `0.75rem`,
                }}
              >
                <Text as="p" sx={{ margin: 0, maxInlineSize: `28ch`, textAlign: `center` }}>
                  Enter a valid EAN-13 number to render the barcode.
                </Text>
              </Box>
            ) : (
              <Box>
                <Box
                  sx={{
                    '--on': `currentcolor`,
                    '--off': `transparent`,
                    '--barcode': barcode.gradient,
                    backgroundColor: `transparent`,
                    backgroundImage: `var(--barcode)`,
                    backgroundRepeat: `no-repeat`,
                    backgroundSize: `100% 100%`,
                    blockSize: BARCODE_HEIGHT,
                    marginInline: `auto`,
                  }}
                />

                <Box
                  aria-hidden="true"
                  sx={{
                    display: `grid`,
                    gridTemplateColumns: `${QUIET_ZONE_MODULES}fr 3fr 42fr 5fr 42fr ${QUIET_ZONE_MODULES}fr`,
                    fontFamily: `monospace`,
                    fontSize: [`0.8rem`, `1rem`],
                    letterSpacing: `0.28em`,
                    lineHeight: 1,
                    marginBlockStart: 2,
                    inlineSize: `min(100%, 42rem)`,
                    marginInline: `auto`,
                  }}
                >
                  <span />
                  <span sx={{ textAlign: `left` }}>{barcode.digits.lead}</span>
                  <span sx={{ textAlign: `center` }}>{barcode.digits.left}</span>
                  <span />
                  <span sx={{ textAlign: `center` }}>{barcode.digits.right}</span>
                  <span />
                </Box>
              </Box>
            )}
          </Box>

          <Text as="p" sx={{ fontSize: `0.95rem`, marginBlock: 0 }}>
            The rendered pattern includes start, center, and end guards plus quiet zones. Scanners care about the
            module pattern; the bars here are generated from the same binary encoding used by printed EAN-13
            labels.
          </Text>
        </Box>
      </Box>
    </Layout>
  )
}

export default BarcodePage

export const Head = () => (
  <Halo
    description="Generate real EAN-13 barcodes with CSS-only visuals."
    title="CSS-only barcodes / Projects"
    url="https://chrisnager.com/projects/barcode"
  />
)
