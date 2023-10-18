/** @jsx jsx */
import { Global } from '@emotion/react'
import { Link } from 'gatsby'
import { FC, useState } from 'react'
import { Box, jsx } from 'theme-ui'

import Halo from '../../components/halo'

const Affirmations: FC = () => {
  const affirmations = {
    1: "I'm deserving of love and respect.",
    2: "I'm growing and evolving every day.",
    3: "I'm in control of my happiness.",
    4: "I'm capable of achieving my goals.",
    5: "I'm worthy of all the good things that happen in my life.",
    6: "I'm resilient and can get through tough times.",
    7: "I'm free to create the life I desire.",
    8: "I'm loved and supported by those around me.",
    9: "I'm strong and independent.",
    10: "I'm constantly improving and bettering myself.",
    11: "I'm surrounded by abundance.",
    12: "I'm full of potential and endless possibilities.",
    13: "I'm in charge of my life and no one else's.",
    14: "I'm worthy of my dreams and aspirations.",
    15: "I'm a positive thinker and only attract positivity.",
    16: "I'm open to new adventures in my life.",
    17: "I'm deserving of financial stability.",
    18: "I'm not defined by my mistakes.",
    19: "I'm filled with endless creativity.",
    20: "I'm a kind and loving person.",
    21: "I'm proud of all I have achieved.",
    22: "I'm not my past or my imperfections.",
    23: "I'm deserving of everything good that comes my way.",
    24: "I'm constantly learning and growing.",
    25: "I'm enough just as I am.",
    26: "I'm a magnet for success and prosperity.",
    27: "I'm focused and persistent.",
    28: "I'm deserving of love, just as everyone else.",
    29: "I'm not alone in my struggles.",
    30: "I'm braver than I believe.",
    31: "I'm a beacon of love and compassion.",
    32: "I'm deserving of the time and space to heal.",
    33: "I'm able to achieve greatness.",
    34: "I'm always headed in the right direction.",
    35: "I'm worthy of love, compassion, and empathy.",
    36: "I'm not defined by the opinions of others.",
    37: "I'm deserving of all the beauty life offers.",
    38: "I'm able to overcome any challenges that come my way.",
    39: "I'm always doing my best and that's enough.",
    40: "I'm deserving of respect and kindness.",
    41: "I'm in charge of my destiny.",
    42: "I'm powerful and capable of great things.",
    43: "I'm surrounded by people who believe in me.",
    44: "I'm a unique and special individual.",
    45: "I'm deserving of all the happiness in the world.",
    46: "I'm stronger than any obstacle in front of me.",
    47: "I'm constantly growing and developing.",
    48: "I'm worthy of respect and admiration.",
    49: "I'm deserving of my place in the world.",
    50: "I'm living my best life every single day.",
    51: "I'm worthy of success and prosperity.",
    52: "I'm open to love and kindness.",
    53: "I'm a beacon of light and hope.",
    54: "I'm loved by those around me.",
    55: "I'm creating the life I deserve.",
    56: "I'm deserving of peace and tranquility.",
    57: "I'm a powerful creator.",
    58: "I'm loved and supported by the universe.",
    59: "I'm deserving of happiness and joy.",
    60: "I'm in charge of how I feel.",
    61: "I'm proud of who I am.",
    62: "I'm loved and cherished.",
    63: "I'm a magnet for love and positivity.",
    64: "I'm stronger than I think.",
    65: "I'm living my best life right now.",
  }

  const [affirmation, setAffirmation] = useState(`I'm enough just as I am.`)

  function displayRandomAffirmation() {
    const randomIndex = Math.floor(Math.random() * Object.keys(affirmations).length) + 1
    setAffirmation(affirmations[randomIndex])
  }

  return (
    <Box sx={{ maxWidth: `75ch`, mx: `auto` }}>
      <Halo title="Affirmations" url="https://chrisnager.com/affirmations">
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      </Halo>

      <Global
        styles={(theme: {
          colors: { action: string; selection: string }
          fonts: { body: string }
          fontWeights: { heading: string }
          lineHeights: { body: string; heading: string }
        }) => `
          ::selection {
            background-color: #ffc1d6;
          }

          :focus {
            outline: 6px double #0d6b9e;
            outline-offset: 0.125em;
          }

          @keyframes draw {
            from { stroke-dasharray: 425; stroke-dashoffset: 425; }
            to { stroke-dasharray: 450; stroke-dashoffset: 0; }
          }

          @keyframes draw-2 {
            from, 12.5% { stroke-dasharray: 425; stroke-dashoffset: 425; }
            to { stroke-dasharray: 450; stroke-dashoffset: 0; }
          }
      `}
      />

      <Global
        styles={{
          [`body`]: {
            [`background-color`]: `pink`,
            [`background-color`]: `color(display-p3 1 0.875 0.925)`,
            [`box-sizing`]: `border-box`,
            [`color`]: `black`,
            [`display`]: `grid`,
            [`font-family`]: `ui-system, sans-serif`,
            [`grid-template-rows`]: `auto 1fr auto`,
            [`height`]: `100dvh`,
            [`margin`]: `0`,
            [`padding-inline`]: `1rem`,
            [`padding-block-end`]: `2rem`,
            [`text-align`]: `center`,
          },

          [`#___gatsby, #gatsby-focus-wrapper, #gatsby-focus-wrapper > div`]: {
            display: `contents`,
          },

          [`main`]: {
            [`max-width`]: `42rem`,
            [`margin-inline`]: `auto`,
          },

          [`img`]: {
            [`aspect-ratio`]: `1`,
            [`display`]: `block`,
            [`margin-inline`]: `auto`,
            [`max-width`]: `14rem`,
            [`-webkit-user-select`]: `none`,
            [`-moz-user-select`]: `none`,
            [`-ms-user-select`]: `none`,
            [`user-select`]: `none`,
          },

          [`main > div`]: {
            [`font-family`]: `Georgia, serif`,
            [`font-size`]: `1.75rem`,
            [`font-size`]: `clamp(1.75rem, 4vw, 2.25rem)`,
            [` letter-spacing`]: `-0.00625em`,
            [`text-wrap`]: `balance`,
          },

          [`main:has(+ footer > button:active) > :is(div, img)`]: {
            [`mix-blend-mode`]: `color-burn`,
            [`filter`]: `brightness(90%)`,
          },

          [`button`]: {
            [`background-color`]: `white`,
            [`border`]: `0.125rem solid #0d6b9e`,
            [`border-radius`]: `0.5rem`,
            [`color`]: `#0d6b9e`,
            [`cursor`]: `pointer`,
            [`font-size`]: `inherit`,
            [`font-weight`]: `600`,
            [`padding`]: `0.5rem`,
            [`-webkit-user-select`]: `none`,
            [`-moz-user-select`]: `none`,
            [`-ms-user-select`]: `none`,
            [`user-select`]: `none`,
          },

          [`button:active`]: {
            [`color`]: `navy`,
          },

          [`footer`]: {
            [`-webkit-margin-before`]: `3rem`,
            [`margin-block-start`]: `3rem`,
          },

          [`p`]: {
            [`-webkit-margin-before`]: `3rem`,
            [`margin-block-start`]: `3rem`,
            [`-webkit-margin-after`]: `0`,
            [`margin-block-end`]: `0`,
          },

          [`span`]: {
            [`color`]: `red`,
            [`color`]: `color(display-p3 1 0 0)`,
          },

          [`a`]: {
            [`color`]: `inherit`,
            [`text-underline-offset`]: `0.125rem`,
          },
        }}
      />

      <header>
        <nav role="navigation" sx={{ height: `7rem`, display: `grid`, alignItems: `center` }}>
          <Link
            sx={{
              width: `3rem`,
              height: `3rem`,
              display: `flex`,
              alignItems: `center`,
              justifyContent: `center`,
            }}
            to="/"
          >
            <Box
              as="svg"
              // @ts-ignore
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 200 200"
              sx={{ width: '2.5rem', height: '2.5rem', display: `block` }}
            >
              <title>"C" logo of Chris Nager (Press to go home)</title>
              <Box
                as="path"
                // @ts-ignore
                d="M21,100A78.06,78.06,0,0,1,52.25,37.48h0v125h0a78.17,78.17,0,0,0,118.52-31.26l-43-18.76.15-.33a31.26,31.26,0,0,1-44.43,14.9"
                sx={{
                  fill: 'none',
                  strokeLinejoin: 'round',
                  strokeWidth: '10px',
                  stroke: `#ffc4de`,
                  animation: `2s draw linear forwards`,

                  'a:hover > svg > &, :focus > svg > &': {
                    stroke: `#ffc4de`,
                  },
                }}
              />
              <Box
                as="path"
                // @ts-ignore
                d="M82,176.18,82,23.42a95.41,95.41,0,0,1,17.19-1.56,78.16,78.16,0,0,1,72,47.72l-43.2,18.25h0A31.26,31.26,0,0,0,81.67,74.08"
                sx={{
                  fill: 'none',
                  strokeLinejoin: 'round',
                  strokeWidth: '10px',
                  stroke: `#ffc4de`,
                  animation: `draw-2 2.4s linear forwards`,

                  'a:hover > svg > &, :focus > svg > &': {
                    stroke: `#ffc4de`,
                  },
                }}
              />
            </Box>
          </Link>
        </nav>
      </header>

      <main>
        <img src="./t-rex.png" alt="T-rex, drawn in pixel art" />
        <div>{affirmation}</div>
      </main>

      <footer>
        <button onClick={displayRandomAffirmation}>Generate affirmation</button>

        <p>
          <small>
            Crafted with <span>♥</span> by <a href="/">Chris Nager</a> on October 14, 2023
            <br />
            Picked by{' '}
            <a href="https://codepen.io/chrisnager/pen/rNogLLB" target="_blank" rel="noopener noreferrer">
              CodePen
            </a>{' '}
            for their{' '}
            <a href="https://codepen.io/trending" target="_blank" rel="noopener noreferrer">
              Trending
            </a>{' '}
            projects
          </small>
        </p>
      </footer>
    </Box>
  )
}

export default Affirmations
