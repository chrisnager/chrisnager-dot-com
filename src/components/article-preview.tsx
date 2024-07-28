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
  const currentYear = `${new Date().getFullYear()}`
  const formattedDate = date.includes(currentYear) ? date.slice(0, -6) : date
  const isInternalPost = url.substring(0, 6) === `/blog/`

  return (
    <Box>
      <Box
        as={isInternalPost ? Link : `a`}
        // @ts-ignore
        href={isInternalPost ? undefined : url}
        to={isInternalPost ? url : undefined}
        target={isInternalPost ? undefined : '_blank'}
        rel={isInternalPost ? undefined : 'noopener noreferrer'}
        sx={{ display: `block`, ':hover': { textDecoration: `none` } }}
    >
        <Text as="p" sx={{ fontSize: `0.8em`, color: `text`, 'a:hover > &': { color: `text` } }}>
          {formattedDate}
        </Text>

        <Text as="h2" sx={{ marginBlockStart: 1, fontSize: `1.2em`, 'a:hover > &': { textDecoration: `underline` } }}>
          {title}
        </Text>
      </Box>

      <Box sx={{ marginBlockStart: `2-px`, marginInline: -2 }}>{!!tags.length && tags.map(tag => <Tag key={tag}>{tag}</Tag>)}</Box>
    </Box>
  )
}

export default ArticlePreview
