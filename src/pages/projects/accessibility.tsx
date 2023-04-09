/** @jsx jsx */

import { graphql } from 'gatsby'
import { FC } from 'react'
import { Box, jsx } from 'theme-ui'

import Halo from '../../components/halo'
import Intro from '../../components/intro'
import Layout from '../../components/layout'
import ProjectsList from '../../components/projects-list'

export interface FilteredProjectsProps {
  data: any
}

const FilteredProjects: FC<FilteredProjectsProps> = ({ data }) => {
  return (
    <Layout>
      <Halo title="Accessibility / Projects" url="https://chrisnager.com/projects/accessibility" />

      <Box sx={{ maxWidth: `50ch`, mb: 5, px: 3 }}>
        <Intro title="Accessibility" description="Accessibility projects" />
        <ProjectsList projects={data.allProjectsYaml.edges} />
      </Box>
    </Layout>
  )
}

export default FilteredProjects

export const pageQuery = graphql`
  query AccessibilityProjectsQuery {
    allProjectsYaml(filter: { tags: { in: "accessibility" } }) {
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
