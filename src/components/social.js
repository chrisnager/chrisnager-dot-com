/** @jsx jsx */

import { jsx, Flex, Text } from 'theme-ui'
import React from 'react'

const sx = {
  height: `2rem`,
  px: 3,
  alignItems: `center`,
}

const links = [
  { href: `https://twitter.com/chrisnager`, children: `Twitter` },
  { href: `https://github.com/chrisnager`, children: `GitHub` },
  { href: `https://codepen.io/chrisnager`, children: `CodePen` },
  { href: `https://linkedin.com/in/chrisnager`, children: `LinkedIn` },
]

export default () => (
  <>
    <Flex sx={{ mt: 4, borderTopWidth: 1, borderTopStyle: `solid`, borderTopColor: `var(--tag)`, pt: 5, pb: 3 }}>
      {links.map(({ href, children }) => (
        <Flex key={href} as="a" target="_blank" rel="noopener noreferrer" {...{ sx, href }}>
          <span {...{ children }} />
        </Flex>
      ))}
    </Flex>
    <Text as="p" sx={{ mb: 5, px: 3 }}>
      <Text as="small">&copy; 2020 Chris Nager</Text>
      <span> &middot; </span>
      <Text as="small">
        <Text as="a" href="https://github.com/chrisnager/chrisnager-dot-com" target="_blank" rel="noopener noreferrer">
          Source
        </Text>
      </Text>
    </Text>
  </>
)
