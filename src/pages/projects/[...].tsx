/** @jsx jsx */

import { useLocation } from '@reach/router'
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
  location: any
}

const FilteredProjects: FC<FilteredProjectsProps> = ({ data, location }) => {
  const slug = location.pathname.split('/').slice(-2)[0]

  if (typeof window !== 'undefined' && window && (!slug || !Object.keys(slugTagPairs).includes(slug))) {
    navigate(`/projects`)
    return null
  }

  const tag = slugTagPairs[slug]

  return (
    <Layout>
      <Box sx={{ maxWidth: `50ch`, marginBlockEnd: 5, paddingInline: 3 }}>
        <Intro
          description={tag === `Case study` ? `Extensive project case studies` : `${tag} projects`}
          title={tag === `Case study` ? `Case studies` : tag}
        />
        <ProjectsList projects={data.allProjectsYaml.edges.filter((project) => project.node.tags.includes(tag))} />
      </Box>
    </Layout>
  )
}

export default FilteredProjects

export const Head = () => {
  const location = useLocation()

  const slug = location.pathname.split('/').slice(-2)[0]

  if (!slug) navigate(`/projects`)

  const tag = slugTagPairs[slug]

  return (
    <Halo
      title={tag === `Case study` ? `Case studies / Projects` : `${tag} / Projects`}
      url={`https://chrisnager.com/projects/${slug}`}
    />
  )
}

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
