/** @jsx jsx */

import { jsx, Box, Text } from 'theme-ui'
import React from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import get from 'lodash/get'
import Img from 'gatsby-image'
import Layout from '../components/layout'

class BlogPostTemplate extends React.Component {
  render() {
    const post = get(this.props, `data.contentfulBlogPost`)
    const siteTitle = get(this.props, `data.site.siteMetadata.title`)

    return (
      <Layout location={this.props.location}>
        <Img alt={post.title} fluid={post.heroImage.fluid} />
        <Box sx={{ maxWidth: `50ch`, mb: 5, px: 3 }}>
          <Helmet title={`${post.title} / ${siteTitle}`} />
          <div>
            <Text as="h1">{post.title}</Text>
            <p>{post.publishDate}</p>
            <div
              dangerouslySetInnerHTML={{
                __html: post.body.childMarkdownRemark.html,
              }}
            />
          </div>
        </Box>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    contentfulBlogPost(slug: { eq: $slug }) {
      title
      publishDate(formatString: "MMMM Do, YYYY")
      heroImage {
        fluid(maxWidth: 1820, maxHeight: 800, background: "rgb:000000") {
          ...GatsbyContentfulFluid_tracedSVG
        }
      }
      body {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`
