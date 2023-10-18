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
  // const [updatedDate, setUpdatedDate] = useState()

  // useEffect(() => {
  //   fetch('https://api.github.com/repos/chrisnager/chrisnager-dot-com/commits', {
  //     headers: {
  //       Authorization: `Bearer ${process.env.GATSBY_GITHUB_API_KEY}`,
  //       Accept: 'application/vnd.github+json',
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((data) => setUpdatedDate(data[0].commit.author.date))
  //     .catch((error) => console.error({ error }))
  // }, [])

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
        <span> &middot; </span>
        <Text as="small">
          <a
            href="https://github.com/chrisnager/chrisnager-dot-com/commits/master"
            target="_blank"
            rel="noopener noreferrer"
          >
            Updated Oct 18
            {/* {new Date(updatedDate).toLocaleString('en-US', {
              timeZone: 'America/New_York',
              month: 'short',
              day: 'numeric',
            })} */}
          </a>
        </Text>
      </Box>

      <Box as="p" sx={{ mt: 4, mx: 3 }}>
        <Text as="small">
          Gatsby-built, Netlify-hosted,{' '}
          <span sx={{ display: [`block`, `inline`] }}>
            <a
              href="https://pagespeed.web.dev/analysis/https-chrisnager-com/2iq45kkv7e?form_factor=desktop"
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
