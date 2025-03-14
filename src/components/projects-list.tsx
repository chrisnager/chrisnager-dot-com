/** @jsx jsx */

import { FC } from 'react'
import { Box, jsx, Text } from 'theme-ui'

import Tag from './tag'

interface ProjectsListProps {
  projects: any[]
}

const ProjectsList: FC<ProjectsListProps> = ({ projects }) => {
  return (
    <Box as="ul" sx={{ marginBlock: 0, paddingInlineStart: 0, display: `grid` }}>
      {projects.map(
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

          const urlIsExternal = url.includes(`http`)

          return (
            <Box key={name} id={formattedName} as="li" sx={{ marginBlockStart: 4, display: `block` }}>
              <a
                href={url}
                target={urlIsExternal ? `_blank` : undefined}
                rel={urlIsExternal ? `noopener noreferrer` : undefined}
                sx={{
                  display: `block`,
                  borderTopLeftRadius: `0.625rem`,
                  borderTopRightRadius: `0.625rem`,
                  ':hover': { textDecoration: `none` },
                }}
              >
                <Box sx={{ bg: `action`, borderRadius: `0.5626rem`, p: `1px` }}>
                  <img
                    alt=""
                    src={`/images/projects/${`${formattedName}.png`}`}
                    sx={{
                      aspectRatio: `16 / 10`,
                      borderRadius: `0.5rem`,
                      objectFit: `cover`,
                      objectPosition: `center top`,
                    }}
                  />
                </Box>

                <Box sx={{ paddingBlockStart: 3 }}>
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

export default ProjectsList
