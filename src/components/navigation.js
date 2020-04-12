/** @jsx jsx */

import { jsx, Flex } from 'theme-ui'
import { Link } from 'gatsby'

const sx = {
  px: 3,
  display: 'block',
  color: 'currentColor',
}

const links = [
  { to: '/', children: 'Home' },
  { to: '/about', children: 'Profile' },
  { to: '/projects', children: 'Projects' },
  { to: '/blog', children: 'Articles' },
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
          width: '4rem',
          height: '6rem',
          px: 3,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="2rem" height="2rem">
          <path
            d="M21,100A78.06,78.06,0,0,1,52.25,37.48h0v125h0a78.17,78.17,0,0,0,118.52-31.26l-43-18.76.15-.33a31.26,31.26,0,0,1-44.43,14.9"
            fill="none"
            stroke="#000"
            strokeLinejoin="round"
            strokeWidth="12px"
          />
          <path
            d="M82,176.18,82,23.42a95.41,95.41,0,0,1,17.19-1.56,78.16,78.16,0,0,1,72,47.72l-43.2,18.25h0A31.26,31.26,0,0,0,81.67,74.08"
            fill="none"
            stroke="#000"
            strokeLinejoin="round"
            strokeWidth="12px"
          />
        </svg>
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
