/** @jsx jsx */

import { Box, jsx, Text } from 'theme-ui'

import Tag from './tag'

// import Img from 'gatsby-image'

export default ({ article: { url, slug, publishDate, title, tags } }) => (
  <Box
    as="a"
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    sx={{ mt: 4, display: `block`, ':hover': { textDecoration: `none` } }}
  >
    <Text as="small" sx={{ mt: 1, fontSize: 2, color: `text`, 'a:hover > &': { color: `text` } }}>
      {publishDate}
    </Text>
    <Text as="h2" sx={{ fontSize: 4, 'a:hover > &': { textDecoration: `underline` } }}>
      {title}
    </Text>

    {!!tags.length && tags.map(tag => <Tag key={tag}>{tag}</Tag>)}
  </Box>
)
