/** @jsx jsx */

import { graphql } from 'gatsby'
import { FC } from 'react'
import { Box, jsx, Text } from 'theme-ui'

import Halo from '../../components/halo'
import Intro from '../../components/intro'
import Layout from '../../components/layout'
import ProjectsList from '../../components/projects-list'
import Tag from '../../components/tag'

export interface ProjectsProps {
  data: any
}

const Projects: FC<ProjectsProps> = ({ data }) => {
  return (
    <Layout>
      <Halo title="AI / Projects" url="https://chrisnager.com/projects/ai" />

      <Box sx={{ maxWidth: `50ch`, mb: 5, px: 3 }}>
        <Intro title="Projects" description="A handful of things I've built" />
        <ProjectsList projects={data.allProjectsYaml.edges} />
      </Box>
    </Layout>
  )
}

export default Projects

export const pageQuery = graphql`
  query ProjectsQuery {
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
