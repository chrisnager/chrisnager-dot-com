/** @jsx jsx */

import { Link } from 'gatsby'
import { FC } from 'react'
import { Box, jsx, Text } from 'theme-ui'

export interface Feature {
  node: {
    title: string
    category: string
    link: string
  }
}

export interface FeaturesProps {
  data: Feature[]
}

const Features: FC<FeaturesProps> = ({ data }) => (
  <Box sx={{ my: 5, px: 3 }}>
    <Box as="ul" sx={{ my: 0, pl: 0, listStyleType: 'none' }}>
      {data.map(({ node }) => (
        <Box key={node.title} as="li" sx={{ my: 2 }}>
          <Text
            as={Link}
            // @ts-ignore
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
            // @ts-ignore
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
