/** @jsx jsx */

import { Box, Flex, jsx, Text } from 'theme-ui'

const links = [
  { href: `https://twitter.com/chrisnager`, children: `Twitter` },
  { href: `https://github.com/chrisnager`, children: `GitHub` },
  { href: `https://codepen.io/chrisnager`, children: `CodePen` },
  { href: `https://linkedin.com/in/chrisnager`, children: `LinkedIn` },
]

const Footer: FC = () => (
  <Box>
    <Box
      sx={{
        mt: 4,
        borderTopWidth: 1,
        borderTopStyle: `solid`,
        borderTopColor: `tag`,
        pt: 5,
        px: 3,
      }}
    >
      <Text
        as="mark"
        sx={{
          fontWeight: `500`,
          px: 2,
          display: `inline-block`,
          fontStyle: `italic`,
          bg: `text`,
          color: `background`,
        }}
      >
        I'm currently looking for new opportunities.
      </Text>
    </Box>

    <Flex
      sx={{
        mt: 4,
        pb: 3,
      }}
    >
      {links.map(({ href, children }) => (
        <a
          key={href}
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            height: `2rem`,
            px: 3,
            alignItems: `center`,
          }}
          {...{ href }}
        >
          <span {...{ children }} />
        </a>
      ))}
    </Flex>
    <Box sx={{ mb: 5, px: 3 }}>
      <Text as="small">&copy; 2020 Chris Nager</Text>
      <span> &middot; </span>
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
      <p>
        <Text as="small">
          Gatsby-built, Netlify-hosted,{' '}
          <a
            href="https://build-5b4e1699-6760-4465-9eb8-a15a076fb3e6.gtsb.io/reports/lighthouse/index.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Lighthouse-approved
          </a>
          {` ( 💯).`}
        </Text>
      </p>
    </Box>
  </Box>
)

export default Footer