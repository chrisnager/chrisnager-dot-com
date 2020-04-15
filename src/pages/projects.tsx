/** @jsx jsx */

import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import { Box, Flex, jsx, Text } from 'theme-ui'

import Layout from '../components/layout'

export default ({ data }) => {
  return (
    <Layout>
      <Box sx={{ maxWidth: `50ch`, mb: 5, px: 3 }}>
        <Text as="h1">Projects</Text>
        <Text as="p" sx={{ my: 3, fontSize: 4 }}>
          Fun stuff I've built
        </Text>

        <Box as="ul" sx={{ my: 0, pl: 0, display: `grid` }}>
          {data.allSitesYaml.edges
            .filter(({ node }) => node.page === `projects`)
            .map(({ node }) => (
              <Flex
                key={node.name}
                as="a"
                href={node.url}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ mt: 4, ':hover': { textDecoration: `none` } }}
              >
                <Box sx={{ size: 80, mr: 2, flex: `0 0 80px`, bg: `action` }}>
                  {node.childScreenshot && (
                    <Img
                      resolutions={node.childScreenshot.screenshotFile.childImageSharp.resolutions}
                      alt={node.name}
                    />
                  )}
                </Box>
                <Box>
                  <Text as="h1" sx={{ fontSize: 4, 'a:hover > &': { textDecoration: `underline` } }}>
                    {node.name}
                  </Text>
                  <Text as="p" sx={{ color: `text`, 'a:hover > &': { color: `text` } }}>
                    {node.summary}
                  </Text>
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
    allSitesYaml {
      edges {
        node {
          url
          name
          summary
          page
          childScreenshot {
            screenshotFile {
              childImageSharp {
                resolutions(width: 80, height: 80) {
                  ...GatsbyImageSharpResolutions
                }
              }
            }
          }
        }
      }
    }
  }
`
