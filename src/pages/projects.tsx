/** @jsx jsx */

import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import { FC } from 'react'
import { Box, jsx, Text } from 'theme-ui'

import Halo from '../components/halo'
import Intro from '../components/intro'
import Layout from '../components/layout'
import Tag from '../components/tag'

export interface ProjectsProps {
  data: any
}

const Projects: FC<ProjectsProps> = ({ data }) => {
  return (
    <Layout>
      <Halo title="Projects" url="https://chrisnager.com/projects" />
      <Box sx={{ maxWidth: `50ch`, mb: 5, px: 3 }}>
        <Intro title="Projects" description="A handful of things I've built." />

        <Box as="ul" sx={{ my: 0, pl: 0, display: `grid` }}>
          {data.allProjectsYaml.edges.map(
            ({
              node: { name, url, childScreenshot, summary, tags },
            }: {
              node: {
                name: string
                url: string
                childScreenshot: {
                  screenshotFile: {
                    childImageSharp: {
                      fluid: any
                    }
                  }
                }
                summary: string
                tags: string[]
              }
            }) => (
              <Box key={name} as="li" sx={{ mt: 4, display: `block` }}>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ display: `block`, ':hover': { textDecoration: `none` } }}
                >
                  <Box sx={{ bg: `action` }}>
                    {childScreenshot && (
                      <Img
                        sizes={{ ...childScreenshot.screenshotFile.childImageSharp.fluid, aspectRatio: 16 / 9 }}
                        imgStyle={{ objectPosition: `center top` }}
                        alt={name}
                      />
                    )}
                  </Box>

                  <Box sx={{ pt: 3 }}>
                    <Text as="h1" sx={{ fontSize: 4, 'a:hover > &': { textDecoration: `underline` } }}>
                      {name}
                    </Text>

                    <Text
                      as="p"
                      sx={{ mt: 1, fontFamily: `Georgia, serif`, color: `text`, 'a:hover > &': { color: `text` } }}
                    >
                      {summary}
                    </Text>

                    <Box sx={{ mt: `2px`, mx: -2, color: `text`, 'a:hover > &': { color: `text` } }}>
                      {!!tags && !!tags.length && tags.map(tag => <Tag key={tag}>{tag}</Tag>)}
                    </Box>
                  </Box>
                </a>
              </Box>
            ),
          )}
        </Box>
      </Box>
    </Layout>
  )
}

export default Projects

export const pageQuery = graphql`
  query ProjectsQuery {
    allProjectsYaml {
      edges {
        node {
          url
          name
          summary
          tags
          childScreenshot {
            screenshotFile {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`
