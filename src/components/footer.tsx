/** @jsx jsx */

import { FC, Fragment, useEffect, useState } from 'react'
import { Box, Flex, jsx, Text, useColorMode } from 'theme-ui'

const links = [
  { href: `https://linkedin.com/in/chrisnager`, children: `LinkedIn` },
  { href: `https://codepen.io/chrisnager`, children: `CodePen` },
  { href: `https://github.com/chrisnager`, children: `GitHub` },
  { href: `https://twitter.com/chrisnager`, children: `Twitter` },
  { href: `https://medium.com/@chrisnager`, children: `Medium` },
]

const Footer: FC = () => {
  const [colorMode] = useColorMode()
  const [updatedDate, setUpdatedDate] = useState(``)

  useEffect(() => {
    fetch('https://api.github.com/repos/chrisnager/chrisnager-dot-com/commits', {
      headers: {
        Accept: 'application/vnd.github+json',
      },
    })
      .then((response) => response.json())
      .then((data) => setUpdatedDate(data[0].commit.author.date))
      .catch((error) => console.error({ error }))
  }, [])

  return (
    <Box as="footer" sx={{ paddingBlockEnd: 5 }}>
      <Flex
        sx={{
          marginBlockStart: 4,
          borderTopWidth: 1,
          borderTopStyle: `solid`,
          borderTopColor: `divider`,
          paddingBlockStart: `3.5rem`,
          paddingInline: [2, 0],
          flexWrap: `wrap`,
        }}
      >
        {links.map(({ href, children }) => (
          <Flex key={href} sx={{ flexBasis: [`calc(100% / 3)`, `auto`] }}>
            <a
              target="_blank"
              rel="noopener noreferrer"
              {...{ href, children }}
              sx={{ blockSize: 48, display: `flex`, alignItems: `center`, paddingInline: [2, 3] }}
            />
          </Flex>
        ))}
      </Flex>

      <Box sx={{ marginBlockStart: 4, paddingInline: 3 }}>
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

        {updatedDate && (
          <Fragment>
            <span> &middot; </span>
            <Text as="small">
              <a
                href="https://github.com/chrisnager/chrisnager-dot-com/commits/master"
                target="_blank"
                rel="noopener noreferrer"
              >
                Updated
                {` `}
                {new Date(updatedDate).toLocaleString('en-US', {
                  timeZone: 'America/New_York',
                  month: 'short',
                  day: 'numeric',
                })}
              </a>
            </Text>
          </Fragment>
        )}
      </Box>

      <Box as="p" sx={{ marginBlockStart: 4, marginInline: 3 }}>
        <Text as="small">
          Gatsby-built, Netlify-hosted,{' '}
          <span sx={{ display: [`block`, `inline`] }}>
            <a
              href="https://pagespeed.web.dev/analysis/https-chrisnager-com/w1qevz18f5?form_factor=desktop"
              target="_blank"
              rel="noopener noreferrer"
            >
              PageSpeed Insights-approved
            </a>
            {` (`}
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
