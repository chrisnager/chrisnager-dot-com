/** @jsx jsx */

import { jsx, Flex, useColorMode } from 'theme-ui'
import { Link } from 'gatsby'
import Logo from './logo'

const sx = {
  px: 3,
  display: `block`,
}

const links = [
  { to: `/`, children: `Home` },
  { to: `/about`, children: `Profile` },
  { to: `/work`, children: `Projects` },
  { to: `/speaking`, children: `Speaking` },
  { to: `/blog`, children: `Blog` },
]

export default () => {
  const [colorMode, setColorMode] = useColorMode()

  return (
    <nav role="navigation">
      <Flex sx={{ mb: 4 }}>
        <Flex
          sx={{
            width: `5rem`,
            height: `7rem`,
            pl: 2,
            pr: 3,
            justifyContent: `center`,
            alignItems: `center`,
          }}
        >
          <Link
            sx={{
              width: `2.5rem`,
              height: `2.5rem`,
              ':hover > svg > path, :focus > svg > path': {
                stroke: `action`,
              },
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
          {links.map(({ to, children }) => (
            <Flex as="li" sx={{ alignItems: `center` }} key={to}>
              <Link {...{ sx, to, children }}></Link>
            </Flex>
          ))}
        </Flex>
        <button
          onClick={() => setColorMode(colorMode === `default` ? `dark` : `default`)}
          aria-label="Toggle color mode"
          sx={{
            appearance: `none`,
            display: `inline-block`,
            textAlign: `center`,
            lineHeight: `inherit`,
            textDecoration: `none`,
            fontSize: `1.5rem`,
            fontWeight: `normal`,
            m: 0,
            border: 0,
            py: 0,
            px: 3,
            color: `inherit`,
            bg: 'transparent',
          }}
        >
          ☼
        </button>
      </Flex>
    </nav>
  )
}
