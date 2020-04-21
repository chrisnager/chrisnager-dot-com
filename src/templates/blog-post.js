/** @jsx jsx */

import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import get from 'lodash/get'
import React from 'react'
import Helmet from 'react-helmet'
import { Box, jsx, Text } from 'theme-ui'

import Layout from '../components/layout'

const BlogPostTemplate = () => {
  // const post = get(this.props, `data.contentfulBlogPost`)
  // const siteTitle = get(this.props, `data.site.siteMetadata.title`)

  return (
    <Layout>
      {/* <Img alt={post.title} fluid={post.heroImage.fluid} /> */}
      <Box sx={{ maxWidth: `50ch`, mb: 5, px: 3 }}>
        {/* 
          // @ts-ignore */}
        {/* <Helmet title={`${post.title} / ${siteTitle}`} /> */}
        <div>
          {/* <Text as="h1">{post.title}</Text> */}
          {/* <p>{post.publishDate}</p> */}
          {/* <div
              dangerouslySetInnerHTML={{
                __html: post.body.childMarkdownRemark.html,
              }}
            /> */}
        </div>
      </Box>
    </Layout>
  )
}

export default BlogPostTemplate

// export const pageQuery = graphql`
//   query BlogPostBySlug($slug: String!) {
//     site {
//       siteMetadata {
//         title
//       }
//     }
//     contentfulBlogPost(slug: { eq: $slug }) {
//       title
//       publishDate(formatString: "MMMM Do, YYYY")
//       heroImage {
//         fluid(maxWidth: 1820, maxHeight: 800, background: "rgb:000000")
//       }
//       body {
//         childMarkdownRemark {
//           html
//         }
//       }
//     }
//   }
// `
