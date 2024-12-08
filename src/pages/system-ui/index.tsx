/** @jsx jsx */
import { Global } from '@emotion/react'
import { FC, Fragment, useState } from 'react'
import { Box, jsx, Text } from 'theme-ui'

import Halo from '../../components/halo'
import Layout from '../../components/layout'

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
  const [italic, setItalic] = useState(false)

  const weights = {
    [`100`]: `Thin`,
    [`200`]: `Extra Light`,
    [`300`]: `Light`,
    [`400`]: `Normal`,
    [`500`]: `Medium`,
    [`600`]: `Semi Bold`,
    [`700`]: `Bold`,
    [`800`]: `Extra Bold`,
    [`900`]: `Black`,
  }

  const fontFamilies = {
    [`system-ui`]: `System UI`,
    [`sans-serif`]: `Sans Serif`,
    [`serif`]: `Serif`,
    [`monospace`]: `Monospace`,
    [`cursive`]: `Cursive`,
    [`fantasy`]: `Fantasy`,
    [`Helvetica`]: `Helvetica`,
    [`Arial`]: `Arial`,
    [`Times New Roman`]: `Times New Roman`,
    [`Courier New`]: `Courier New`,
    [`Verdana`]: `Verdana`,
    [`Georgia`]: `Georgia`,
    [`Garamond`]: `Garamond`,
    [`Tahoma`]: `Tahoma`,
    [`Lucida Sans`]: `Lucida Sans`,
    [`Trebuchet MS`]: `Trebuchet MS`,
  }

  const [fontFamily, setFontFamily] = useState(`system-ui`)

  return (
    <Layout>
      <Global styles={{ body: { fontFamily } }} />

      <Box sx={{ maxWidth: `1000px`, mx: `auto`, px: `1rem`, mb: 5, px: 3 }}>
        {/* Responsive heading technique: https://codepen.io/chrisnager/details/abJVJQ */}
        <svg sx={{ bg: `red`, maxHeight: `  rem` }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 28">
          <text sx={{ width: `100%`, fill: `white`, fontWeight: 600 }} x="0" y="70%">
            {fontFamilies[fontFamily]}
          </text>
        </svg>

        <select
          name="font-family"
          id="font-family"
          onChange={(event) => {
            setFontFamily(event.target.value)
          }}
        >
          {Object.keys(fontFamilies).map((item) => {
            return (
              <option key={item} value={item}>
                {fontFamilies[item]}
              </option>
            )
          })}
        </select>

        <h1 sx={{ my: 0, fontSize: `6rem`, fontWeight: 600, textBoxTrim: `both` }}>{fontFamilies[fontFamily]}</h1>

        <p>
          Using the <code sx={{ fontSize: `1.125rem`, fontWeight: `700` }}>system-ui</code> font-family results in{' '}
          <a
            href="https://developer.apple.com/fonts/#:~:text=San%20Francisco"
            rel="noopener noreferrer"
            target="_blank"
            sx={{
              color: `inherit`,

              [`:focus, :hover`]: {
                bg: `action`,
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
                bg: `action`,
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
                bg: `action`,
                color: `white`,
              },
            }}
          >
            Roboto<span> ↗</span>
          </a>{' '}
          on Android.
        </p>

        <h2 sx={{ mt: `1rem`, mb: 0, pt: `1rem`, borderTop: `4px solid` }}>Weights</h2>

        <ul
          sx={(theme) => {
            return {
              listStyleType: `none`,
              pl: 0,
              mt: `1rem`,
              mb: 0,
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
                  ${theme.colors.background} 0%,
                  ${theme.colors.background} 50%,
                  ${theme.colors.text} 50%,
                  ${theme.colors.text} calc(50% + 0.125rem),
                  ${theme.colors.background} calc(50% + 0.125rem),
                  ${theme.colors.background} 100%
                )`,

                boxSizing: `border-box`,
                bottom: `-0.125rem`,
                right: `-0.125rem`,
              },
            }
          }}
        >
          {Object.values(weights).map((weightName, index) => (
            <li
              key={weightName}
              sx={{ bg: `background`, aspectRatio: `1`, display: `grid`, gridTemplateRows: `auto 1fr` }}
            >
              <div sx={{ fontSize: `1rem`, lineHeight: `1`, fontWeight: `500`, pt: `0.25rem`, px: `0.25rem` }}>
                {weightName}
              </div>
              <div sx={{ fontSize: `5.5vmax`, fontWeight: `${(index + 1) * 100}`, placeSelf: `center` }}>Aa</div>
              <div
                sx={{
                  fontSize: `1rem`,
                  lineHeight: `1`,
                  fontWeight: `300`,
                  px: `0.25rem`,
                  pb: `0.25rem`,
                  display: `flex`,
                  justifyContent: `flex-end`,
                }}
              >
                {(index + 1) * 100}
              </div>
            </li>
          ))}

          <li />
        </ul>

        <div sx={{ mt: `2rem` }}>
          <h3 sx={{ mt: `2rem`, mb: 0 }}>Drag to scrub through weights.</h3>
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
          <input type="checkbox" onChange={() => setItalic(!italic)} /> Italic
          <div sx={{ fontSize: `2rem`, fontStyle: italic ? `italic` : `normal`, fontWeight: `${weight}` }}>
            AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz
          </div>
        </div>

        <ul sx={{ listStyleType: `none`, pl: 0, my: 0 }}>
          {Object.values(weights).map((weightName, index) => (
            <Fragment>
              <li key={weightName} sx={{ mt: `3rem` }}>
                <div sx={{ fontWeight: `500` }}>{weightName}</div>
                <div sx={{ fontSize: `1.4725rem`, fontWeight: `${(index + 1) * 100}` }}>{pangram}</div>
              </li>

              <li key={index} sx={{ mt: `1rem` }}>
                <div sx={{ fontWeight: `500` }}>{weightName} Italic</div>
                <div sx={{ fontSize: `1.4725rem`, fontStyle: `italic`, fontWeight: `${(index + 1) * 100}` }}>
                  {pangram}
                </div>
              </li>
            </Fragment>
          ))}
        </ul>

        <h2 sx={{ mt: `1rem`, mb: 0, pt: `1rem`, borderTop: `4px solid` }}>Glyphs</h2>

        <ul
          sx={{
            display: `grid`,
            gridTemplateColumns: `repeat(12, 1fr)`,
            listStyleType: `none`,
            pl: 0,
            mt: `2rem`,
            mb: 0,
            mx: `-1.625rem`,
            gap: `0.125rem`,
          }}
        >
          {characters.map((character) => {
            return (
              <li key={character} sx={{ display: `contents` }}>
                <a
                  href={`/system-ui/characters/${character}`}
                  sx={{
                    color: `inherit`,
                    aspectRatio: `1`,
                    display: `grid`,
                    fontSize: `2rem`,
                    fontWeight: `500`,
                    placeItems: `center`,

                    [`:focus, :hover`]: {
                      bg: `action`,
                      color: `white`,
                      fontStyle: `italic`,
                      textDecoration: `none`,
                      transform: `scale(1.5)`,
                    },
                  }}
                >
                  {character}
                </a>
              </li>
            )
          })}
        </ul>

        <h2 sx={{ mt: `1rem`, mb: 0, pt: `1rem`, borderTop: `4px solid` }}>Samples</h2>

        <div
          sx={{
            bg: `action`,
            overflowX: `hidden`,
          }}
        >
          <p
            sx={{
              my: 0,
              fontStyle: `italic`,
              fontSize: `12rem`,
              fontWeight: `900`,
              whiteSpace: `nowrap`,
              animation: `marquee 4s linear infinite`,

              [`:hover`]: {
                animationPlayState: `paused`,
              },

              '@keyframes marquee': {
                from: { transform: `translateX(100%)` },
                to: { transform: `translateX(-200%)` },
              },
            }}
          >
            Bella Biscuit
          </p>
        </div>

        <div
          sx={{
            bg: `red`,
            overflowX: `hidden`,
          }}
        >
          <p
            sx={{
              my: 0,
              fontStyle: `italic`,
              fontSize: `12rem`,
              fontWeight: `900`,
              whiteSpace: `nowrap`,
              animation: `marquee-2 4s linear infinite`,

              [`:hover`]: {
                animationPlayState: `paused`,
              },

              '@keyframes marquee-2': {
                from: { transform: `translateX(-200%)` },
                to: { transform: `translateX(100%)` },
              },
            }}
          >
            Bella Biscuit
          </p>
        </div>

        <h2 sx={{ mt: `1rem`, mb: 0, pt: `1rem`, borderTop: `4px solid` }}>Usage</h2>

        <h3 sx={{ mt: `2rem`, mb: 0 }}>
          Set `system-ui` as your base font family, with `sans-serif` as a simple fallback.
        </h3>
        <pre
          sx={{
            bg: `tile`,
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
                color: `text`,
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
            rel="noopener noreferrer"
            target="_blank"
            sx={{
              color: `inherit`,

              [`:focus, :hover`]: {
                bg: `action`,
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
            bg: `tile`,
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
                color: `text`,
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
      </Box>
    </Layout>
  )
}

export default SystemUI

export const Head = () => <Halo title="System UI" url="https://chrisnager.com/system-ui" />
