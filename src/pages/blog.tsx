/** @jsx jsx */

import { graphql } from 'gatsby'
import get from 'lodash/get'
import React from 'react'
import Helmet from 'react-helmet'
import { Box, jsx, Text } from 'theme-ui'

import ArticlePreview from '../components/article-preview'
import Layout from '../components/layout'

const BlogIndex = () => {
  // const siteTitle = get(this, `props.data.site.siteMetadata.title`)
  // const posts = get(this, `props.data.allBlogPost.edges`)

  return (
    <Layout>
      {/* 
        // @ts-ignore */}
      {/* <Helmet title={siteTitle} /> */}
      <Box sx={{ maxWidth: `50ch`, mb: 5, px: 3 }}>
        <Text as="h1">Blog</Text>
        <Text as="p" sx={{ my: 3, fontSize: 4 }}>
          Stuff I've written
        </Text>
        <Box as="ul" sx={{ my: 0, pl: 0, listStyleType: `none` }}>
          {/* {posts.map(({ node }) => {
              return (
                <Box as="li" key={node.slug}>
                  <ArticlePreview article={node} />
                </Box>
              )
            })} */}
        </Box>
      </Box>
    </Layout>
  )
}

export default BlogIndex

// export const pageQuery = graphql`
//   query BlogIndexQuery {
//     site {
//       siteMetadata {
//         title
//       }
//     }
//     allBlogPost(sort: { fields: [publishDate], order: DESC }) {
//       edges {
//         node {
//           title
//           slug
//           publishDate(formatString: "MMMM Do, YYYY")
//           tags
//           heroImage {
//             fluid(maxWidth: 350, maxHeight: 196, resizingBehavior: SCALE)
//           }
//           description {
//             childMarkdownRemark {
//               html
//             }
//           }
//         }
//       }
//     }
//   }
// `
