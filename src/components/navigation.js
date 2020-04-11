/** @jsx jsx */

import { jsx, Flex } from 'theme-ui'
import { Link } from 'gatsby'

const sx = {
  p: 2,
  display: 'block',
  color: 'currentColor',
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
        justifyContent: 'center',
        listStyleType: 'none',
        my: 0,
        pl: 0,
        bg: 'gold',
      }}
    >
      {links.map(({ to, children }) => (
        <li key={to}>
          <Link {...{ sx, to, children }}></Link>
        </li>
      ))}
    </Flex>
  </nav>
)
