/** @jsx jsx */

import { FC } from 'react'
import { Box, jsx, Text } from 'theme-ui'

import Tag from './tag'

interface ArticlesListProps {
  articles: any[]
}

const ArticlesList: FC<ArticlesListProps> = ({ articles }) => {
  return (
    <Box as="ul" sx={{ marginBlock: 0, paddingInlineStart: 0, display: `grid` }}>
      {articles.map(
        ({
          node: { name, url, summary, tags },
        }: {
          node: {
            name: string
            url: string
            summary: string
            tags: string[]
          }
        }) => {
          const formattedName = name
            .toLowerCase()
            .replace(/✂ /g, ``)
            .replace(/\s/g, `-`)
            .replace(/\./g, `-`)
            .replace(/!/g, ``)
            .replace(/'/g, ``)
            .replace(/'/g, ``)
            .replace(/</g, ``)
            .replace(/>/g, ``)
            .replace(/#/g, ``)
            .replace(/\(/g, ``)
            .replace(/\)/g, ``)

          const urlIsExternal = url.includes(`http`)

          return (
            <Box key={name} id={formattedName} as="li" sx={{ marginBlockStart: 4, display: `block` }}>
              <a
                href={url}
                target={urlIsExternal ? `_blank` : undefined}
                rel={urlIsExternal ? `noopener noreferrer` : undefined}
                sx={{ display: `block`, ':hover': { textDecoration: `none` } }}
              >
                <Box>
                  <Text as="h1" sx={{ fontSize: `1.2em`, 'a:hover > &': { textDecoration: `underline` } }}>
                    {name}
                  </Text>

                  <Text
                    as="p"
                    sx={{
                      marginBlockStart: 1,
                      fontFamily: `Georgia, serif`,
                      color: `text`,
                      'a:hover > &': { color: `text` },
                    }}
                  >
                    {summary}
                  </Text>
                </Box>
              </a>

              <Box sx={{ marginBlockStart: `2px`, marginInline: -2, color: `text`, 'a:hover > &': { color: `text` } }}>
                {!!tags && !!tags.length && tags.map((tag) => <Tag key={tag}>{tag}</Tag>)}
              </Box>
            </Box>
          )
        },
      )}
    </Box>
  )
}

export default ArticlesList

