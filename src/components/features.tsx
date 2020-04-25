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

const Features: FC<FeaturesProps> = ({ data }) => {
  return (
    <Box sx={{ my: 5, px: 2 }}>
      <Box as="ul" sx={{ my: 0, pl: 0, listStyleType: 'none' }}>
        {data.map(({ node }) => {
          const isInternalPost = node.link.substring(0, 6) === `/blog/`

          return (
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
                as={isInternalPost ? Link : `a`}
                // @ts-ignore
                href={isInternalPost ? undefined : node.link}
                to={isInternalPost ? node.link : undefined}
                target={isInternalPost ? undefined : '_blank'}
                rel={isInternalPost ? undefined : 'noopener noreferrer'}
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
          )
        })}
      </Box>
    </Box>
  )
}

export default Features
