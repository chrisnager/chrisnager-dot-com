/** @jsx jsx */

import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import { Box, jsx, Text } from 'theme-ui'

import ArticlePreview from '../components/article-preview'
import Layout from '../components/layout'

const BlogIndex = ({ data }) => {
  return (
    <Layout>
      {/* 
        // @ts-ignore */}
      <Helmet title="Blog / Chris Nager" />
      <Box sx={{ maxWidth: `50ch`, mb: 5, px: 3 }}>
        <Text as="h1">Blog</Text>
        <Text as="p" sx={{ my: 3, fontSize: 4 }}>
          Stuff I've written
        </Text>
        <Box as="ul" sx={{ my: 0, pl: 0, listStyleType: `none` }}>
          {data.allPostsYaml.edges.map(({ node }) => {
            return (
              <Box as="li" key={node.slug}>
                <ArticlePreview article={node} />
              </Box>
            )
          })}
        </Box>
      </Box>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query BlogIndexQuery {
    allPostsYaml(sort: { fields: [publishDate], order: DESC }) {
      edges {
        node {
          title
          slug
          publishDate(formatString: "MMMM Do, YYYY")
          tags
        }
      }
    }
  }
`
