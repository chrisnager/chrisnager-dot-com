/** @jsx jsx */

import { FC } from 'react'
import { Box, jsx, Text } from 'theme-ui'

import Tag from './tag'

interface ProjectsListProps {
  projects: any[]
}

const ProjectsList: FC<ProjectsListProps> = ({ projects }) => {
  return (
    <Box as="ul" sx={{ my: 0, pl: 0, display: `grid` }}>
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

          return (
            <Box key={name} id={formattedName} as="li" sx={{ mt: 4, display: `block` }}>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ display: `block`, ':hover': { textDecoration: `none` } }}
              >
                <Box sx={{ bg: `action` }}>
                  <img
                    alt=""
                    src={`/images/projects/${`${formattedName}.png`}`}
                    sx={{ aspectRatio: `16 / 9`, objectFit: `cover`, objectPosition: `center top` }}
                  />
                </Box>

                <Box sx={{ pt: 3 }}>
                  <Text as="h1" sx={{ fontSize: 4, 'a:hover > &': { textDecoration: `underline` } }}>
                    {name}
                  </Text>

                  <Text
                    as="p"
                    sx={{
                      mt: 1,
                      fontFamily: `Georgia, serif`,
                      color: `text`,
                      'a:hover > &': { color: `text` },
                    }}
                  >
                    {summary}
                  </Text>

                  <Box sx={{ mt: `2px`, mx: -2, color: `text`, 'a:hover > &': { color: `text` } }}>
                    {!!tags && !!tags.length && tags.map(tag => <Tag key={tag}>{tag}</Tag>)}
                  </Box>
                </Box>
              </a>
            </Box>
          )
        },
      )}
    </Box>
  )
}

export default ProjectsList
