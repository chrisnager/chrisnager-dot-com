/** @jsx jsx */

import { graphql } from 'gatsby'
import { FC } from 'react'
import { Box, jsx } from 'theme-ui'

import Features from '../components/features'
import Halo from '../components/halo'
import Hero from '../components/hero'
import Layout from '../components/layout'

export const Head = () => <Halo />

export interface HomeProps {
  data: any
}

const Home: FC<HomeProps> = ({ data }) => {
  return (
    <Layout>
      <Box sx={{ maxWidth: `55ch` }}>
        <Hero data={data.allDataYaml.edges[0].node} />
        <Features data={data.allFeaturesYaml.edges} />
      </Box>
    </Layout>
  )
}

export default Home

export const pageQuery = graphql`
  query HomeQuery {
    allDataYaml {
      edges {
        node {
          title
          description
        }
      }
    }
    allFeaturesYaml {
      edges {
        node {
          link
          title
          category
        }
      }
    }
  }
`
