/** @jsx jsx */

import { graphql } from 'gatsby'
import { FC } from 'react'
import { Box, jsx } from 'theme-ui'

import ArticlePreview from '../../components/article-preview'
import Halo from '../../components/halo'
import Intro from '../../components/intro'
import Layout from '../../components/layout'

export interface BlogProps {
  data: any
}

const Blog: FC<BlogProps> = ({ data }) => {
  return (
    <Layout>
      <Box sx={{ maxWidth: `50ch`, marginBlockEnd: 5, paddingInline: 3 }}>
        <Intro title="Blog" description="My written thoughts" />
        <Box as="ul" sx={{ marginBlock: 0, paddingInlineStart: 0, listStyleType: `none` }}>
          {data.allPostsYaml.edges.map(({ node }: { node: any }) => {
            return (
              <Box as="li" key={node.slug} sx={{ paddingBlockStart: 4 }}>
                <ArticlePreview article={node} />
              </Box>
            )
          })}
        </Box>
      </Box>
    </Layout>
  )
}

export const Head = () => <Halo title="Blog" url="https://chrisnager.com/blog" />

export default Blog

export const pageQuery = graphql`
  query BlogQuery {
    allPostsYaml(sort: { date: DESC }) {
      edges {
        node {
          slug
          url
          date(formatString: "MMM D, YYYY")
          title
          tags
        }
      }
    }
  }
`
