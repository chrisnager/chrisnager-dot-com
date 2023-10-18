/** @jsx jsx */

import { Link } from 'gatsby'
import { FC } from 'react'
import { Box, Flex, jsx, useColorMode } from 'theme-ui'

import Logo from './logo'

const links = [
  { to: `/`, children: `Home` },
  { to: `/profile`, children: `Profile` },
  { to: `/projects`, children: `Projects` },
  { to: `/speaking`, children: `Speaking` },
  { to: `/blog`, children: `Blog` },
]

const Navigation: FC = () => {
  const [colorMode, setColorMode] = useColorMode()

  return (
    <header>
      <Flex as="nav" role="navigation" sx={{ height: `7rem`, mb: [4, 5], px: 2 }}>
        <Flex
          sx={{
            justifyContent: `center`,
            alignItems: `center`,
          }}
        >
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
            <Logo />
          </Link>
        </Flex>
        <Flex
          as="ul"
          sx={{
            my: 0,
            pl: 0,
            flex: 1,
            justifyContent: `flex-end`,
            listStyleType: `none`,
          }}
        >
          {links.map(({ to, children }, index) => (
            <Flex as="li" sx={{ alignItems: `center` }} key={to}>
              <Link
                {...{
                  sx: {
                    px: [2, 3],
                    height: 48,
                    display: [`Home`, `Speaking`].includes(children) ? [`none`, `flex`] : `flex`,
                    alignItems: `center`,
                  },
                  to,
                  children,
                }}
              />
            </Flex>
          ))}
          <Flex as="li" sx={{ alignItems: `center` }}>
            <Box
              as="button"
              onClick={() => setColorMode(colorMode === `default` ? `dark` : `default`)}
              aria-label="Toggle color mode"
              sx={{
                width: 48,
                height: 48,
                m: 0,
                border: 0,
                p: 0,
                display: `flex`,
                justifyContent: `center`,
                alignItems: `center`,
                lineHeight: 1,
                color: `text`,
                cursor: `pointer`,
                bg: `transparent`,
                appearance: `none`,
                ':hover': {
                  color: `action`,
                },
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                width="20"
                height="20"
                sx={{
                  border: `1px solid`,
                  borderRadius: `50%`,
                  bg: `currentcolor`,
                }}
              >
                <path
                  d="M14.53 10.53a7 7 0 01-9.058-9.058A7.003 7.003 0 008 15a7.002 7.002 0 006.53-4.47z"
                  sx={{
                    fill: 'background',
                    fillRule: 'evenodd',
                    clipRule: 'evenodd',
                  }}
                />
              </svg>
            </Box>
          </Flex>
        </Flex>
      </Flex>
    </header>
  )
}

export default Navigation
