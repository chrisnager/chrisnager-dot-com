/** @jsx jsx */
import { graphql } from 'gatsby'
import { FC } from 'react'
import Helmet from 'react-helmet'
import { Box, jsx, Text } from 'theme-ui'

import Intro from '../components/intro'
import Layout from '../components/layout'

export interface SpeakingProps {
  data: any
}

const Speaking: FC<SpeakingProps> = ({ data }) => {
  return (
    <Layout>
      <Helmet>
        <title>Speaking / Chris Nager</title>
        <meta
          name="description"
          content="Developer and designer in Brooklyn, NY passionate about performance, accessibility, and systematic design."
        />
      </Helmet>
      <Box sx={{ maxWidth: `50ch`, mb: 5, px: 3 }}>
        <Intro title="Speaking" description="Fun stuff I've presented" />

        <Box as="ul" sx={{ my: 0, pl: 0 }}>
          {data.allSpeakingYaml.edges.map(
            ({ node }: { node: { summary: string; url: string; date: string; name: string } }) => (
              <Box
                key={node.name}
                as={node.url ? `a` : `div`}
                // @ts-ignore
                href={!!node.url ? node.url : undefined}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ mt: 4, display: `block`, ':hover': { textDecoration: `none` } }}
              >
                <Text
                  as="p"
                  sx={{
                    mt: 1,
                    fontSize: 2,
                    color: `text`,
                    'a:hover > &': { color: `text` },
                  }}
                >
                  {node.date}
                </Text>
                <Text as="h2" sx={{ fontSize: 4, 'a:hover > &': { textDecoration: `underline` } }}>
                  {node.name}
                </Text>
                <Text
                  as="p"
                  sx={{ mt: 1, fontFamily: `Georgia, serif`, color: `text`, 'a:hover > &': { color: `text` } }}
                >
                  {node.summary}
                </Text>
              </Box>
            ),
          )}
        </Box>
      </Box>
    </Layout>
  )
}

export default Speaking

export const pageQuery = graphql`
  query SpeakingQuery {
    allSpeakingYaml {
      edges {
        node {
          url
          name
          summary
          date
        }
      }
    }
  }
`
