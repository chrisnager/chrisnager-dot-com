/** @jsx jsx */

import { Link } from 'gatsby'
// @ts-ignore
import { Box, jsx, Text } from 'theme-ui'

const features = [
  { category: `Projects`, title: `Emoonji`, link: `/` },
  { category: `Speaking`, title: `Lifecycle of an icon`, link: `/` },
  { category: `Blog`, title: `Gatsby × Contentful`, link: `/` },
]

export default () => (
  <Box sx={{ my: 5, px: 3 }}>
    <Box as="ul" sx={{ my: 0, pl: 0, listStyleType: 'none' }}>
      {features.map(({ category, link, title }) => (
        <Box key={title} as="li" sx={{ my: 2 }}>
          <Text
            as={Link}
            to={`/${category.toLowerCase()}`}
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
            {category}
          </Text>
          <Text
            as="a"
            href={link}
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
            {title}
          </Text>
        </Box>
      ))}
    </Box>
  </Box>
)
