/** @jsx jsx */

import { FC } from 'react'
import { Box, jsx, Text } from 'theme-ui'

import Tag from './tag'

export interface ArticlePreviewProps {
  article: {
    url: string
    publishDate: string
    title: string
    tags: string[]
  }
}

const ArticlePreview: FC<ArticlePreviewProps> = ({ article: { url, publishDate, title, tags } }) => (
  <Box
    as="a"
    // @ts-ignore
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    sx={{ display: `block`, ':hover': { textDecoration: `none` } }}
  >
    <Text as="p" sx={{ fontSize: 2, color: `text`, 'a:hover > &': { color: `text` } }}>
      {publishDate}
    </Text>

    <Text as="h2" sx={{ fontSize: 4, 'a:hover > &': { textDecoration: `underline` } }}>
      {title}
    </Text>

    <Box sx={{ mx: -2 }}>{!!tags.length && tags.map(tag => <Tag key={tag}>{tag}</Tag>)}</Box>
  </Box>
)

export default ArticlePreview
