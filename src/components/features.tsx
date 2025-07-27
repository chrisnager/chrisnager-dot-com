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
  const categories = {
    [`Blog`]: `/blog`,
    [`Case studies`]: `/projects/case-study`,
    [`Projects`]: `/projects`,
    [`Speaking`]: `/speaking`,
  }

  return (
    <Box sx={{ marginBlock: 5, paddingInline: 2 }}>
      <Box as="ul" sx={{ marginBlock: 0, paddingInlineStart: 0, listStyleType: 'none' }}>
        {data.map(({ node }) => {
          const isInternalPost =
            node.link.substring(0, 6) === `/blog/` ||
            node.link.substring(0, 10) === `/projects/` ||
            node.link === `/affirmations` ||
            node.link === `/system-ui`

          return (
            <Box key={node.title} as="li" sx={{ marginBlock: 2 }}>
              <Text
                as={Link}
                // @ts-ignore
                to={categories[node.category]}
                sx={{
                  bg: `tag`,
                  borderColor: `transparent`,
                  borderStyle: `solid`,
                  borderWidth: 1,
                  color: `text`,
                  display: `inline-block`,
                  fontStyle: `italic`,
                  paddingInlineStart: 2,
                }}
              >
                {node.category}
                <span
                  sx={{
                    color: `transparent`,
                    display: `inline-block`,
                    inlineSize: `8px`,
                  }}
                >
                  :
                </span>
              </Text>
              <Text
                as={isInternalPost ? Link : `a`}
                // @ts-ignore
                href={isInternalPost ? undefined : node.link}
                to={isInternalPost ? node.link : undefined}
                target={isInternalPost ? undefined : '_blank'}
                rel={isInternalPost ? undefined : 'noopener noreferrer'}
                sx={{
                  borderColor: `transparent`,
                  borderStyle: `solid`,
                  borderWidth: 1,
                  display: `inline-block`,
                  paddingInlineEnd: 2,
                }}
              >
                <span
                  sx={{
                    display: `inline-block`,
                    inlineSize: `8px`,
                  }}
                >
                  &nbsp;
                </span>
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
