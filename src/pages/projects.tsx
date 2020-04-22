/** @jsx jsx */

import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import Helmet from 'react-helmet'
import { Box, Flex, jsx, Text } from 'theme-ui'

import Layout from '../components/layout'
import Tag from '../components/tag'

export default ({ data }) => {
  return (
    <Layout>
      {/* 
        // @ts-ignore */}
      <Helmet title="Projects / Chris Nager" />
      <Box sx={{ maxWidth: `50ch`, mb: 5, px: 3 }}>
        <Text as="h1">Projects</Text>
        <Text as="p" sx={{ my: 3, fontSize: 4 }}>
          Some fun things I've built
        </Text>

        <Box as="ul" sx={{ my: 0, pl: 0, display: `grid` }}>
          {data.allProjectsYaml.edges
            .filter(({ node: { page, featured } }) => page === `projects` && featured)
            .map(({ node: { name, url, childScreenshot, summary, tags } }) => (
              <Flex
                key={name}
                as="a"
                // @ts-ignore
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ mt: 4, ':hover': { textDecoration: `none` } }}
              >
                <Box sx={{ width: 120, height: 120, mr: 2, flex: `0 0 120px`, bg: `action` }}>
                  {childScreenshot && <Img fluid={childScreenshot.screenshotFile.childImageSharp.fluid} alt={name} />}
                </Box>
                <Box>
                  <Text as="h1" sx={{ fontSize: 4, 'a:hover > &': { textDecoration: `underline` } }}>
                    {name}
                  </Text>
                  <Text as="p" sx={{ color: `text`, 'a:hover > &': { color: `text` } }}>
                    {summary}
                  </Text>
                  <Text as="p" sx={{ color: `text`, 'a:hover > &': { color: `text` } }}>
                    {!!tags && !!tags.length && tags.map(tag => <Tag key={tag}>{tag}</Tag>)}
                  </Text>
                </Box>
              </Flex>
            ))}

          {data.allProjectsYaml.edges
            .filter(({ node: { page, featured } }) => page === `projects` && !featured)
            .map(({ node: { name, url, childScreenshot, summary, tags } }) => (
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
            ))}
        </Box>
      </Box>
    </Layout>
  )
}

export const pageQuery = graphql`
  query ProjectsQuery {
    allProjectsYaml {
      edges {
        node {
          url
          name
          summary
          page
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
