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

  const weightNames = {
    [`100`]: `Thin`,
    [`200`]: `Extra Light`,
    [`300`]: `Light`,
    [`400`]: `Normal`,
    [`500`]: `Medium`,
    [`600`]: `Semi Bold`,
    [`700`]: `Bold`,
    [`800`]: `Extra Bold`,
    [`900`]: `Black`,
    // [`950`]: `Extra Black (Ultra Black)`,
  }

  return (
    <Fragment>
      <Halo title="System UI" url="https://chrisnager.com/system-ui" />

      <Box sx={{ maxWidth: `1000px`, mx: `auto`, px: `1rem`, fontFamily: `system-ui` }}>
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
          Using the <code sx={{ fontSize: `1.125rem`, fontWeight: `700` }}>system-ui</code> font-family results in{' '}
          <a
            href="https://developer.apple.com/fonts/#:~:text=San%20Francisco"
            rel="noopener noreferrer"
            target="_blank"
            sx={{
              color: `inherit`,

              [`:focus, :hover`]: {
                bg: `royalblue`,
                color: `white`,
              },
            }}
          >
            San Francisco<span> ↗</span>
          </a>{' '}
          on macOS,{' '}
          <a
            href="https://learn.microsoft.com/en-us/typography/font-list/segoe-ui"
            rel="noopener noreferrer"
            target="_blank"
            sx={{
              color: `inherit`,

              [`:focus, :hover`]: {
                bg: `royalblue`,
                color: `white`,
              },
            }}
          >
            Segoe<span> ↗</span>
          </a>{' '}
          on Windows, and{' '}
          <a
            href="https://fonts.google.com/specimen/Roboto"
            rel="noopener noreferrer"
            target="_blank"
            sx={{
              color: `inherit`,

              [`:focus, :hover`]: {
                bg: `royalblue`,
                color: `white`,
              },
            }}
          >
            Roboto<span> ↗</span>
          </a>{' '}
          on Android.
        </p>

        <h2 sx={{ borderTop: `4px solid` }}>Weights</h2>

        <ul
          sx={{
            listStyleType: `none`,
            pl: 0,
            my: 0,
            display: `grid`,
            gridTemplateColumns: `repeat(5, 1fr)`,
            gap: `0.125rem`,
            bg: `text`,
            border: `0.125rem solid`,

            position: `relative`,

            [`::after`]: {
              content: `""`,
              position: `absolute`,
              bg: `blue`,
              width: `calc(100% / 5 + 0.125rem / 5)`,
              height: `calc(100% / 2 + 0.125rem / 2)`,

              backgroundImage: `repeating-linear-gradient(
                  315deg,
                  #dfeff3 0%,
                  #dfeff3 50%,
                  #1d2021 50%,
                  #1d2021 calc(50% + 0.125rem),
                  #dfeff3 calc(50% + 0.125rem),
                  #dfeff3 100%
                )`,

              boxSizing: `border-box`,
              bottom: `-0.125rem`,
              right: `-0.125rem`,
            },
          }}
        >
          {Object.values(weightNames).map((weightName, index) => (
            <li key={index} sx={{ bg: `background`, aspectRatio: `1`, display: `grid`, gridTemplateRows: `auto 1fr` }}>
              <div sx={{ fontWeight: `500`, p: `0.25rem` }}>{weightName}</div>
              <div sx={{ fontSize: `8vmax`, fontWeight: `${(index + 1) * 100}`, placeSelf: `center` }}>Aa</div>
              <div sx={{ fontWeight: `300`, p: `0.25rem`, display: `flex`, justifyContent: `flex-end` }}>
                {(index + 1) * 100}
              </div>
            </li>
          ))}

          <li />
        </ul>

        <ul sx={{ listStyleType: `none`, pl: 0, my: 0 }}>
          {Object.values(weightNames).map((weightName, index) => (
            <li key={index} sx={{ mt: `1rem` }}>
              <div sx={{ fontWeight: `500` }}>
                {weightName} <i>{(index + 1) * 100}</i>
              </div>
              <div sx={{ fontSize: `1.5rem`, fontWeight: `${(index + 1) * 100}` }}>{pangram}</div>
            </li>
          ))}
        </ul>

        <div sx={{ mt: `2rem` }}>
          <h3>Drag to scrub through weights.</h3>

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

        <h2 sx={{ borderTop: `4px solid` }}>Usage</h2>

        <h3 sx={{ mt: `2rem`, mb: 0 }}>
          Set `system-ui` as your base font family, with `sans-serif` as a simple fallback.
        </h3>
        <pre
          sx={{
            bg: `rgb(0 0 0 / 0.025)`,
            p: `2rem`,
            overflowX: `auto`,
            lineHeight: `1.5`,
            mt: `1rem`,
            mb: 0,
          }}
        >
          <code sx={{ fontSize: `1.125rem`, fontWeight: `700` }}>
            {`body {
  `}
            <mark
              sx={{
                bg: `transparent`,
                textDecoration: `underline`,
                textDecorationStyle: `wavy`,
                textUnderlinePosition: `under`,
                textDecorationColor: `hotpink`,
              }}
            >
              font-family: system-ui
            </mark>
            {`, sans-serif;
}`}
          </code>
        </pre>

        <h3 sx={{ mt: `2rem`, mb: 0 }}>
          To ensure system UI fonts are applied for all platforms, include a{' '}
          <a
            href="https://css-tricks.com/snippets/css/system-font-stack/"
            sx={{
              color: `inherit`,

              [`:focus, :hover`]: {
                bg: `royalblue`,
                color: `white`,
              },
            }}
          >
            complete set of fallback font families
          </a>
          .
        </h3>
        <pre
          sx={{
            bg: `rgb(0 0 0 / 0.025)`,
            p: `2rem`,
            overflowX: `auto`,
            lineHeight: `1.5`,
            mt: `1rem`,
            mb: 0,
            fontSize: `1.125rem`,
            fontWeight: `700`,
          }}
        >
          <code>
            {`body {
  font-family: system-ui, `}
            <mark
              sx={{
                bg: `transparent`,
                textDecoration: `underline`,
                textDecorationStyle: `wavy`,
                textUnderlinePosition: `under`,
                textDecorationColor: `hotpink`,
              }}
            >{`"Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`}</mark>
            {`;
}`}
          </code>
        </pre>

        <h2 sx={{ borderTop: `4px solid` }}>Glyphs</h2>

        <ul
          sx={{
            display: `grid`,
            gridTemplateColumns: `repeat(12, 1fr)`,
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

        <h2 sx={{ borderTop: `4px solid` }}>Samples</h2>

        <div sx={{ width: `25%`, aspectRatio: `9 / 16`, bg: `royalblue`, color: `white` }}>
          <h1>Interface 01</h1>
        </div>

        <div sx={{ width: `25%`, aspectRatio: `9 / 16`, bg: `royalblue`, color: `white` }}></div>

        <footer>
          <p>
            <small>
              &copy; {new Date().getFullYear()}{' '}
              <a
                href="/"
                sx={{
                  color: `inherit`,

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
