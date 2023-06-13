/** @jsx jsx */
import { FC, Fragment, useState } from 'react'
import { Box, jsx, Text } from 'theme-ui'

import Halo from '../../components/halo'

const SystemUI: FC = () => {
  let uppercase = []
  let lowercase = []
  let numbers = []
  let special = []

  for (let i = 32; i <= 126; i++) {
    let character = String.fromCharCode(i)

    if (character >= 'A' && character <= 'Z') {
      uppercase.push(character)
    } else if (character >= 'a' && character <= 'z') {
      lowercase.push(character)
    } else if (character >= '0' && character <= '9') {
      numbers.push(character)
    } else {
      special.push(character)
    }
  }

  const characters = [...uppercase, ...lowercase, ...numbers, ...special]
  const pangram = `During jubilee, Zoe quickly mixed vibrant spices for biscuits and crawfish.`

  const [variableWeight, setVariableWeight] = useState(400)

  return (
    <Fragment>
      <Halo title="system-ui" url="https://chrisnager.com/system-ui" />
      <Box sx={{ fontFamily: `system-ui` }}>
        <h1 sx={{ my: 0, fontSize: `6rem`, fontWeight: 600, textBoxTrim: `both` }}>System UI</h1>
        <p>System font</p>

        <h2 sx={{ borderTop: `4px solid` }}>Weights</h2>

        <ul sx={{ listStyleType: `none`, pl: 0, my: 0 }}>
          {[...Array(9)].map((_, index) => (
            <li key={index} sx={{ fontWeight: `${(index + 1) * 100}` }}>
              {pangram}
            </li>
          ))}
        </ul>

        <h2 sx={{ borderTop: `4px solid` }}>Variable font</h2>

        <input
          type="range"
          name="variable-weight"
          id="variable-weight"
          min={100}
          max={900}
          onChange={(event) => setVariableWeight(event.target.value)}
        />
        <Text>{variableWeight}</Text>

        <div>
          <Text sx={{ fontWeight: `${variableWeight}` }}>{pangram}</Text>
        </div>

        <h2 sx={{ borderTop: `4px solid` }}>Glyphs</h2>

        <ul
          sx={{
            display: `grid`,
            gridTemplateColumns: `repeat(10, 4rem)`,
            listStyleType: `none`,
            pl: 0,
            my: 0,
            gap: `4px`,
          }}
        >
          {characters.map((character) => {
            return (
              <li
                key={character}
                sx={{
                  aspectRatio: `1`,
                  bg: `rgb(0 0 0 / 0.025)`,
                  display: `grid`,
                  fontSize: `2rem`,
                  placeItems: `center`,
                }}
              >
                <a href={`/system-ui/characters/${character}`} sx={{ color: `inherit`, textDecoration: `none` }}>
                  {character}
                </a>
              </li>
            )
          })}
        </ul>

        <footer>
          <p>
            <small>&copy; {new Date().getFullYear()} Chris Nager</small>
          </p>
        </footer>
      </Box>
    </Fragment>
  )
}

export default SystemUI
