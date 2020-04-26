/** @jsx jsx */

import { Link } from 'gatsby'
import { FC } from 'react'
import { Box, jsx, Text } from 'theme-ui'

import Tag from './tag'

export interface ArticlePreviewProps {
  article: {
    url: string
    date: string
    title: string
    tags: string[]
  }
}

const ArticlePreview: FC<ArticlePreviewProps> = ({ article: { url, date, title, tags } }) => {
  const isInternalPost = url.substring(0, 6) === `/blog/`

  return (
    <Box
      as={isInternalPost ? Link : `a`}
      // @ts-ignore
      href={isInternalPost ? undefined : url}
      to={isInternalPost ? url : undefined}
      target={isInternalPost ? undefined : '_blank'}
      rel={isInternalPost ? undefined : 'noopener noreferrer'}
      sx={{ display: `block`, ':hover': { textDecoration: `none` } }}
    >
      <Text as="p" sx={{ fontSize: 2, color: `text`, 'a:hover > &': { color: `text` } }}>
        {date}
      </Text>

      <Text as="h2" sx={{ mt: 1, fontSize: 4, 'a:hover > &': { textDecoration: `underline` } }}>
        {title}
      </Text>

      <Box sx={{ mt: `2px`, mx: -2 }}>{!!tags.length && tags.map(tag => <Tag key={tag}>{tag}</Tag>)}</Box>
    </Box>
  )
}

export default ArticlePreview
