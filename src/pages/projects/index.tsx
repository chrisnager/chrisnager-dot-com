/** @jsx jsx */

import { graphql } from 'gatsby'
import { FC } from 'react'
import { Box, jsx } from 'theme-ui'

import Halo from '../../components/halo'
import Intro from '../../components/intro'
import Layout from '../../components/layout'
import ProjectsList from '../../components/projects-list'

export interface ProjectsProps {
  data: any
}

const Projects: FC<ProjectsProps> = ({ data }) => {
  return (
    <Layout>
      <Box sx={{ maxWidth: `50ch`, marginBlockEnd: 5, paddingInline: 3 }}>
        <Intro title="Projects" description="A handful of things I've built" />
        <ProjectsList projects={data.allProjectsYaml.edges} />
      </Box>
    </Layout>
  )
}

export default Projects

export const Head = () => (
  <Halo
    title="Projects"
    url="https://chrisnager.com/projects"
    feedLinks={[
      { href: `/projects/feed.xml`, type: `application/rss+xml`, title: `Projects RSS feed / Chris Nager` },
      { href: `/projects/feed.json`, type: `application/json`, title: `Projects JSON feed / Chris Nager` },
    ]}
  />
)

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
