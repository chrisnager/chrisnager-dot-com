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
  { to: `/profile`, children: `Profile` },
  { to: `/work`, children: `Projects` },
  { to: `/speaking`, children: `Speaking` },
  { to: `/blog`, children: `Blog` },
]

export default () => {
  const [colorMode, setColorMode] = useColorMode()

  return (
    <Flex as="nav" role="navigation" sx={{ height: `7rem`, mb: 4, px: 2 }}>
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
            <Link {...{ sx: { ...sx, height: 48, display: `flex`, alignItems: `center` }, to, children }}></Link>
          </Flex>
        ))}
        <Flex as="li" sx={{ alignItems: `center` }}>
          <button
            onClick={() => setColorMode(colorMode === `default` ? `dark` : `default`)}
            aria-label="Toggle color mode"
            sx={{
              width: 48,
              height: 48,
              appearance: `none`,
              display: `inline-block`,
              textAlign: `center`,
              lineHeight: `inherit`,
              textDecoration: `none`,
              fontSize: `1.5rem`,
              fontWeight: `normal`,
              m: 0,
              border: 0,
              pt: 0,
              px: 3,
              pb: `6px`,
              color: `action`,
              cursor: `pointer`,
              bg: 'transparent',
            }}
          >
            ☼
          </button>
        </Flex>
      </Flex>
    </Flex>
  )
}
