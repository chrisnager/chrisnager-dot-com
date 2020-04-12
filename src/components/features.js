/** @jsx jsx */

import { jsx, Box, Text } from 'theme-ui'
import { Link } from 'gatsby'

const features = [
  { category: `Work`, title: `Emoonji`, link: `/` },
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
              px: 2,
              display: `inline-block`,
              fontStyle: `italic`,
              borderWidth: 1,
              borderStyle: `solid`,
              borderColor: `#ccc`,
              color: `var(--color)`,
            }}
          >
            {category}
          </Text>{' '}
          <Text as="a" href={link} target="_blank" rel="noopener noreferrer">
            {title}
          </Text>
        </Box>
      ))}
    </Box>
  </Box>
)
