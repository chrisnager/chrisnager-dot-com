/** @jsx jsx */

import { graphql, navigate } from 'gatsby'
import { FC } from 'react'
import { Box, jsx } from 'theme-ui'

import Halo from '../../components/halo'
import Intro from '../../components/intro'
import Layout from '../../components/layout'
import ProjectsList from '../../components/projects-list'
import { slugTagPairs } from '../../constants'

export interface FilteredProjectsProps {
  data: any
}

const FilteredProjects: FC<FilteredProjectsProps> = ({ data }) => {
  const pathname = typeof window !== 'undefined' ? window.location.pathname : ''
  const slug = pathname.split('/').slice(-2)[0]

  if (!slug) navigate(`/projects`)

  const tag = slugTagPairs[slug]

  return (
    <Layout>
      <Halo title={`${tag} / Projects`} url={`https://chrisnager.com/projects/${slug}`} />

      <Box sx={{ maxWidth: `50ch`, mb: 5, px: 3 }}>
        <Intro description={`${tag} projects`} title={tag} />
        <ProjectsList projects={data.allProjectsYaml.edges.filter(project => project.node.tags.includes(tag))} />
      </Box>
    </Layout>
  )
}

export default FilteredProjects

export const pageQuery = graphql`
  query TagProjectsQuery {
    allProjectsYaml {
      edges {
        node {
          url
          name
          summary
          tags
        }
      }
    }
  }
`
