/** @jsx jsx */

import { jsx, Flex } from 'theme-ui'
import { Link } from 'gatsby'

const sx = {
  px: 3,
  display: 'block',
  color: 'currentColor',
  textDecoration: 'none',
}

const links = [
  { to: '/', children: 'Home' },
  { to: '/blog', children: 'Blog' },
]

export default () => (
  <nav role="navigation">
    <Flex
      as="ul"
      sx={{
        my: 0,
        pl: 0,
        listStyleType: 'none',
      }}
    >
      <Flex
        as={Link}
        sx={{
          width: '3rem',
          height: '3rem',
          justifyContent: 'center',
          alignItems: 'center',
          textDecoration: 'none',
          bg: '#0cf',
        }}
      >
        <span>CN</span>
      </Flex>
      <Flex sx={{ flex: 1, justifyContent: 'flex-end' }}>
        {links.map(({ to, children }) => (
          <Flex as="li" sx={{ alignItems: 'center' }} key={to}>
            <Link {...{ sx, to, children }}></Link>
          </Flex>
        ))}
      </Flex>
    </Flex>
  </nav>
)
