/** @jsx jsx */

import { Link } from 'gatsby'
import { Box, Flex, jsx, useColorMode } from 'theme-ui'

import Logo from './logo'

const sx = {
  px: 3,
  display: `block`,
}

const links = [
  { to: `/`, children: `Home` },
  { to: `/profile`, children: `Profile` },
  { to: `/projects`, children: `Projects` },
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
                  px: 3,
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
              appearance: `none`,
              display: `flex`,
              justifyContent: `center`,
              alignItems: `center`,
              lineHeight: 1,
              fontSize: 5,
              fontWeight: `normal`,
              m: 0,
              border: 0,
              p: 0,
              color: `text`,
              cursor: `pointer`,
              bg: `transparent`,
              ':hover': {
                color: `action`,
              },
            }}
          >
            <span sx={{ position: `relative`, top: -1 }}>☼</span>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  )
}
