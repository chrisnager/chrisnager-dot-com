/** @jsx jsx */

import { jsx, Flex } from 'theme-ui'

const sx = {
  height: '2rem',
  px: 3,
  alignItems: 'center',
}

const links = [
  { href: 'https://twitter.com/chrisnager', children: 'Twitter' },
  { href: 'https://github.com/chrisnager', children: 'GitHub' },
  { href: 'https://codepen.io/chrisnager', children: 'CodePen' },
]

export default () => (
  <Flex>
    {links.map(({ href, children }) => (
      <Flex key={href} as="a" target="_blank" rel="noopener noreferrer" {...{ sx, href }}>
        <span {...{ children }} />
      </Flex>
    ))}
  </Flex>
)
