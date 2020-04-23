/** @jsx jsx */

import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import { FC } from 'react'
import Helmet from 'react-helmet'
import { Box, Flex, jsx, Text } from 'theme-ui'

import Intro from '../components/intro'
import Layout from '../components/layout'
import Tag from '../components/tag'

export interface ProjectsProps {
  data: any
}

const Projects: FC<ProjectsProps> = ({ data }) => {
  return (
    <Layout>
      <Helmet>
        <title>Projects / Chris Nager</title>
        <meta
          name="description"
          content="Developer and designer in Brooklyn, NY passionate about performance, accessiblity, and systematic design."
        />
      </Helmet>
      <Box sx={{ maxWidth: `50ch`, mb: 5, px: 3 }}>
        <Intro title="Projects" description="A handful of things I've built" />

        <Box as="ul" sx={{ my: 0, pl: 0, display: `grid` }}>
          {data.allProjectsYaml.edges
            .filter(({ node: { featured } }: { node: { featured: boolean } }) => featured)
            .map(
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
                <Flex
                  key={name}
                  as="a"
                  // @ts-ignore
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ mt: 4, ':hover': { textDecoration: `none` } }}
                >
                  <Box sx={{ width: 120, height: 120, mr: 3, flex: `0 0 120px`, bg: `action` }}>
                    {childScreenshot && <Img fluid={childScreenshot.screenshotFile.childImageSharp.fluid} alt={name} />}
                  </Box>
                  <Box>
                    <Text as="h1" sx={{ fontSize: 4, 'a:hover > &': { textDecoration: `underline` } }}>
                      {name}
                    </Text>
                    <Text as="p" sx={{ color: `text`, 'a:hover > &': { color: `text` } }}>
                      {summary}
                    </Text>
                    <Box sx={{ mx: -2, color: `text`, 'a:hover > &': { color: `text` } }}>
                      {!!tags && !!tags.length && tags.map(tag => <Tag key={tag}>{tag}</Tag>)}
                    </Box>
                  </Box>
                </Flex>
              ),
            )}

          {data.allProjectsYaml.edges
            .filter(({ node: { featured } }: { node: { featured: boolean } }) => !featured)
            .map(
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
                <Flex
                  key={name}
                  as="a"
                  // @ts-ignore
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ mt: 4, ':hover': { textDecoration: `none` } }}
                >
                  <Box sx={{ width: 80, height: 80, mr: 2, flex: `0 0 80px`, bg: `action` }}>
                    {childScreenshot && <Img fluid={childScreenshot.screenshotFile.childImageSharp.fluid} alt={name} />}
                  </Box>
                  <Box>
                    <Text as="h1" sx={{ fontSize: 3, 'a:hover > &': { textDecoration: `underline` } }}>
                      {name}
                    </Text>
                    <Text as="p" sx={{ fontSize: 2, color: `text`, 'a:hover > &': { color: `text` } }}>
                      {summary}
                    </Text>
                    {!!tags && !!tags.length && tags.map(tag => <Tag key={tag}>{tag}</Tag>)}
                  </Box>
                </Flex>
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
          featured
          childScreenshot {
            screenshotFile {
              childImageSharp {
                fluid(maxWidth: 240, maxHeight: 240) {
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
