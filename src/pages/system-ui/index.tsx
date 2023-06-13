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

  const [weight, setWeight] = useState(400)

  return (
    <Fragment>
      <Halo title="System UI" url="https://chrisnager.com/system-ui" />

      <Box sx={{ fontFamily: `system-ui` }}>
        <h1 sx={{ my: 0, fontSize: `6rem`, fontWeight: 600, textBoxTrim: `both` }}>
          <a
            href="/system-ui"
            sx={{
              color: `inherit`,
              textDecoration: `none`,

              [`:focus, :hover`]: {
                bg: `royalblue`,
                color: `white`,
                fontStyle: `italic`,
              },
            }}
          >
            System UI
          </a>
        </h1>
        <p>
          Using the `system-ui` font-family results in San Francisco on macOS, Segoe on Windows, and Roboto on Android.
        </p>

        <h2 sx={{ borderTop: `4px solid` }}>Weights</h2>

        <ul sx={{ listStyleType: `none`, pl: 0, my: 0 }}>
          {[...Array(9)].map((_, index) => (
            <li key={index} sx={{ fontWeight: `${(index + 1) * 100}` }}>
              {pangram}
            </li>
          ))}
        </ul>

        <div sx={{ mt: `2rem` }}>
          <input
            type="range"
            name="weight"
            id="weight"
            min={100}
            max={900}
            step={100}
            defaultValue={weight}
            onChange={(event) => setWeight(event.target.value)}
          />
          <Text>{weight}</Text>
          <div sx={{ fontWeight: `${weight}` }}>{pangram}</div>
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
              <li key={character} sx={{ display: `contents` }}>
                <a
                  href={`/system-ui/characters/${character}`}
                  sx={{
                    color: `inherit`,
                    textDecoration: `none`,
                    aspectRatio: `1`,
                    bg: `rgb(0 0 0 / 0.025)`,
                    display: `grid`,
                    fontSize: `2rem`,
                    fontWeight: `500`,
                    placeItems: `center`,

                    [`:focus, :hover`]: {
                      bg: `royalblue`,
                      color: `white`,
                      fontStyle: `italic`,
                    },
                  }}
                >
                  {character}
                </a>
              </li>
            )
          })}
        </ul>

        <footer>
          <p>
            <small>
              &copy; {new Date().getFullYear()}{' '}
              <a
                href="/"
                sx={{
                  color: `inherit`,
                  textDecoration: `none`,

                  [`:focus, :hover`]: {
                    bg: `royalblue`,
                    color: `white`,
                    fontStyle: `italic`,
                  },
                }}
              >
                Chris Nager
              </a>
            </small>
          </p>
        </footer>
      </Box>
    </Fragment>
  )
}

export default SystemUI
