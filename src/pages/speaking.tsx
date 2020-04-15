/** @jsx jsx */
import { graphql, Link } from 'gatsby'
import { Box, jsx, Text } from 'theme-ui'

import Layout from '../components/layout'

export default ({ data }) => {
  return (
    <Layout>
      <Box sx={{ maxWidth: `50ch`, mb: 5, px: 3 }}>
        <Text as="h1">Speaking</Text>
        <Text as="p" sx={{ my: 3, fontSize: 4 }}>
          Fun stuff I've presented
        </Text>
        <Box as="ul" sx={{ my: 0, pl: 0 }}>
          {data.allSitesYaml.edges
            .filter(({ node }) => node.page === `speaking`)
            .map(({ node }) => (
              <Box
                key={node.summary}
                as={node.url ? Link : `div`}
                to={node.url ? node.url : undefined}
                sx={{ mt: 4, display: `block`, ':hover': { textDecoration: `none` } }}
              >
                <Text as="p" sx={{ mt: 1, color: `text`, 'a:hover > &': { color: `text` } }}>
                  {node.date}
                </Text>
                <Text as="h1" sx={{ fontSize: 4, 'a:hover > &': { textDecoration: `underline` } }}>
                  {node.name}
                </Text>
                <Text as="p" sx={{ mt: 1, color: `text`, 'a:hover > &': { color: `text` } }}>
                  {node.summary}
                </Text>
              </Box>
            ))}
        </Box>
      </Box>
    </Layout>
  )
}

export const pageQuery = graphql`
  query SpeakingQuery {
    allSitesYaml {
      edges {
        node {
          url
          name
          summary
          date
          page
        }
      }
    }
  }
`
