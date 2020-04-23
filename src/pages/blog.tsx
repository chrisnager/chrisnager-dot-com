/** @jsx jsx */

import { graphql } from 'gatsby'
import { FC } from 'react'
import Helmet from 'react-helmet'
import { Box, jsx } from 'theme-ui'

import ArticlePreview from '../components/article-preview'
import Intro from '../components/intro'
import Layout from '../components/layout'

export interface BlogProps {
  data: any
}

const Blog: FC<BlogProps> = ({ data }) => {
  return (
    <Layout>
      <Helmet>
        <title>Blog / Chris Nager</title>
        <meta
          name="description"
          content="Developer and designer in Brooklyn, NY passionate about performance, accessiblity, and systematic design."
        />
      </Helmet>
      <Box sx={{ maxWidth: `50ch`, mb: 5, px: 3 }}>
        <Intro title="Blog" description="My thoughts and process written down" />
        <Box as="ul" sx={{ my: 0, pl: 0, listStyleType: `none` }}>
          {data.allPostsYaml.edges.map(({ node }: { node: any }) => {
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

export default Blog

export const pageQuery = graphql`
  query BlogQuery {
    allPostsYaml(sort: { fields: [publishDate], order: DESC }) {
      edges {
        node {
          slug
          url
          publishDate(formatString: "MMMM Do, YYYY")
          title
          tags
        }
      }
    }
  }
`
