/** @jsx jsx */

import { Link } from 'gatsby'
import { Box, jsx, Text } from 'theme-ui'

const Features = ({ data }) => (
  <Box sx={{ my: 5, px: 3 }}>
    <Box as="ul" sx={{ my: 0, pl: 0, listStyleType: 'none' }}>
      {data.map(({ node }) => (
        <Box key={node.title} as="li" sx={{ my: 2 }}>
          <Text
            as={Link}
            to={`/${node.category.toLowerCase()}`}
            sx={{
              borderWidth: 1,
              borderStyle: `solid`,
              borderColor: `transparent`,
              px: 2,
              display: `inline-block`,
              fontStyle: `italic`,
              color: `text`,
              bg: `tag`,
            }}
          >
            {node.category}
          </Text>
          <Text
            as="a"
            href={node.link}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              px: 2,
              display: `inline-block`,
              borderWidth: 1,
              borderStyle: `solid`,
              borderColor: `transparent`,
            }}
          >
            {node.title}
          </Text>
        </Box>
      ))}
    </Box>
  </Box>
)

export default Features
