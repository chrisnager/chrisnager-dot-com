/** @jsx jsx */

import { jsx, Box, Text } from 'theme-ui'

import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import Layout from '../components/layout'
import ArticlePreview from '../components/article-preview'

class BlogIndex extends React.Component {
  render() {
    const siteTitle = get(this, `props.data.site.siteMetadata.title`)
    const posts = get(this, `props.data.allContentfulBlogPost.edges`)

    return (
      <Layout location={this.props.location}>
        <Helmet title={siteTitle} />
        <Box sx={{ maxWidth: `50ch`, mb: 5, px: 3 }}>
          <Text as="h1">Blog</Text>
          <Text as="p" sx={{ my: 3 }}>
            Stuff I've written
          </Text>
          <Box as="ul" sx={{ my: 0, pl: 0, listStyleType: `none` }}>
            {posts.map(({ node }) => {
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
}

export default BlogIndex

export const pageQuery = graphql`
  query BlogIndexQuery {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulBlogPost(sort: { fields: [publishDate], order: DESC }) {
      edges {
        node {
          title
          slug
          publishDate(formatString: "MMMM Do, YYYY")
          tags
          heroImage {
            fluid(maxWidth: 350, maxHeight: 196, resizingBehavior: SCALE) {
              ...GatsbyContentfulFluid_tracedSVG
            }
          }
          description {
            childMarkdownRemark {
              html
            }
          }
        }
      }
    }
  }
`
