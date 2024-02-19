/** @jsx jsx */

import { useLocation } from '@reach/router'
import { graphql, navigate } from 'gatsby'
import { FC } from 'react'
import { Box, jsx } from 'theme-ui'

import Halo from '../../components/halo'
import Intro from '../../components/intro'
import Layout from '../../components/layout'
import ArticlesList from '../../components/articles-list'
import { slugTagPairs } from '../../constants'

export interface FilteredArticlesProps {
  data: any
  location: any
}

const FilteredArticles: FC<FilteredArticlesProps> = ({ data, location }) => {
  const slug = location.pathname.split('/').slice(-2)[0]

  if (!slug || !Object.keys(slugTagPairs).includes(slug)) {
    navigate(`/blog`)
  }

  const tag = slugTagPairs[slug]

  return (
    <Layout>
      <Box sx={{ maxWidth: `50ch`, mb: 5, px: 3 }}>
        <Intro description={`${tag} articles`} title={tag} />
        <ArticlesList articles={data.allPostsYaml.edges.filter(article => article.node.tags.includes(tag))} />
      </Box>
    </Layout>
  )
}

export default FilteredArticles

export const Head = () => { 
  const location = useLocation()

  const slug = location.pathname.split('/').slice(-2)[0]

  if (!slug) navigate(`/articles`)

  const tag = slugTagPairs[slug]

  return <Halo title={`${tag} / Blog`} url={`https://chrisnager.com/articles/${slug}`} />
}

export const pageQuery = graphql`
  query TagBlogQuery {
    allPostsYaml(sort: { date: DESC }) {
      edges {
        node {
          name: title
          slug
          summary: date(formatString: "MMMM Do, YYYY")
          tags
          url
        }
      }
    }
  }
`

