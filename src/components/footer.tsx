/** @jsx jsx */

import { FC } from 'react'
import { Box, Flex, jsx, Text, useColorMode } from 'theme-ui'

const links = [
  { href: `https://twitter.com/chrisnager`, children: `Twitter` },
  { href: `https://github.com/chrisnager`, children: `GitHub` },
  { href: `https://codepen.io/chrisnager`, children: `CodePen` },
  { href: `https://medium.com/@chrisnager`, children: `Medium` },
  { href: `https://linkedin.com/in/chrisnager`, children: `LinkedIn` },
]

const Footer: FC = () => {
  const [colorMode] = useColorMode()

  return (
    <Box as="footer" sx={{ pb: 5 }}>
      <Flex
        sx={{
          mt: 4,
          borderTopWidth: 1,
          borderTopStyle: `solid`,
          borderTopColor: `divider`,
          pt: `3.5rem`,
          px: [2, 0],
          flexWrap: `wrap`,
        }}
      >
        {links.map(({ href, children }) => (
          <Flex key={href} sx={{ flexBasis: [`calc(100% / 3)`, `auto`] }}>
            <a
              target="_blank"
              rel="noopener noreferrer"
              {...{ href, children }}
              sx={{ height: 48, display: `flex`, alignItems: `center`, px: [2, 3] }}
            />
          </Flex>
        ))}
      </Flex>

      <Box sx={{ mt: 4, px: 3 }}>
        <Text as="small" sx={{ display: [`block`] }}>
          &copy; {new Date().getFullYear()} Chris Nager
        </Text>
        <span sx={{ display: [`none`] }}> &middot; </span>
        <Text as="small">
          <a href="https://github.com/chrisnager/chrisnager-dot-com" target="_blank" rel="noopener noreferrer">
            Source
          </a>
        </Text>
        <span> &middot; </span>
        <Text as="small">
          <a
            href="https://www.notion.so/chrisnager/ChrisNager-com-a8e63b19f10a4b0580ff029355e28dd8"
            target="_blank"
            rel="noopener noreferrer"
          >
            Follow my progress
          </a>
        </Text>
      </Box>

      <Box as="p" sx={{ mt: 4, mx: 3 }}>
        <Text as="small">
          Gatsby-built, Netlify-hosted,{' '}
          <span sx={{ display: [`block`, `inline`] }}>
            <a
              href="https://lighthouse-dot-webdotdevsite.appspot.com//lh/html?url=https%3A%2F%2Fchrisnager.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Lighthouse-approved
            </a>
            {` ( `}
            <span
              sx={{
                filter:
                  colorMode === `dark` ? `hue-rotate(110deg) brightness(2.25)` : `hue-rotate(100deg) brightness(1.25)`,
              }}
            >
              💯
            </span>
            {`).`}
          </span>
        </Text>
      </Box>
    </Box>
  )
}

export default Footer
